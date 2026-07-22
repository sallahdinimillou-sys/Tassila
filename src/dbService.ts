import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { Product, SiteSettings, Order } from './types';
import { DEFAULT_PRODUCTS, ASSETS_MAP, ASSETS } from './data';

// Helper to provide guaranteed fallback image based on product category
export function getCategoryFallbackImage(category?: string): string {
  if (category === 'argan') return ASSETS.arganBottle;
  if (category === 'honey') return ASSETS.honeyJar;
  if (category === 'bundles') return ASSETS.wovenBaskets;
  return ASSETS.amlouJar;
}

// Helper to resolve product image URLs to stable public paths or bundled Vite assets
export function resolveProductImageUrl(url: string | undefined, category?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return getCategoryFallbackImage(category);
  }
  
  // Reject temporary blob URLs as they break across browser sessions
  if (url.startsWith('blob:')) {
    return getCategoryFallbackImage(category);
  }

  // Valid remote URLs or Base64 data URLs
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Extract raw filename
  const rawFilename = url.split('/').pop()?.trim() || '';
  if (!rawFilename) return getCategoryFallbackImage(category);

  // 1. Direct match in ASSETS_MAP
  if (ASSETS_MAP[rawFilename]) {
    return ASSETS_MAP[rawFilename];
  }

  // 2. Clean filename by stripping Vite build hash suffix (e.g. amlou_jar_1783872775704-BFt3Nrmb.jpg)
  const cleanFilename = rawFilename.replace(/-\w{6,12}(\.[a-zA-Z0-9]+)$/, '$1').toLowerCase();
  
  if (ASSETS_MAP[cleanFilename]) {
    return ASSETS_MAP[cleanFilename];
  }

  // 3. Substring match against ASSETS_MAP keys
  for (const [key, assetPath] of Object.entries(ASSETS_MAP)) {
    const baseKey = key.split('.')[0].toLowerCase(); // e.g. "amlou_jar_1783872775704"
    if (cleanFilename.includes(baseKey) || baseKey.includes(cleanFilename.split('.')[0])) {
      return assetPath;
    }
  }

  // 4. Keyword fuzzy matching
  if (cleanFilename.includes('amlou')) return ASSETS.amlouJar;
  if (cleanFilename.includes('argan')) return ASSETS.arganBottle;
  if (cleanFilename.includes('honey') || cleanFilename.includes('comb')) return ASSETS.honeyJar;
  if (cleanFilename.includes('basket') || cleanFilename.includes('woven') || cleanFilename.includes('bundle')) return ASSETS.wovenBaskets;
  if (cleanFilename.includes('logo')) return ASSETS.logo;
  if (cleanFilename.includes('olive')) return ASSETS.olivesAmbiance;

  // 5. Fallback to public images directory or category default
  return `/images/${cleanFilename}`;
}

// 1. Products real-time subscription
export function subscribeProducts(callback: (products: Product[], isEmpty?: boolean) => void) {
  const productsCol = collection(db, 'products');
  return onSnapshot(productsCol, (snapshot) => {
    if (snapshot.empty) {
      console.log('No products found in Firestore. Providing resolved default products...');
      const resolvedDefaults = DEFAULT_PRODUCTS.map(p => ({
        ...p,
        image: resolveProductImageUrl(p.image, p.category)
      }));
      callback(resolvedDefaults, true);
    } else {
      const prods: Product[] = [];
      snapshot.forEach((docSnap) => {
        const prod = docSnap.data() as Product;
        prod.image = resolveProductImageUrl(prod.image, prod.category);
        prods.push(prod);
      });
      callback(prods, false);
    }
  }, (error) => {
    console.error('Error subscribing to products:', error);
    // On subscription error (e.g. offline/init), fallback to resolved defaults
    const resolvedDefaults = DEFAULT_PRODUCTS.map(p => ({
      ...p,
      image: resolveProductImageUrl(p.image, p.category)
    }));
    callback(resolvedDefaults, false);
  });
}

