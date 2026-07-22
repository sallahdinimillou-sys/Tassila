import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, Product, Order, SiteSettings, CartItem } from './types';
import { Language } from './translations';
import { DEFAULT_PRODUCTS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';

// Firebase imports
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  subscribeProducts, 
  subscribeSettings, 
  subscribeOrders, 
  saveProductInDb, 
  deleteProductFromDb, 
  saveSettingsInDb, 
  addOrderToDb, 
  updateOrderStatusInDb, 
  deleteOrderFromDb 
} from './dbService';

export default function App() {
  // Page view state
  const [currentView, setView] = useState<ViewType>('home');

  // Multi-language state with local storage support
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('tassila_bio_lang');
    return (saved === 'ar' || saved === 'fr' || saved === 'en') ? saved : 'ar';
  });

  // Persistent shopping cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tassila_bio_cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart Drawer open/close state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Firebase Auth user state
  const [user, setUser] = useState<User | null>(null);

  // Dynamic products list (synced in real-time with Firestore)
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsEmpty, setIsProductsEmpty] = useState<boolean>(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  // Submitted orders state (synced in real-time with Firestore)
  const [orders, setOrders] = useState<Order[]>([]);

  // Dynamic site settings (synced in real-time with Firestore)
  const [settings, setSettings] = useState<SiteSettings>({
    whatsappNumber: '212626505050',
    instagramLink: 'https://instagram.com/tassilabio',
    facebookLink: 'https://facebook.com/tassilabio',
    tiktokLink: 'https://tiktok.com/@tassilabio',
    shippingCost: 0
  });
  const [isSettingsEmpty, setIsSettingsEmpty] = useState<boolean>(false);

  // Track if navigation header should be hidden (e.g. during Admin Add/Edit Product form overlay)
  const [isNavHidden, setIsNavHidden] = useState(false);

  // Sync language selection, HTML attributes, and direction (RTL/LTR)
  useEffect(() => {
    localStorage.setItem('tassila_bio_lang', lang);
    const htmlEl = document.documentElement;
    if (lang === 'ar') {
      htmlEl.setAttribute('dir', 'rtl');
      htmlEl.setAttribute('lang', 'ar');
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      htmlEl.setAttribute('lang', lang);
    }
  }, [lang]);

  // Sync shopping cart items to local storage
  useEffect(() => {
    localStorage.setItem('tassila_bio_cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate total count of items in the cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add items to cart dynamically from catalog cards
  const handleAddToCart = (productId: string, variantId: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === productId && item.variantId === variantId
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1
        };
        return next;
      }
      return [...prev, { productId, variantId, quantity: 1 }];
    });
  };

  // 1. Listen to Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // 1b. Recovery routine: Programmatically seed admin credentials if they do not exist
  useEffect(() => {
    const seedRecoveryAdmins = async () => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const adminAccounts = [
        { email: 'admin@tassilabio.com', pass: '123@2026' },
        { email: 'tassilabio26@gmail.com', pass: '123@2026' }
      ];

      for (const account of adminAccounts) {
        try {
          await createUserWithEmailAndPassword(auth, account.email, account.pass);
          console.log(`Successfully created recovery admin user: ${account.email}`);
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            console.log(`Admin user already exists in Firebase Auth: ${account.email}`);
          } else {
            console.warn(`Could not seed recovery admin ${account.email}:`, error.message);
          }
        }
      }
    };
    seedRecoveryAdmins();
  }, []);

  // 2. Subscribe to real-time products in Firestore
  useEffect(() => {
    const unsubscribe = subscribeProducts((prods, isEmpty) => {
      setProducts(prods);
      if (isEmpty !== undefined) {
        setIsProductsEmpty(isEmpty);
      }
      setIsLoadingProducts(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. Subscribe to real-time settings in Firestore
  useEffect(() => {
    const unsubscribe = subscribeSettings((setts, isEmpty) => {
      setSettings(setts);
      if (isEmpty !== undefined) {
        setIsSettingsEmpty(isEmpty);
      }
    });
    return () => unsubscribe();
  }, []);

  // 4. Subscribe to real-time orders (only active if an admin is authenticated)
  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    const unsubscribe = subscribeOrders((ords) => {
      setOrders(ords);
    });
    return () => unsubscribe();
  }, [user]);

  // 5. Auto-seed settings & products when database is empty (only run once ever)
  useEffect(() => {
    if (user) {
      if (isSettingsEmpty) {
        console.log('Admin authenticated. Seeding default settings to Firestore...');
        const defaultSettings: SiteSettings = {
          whatsappNumber: '212626505050',
          instagramLink: 'https://instagram.com/tassilabio',
          facebookLink: 'https://facebook.com/tassilabio',
          tiktokLink: 'https://tiktok.com/@tassilabio',
          shippingCost: 0
        };
        saveSettingsInDb(defaultSettings).catch(err => {
          console.error('Error seeding settings:', err);
        });
      }
      if (isProductsEmpty) {
        console.log('Admin authenticated. Seeding default products to Firestore...');
        DEFAULT_PRODUCTS.forEach((prod) => {
          saveProductInDb(prod).catch(err => {
            console.error('Error seeding product:', prod.id, err);
          });
        });
      }
    }
  }, [user, isSettingsEmpty, isProductsEmpty]);

  // Synchronize browser titles for luxury brand presence
  useEffect(() => {
    const titles: Record<string, string> = {
      ar: 'تاسيلا بيو | Tassila Bio - عسل، أملو وزيت أركان مغربي فاخر',
      fr: 'Tassila Bio - Miel pur, Amlou et Huile d\'Argan cosmétique du Maroc',
      en: 'Tassila Bio - Pure Honey, Authentic Amlou & Organic Moroccan Argan Oil'
    };
    
    const viewsTitle: Record<ViewType, string> = {
      home: titles[lang] || titles['ar'],
      about: lang === 'ar' ? 'قصتي وشغفي | حكاية وأصالة تاسيلا بيو' : lang === 'fr' ? 'Mon histoire & ma passion | Tassila Bio' : 'My story & passion | Tassila Bio',
      contact: lang === 'ar' ? 'تواصل معي | اطلب الآن منتجاتك المفضلة' : lang === 'fr' ? 'Contactez-moi | Commandez maintenant' : 'Contact me | Order now',
      admin: lang === 'ar' ? 'لوحة التحكم | إدارة الأسعار والطلبات - تاسيلا بيو' : 'Admin Panel | Tassila Bio Store Management'
    };
    
    document.title = viewsTitle[currentView] || 'Tassila Bio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, lang]);

  // Handle SKU redirect from card Click (Direct Purchase)
  const handleOrderProduct = (productId: string, variantId: string) => {
    // Add item to cart first so checkout view has it loaded
    setCart((prev) => {
      const exists = prev.some(item => item.productId === productId && item.variantId === variantId);
      if (exists) return prev;
      return [...prev, { productId, variantId, quantity: 1 }];
    });
    setView('contact');
  };

  // Submission handler for Contact view - submits directly to Firestore
  const handleSubmitOrder = async (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    try {
      await addOrderToDb(newOrder);
    } catch (err) {
      console.error('Error submitting order to db:', err);
    }
  };

  // Toggle Order status between Pending and Completed directly in Firestore
  const handleToggleOrderStatus = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const nextStatus = order.status === 'pending' ? 'completed' : 'pending';
      try {
        await updateOrderStatusInDb(orderId, nextStatus);
      } catch (err) {
        console.error('Error updating order status:', err);
      }
    }
  };

  // Delete Order row directly from Firestore
  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrderFromDb(orderId);
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  // Interceptor for setProducts props in AdminView that persists changes to Firestore
  const handleSetProducts = (newProducts: Product[] | ((prev: Product[]) => Product[])) => {
    const resolved = typeof newProducts === 'function' ? newProducts(products) : newProducts;
    
    // Replicate to Firestore
    resolved.forEach(async (prod) => {
      try {
        await saveProductInDb(prod);
      } catch (err) {
        console.error('Error saving product:', err);
      }
    });
    
    // Sync deleted products
    const resolvedIds = new Set(resolved.map(p => p.id));
    products.forEach(async (prod) => {
      if (!resolvedIds.has(prod.id)) {
        try {
          await deleteProductFromDb(prod.id);
        } catch (err) {
          console.error('Error deleting product:', err);
        }
      }
    });
  };

  // Interceptor for setSettings props in AdminView that persists changes to Firestore
  const handleSetSettings = (newSettings: SiteSettings | ((prev: SiteSettings) => SiteSettings)) => {
    const resolved = typeof newSettings === 'function' ? newSettings(settings) : newSettings;
    try {
      saveSettingsInDb(resolved);
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  const activeProducts = products.length === 0 ? (isLoadingProducts ? [] : DEFAULT_PRODUCTS) : products;

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-brand-black">
      
      {/* 1. Global Navigation Header */}
      {!isNavHidden && currentView !== 'admin' && (
        <Header 
          currentView={currentView} 
          setView={setView} 
          settings={settings}
          lang={lang}
          setLang={setLang}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />
      )}

      {/* 2. Main View Container (Dynamic Route Transition) */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentView === 'home' && (
              <HomeView
                products={activeProducts}
                setView={setView}
                onOrderProduct={handleOrderProduct}
                lang={lang}
                onAddToCart={handleAddToCart}
                isLoadingProducts={isLoadingProducts}
              />
            )}

            {currentView === 'about' && (
              <AboutView lang={lang} />
            )}

            {currentView === 'contact' && (
              <ContactView
                products={activeProducts}
                setView={setView}
                settings={settings}
                lang={lang}
                cart={cart}
                setCart={setCart}
                onSubmitOrder={handleSubmitOrder}
              />
            )}

            {currentView === 'admin' && (
              <AdminView
                products={products}
                setProducts={handleSetProducts}
                settings={settings}
                setSettings={handleSetSettings}
                orders={orders}
                onToggleOrderStatus={handleToggleOrderStatus}
                onDeleteOrder={handleDeleteOrder}
                user={user}
                onFormOpenChange={setIsNavHidden}
                setView={setView}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Brand Footer */}
      <Footer
        settings={settings}
        setView={setView}
        lang={lang}
      />

      {/* 4. Sliding Shopping Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            setCart={setCart}
            products={activeProducts}
            setView={setView}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* 5. WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber={settings.whatsappNumber} />

    </div>
  );
}
