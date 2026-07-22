import React, { useState, useRef, useEffect } from 'react';
import { 
  Lock, Eye, EyeOff, Edit, Trash2, LogOut, Plus, 
  Image as ImageIcon, Camera, AlertCircle, Loader2, 
  DollarSign, Tag, Info, CheckCircle2, X,
  ShoppingBag, Settings, Phone, Globe, Truck, ExternalLink, Calendar, User, MapPin, RefreshCw,
  Instagram, Facebook, ArrowRight
} from 'lucide-react';
import { Product, ProductVariant, SiteSettings, Order } from '../types';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  uploadProductImage,
  saveProductInDb,
  deleteProductFromDb,
  saveSettingsInDb,
  updateOrderStatusInDb,
  deleteOrderFromDb,
  compressAndResizeImage
} from '../dbService';

interface AdminViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  orders: Order[];
  onToggleOrderStatus: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
  user: any;
  onFormOpenChange?: (isOpen: boolean) => void;
  setView: (view: any) => void;
}

export default function AdminView({
  products,
  setProducts,
  settings,
  setSettings,
  orders,
  onToggleOrderStatus,
  onDeleteOrder,
  user,
  onFormOpenChange,
  setView
}: AdminViewProps) {
  // Gate authentication state
  const isAuthenticated = !!user;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Success & error feedback banners
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal / Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Form fields
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState<'amlou' | 'argan' | 'honey' | 'bundles'>('amlou');
  const [shippingCostInput, setShippingCostInput] = useState<string>('0');
  const [priceInput, setPriceInput] = useState('');
  const [costInput, setCostInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formVariants, setFormVariants] = useState<ProductVariant[]>([]);

  // Image upload states
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lastSelectedFile, setLastSelectedFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isMultiVariantMode, setIsMultiVariantMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete confirmation states
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');

  // Orders filtering state
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [orderSearchText, setOrderSearchText] = useState('');

  // Settings Form state
  const [settingsPhone, setSettingsPhone] = useState(settings?.whatsappNumber || '');
  const [settingsShipping, setSettingsShipping] = useState(settings?.shippingCost?.toString() || '0');
  const [settingsInsta, setSettingsInsta] = useState(settings?.instagramLink || '');
  const [settingsFb, setSettingsFb] = useState(settings?.facebookLink || '');
  const [settingsTiktok, setSettingsTiktok] = useState(settings?.tiktokLink || '');
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Synchronize settings from database changes
  useEffect(() => {
    if (settings) {
      setSettingsPhone(settings.whatsappNumber || '');
      setSettingsShipping(settings.shippingCost?.toString() || '0');
      setSettingsInsta(settings.instagramLink || '');
      setSettingsFb(settings.facebookLink || '');
      setSettingsTiktok(settings.tiktokLink || '');
    }
  }, [settings]);

  useEffect(() => {
    onFormOpenChange?.(isFormOpen);
    return () => {
      onFormOpenChange?.(false);
    };
  }, [isFormOpen, onFormOpenChange]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      triggerSuccess('تم تسجيل الدخول بنجاح كمسؤول للرعاية والكنوز!');
    } catch (err: any) {
      console.error(err);
      setAuthError('بيانات الدخول غير صحيحة. يرجى التأكد من البريد الإلكتروني وكلمة المرور.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      triggerSuccess('تم تسجيل الخروج بنجاح.');
    } catch (err) {
      console.error(err);
    }
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  // Open the unified form for adding a brand new product
  const handleOpenAddForm = () => {
    setFormMode('add');
    setSelectedProductId(null);
    setTitleInput('');
    setCategoryInput('amlou');
    setShippingCostInput('0');
    setImageUrl('');
    setLocalPreviewUrl(null);
    setUploadError(null);
    setLastSelectedFile(null);
    setFormErrors({});
    setFormVariants([
      {
        id: `var_${Date.now()}`,
        size: '500 غرام',
        price: 150,
        cost: 0,
        nameArabic: '',
        stock: 10
      }
    ]);
    setIsMultiVariantMode(false);
    setPriceInput('150');
    setCostInput('0');
    setIsFormOpen(true);
  };

  // Open the form for editing an existing product
  const handleOpenEditForm = (product: Product) => {
    setFormMode('edit');
    setSelectedProductId(product.id);
    setTitleInput(product.name);
    setCategoryInput(product.category);
    setShippingCostInput((product.shippingCost ?? 0).toString());
    setImageUrl(product.image);
    setLocalPreviewUrl(null);
    setUploadError(null);
    setLastSelectedFile(null);
    setFormErrors({});

    const existingVariants = product.variants && product.variants.length > 0
      ? product.variants.map(v => ({ ...v }))
      : [
          {
            id: `var_${Date.now()}`,
            size: '500 غرام',
            price: 150,
            cost: 0,
            nameArabic: `${product.name} (500 غرام)`,
            stock: 10
          }
        ];
    setFormVariants(existingVariants);
    setIsMultiVariantMode(existingVariants.length > 1);

    if (existingVariants.length > 0) {
      setPriceInput(existingVariants[0].price.toString());
      setCostInput((existingVariants[0].cost ?? 0).toString());
    } else {
      setPriceInput('');
      setCostInput('');
    }

    setIsFormOpen(true);
  };

  const updateSingleVariant = (field: keyof ProductVariant, value: any) => {
    setFormVariants(prev => {
      const first = prev[0] || {
        id: `var_${Date.now()}`,
        size: '500 غرام',
        price: 150,
        cost: 0,
        nameArabic: '',
        stock: 10
      };
      const updated = { ...first, [field]: value };
      return [updated];
    });
  };

  const performUpload = async (fileToUpload: File) => {
    setIsUploadingImage(true);
    setUploadError(null);
    setUploadProgressText('جاري البدء...');
    const targetProdId = selectedProductId || `new_prod_${Date.now()}`;

    // Show compressed local preview instantly before uploading
    let compressedFile = fileToUpload;
    try {
      setUploadProgressText('جاري ضغط وتقليل حجم الصورة لتسريع الرفع...');
      compressedFile = await compressAndResizeImage(fileToUpload, 800, 800, 0.70);
      
      // Create and set local memory preview URL instantly
      const localUrl = URL.createObjectURL(compressedFile);
      setLocalPreviewUrl(localUrl);
    } catch (compressErr) {
      console.error('Error compressing image on client side:', compressErr);
      // Fallback: create object URL from original file
      try {
        const localUrl = URL.createObjectURL(fileToUpload);
        setLocalPreviewUrl(localUrl);
      } catch (err) {
        console.error('Failed to create object URL:', err);
      }
    }

    // Now start background upload
    try {
      const downloadUrl = await uploadProductImage(compressedFile, targetProdId, (status) => {
        setUploadProgressText(status);
      });

      setImageUrl(downloadUrl);
      setUploadError(null);
      // Clear any validation error on image
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy.image;
        return copy;
      });
      triggerSuccess('تم رفع الصورة بنجاح!');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setUploadError('فشل الرفع، حاول مرة أخرى');
      triggerError('فشل رفع الصورة، حاول مرة أخرى');
    } finally {
      setIsUploadingImage(false);
      setUploadProgressText('');
    }
  };

  // Handling file selections and uploading to Firebase Storage
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Relaxed validation: Check either MIME type or file extension
    const isImageMime = file.type.startsWith('image/');
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    const isImageExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'].includes(fileExt);

    if (!isImageMime && !isImageExt) {
      triggerError('يرجى اختيار ملف صورة صالح فقط (PNG, JPG, JPEG, WEBP).');
      if (e.target) e.target.value = '';
      return;
    }

    setLastSelectedFile(file);
    await performUpload(file);
    if (e.target) e.target.value = '';
  };

  const handleRetryUpload = async () => {
    if (!lastSelectedFile) return;
    await performUpload(lastSelectedFile);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Saving the product (Create or Update directly in Firestore)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!titleInput.trim()) {
      errors.title = 'يرجى إدخال عنوان المنتج الطبيعي.';
    }
    if (!imageUrl && !localPreviewUrl) {
      errors.image = 'يرجى اختيار صورة للمنتج.';
    }
    if (formVariants.length === 0) {
      errors.variants = 'يرجى إضافة حجم أو وزن واحد على الأقل.';
    }

    formVariants.forEach((v) => {
      if (!v.size.trim()) {
        errors[`size_${v.id}`] = 'اسم الحجم/الوزن مطلوب.';
      }
      const p = parseFloat(v.price as any);
      if (isNaN(p) || p <= 0) {
        errors[`price_${v.id}`] = 'السعر يجب أن يكون أكبر من الصفر.';
      }
      const c = parseFloat(v.cost as any);
      if (isNaN(c) || c < 0) {
        errors[`cost_${v.id}`] = 'التكلفة لا يمكن أن تكون سالبة.';
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      triggerError('يرجى تصحيح الأخطاء المشار إليها أدناه قبل الحفظ.');
      return;
    }

    const finalImage = imageUrl || 'https://images.unsplash.com/photo-1589733901241-5e53429e1db4?auto=format&fit=crop&q=80&w=600';
    const shippingCostNum = parseFloat(shippingCostInput) || 0;

    // Map form variants to include proper nameArabic
    const updatedVariants: ProductVariant[] = formVariants.map(v => ({
      ...v,
      size: v.size.trim(),
      price: parseFloat(v.price as any) || 0,
      cost: parseFloat(v.cost as any) || 0,
      nameArabic: `${titleInput.trim()} (${v.size.trim()})`,
      stock: v.stock !== undefined ? v.stock : 10
    }));

    if (formMode === 'add') {
      // Create product
      const newProduct: Product = {
        id: `prod_${Date.now()}`,
        name: titleInput.trim(),
        description: 'منتج طبيعي فاخر من تاسيلا بيو مصنوع يدوياً بكل أمانة وحب.',
        image: finalImage,
        category: categoryInput,
        variants: updatedVariants,
        shippingCost: shippingCostNum
      };

      try {
        await saveProductInDb(newProduct);
        setIsFormOpen(false);
        triggerSuccess('تمت إضافة المنتج الجديد وحفظه بنجاح!');
      } catch (err) {
        console.error('Save error:', err);
        triggerError('حدث خطأ في الاتصال أثناء حفظ المنتج الجديد.');
      }

    } else {
      // Edit existing product
      const existingProduct = products.find(p => p.id === selectedProductId);
      if (!existingProduct) {
        triggerError('المنتج المطلوب تعديله غير موجود.');
        return;
      }

      const updatedProduct: Product = {
        ...existingProduct,
        name: titleInput.trim(),
        category: categoryInput,
        image: finalImage,
        variants: updatedVariants,
        shippingCost: shippingCostNum
      };

      try {
        await saveProductInDb(updatedProduct);
        setIsFormOpen(false);
        triggerSuccess('تم تحديث تفاصيل المنتج وحفظ التعديلات بنجاح!');
      } catch (err) {
        console.error('Edit error:', err);
        triggerError('حدث خطأ أثناء تحديث بيانات المنتج.');
      }
    }
  };

  // Delete product action directly from Firestore
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProductFromDb(productToDelete.id);
      triggerSuccess(`تم حذف المنتج "${productToDelete.name}" نهائياً بنجاح!`);
    } catch (err) {
      console.error('Delete error:', err);
      triggerError('حدث خطأ أثناء محاولة حذف المنتج.');
    } finally {
      setProductToDelete(null);
    }
  };



  // Saving settings directly in Firestore
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);

    const cleanPhone = settingsPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      triggerError('يرجى إدخال رقم هاتف واتساب صحيح.');
      setIsSavingSettings(false);
      return;
    }

    const updatedSettings: SiteSettings = {
      whatsappNumber: cleanPhone,
      shippingCost: 0,
      instagramLink: settingsInsta.trim(),
      facebookLink: settingsFb.trim(),
      tiktokLink: settingsTiktok.trim()
    };

    try {
      await saveSettingsInDb(updatedSettings);
      triggerSuccess('تم حفظ إعدادات الموقع وتحديث رقم الهاتف بنجاح!');
    } catch (err) {
      console.error('Error saving settings:', err);
      triggerError('حدث خطأ أثناء محاولة حفظ الإعدادات.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Get localized Arabic category name
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'amlou': return 'أملو';
      case 'argan': return 'زيت الأركان';
      case 'honey': return 'العسل';
      case 'bundles': return 'باقات';
      default: return cat;
    }
  };

  // Login Gate View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-brand-black relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 w-full max-w-md bg-brand-black-soft border border-brand-gold/20 p-8 rounded-sm shadow-2xl text-right">
          {/* Back button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setView('home')}
              className="flex items-center gap-1.5 text-xs text-brand-stone hover:text-brand-gold transition-colors font-bold cursor-pointer bg-brand-black/40 border border-brand-gold/10 hover:border-brand-gold/30 px-3 py-1.5 rounded-sm"
              dir="rtl"
            >
              <ArrowRight size={14} className="text-brand-gold" />
              <span>العودة للمتجر الرئيسي</span>
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-black text-brand-gold mb-3">
              <Lock size={28} />
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-cream">منطقة الإدارة المغلقة</h2>
            <p className="text-xs text-brand-stone mt-1">يرجى تسجيل الدخول للوصول إلى لوحة تحكم المتجر</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded-sm flex items-start gap-2 justify-end">
              <span>{authError}</span>
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs text-brand-stone font-medium">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tassilabio.com"
                className="w-full bg-brand-black text-brand-cream border border-brand-gold/15 focus:border-brand-gold rounded-sm py-2.5 px-3 text-sm focus:outline-none text-left"
                required
              />
            </div>

            <div className="space-y-1 relative">
              <label className="block text-xs text-brand-stone font-medium">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-black text-brand-cream border border-brand-gold/15 focus:border-brand-gold rounded-sm py-2.5 px-10 text-sm focus:outline-none text-left"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-stone hover:text-brand-cream"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full mt-6 bg-brand-gold hover:bg-brand-gold/90 disabled:bg-brand-gold/50 text-brand-black font-bold py-3 px-4 rounded-sm text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAuthLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>جاري التحقق...</span>
                </>
              ) : (
                <span>دخول لوحة التحكم</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard View
  return (
    <div className="w-full min-h-screen bg-brand-black text-brand-cream -mt-12 -mb-12 py-12 relative overflow-hidden" dir="rtl">
      {/* Decorative Traditional Star/Dot Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#C9A445_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. FEEDBACK BANNER MESSAGES */}
        {successMessage && (
          <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-brand-black-soft border border-emerald-500/30 text-brand-cream p-4 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.8)] z-[110] flex items-start gap-3 justify-end animate-fade-in">
            <div className="text-right">
              <h4 className="font-bold text-sm text-emerald-400 font-sans">تمت العملية بنجاح</h4>
              <p className="text-xs text-brand-stone mt-1 font-sans">{successMessage}</p>
            </div>
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          </div>
        )}

        {errorMessage && (
          <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-brand-black-soft border border-red-500/30 text-brand-cream p-4 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.8)] z-[110] flex items-start gap-3 justify-end animate-fade-in">
            <div className="text-right">
              <h4 className="font-bold text-sm text-red-400 font-sans">عذراً، فشلت العملية</h4>
              <p className="text-xs text-brand-stone mt-1 font-sans">{errorMessage}</p>
            </div>
            <AlertCircle size={20} className="text-red-400 shrink-0" />
          </div>
        )}

        {/* BACK BUTTON */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-xs font-bold text-brand-stone hover:text-brand-gold transition-colors font-sans bg-brand-black-soft hover:bg-brand-gold/5 border border-brand-gold/15 hover:border-brand-gold/35 px-4 py-2.5 rounded-sm cursor-pointer"
          >
            <ArrowRight size={14} className="text-brand-gold" />
            <span>الرجوع إلى المتجر</span>
          </button>
        </div>

        {/* 2. HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-brand-gold/10 pb-8 mb-8">
          <div className="text-center md:text-right">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-gold flex items-center justify-center md:justify-start gap-3">
              <span>لوحة التحكم وتدبير المتجر</span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-stone mt-1.5">
              قم بإدارة معروضات المتجر، مراجعة طلبات الزبائن وتتبعها، وتعديل إعدادات التوصيل والتواصل بسهولة وأمان
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 hover:bg-red-950/20 px-4 py-2.5 rounded-sm transition-all cursor-pointer font-sans"
          >
            <LogOut size={14} />
            <span>تسجيل الخروج</span>
          </button>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap border border-brand-gold/15 mb-10 bg-brand-black-soft p-1 rounded-sm shadow-xl gap-2 backdrop-blur-sm">
          {/* Products Tab */}
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm text-xs font-bold transition-all cursor-pointer font-sans ${
              activeTab === 'products'
                ? 'bg-brand-gold text-brand-black shadow-[0_4px_20px_rgba(201,164,69,0.3)] font-black'
                : 'text-brand-stone hover:bg-brand-black/40 hover:text-brand-cream border border-transparent'
            }`}
          >
            <ShoppingBag size={14} className={activeTab === 'products' ? 'stroke-[2.5]' : ''} />
            <span>إدارة المنتجات المعروضة ({products.length})</span>
          </button>

          {/* Settings Tab */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm text-xs font-bold transition-all cursor-pointer font-sans ${
              activeTab === 'settings'
                ? 'bg-brand-gold text-brand-black shadow-[0_4px_20px_rgba(201,164,69,0.3)] font-black'
                : 'text-brand-stone hover:bg-brand-black/40 hover:text-brand-cream border border-transparent'
            }`}
          >
            <Settings size={14} className={activeTab === 'settings' ? 'stroke-[2.5]' : ''} />
            <span>إعدادات الشحن والتواصل</span>
          </button>
        </div>

        {/* 3. PRODUCTS TAB VIEW */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <h2 className="font-display text-lg font-bold text-brand-gold">جميع معروضات المتجر ({products.length})</h2>
                <p className="text-xs text-brand-stone mt-1 font-sans">تعديل أسعار وتفاصيل وصور المنتجات المعروضة في متجرك لتسهيل الشراء</p>
              </div>

              <button
                onClick={handleOpenAddForm}
                className="w-full sm:w-auto bg-gradient-to-l from-brand-gold to-[#D4AF37] hover:from-[#E6C24A] hover:to-brand-gold text-brand-black font-bold py-2.5 px-6 rounded-sm text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(201,164,69,0.15)] hover:shadow-[0_4px_25px_rgba(201,164,69,0.3)] hover:scale-[1.01]"
              >
                <Plus size={14} className="stroke-[3]" />
                <span>إضافة منتج جديد للرفوف</span>
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 bg-brand-black-soft border border-brand-gold/10 rounded-sm shadow-xl">
                <ImageIcon size={44} className="mx-auto text-brand-gold/30 mb-3" />
                <p className="text-brand-cream text-base font-bold font-sans">لا يوجد منتجات معروضة حالياً في الكتالوج</p>
                <p className="text-brand-stone text-xs mt-1.5 font-sans max-w-sm mx-auto leading-relaxed">
                  انقر على زر "إضافة منتج جديد للرفوف" لبدء ملء دكانك الطبيعي بألذ أنواع أملو وأجود أنواع العسل الحر!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => {
                  const firstVariant = product.variants?.[0] || { price: 0, cost: 0 };
                  return (
                    <div 
                      key={product.id}
                      className="bg-brand-black-soft border border-brand-gold/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-brand-gold/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-brand-gold/5 transition-all duration-300 group"
                    >
                      {/* Product Header / Image preview */}
                      <div className="relative h-36 sm:h-40 w-full bg-brand-black overflow-hidden border-b border-brand-gold/10">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.fallback) {
                              target.dataset.fallback = 'true';
                              target.src = '/images/amlou_jar_1783872775704.jpg';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent" />
                        
                        {/* Category Badge */}
                        <span className="absolute top-2 right-2 bg-brand-black/85 border border-brand-gold/20 text-brand-gold text-[9px] font-bold px-2.5 py-0.5 rounded-sm shadow-md font-sans">
                          {getCategoryLabel(product.category)}
                        </span>
                      </div>

                      {/* Body Details */}
                      <div className="p-3.5 flex-grow flex flex-col justify-between">
                        <h3 className="font-display text-xs sm:text-sm font-bold text-brand-cream group-hover:text-brand-gold transition-colors line-clamp-1 mb-3">
                          {product.name}
                        </h3>

                        <div className="pt-2 border-t border-brand-gold/5">
                          {/* Prices Container */}
                          <div className="bg-brand-black/60 p-2 rounded-sm border border-brand-gold/10 text-center">
                            <span className="block text-[9px] text-brand-stone font-bold mb-0.5 font-sans">الأسعار المعروضة</span>
                            <span className="text-xs sm:text-sm font-bold text-brand-gold font-sans">
                              {product.variants && product.variants.length > 1 ? (
                                <>
                                  إبتداءً من {Math.min(...product.variants.map(v => v.price))} <span className="text-[10px] font-normal text-brand-stone">د.م</span>
                                  <span className="block text-[9px] text-brand-stone font-medium mt-0.5">({product.variants.length} أحجام وأوزان مختلفة)</span>
                                </>
                              ) : (
                                <>
                                  {firstVariant.price} <span className="text-[10px] font-normal text-brand-stone">د.م</span>
                                </>
                              )}
                            </span>
                          </div>

                          {/* Shipping Cost Indicator */}
                          <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] font-sans">
                            <Truck size={11} className="text-brand-gold shrink-0" />
                            {product.shippingCost && product.shippingCost > 0 ? (
                              <span className="text-brand-stone font-sans">
                                الشحن: <strong className="text-brand-gold font-bold">{product.shippingCost} د.م</strong>
                              </span>
                            ) : (
                              <span className="text-emerald-400 font-bold font-sans">شحن مجاني</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="px-3 pb-3 pt-1.5 flex items-center gap-2 border-t border-brand-gold/5 bg-brand-black/20">
                        <button
                          onClick={() => handleOpenEditForm(product)}
                          className="flex-grow bg-brand-black hover:bg-brand-gold hover:text-brand-black text-brand-gold border border-brand-gold/20 text-[10px] sm:text-xs font-bold py-1.5 rounded-sm transition-all flex items-center justify-center gap-1 cursor-pointer font-sans"
                        >
                          <Edit size={11} />
                          <span>تعديل</span>
                        </button>

                        <button
                          onClick={() => setProductToDelete(product)}
                          className="flex-grow bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-500/10 hover:border-red-500/30 text-[10px] sm:text-xs font-bold py-1.5 rounded-sm transition-all flex items-center justify-center gap-1 cursor-pointer font-sans"
                        >
                          <Trash2 size={11} />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}



        {/* 5. SITE SETTINGS TAB VIEW */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl bg-brand-black-soft border border-brand-gold/10 rounded-sm p-6 shadow-xl mx-auto">
            <div className="text-right">
              <h2 className="font-display text-lg font-bold text-brand-gold">إعدادات الموقع ومعلومات التواصل</h2>
              <p className="text-xs text-brand-stone mt-1 font-sans">تحديث رقم الهاتف الخاص بالمتجر على واتساب وتكلفة الشحن والتوصيل للمدن المغربية وروابط الصفحات</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 pt-4">
              {/* WhatsApp Contact Phone Number */}
              <div className="bg-brand-black border border-brand-gold/15 p-4 rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-brand-gold">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse inline-block"></span>
                    <span>خط المبيعات والتواصل المباشر على واتساب</span>
                  </span>
                  <span className="text-[10px] font-bold text-brand-stone font-mono">WhatsApp Call Link</span>
                </div>
                
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-bold text-brand-stone font-sans">رقم الهاتف الدولي لخدمة العملاء والطلبات *</label>
                  <div className="relative rounded-sm">
                    <input
                      type="text"
                      value={settingsPhone}
                      onChange={(e) => setSettingsPhone(e.target.value)}
                      placeholder="212612345678"
                      className="w-full bg-brand-black-soft text-brand-cream border border-brand-gold/15 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold rounded-sm py-2.5 pl-10 pr-16 text-sm focus:outline-none text-left font-sans tracking-wider"
                      required
                      dir="ltr"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-brand-stone pointer-events-none border-l border-brand-gold/10 pl-2">
                      <span className="text-sm">🇲🇦</span>
                      <span className="text-xs text-brand-stone font-bold font-sans" dir="ltr">+212</span>
                    </div>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold pointer-events-none">
                      <Phone size={15} />
                    </div>
                  </div>
                  
                  <div className="bg-brand-black/60 p-3 rounded-xs border border-brand-gold/10 text-xs text-brand-stone space-y-1">
                    <p className="font-bold text-brand-gold flex items-center gap-1 font-sans">
                      <span>💡</span>
                      <span>كيف تكتب رقم الهاتف بطريقة صحيحة للواتساب؟</span>
                    </p>
                    <p className="text-[11px] text-brand-stone leading-relaxed font-sans">
                      اكتب الرقم مباشرة بالرمز الدولي للمغرب وبدون (+) وبدون أصفار إضافية في البداية.
                      <br />
                      مثلاً، إذا كان رقم الهاتف هو <strong className="text-brand-cream font-mono">0612345678</strong>، اكتبه هكذا: <strong className="text-brand-gold font-mono bg-brand-black-soft/50 px-1 rounded-sm font-bold">212612345678</strong>
                    </p>
                  </div>
                </div>
              </div>



              <div className="border-t border-brand-gold/5 pt-6 space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b border-brand-gold/5">
                  <Globe size={15} className="text-brand-gold animate-pulse" />
                  <h3 className="text-xs font-bold text-brand-gold font-sans">روابط صفحات التواصل الاجتماعي الخاصة بالماركة (تظهر في تذييل الموقع)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Instagram link */}
                  <div className="space-y-1.5 p-3.5 bg-brand-black/30 border border-pink-500/15 rounded-sm hover:border-pink-500/30 transition-colors text-right">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-pink-400 font-sans">
                      <Instagram size={14} className="text-pink-400" />
                      <span>رابط حساب الإنستغرام (Instagram)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={settingsInsta}
                        onChange={(e) => setSettingsInsta(e.target.value)}
                        placeholder="https://instagram.com/tassilabio"
                        className="w-full bg-brand-black text-brand-cream border border-brand-gold/15 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-sm py-2 px-3 text-xs focus:outline-none text-left font-sans"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Facebook link */}
                  <div className="space-y-1.5 p-3.5 bg-brand-black/30 border border-blue-500/15 rounded-sm hover:border-blue-500/30 transition-colors text-right">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-blue-400 font-sans">
                      <Facebook size={14} className="text-blue-400" />
                      <span>رابط صفحة الفيسبوك (Facebook)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={settingsFb}
                        onChange={(e) => setSettingsFb(e.target.value)}
                        placeholder="https://facebook.com/tassilabio"
                        className="w-full bg-brand-black text-brand-cream border border-brand-gold/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-sm py-2 px-3 text-xs focus:outline-none text-left font-sans"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* TikTok link */}
                  <div className="space-y-1.5 p-3.5 bg-brand-black/30 border border-brand-gold/10 rounded-sm hover:border-brand-gold/25 transition-colors md:col-span-2 text-right">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-brand-gold font-sans">
                      <span className="text-xs">🎵</span>
                      <span>رابط صفحة التيك توك (TikTok)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={settingsTiktok}
                        onChange={(e) => setSettingsTiktok(e.target.value)}
                        placeholder="https://tiktok.com/@tassilabio"
                        className="w-full bg-brand-black text-brand-cream border border-brand-gold/15 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold rounded-sm py-2 px-3 text-xs focus:outline-none text-left font-sans"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="border-t border-brand-gold/5 pt-5 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="bg-gradient-to-l from-brand-gold to-[#D4AF37] hover:from-[#E6C24A] hover:to-brand-gold text-brand-black font-bold py-2.5 px-8 rounded-sm text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(201,164,69,0.15)] disabled:opacity-50 font-sans"
                >
                  {isSavingSettings ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>جاري الحفظ والتحميل للشبكة...</span>
                    </>
                  ) : (
                    <span>حفظ التعديلات والإعدادات</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. ADD / EDIT UNIFIED MODAL OVERLAY (Premium Dark Gold) */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-brand-black-soft border border-brand-gold/20 p-6 rounded-sm max-w-lg w-full text-right shadow-[0_10px_50px_rgba(0,0,0,0.8)] relative my-8 animate-fade-in">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 left-4 text-brand-stone hover:text-brand-cream bg-brand-black/50 hover:bg-brand-black/80 p-2 rounded-full transition-all cursor-pointer border border-brand-gold/10"
              >
                <X size={14} />
              </button>

              <h3 className="font-display text-lg font-bold text-brand-gold border-b border-brand-gold/10 pb-3 mb-6 flex items-center gap-2 justify-end">
                <span>{formMode === 'add' ? 'إضافة منتج طبيعي جديد' : 'تعديل تفاصيل المنتج الطبيعي'}</span>
                <Camera size={16} className="text-brand-gold" />
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                {/* Image upload widget with visual feedback */}
                <div className="space-y-1.5">
                  <label className="block text-xs text-brand-cream font-bold font-sans">صورة المنتج الفاخرة *</label>
                  
                  <div 
                    onClick={triggerFilePicker}
                    className={`border-2 border-dashed rounded-sm p-4 text-center cursor-pointer transition-all relative group flex flex-col items-center justify-center min-h-[140px] overflow-hidden ${
                      uploadError ? 'border-red-500 bg-red-950/20' :
                      isUploadingImage ? 'border-brand-gold/40 bg-brand-black' :
                      (localPreviewUrl || imageUrl) ? 'border-emerald-500/30 bg-brand-black' :
                      'border-brand-gold/10 bg-brand-black hover:border-brand-gold/30'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* ERROR STATE */}
                    {uploadError ? (
                      <div className="w-full min-h-[140px] relative flex flex-col items-center justify-center p-3">
                        {localPreviewUrl && (
                          <img
                            src={localPreviewUrl}
                            alt="Local Preview"
                            className="absolute inset-0 w-full h-full object-contain opacity-20 rounded-sm"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center bg-brand-black-soft/95 p-3 rounded-sm shadow-md border border-red-500/20 max-w-[280px]">
                          <AlertCircle size={22} className="text-red-500" />
                          <p className="text-xs text-red-400 font-bold font-sans">{uploadError}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryUpload();
                            }}
                            className="mt-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs font-sans"
                          >
                            <RefreshCw size={11} className={isUploadingImage ? 'animate-spin' : ''} />
                            <span>إعادة المحاولة</span>
                          </button>
                        </div>
                      </div>
                    ) : isUploadingImage ? (
                      /* UPLOADING STATE */
                      <div className="w-full min-h-[140px] relative flex flex-col items-center justify-center p-3">
                        {localPreviewUrl && (
                          <img
                            src={localPreviewUrl}
                            alt="Local Preview"
                            className="absolute inset-0 w-full h-full object-contain opacity-35 rounded-sm"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-4 py-3 text-center bg-brand-black-soft/95 p-3 rounded-sm shadow-md border border-brand-gold/10">
                          <Loader2 size={22} className="animate-spin text-brand-gold" />
                          <p className="text-xs text-brand-gold font-bold font-sans">جاري الرفع...</p>
                          <p className="text-[10px] text-brand-stone font-sans tracking-wide">{uploadProgressText || 'جاري نقل الملف...'}</p>
                        </div>
                      </div>
                    ) : (localPreviewUrl || imageUrl) ? (
                      /* SUCCESS PREVIEW STATE */
                      <div className="relative w-full h-36 group">
                        <img
                          src={localPreviewUrl || imageUrl}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-sm"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.fallback) {
                              target.dataset.fallback = 'true';
                              target.src = '/images/amlou_jar_1783872775704.jpg';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <span className="text-xs text-white font-bold flex items-center gap-1.5 bg-brand-black/90 border border-brand-gold/20 px-3 py-1.5 rounded-full shadow-md font-sans">
                            <Camera size={13} className="text-brand-gold" />
                            <span>تغيير الصورة</span>
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          <span>✓ جاهز</span>
                        </div>
                      </div>
                    ) : (
                      /* EMPTY PLACEHOLDER STATE */
                      <div className="space-y-2 flex flex-col items-center py-2">
                        <div className="w-11 h-11 rounded-full bg-brand-black border border-brand-gold/15 flex items-center justify-center text-brand-gold group-hover:scale-105 transition-transform shadow-md">
                          <Camera size={18} />
                        </div>
                        <p className="text-xs text-brand-cream font-bold font-sans">اضغط هنا لالتقاط صورة بالهاتف أو اختيارها من المعرض</p>
                        <p className="text-[10px] text-brand-stone font-sans">يتم ضغط الصورة تلقائياً لتسريع عملية الرفع بسلاسة تامة</p>
                      </div>
                    )}
                  </div>
                  {formErrors.image && (
                    <p className="text-red-500 text-[11px] font-bold mt-1 flex items-center gap-1 justify-end font-sans">
                      <span>{formErrors.image}</span>
                      <AlertCircle size={12} className="shrink-0" />
                    </p>
                  )}
                </div>
                
                {/* Title / Name */}
                <div className="space-y-1 text-right">
                  <label className="block text-xs text-brand-cream font-bold font-sans">عنوان المنتج (الاسم المعروض للزبناء) *</label>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => {
                      setTitleInput(e.target.value);
                      if (formErrors.title) {
                        setFormErrors(prev => { const copy = { ...prev }; delete copy.title; return copy; });
                      }
                    }}
                    placeholder="مثال: أملو اللوز الفاخر بزيت الأركان وعسل السدر"
                    className={`w-full bg-brand-black text-brand-cream border focus:bg-brand-black rounded-sm py-2 px-3 text-xs focus:outline-none text-right transition-colors ${
                      formErrors.title ? 'border-red-500 focus:border-red-500' : 'border-brand-gold/15 focus:border-brand-gold'
                    }`}
                    required
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-[11px] font-bold mt-1 flex items-center gap-1 justify-end font-sans">
                      <span>{formErrors.title}</span>
                      <AlertCircle size={12} className="shrink-0" />
                    </p>
                  )}
                  <p className="text-[10px] text-brand-stone mt-0.5 font-sans">يجب أن يكون الاسم معبراً وجذاباً للزبون</p>
                </div>

                {/* Category selector */}
                <div className="space-y-1 text-right">
                  <label className="block text-xs text-brand-cream font-bold font-sans">تصنيف المنتج الرئيسي *</label>
                  <select
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value as any)}
                    className="w-full bg-brand-black text-brand-cream border border-brand-gold/15 focus:border-brand-gold focus:bg-brand-black-soft rounded-sm py-2 px-3 text-xs focus:outline-none text-right cursor-pointer font-sans"
                  >
                    <option value="amlou">أملو (Amlou)</option>
                    <option value="argan">زيت الأركان (Argan Oil)</option>
                    <option value="honey">العسل (Honey)</option>
                    <option value="bundles">باقات (Bundles)</option>
                  </select>
                  <p className="text-[10px] text-brand-stone mt-0.5 font-sans">اختر القسم المناسب ليظهر فيه هذا المنتج تلقائياً في المتجر</p>
                </div>

                {/* Shipping Cost field */}
                <div className="space-y-1 text-right">
                  <label className="block text-xs text-brand-cream font-bold font-sans flex items-center justify-end gap-1.5">
                    <Truck size={14} className="text-brand-gold" />
                    <span>تكاليف الشحن والتوصيل لهذا المنتج (بالدرهم)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={shippingCostInput}
                      onChange={(e) => setShippingCostInput(e.target.value)}
                      placeholder="0"
                      min="0"
                      className="w-full bg-brand-black text-brand-cream border border-brand-gold/15 focus:border-brand-gold rounded-sm py-2 pl-12 pr-3 text-xs focus:outline-none text-right font-sans font-bold"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-stone font-sans">د.م</span>
                  </div>
                  <p className="text-[10px] text-brand-stone mt-0.5 font-sans">
                    اكتب <span className="text-brand-gold font-bold">0</span> إذا كان الشحن مجانياً لهذا المنتج، أو أدخل مبلغ الشحن بالدرهم (مثال: 30 أو 40 درهم).
                  </p>
                </div>

                {/* Simplified / Advanced Weights and Prices UI */}
                {!isMultiVariantMode ? (
                  <div className="space-y-4 border-t border-brand-gold/10 pt-4 text-right">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setIsMultiVariantMode(true)}
                        className="text-[10px] font-bold text-brand-gold hover:text-brand-cream bg-brand-black border border-brand-gold/15 hover:border-brand-gold/30 px-2.5 py-1.5 rounded-sm transition-colors flex items-center gap-1 shadow-sm cursor-pointer font-sans"
                      >
                        <Settings size={12} />
                        <span>⚙️ تفعيل أحجام/أوزان متعددة لهذا المنتج</span>
                      </button>
                      <label className="block text-xs text-brand-cream font-bold font-sans">الوزن والسعر الخاص بالمنتج *</label>
                    </div>

                    <div className="p-4 bg-brand-black border border-brand-gold/10 rounded-sm space-y-4">
                      {/* Size Weight Input */}
                      <div className="space-y-1.5 text-right">
                        <label className="block text-[11px] text-brand-stone font-bold font-sans">اختر الحجم أو الوزن بسرعة أو اكتبه:</label>
                        
                        {/* Predefined clickable presets for easy filling */}
                        <div className="flex flex-wrap gap-1.5 mb-2 justify-end">
                          {(categoryInput === 'amlou' || categoryInput === 'honey'
                            ? ["250 غرام", "500 غرام", "1 كيلوغرام"]
                            : categoryInput === 'argan'
                            ? ["100 مل", "250 مل", "500 مل", "1 لتر"]
                            : categoryInput === 'bundles'
                            ? ["باقة ثنائية", "باقة ثلاثية", "باقة التوفير"]
                            : ["250 غرام", "500 غرام", "1 لتر", "حجم موحد"]
                          ).map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                updateSingleVariant('size', preset);
                              }}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-sm border transition-all cursor-pointer font-sans ${
                                (formVariants[0]?.size === preset)
                                  ? 'bg-gradient-to-l from-brand-gold to-[#D4AF37] text-brand-black border-brand-gold shadow-sm font-bold'
                                  : 'bg-brand-black-soft text-brand-stone border-brand-gold/10 hover:border-brand-gold/30 hover:text-brand-cream'
                              }`}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>

                        <input
                          type="text"
                          value={formVariants[0]?.size || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSingleVariant('size', val);
                            if (formErrors[`size_${formVariants[0]?.id}`]) {
                              setFormErrors(prev => {
                                const copy = { ...prev };
                                delete copy[`size_${formVariants[0]?.id}`];
                                return copy;
                              });
                            }
                          }}
                          placeholder="مثال: 500 غرام أو 1 لتر"
                          required
                          className={`w-full bg-brand-black-soft text-brand-cream border rounded-xs py-2 px-3 text-xs focus:outline-none text-right ${
                            formErrors[`size_${formVariants[0]?.id}`] ? 'border-red-500 focus:border-red-500' : 'border-brand-gold/15 focus:border-brand-gold'
                          }`}
                        />
                        {formErrors[`size_${formVariants[0]?.id}`] && (
                          <p className="text-red-500 text-[10px] font-bold text-right flex items-center gap-0.5 justify-end mt-0.5 font-sans">
                            <span>{formErrors[`size_${formVariants[0]?.id}`]}</span>
                            <AlertCircle size={10} />
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-right">
                        {/* Sale Price */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] text-brand-stone font-bold font-sans">سعر البيع للزبناء *</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={formVariants[0]?.price || ''}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                updateSingleVariant('price', val);
                                if (formErrors[`price_${formVariants[0]?.id}`]) {
                                  setFormErrors(prev => {
                                    const copy = { ...prev };
                                    delete copy[`price_${formVariants[0]?.id}`];
                                    return copy;
                                  });
                                }
                              }}
                              placeholder="السعر بالدرهم"
                              min="1"
                              required
                              className={`w-full bg-brand-black-soft text-brand-cream border rounded-xs py-2 pl-8 pr-3 text-xs focus:outline-none text-center font-sans font-bold ${
                                formErrors[`price_${formVariants[0]?.id}`] ? 'border-red-500 focus:border-red-500' : 'border-brand-gold/15 focus:border-brand-gold'
                              }`}
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-stone font-sans">د.م</span>
                          </div>
                          {formErrors[`price_${formVariants[0]?.id}`] && (
                            <p className="text-red-500 text-[10px] font-bold text-right flex items-center gap-0.5 justify-end mt-0.5 font-sans">
                              <span>{formErrors[`price_${formVariants[0]?.id}`]}</span>
                              <AlertCircle size={10} />
                            </p>
                          )}
                        </div>

                        {/* Shipping Cost */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] text-brand-gold font-bold font-sans flex items-center justify-end gap-1">
                            <Truck size={12} className="text-brand-gold" />
                            <span>تكاليف الشحن (0=مجاني)</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={shippingCostInput}
                              onChange={(e) => setShippingCostInput(e.target.value)}
                              placeholder="0"
                              min="0"
                              className="w-full bg-brand-black-soft text-brand-cream border border-brand-gold/20 focus:border-brand-gold rounded-xs py-2 pl-8 pr-3 text-xs focus:outline-none text-center font-sans font-bold"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-stone font-sans">د.م</span>
                          </div>
                        </div>

                        {/* Cost Price */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] text-brand-stone font-bold font-sans">سعر التكلفة (اختياري)</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={formVariants[0]?.cost || ''}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                updateSingleVariant('cost', val);
                                if (formErrors[`cost_${formVariants[0]?.id}`]) {
                                  setFormErrors(prev => {
                                    const copy = { ...prev };
                                    delete copy[`cost_${formVariants[0]?.id}`];
                                    return copy;
                                  });
                                }
                              }}
                              placeholder="التكلفة بالدرهم"
                              min="0"
                              className={`w-full bg-brand-black-soft text-brand-cream border rounded-xs py-2 pl-8 pr-3 text-xs focus:outline-none text-center font-sans ${
                                formErrors[`cost_${formVariants[0]?.id}`] ? 'border-red-500 focus:border-red-500' : 'border-brand-gold/15 focus:border-brand-gold'
                              }`}
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-stone font-sans">د.م</span>
                          </div>
                          {formErrors[`cost_${formVariants[0]?.id}`] && (
                            <p className="text-red-500 text-[10px] font-bold text-right flex items-center gap-0.5 justify-end mt-0.5 font-sans">
                              <span>{formErrors[`cost_${formVariants[0]?.id}`]}</span>
                              <AlertCircle size={10} />
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-[10px] text-brand-stone leading-relaxed text-right bg-brand-black-soft/40 px-2.5 py-1.5 rounded-xs border border-brand-gold/5 font-sans">
                        💡 <strong>ملاحظة التكلفة:</strong> هذا الرقم لا يظهر للزبناء، بل يساعدك فقط في حساب أرباحك الصافية تلقائياً في الإحصائيات.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Advanced Multi-variant Weights and Prices UI */
                  <div className="space-y-3 border-t border-brand-gold/10 pt-4 animate-fade-in text-right">
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFormVariants(prev => [
                              ...prev,
                              {
                                id: `var_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                                size: '',
                                price: 0,
                                cost: 0,
                                nameArabic: '',
                                stock: 10
                              }
                            ]);
                          }}
                          className="text-xs font-bold text-brand-gold hover:text-brand-cream flex items-center gap-1 bg-brand-black hover:border-brand-gold/30 border border-brand-gold/15 px-3 py-1.5 rounded-sm transition-colors cursor-pointer shadow-sm font-sans"
                        >
                          <Plus size={12} />
                          <span>إضافة حجم أو وزن آخر</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            // Trim to first variant if changing mode to single
                            if (formVariants.length > 1) {
                              if (window.confirm('هل أنت متأكد من العودة للحجم الفردي؟ سيتم الإبقاء على الحجم الأول فقط وحذف الأحجام الأخرى.')) {
                                setFormVariants(prev => [prev[0]]);
                                setIsMultiVariantMode(false);
                              }
                            } else {
                              setIsMultiVariantMode(false);
                            }
                          }}
                          className="text-[10px] font-bold text-brand-stone hover:text-brand-cream bg-brand-black-soft hover:bg-brand-black px-2.5 py-1.5 rounded-sm transition-colors border border-brand-gold/10 flex items-center gap-1 cursor-pointer font-sans"
                        >
                          <span>↩️ العودة للحجم الفردي المبسط</span>
                        </button>
                      </div>
                      <label className="block text-xs text-brand-cream font-bold font-sans">الأحجام/الأوزان والأسعار المتوفرة *</label>
                    </div>

                    {formErrors.variants && (
                      <p className="text-red-500 text-[11px] font-bold text-right flex items-center gap-1 justify-end font-sans">
                        <span>{formErrors.variants}</span>
                        <AlertCircle size={12} className="shrink-0" />
                      </p>
                    )}

                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      {formVariants.map((v, index) => (
                        <div key={v.id || index} className="p-3 bg-brand-black border border-brand-gold/10 rounded-sm relative space-y-3 animate-fade-in text-right">
                          {/* Remove size button on top left */}
                          <div className="flex justify-between items-center pb-1 border-b border-brand-gold/5">
                            {formVariants.length > 1 ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setFormVariants(prev => prev.filter(item => item.id !== v.id));
                                }}
                                className="text-red-400 hover:text-red-300 text-[10px] font-bold flex items-center gap-0.5 px-2 py-0.5 bg-red-950/20 hover:bg-red-950/40 rounded-xs transition-colors cursor-pointer border border-red-900/30 font-sans"
                              >
                                <X size={10} />
                                <span>حذف هذا الحجم</span>
                              </button>
                            ) : (
                              <div />
                            )}
                            <span className="text-[10px] font-bold text-brand-gold font-sans"># الحجم والوزن {index + 1}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Size Name Input */}
                            <div className="space-y-1">
                              <label className="block text-[10px] text-brand-stone font-bold font-sans">الحجم أو الوزن *</label>
                              <input
                                type="text"
                                value={v.size || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFormVariants(prev => prev.map(item => item.id === v.id ? { ...item, size: val } : item));
                                  if (formErrors[`size_${v.id}`]) {
                                    setFormErrors(prev => { const copy = { ...prev }; delete copy[`size_${v.id}`]; return copy; });
                                  }
                                }}
                                placeholder="مثال: 500 غرام أو 1 لتر"
                                required
                                className={`w-full bg-brand-black-soft text-brand-cream border rounded-xs py-1.5 px-2.5 text-xs focus:outline-none text-right ${
                                  formErrors[`size_${v.id}`] ? 'border-red-500 focus:border-red-500' : 'border-brand-gold/15 focus:border-brand-gold'
                                }`}
                              />
                              {formErrors[`size_${v.id}`] && (
                                <p className="text-red-500 text-[9px] font-bold text-right flex items-center gap-0.5 justify-end mt-0.5 font-sans">
                                  <span>{formErrors[`size_${v.id}`]}</span>
                                  <AlertCircle size={10} />
                                </p>
                              )}
                            </div>

                            {/* Size Price Input */}
                            <div className="space-y-1">
                              <label className="block text-[10px] text-brand-stone font-bold font-sans">سعر البيع للزبناء *</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={v.price || ''}
                                  onChange={(e) => {
                                    const val = parseFloat(e.target.value) || 0;
                                    setFormVariants(prev => prev.map(item => item.id === v.id ? { ...item, price: val } : item));
                                    if (formErrors[`price_${v.id}`]) {
                                      setFormErrors(prev => { const copy = { ...prev }; delete copy[`price_${v.id}`]; return copy; });
                                    }
                                  }}
                                  placeholder="السعر بالدرهم"
                                  min="1"
                                  required
                                  className={`w-full bg-brand-black-soft text-brand-cream border rounded-xs py-1.5 pl-7 pr-2.5 text-xs focus:outline-none text-center font-sans font-bold ${
                                    formErrors[`price_${v.id}`] ? 'border-red-500 focus:border-red-500' : 'border-brand-gold/15 focus:border-brand-gold'
                                  }`}
                                />
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-brand-stone font-sans">د.م</span>
                              </div>
                              {formErrors[`price_${v.id}`] && (
                                <p className="text-red-500 text-[9px] font-bold text-right flex items-center gap-0.5 justify-end mt-0.5 font-sans">
                                  <span>{formErrors[`price_${v.id}`]}</span>
                                  <AlertCircle size={10} />
                                </p>
                              )}
                            </div>

                            {/* Optional Cost Input */}
                            <div className="space-y-1">
                              <label className="block text-[10px] text-brand-stone font-bold font-sans">سعر التكلفة لك (اختياري)</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={v.cost || ''}
                                  onChange={(e) => {
                                    const val = parseFloat(e.target.value) || 0;
                                    setFormVariants(prev => prev.map(item => item.id === v.id ? { ...item, cost: val } : item));
                                    if (formErrors[`cost_${v.id}`]) {
                                      setFormErrors(prev => { const copy = { ...prev }; delete copy[`cost_${v.id}`]; return copy; });
                                    }
                                  }}
                                  placeholder="مثال: 80"
                                  min="0"
                                  className={`w-full bg-brand-black-soft text-brand-cream border rounded-xs py-1.5 pl-7 pr-2.5 text-xs focus:outline-none text-center font-sans ${
                                    formErrors[`cost_${v.id}`] ? 'border-red-500 focus:border-red-500' : 'border-brand-gold/15 focus:border-brand-gold'
                                  }`}
                                />
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-brand-stone font-sans">د.م</span>
                              </div>
                              {formErrors[`cost_${v.id}`] && (
                                <p className="text-red-500 text-[9px] font-bold text-right flex items-center gap-0.5 justify-end mt-0.5 font-sans">
                                  <span>{formErrors[`cost_${v.id}`]}</span>
                                  <AlertCircle size={10} />
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Cost helper text right under inputs */}
                          <p className="text-[10px] text-brand-stone leading-relaxed text-right bg-brand-black-soft/40 px-2.5 py-1.5 rounded-xs border border-brand-gold/5 font-sans">
                            💡 <strong>ملاحظة التكلفة:</strong> هذا الرقم لا يظهر للزبناء، فقط لك كمرجع للربح.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buttons Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-gold/10">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 bg-brand-black-soft hover:bg-brand-black text-brand-stone hover:text-brand-cream rounded-sm text-xs font-bold cursor-pointer transition-all border border-brand-gold/10 font-sans"
                  >
                    إلغاء التغييرات
                  </button>
                  <button
                    type="submit"
                    disabled={isUploadingImage}
                    className={`px-6 py-2.5 rounded-sm text-xs font-bold transition-all shadow-[0_4px_15px_rgba(201,164,69,0.15)] font-sans flex items-center gap-2 cursor-pointer ${
                      isUploadingImage 
                        ? 'bg-brand-stone/30 text-brand-stone/70 border border-brand-gold/10 cursor-not-allowed opacity-75'
                        : 'bg-gradient-to-l from-brand-gold to-[#D4AF37] hover:from-[#E6C24A] hover:to-brand-gold text-brand-black'
                    }`}
                  >
                    {isUploadingImage ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-brand-gold" />
                        <span>جاري رفع الصورة...</span>
                      </>
                    ) : (
                      <span>حفظ البيانات والكنوز</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 6. DELETE PRODUCT CONFIRMATION MODAL OVERLAY (Premium Dark Gold) */}
        {productToDelete && (
          <div className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-brand-black-soft border border-red-500/20 p-6 rounded-sm max-w-md w-full text-right shadow-[0_10px_50px_rgba(0,0,0,0.8)] relative animate-fade-in">
              <h3 className="font-display text-base font-bold text-red-500 mb-2 flex items-center gap-2 justify-end">
                <span>تأكيد حذف كنز معروض</span>
                <Trash2 size={16} />
              </h3>
              
              <p className="text-xs text-brand-stone leading-relaxed mb-6 font-sans">
                هل أنت متأكد من حذف هذا المنتج؟ <span className="text-brand-cream font-bold">"{productToDelete.name}"</span> سيتم مسحه نهائياً من قاعدة البيانات (Firestore) ولن يظهر بعد ذلك للزبائن في الصفحة الرئيسية. لا يمكن التراجع عن هذا الإجراء.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="px-4 py-1.5 bg-brand-black hover:bg-brand-black-soft text-brand-stone hover:text-brand-cream rounded-sm text-xs font-bold cursor-pointer transition-all border border-brand-gold/10 font-sans"
                >
                  تراجع وإلغاء
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-5 py-1.5 bg-gradient-to-l from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-sm text-xs font-bold cursor-pointer transition-all shadow-lg shadow-red-950/40 font-sans"
                >
                  نعم، احذفه الآن
                </button>
              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