// 2. Settings real-time subscription
export function subscribeSettings(callback: (settings: SiteSettings, isEmpty?: boolean) => void) {
  const settingsDocRef = doc(db, 'settings', 'site');
  const defaultSettings: SiteSettings = {
    whatsappNumber: '212626505050',
    instagramLink: 'https://instagram.com/tassilabio',
    facebookLink: 'https://facebook.com/tassilabio',
    tiktokLink: 'https://tiktok.com/@tassilabio',
    shippingCost: 0
  };

  return onSnapshot(settingsDocRef, (docSnap) => {
    if (!docSnap.exists()) {
      console.log('No site settings found. Using defaults on client...');
      callback(defaultSettings, true);
    } else {
      callback(docSnap.data() as SiteSettings, false);
    }
  }, (error) => {
    console.error('Error subscribing to settings:', error);
    callback(defaultSettings, false);
  });
}

// 3. Orders real-time subscription (admin only)
export function subscribeOrders(callback: (orders: Order[]) => void) {
  const ordersCol = collection(db, 'orders');
  return onSnapshot(ordersCol, (snapshot) => {
    const ords: Order[] = [];
    snapshot.forEach((docSnap) => {
      ords.push(docSnap.data() as Order);
    });
    // Sort on client side: date descending, then id descending
    ords.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    callback(ords);
  }, (error) => {
    console.error('Error subscribing to orders:', error);
  });
}

// 4. Submit order
export async function addOrderToDb(order: Order) {
  const orderDocRef = doc(db, 'orders', order.id);
  await setDoc(orderDocRef, order);
}

// 5. Update order status
export async function updateOrderStatusInDb(orderId: string, status: 'pending' | 'completed') {
  const orderDocRef = doc(db, 'orders', orderId);
  await updateDoc(orderDocRef, { status });
}

// 6. Delete order
export async function deleteOrderFromDb(orderId: string) {
  const orderDocRef = doc(db, 'orders', orderId);
  await deleteDoc(orderDocRef);
}

// 7. Save settings
export async function saveSettingsInDb(settings: SiteSettings) {
  const settingsDocRef = doc(db, 'settings', 'site');
  await setDoc(settingsDocRef, settings);
}

// 8. Update product/variants
export async function saveProductInDb(product: Product) {
  const productDocRef = doc(db, 'products', product.id);
  await setDoc(productDocRef, product);
}

// 9. Delete product
export async function deleteProductFromDb(productId: string) {
  const productDocRef = doc(db, 'products', productId);
  await deleteDoc(productDocRef);
}

let heicLoader: Promise<any> | null = null;
function getHeic2any(): Promise<any> {
  if (heicLoader) return heicLoader;
  heicLoader = new Promise((resolve, reject) => {
    if ((window as any).heic2any) {
      resolve((window as any).heic2any);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).heic2any) {
        resolve((window as any).heic2any);
      } else {
        reject(new Error('heic2any loaded but not found on window'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load heic2any script from CDN'));
    };
    document.body.appendChild(script);
  });
  return heicLoader;
}

// 10. Helper: Client-Side Image Compression using HTML5 Canvas
export async function compressAndResizeImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<File> {
  console.log(`[Image Compressor] Input file: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)}MB, type: ${file.type}`);
  
  const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                  file.name.toLowerCase().endsWith('.heif') || 
                  file.type === 'image/heic' || 
                  file.type === 'image/heif';

  let workingFile = file;

  if (isHeic) {
    try {
      console.log('[Image Compressor] HEIC image detected. Loading converter...');
      const heic2any = await getHeic2any();
      console.log('[Image Compressor] Converting HEIC to JPEG...');
      const result = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.75
      });
      const convertedBlob = Array.isArray(result) ? result[0] : result;
      const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
      workingFile = new File([convertedBlob], cleanName, { type: 'image/jpeg' });
      console.log('[Image Compressor] HEIC conversion completed successfully!');
    } catch (err) {
      console.error('[Image Compressor] HEIC conversion failed, using fallback:', err);
    }
  }

  if (!workingFile.type.startsWith('image/') || workingFile.type === 'image/gif' || workingFile.type === 'image/svg+xml') {
    console.log(`[Image Compressor] Skipping compression for: ${workingFile.type}`);
    return workingFile;
  }

  return new Promise<File>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          console.warn('[Image Compressor] Canvas 2D context not available. Falling back to original.');
          resolve(workingFile);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.warn('[Image Compressor] Failed to generate blob. Falling back to original.');
              resolve(workingFile);
              return;
            }

            const cleanName = workingFile.name.replace(/\.[^/.]+$/, "") + ".jpg";
            const compressedFile = new File([blob], cleanName, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            console.log(`[Image Compressor] Output file: ${compressedFile.name}, size: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB (${Math.round((1 - compressedFile.size / workingFile.size) * 100)}% size reduction)`);
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = (err) => {
        console.error('[Image Compressor] Failed to load image element:', err);
        resolve(workingFile);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => {
      console.error('[Image Compressor] FileReader error:', err);
      resolve(workingFile);
    };

    reader.readAsDataURL(workingFile);
  });
}

// 11. Helper: Convert File to small compressed Base64 Data URL
export async function convertToBase64(file: File, maxWidth = 600, maxHeight = 600, quality = 0.7): Promise<string> {
  console.log(`[Base64 Fallback] Converting ${file.name} to lightweight base64...`);
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        console.log(`[Base64 Fallback] Generated Base64 string of length: ${dataUrl.length} (~${Math.round(dataUrl.length / 1024)}KB)`);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// 12. Firebase Storage Image Upload with Fallback & Progress Callback
export async function uploadProductImage(
  file: File, 
  productId: string,
  onProgress?: (status: string) => void
): Promise<string> {
  console.log(`[Upload Flow] Started image upload flow for file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
  onProgress?.('جاري ضغط وتقليل حجم الصورة لتسريع الرفع...');

  let processedFile = file;
  try {
    // Compress to max 800x800 and quality 0.7 to make uploading from mobile devices instant
    processedFile = await compressAndResizeImage(file, 800, 800, 0.7);
  } catch (compressErr) {
    console.error('[Upload Flow] Compression error (falling back to original):', compressErr);
  }

  if (!storage) {
    console.warn('[Upload Flow] Storage is not initialized, falling back directly to Base64.');
    onProgress?.('المخزن السحابي غير متصل. جاري تفعيل التخزين الاحتياطي...');
    return await convertToBase64(processedFile);
  }

  // Store images inside products/{productId}/{timestamp}.ext
  const fileExt = processedFile.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'].includes(fileExt) ? fileExt : 'jpg';
  const path = `products/${productId}/${Date.now()}.${cleanExt}`;
  const storageRef = ref(storage, path);

  console.log(`[Upload Flow] Starting upload bytes to Firebase Storage path: ${path}`);
  onProgress?.('جاري الرفع السحابي الآمن...');

  try {
    const uploadPromise = uploadBytes(storageRef, processedFile);

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('UPLOAD_TIMEOUT')), 25000);
    });

    const snapshot = await Promise.race([uploadPromise, timeoutPromise]);
    console.log(`[Upload Flow] Simple upload complete. Retrieving download URL...`);
    onProgress?.('اكتمل الرفع السحابي، جاري جلب الرابط الآمن...');

    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log('[Upload Flow] Retrieved download URL:', downloadUrl);
    return downloadUrl;
  } catch (err: any) {
    console.warn('[Upload Flow] Firebase Storage upload failed or was blocked by CORS/network policy. Error:', err);
    console.log('[Upload Flow] Activating robust Base64 local database fallback to ensure seamless UX.');
    onProgress?.('فشل الرفع السحابي (CORS أو حظر المتصفح). جاري تفعيل التخزين السريع الآمن...');
    
    // Convert to small Base64 string for 100% reliable local storage in Firestore
    const base64Url = await convertToBase64(processedFile);
    onProgress?.('اكتمل توليد الرابط الاحتياطي بنجاح!');
    return base64Url;
  }
}
