import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Award, Compass, Sparkles, ChevronRight, ShoppingBag, ShoppingCart, Flame, Gift, Droplets, CheckCircle2, Truck } from 'lucide-react';
import { Product, ViewType } from '../types';
import { ASSETS } from '../data';
import { getTranslation, translateProduct, Language } from '../translations';

interface HomeViewProps {
  products: Product[];
  setView: (view: ViewType) => void;
  onOrderProduct: (productId: string, variantId: string) => void;
  onAddToCart: (productId: string, variantId: string) => void;
  lang: Language;
  isLoadingProducts?: boolean;
}

export default function HomeView({
  products,
  setView,
  onOrderProduct,
  onAddToCart,
  lang,
  isLoadingProducts = false
}: HomeViewProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState('amlou');
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const isRtl = lang === 'ar';

  // Scroll Spy for categories
  useEffect(() => {
    const categories = ['cat-amlou', 'cat-argan', 'cat-honey', 'cat-bundles'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const catId = entry.target.id.replace('cat-', '');
          setActiveCategory(catId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    categories.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      categories.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  const scrollToProducts = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const triggerToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleAddToCartClick = (p: Product, variantId: string) => {
    onAddToCart(p.id, variantId);
    const { name } = translateProduct(p.id, p.name, p.description, lang);
    triggerToast(`✨ ${name} ${getTranslation('cart_added_success', lang)}`);
  };

  const trustBadges = [
    { title: getTranslation('badge_1_title', lang), desc: getTranslation('badge_1_desc', lang), icon: Leaf },
    { title: getTranslation('badge_2_title', lang), desc: getTranslation('badge_2_desc', lang), icon: Compass },
    { title: getTranslation('badge_3_title', lang), desc: getTranslation('badge_3_desc', lang), icon: Sparkles },
    { title: getTranslation('badge_4_title', lang), desc: getTranslation('badge_4_desc', lang), icon: Award },
  ];

  // Group products
  const amlouProducts = products.filter(p => p.category === 'amlou');
  const arganProducts = products.filter(p => p.category === 'argan');
  const honeyProducts = products.filter(p => p.category === 'honey');
  const bundleProducts = products.filter(p => p.category === 'bundles');

  // Redesigned premium product card renderer
  const renderProductCard = (product: Product) => {
    const selectedVarId = selectedVariants[product.id] || product.variants[0].id;
    const selectedVariant = product.variants.find(v => v.id === selectedVarId) || product.variants[0];
    const hasMultipleVariants = product.variants.length > 1;

    const { name, description } = translateProduct(product.id, product.name, product.description, lang);

    let categoryLabel = '';
    let badgeColor = '';
    if (product.category === 'amlou') {
      categoryLabel = getTranslation('cat_amlou', lang);
      badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    } else if (product.category === 'argan') {
      categoryLabel = product.id.includes('cosmetic') ? getTranslation('cat_argan_cosmetic', lang) : getTranslation('cat_argan_culinary', lang);
      badgeColor = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    } else if (product.category === 'honey') {
      categoryLabel = getTranslation('cat_honey_label', lang);
      badgeColor = 'bg-amber-500/10 text-brand-gold border-brand-gold/20';
    } else if (product.category === 'bundles') {
      categoryLabel = getTranslation('cat_bundles_label', lang);
      badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }

    return (
      <div
        key={product.id}
        id={`product-card-${product.id}`}
        className="group relative bg-[#0B0F0A] border border-brand-gold/10 hover:border-brand-gold/30 rounded-xs transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(201,164,69,0.1)] hover:-translate-y-1"
      >
        {/* Luxury top line highlight on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Media Block (Product Image) */}
        <div className="relative aspect-square overflow-hidden bg-brand-black-soft/30 border-b border-brand-gold/5 flex-shrink-0">
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                if (product.category === 'argan') target.src = ASSETS.arganBottle;
                else if (product.category === 'honey') target.src = ASSETS.honeyJar;
                else if (product.category === 'bundles') target.src = ASSETS.wovenBaskets;
                else target.src = ASSETS.amlouJar;
              }
            }}
          />
          {/* Elegant Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0A]/90 via-transparent to-transparent opacity-60" />
          
          {/* Category Tag overlay */}
          <span className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} px-3 py-1 text-[9px] font-sans font-bold tracking-wide uppercase border rounded-full backdrop-blur-md shadow-md ${badgeColor}`}>
            {categoryLabel}
          </span>

          {/* Shipping Badge overlay */}
          <span className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} px-2.5 py-1 text-[9px] font-sans font-bold border rounded-full backdrop-blur-md shadow-md flex items-center gap-1 ${
            product.shippingCost && product.shippingCost > 0
              ? 'bg-brand-black/85 text-brand-gold border-brand-gold/30'
              : 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
          }`}>
            <Truck size={10} />
            {product.shippingCost && product.shippingCost > 0
              ? `${product.shippingCost} د.م`
              : (lang === 'ar' ? 'شحن مجاني' : 'Free Shipping')}
          </span>
        </div>

        {/* Detail Block */}
        <div className={`p-5 flex-grow flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="space-y-2">
            <h4 className="font-display text-lg font-bold text-brand-cream hover:text-brand-gold transition-colors line-clamp-1">
              {name}
            </h4>
            <p className="text-xs text-brand-stone leading-relaxed line-clamp-2 h-10">
              {description}
            </p>

            {/* Sku / Variant selector */}
            <div className="pt-2">
              {hasMultipleVariants ? (
                <div className="space-y-1.5">
                  <span className="text-[10px] text-brand-stone block uppercase font-sans">
                    {getTranslation('product_select_size', lang)}:
                  </span>
                  <div className={`flex flex-wrap gap-1.5 ${isRtl ? 'justify-start' : 'justify-start'}`}>
                    {product.variants.map((v) => {
                      const isSelected = v.id === selectedVarId;
                      // Display variant name: nameArabic for Arabic, else size
                      const sizeDisplay = (lang === 'ar' && v.nameArabic) ? v.nameArabic : v.size;
                      return (
                        <button
                          key={v.id}
                          onClick={() => handleVariantChange(product.id, v.id)}
                          className={`px-2.5 py-1 text-[10px] font-sans font-bold border transition-all duration-300 rounded-sm cursor-pointer ${
                            isSelected
                              ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                              : 'bg-brand-black text-brand-stone border-brand-gold/10 hover:border-brand-gold/30 hover:text-brand-cream'
                          }`}
                        >
                          {sizeDisplay}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-10 flex items-center">
                  <span className="text-xs text-brand-stone font-sans">
                    {getTranslation('product_size', lang)}: <strong className="text-brand-gold font-bold">{(lang === 'ar' && selectedVariant.nameArabic) ? selectedVariant.nameArabic : selectedVariant.size}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Order CTA */}
          <div className={`pt-4 mt-4 border-t border-brand-gold/10 flex items-center justify-between gap-3 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`flex flex-col ${isRtl ? 'items-start' : 'items-end'}`}>
              <span className="text-[9px] text-brand-stone">{getTranslation('product_discounted_price', lang)}</span>
              <div className="flex items-baseline gap-1.5 justify-end font-sans">
                <span className="text-[10px] text-brand-stone/50 line-through">
                  {Math.round(selectedVariant.price * 1.3)} {getTranslation('currency_dh', lang)}
                </span>
                <span className="text-base sm:text-lg font-display font-bold text-brand-gold">
                  {selectedVariant.price} <span className="text-[9px] font-medium text-brand-cream">{getTranslation('currency_dh', lang)}</span>
                </span>
              </div>

              {/* Shipping Cost Line under price */}
              <div className="mt-1 text-[10px] font-sans flex items-center gap-1">
                {product.shippingCost && product.shippingCost > 0 ? (
                  <span className="text-brand-cream/90 flex items-center gap-0.5">
                    <Truck size={10} className="text-brand-gold shrink-0" />
                    <span className="text-brand-stone">{getTranslation('product_shipping_prefix', lang)}</span>
                    <strong className="text-brand-gold font-bold">{product.shippingCost} {getTranslation('currency_dh', lang)}</strong>
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-0.5 font-bold">
                    <Truck size={10} className="text-emerald-400 shrink-0" />
                    <span>{getTranslation('product_shipping_prefix', lang)}</span>
                    <strong className="text-emerald-400 font-bold">{getTranslation('product_free_shipping_short', lang)}</strong>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Add to Cart button */}
              {selectedVariant.stock !== 0 && (
                <button
                  id={`add-to-cart-${product.id}`}
                  onClick={() => handleAddToCartClick(product, selectedVarId)}
                  className="p-2.5 rounded-xs border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 text-brand-gold transition-all duration-300 cursor-pointer flex items-center justify-center"
                  title={getTranslation('product_add_to_cart', lang)}
                >
                  <ShoppingCart size={13} />
                </button>
              )}

              {/* Order Now button */}
              <button
                id={`order-btn-${product.id}`}
                disabled={selectedVariant.stock === 0}
                onClick={() => onOrderProduct(product.id, selectedVarId)}
                className={`font-sans font-bold text-[10px] px-3.5 py-2.5 rounded-xs transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  selectedVariant.stock === 0
                    ? 'bg-brand-black-soft text-brand-stone border border-brand-stone/30 cursor-not-allowed opacity-50'
                    : 'btn-primary'
                }`}
              >
                <ShoppingBag size={11} />
                <span>{selectedVariant.stock === 0 ? getTranslation('product_out_of_stock', lang) : getTranslation('product_order_now', lang)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="home-view" className="relative font-sans text-brand-cream bg-brand-black">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.honeycombAmbiance}
            alt="Tassila Bio Hero"
            className="w-full h-full object-cover scale-105 animate-subtle-zoom"
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/40 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            {/* Elegant luxury top line */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-brand-gold/60" />
              <span className="text-xs sm:text-sm text-brand-gold uppercase tracking-widest font-sans font-medium">
                {getTranslation('hero_ribbon', lang)}
              </span>
              <span className="w-12 h-[1px] bg-brand-gold/60" />
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-brand-cream leading-tight">
              {getTranslation('hero_title_1', lang)} <br />
              <span className="text-brand-gold">{getTranslation('hero_title_2', lang)}</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-brand-stone font-light leading-relaxed">
              {getTranslation('hero_desc', lang)}
            </p>

            <div className={`pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 ${isRtl ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
              <button
                id="hero-products-cta"
                onClick={scrollToProducts}
                className="w-full sm:w-auto btn-primary px-8 py-3.5 text-xs font-bold"
              >
                {getTranslation('hero_cta_browse', lang)}
              </button>
              <button
                id="hero-about-cta"
                onClick={() => setView('about')}
                className="w-full sm:w-auto btn-secondary px-8 py-3.5 text-xs font-semibold"
              >
                {getTranslation('hero_cta_story', lang)}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative thin bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent z-20" />
      </section>

      {/* 2. TRUST BAR / BADGES */}
      <section id="trust-bar" className="bg-brand-black-soft py-10 relative z-20 border-b border-brand-gold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-sm hover:bg-brand-black/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center mb-3 bg-brand-black text-brand-gold group-hover:border-brand-gold transition-colors">
                  <badge.icon size={20} className="group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-display text-sm font-bold text-brand-cream mb-1">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-brand-stone">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS CATALOG SECTION */}
      <section id="products-section" className="py-20 bg-brand-black relative">
        {/* Main Section Intro */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-brand-gold font-sans tracking-widest uppercase font-medium">
            {getTranslation('catalog_subtitle', lang)}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-brand-cream mt-2 mb-4">
            {getTranslation('catalog_title', lang)}
          </h2>
          <div className="gold-divider-sm my-4" />
          <p className="text-xs sm:text-sm text-brand-stone leading-relaxed max-w-2xl mx-auto">
            {getTranslation('catalog_desc', lang)}
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="bg-[#0B0F0A] border border-brand-gold/5 rounded-xs flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-pulse"
                >
                  {/* Media Block Skeleton */}
                  <div className="relative aspect-square bg-brand-black-soft/50 border-b border-brand-gold/5 flex-shrink-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-brand-gold/10 flex items-center justify-center bg-brand-black text-brand-gold/20">
                      <Sparkles size={24} className="animate-pulse" />
                    </div>
                  </div>

                  {/* Detail Block Skeleton */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-5 bg-brand-gold/10 rounded-xs w-2/3" />
                      <div className="space-y-2">
                        <div className="h-3 bg-brand-gold/5 rounded-xs w-full" />
                        <div className="h-3 bg-brand-gold/5 rounded-xs w-2/3" />
                      </div>
                      <div className="pt-2">
                        <div className="h-6 bg-brand-gold/5 rounded-xs w-1/3" />
                      </div>
                    </div>

                    {/* Footer Block Skeleton */}
                    <div className="pt-4 mt-4 border-t border-brand-gold/5 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="h-2 bg-brand-gold/5 rounded-xs w-10" />
                        <div className="h-4 bg-brand-gold/10 rounded-xs w-16" />
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-xs bg-brand-gold/5" />
                        <div className="w-20 h-8 rounded-xs bg-brand-gold/10" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="border border-brand-gold/20 bg-brand-black-soft/30 p-12 text-center rounded-sm shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-full border border-brand-gold/20 flex items-center justify-center bg-brand-black text-brand-gold/70">
                <Sparkles size={32} className="animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-gold">
                  {getTranslation('store_empty', lang)}
                </h3>
                <p className="text-xs sm:text-sm text-brand-stone max-w-md mx-auto">
                  {lang === 'ar' 
                    ? 'نعمل حالياً على جلب أجود المنتجات الطبيعية الفاخرة إليكم. يرجى مراجعة المتجر في وقت لاحق.'
                    : lang === 'fr'
                    ? 'Nous travaillons actuellement à vous proposer les meilleurs produits naturels de luxe. Veuillez revenir plus tard.'
                    : 'We are currently working on bringing the finest luxury natural products to you. Please check back later.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Sticky Sub-Navigation */}
            <div className="sticky top-[72px] sm:top-[79px] z-30 bg-brand-black border-y border-brand-gold/15 py-3 shadow-lg my-12">
              <div className={`max-w-7xl mx-auto px-4 flex items-center justify-center gap-1.5 sm:gap-4 text-xs sm:text-sm font-display font-bold ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <button
                  onClick={() => {
                    setActiveCategory('amlou');
                    document.getElementById('cat-amlou')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`transition-all duration-300 cursor-pointer px-3 py-1.5 rounded-xs border text-[11px] sm:text-xs ${
                    activeCategory === 'amlou'
                      ? 'bg-brand-gold text-brand-black border-brand-gold shadow-[0_2px_15px_rgba(178,138,48,0.25)] font-black scale-105'
                      : 'text-brand-cream hover:text-brand-gold bg-brand-black-soft/50 border-brand-gold/10 hover:border-brand-gold/30'
                  }`}
                >
                  {getTranslation('nav_amlou', lang)}
                </button>
                <span className="text-brand-gold/25 select-none">•</span>
                <button
                  onClick={() => {
                    setActiveCategory('argan');
                    document.getElementById('cat-argan')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`transition-all duration-300 cursor-pointer px-3 py-1.5 rounded-xs border text-[11px] sm:text-xs ${
                    activeCategory === 'argan'
                      ? 'bg-brand-gold text-brand-black border-brand-gold shadow-[0_2px_15px_rgba(178,138,48,0.25)] font-black scale-105'
                      : 'text-brand-cream hover:text-brand-gold bg-brand-black-soft/50 border-brand-gold/10 hover:border-brand-gold/30'
                  }`}
                >
                  {getTranslation('nav_argan', lang)}
                </button>
                <span className="text-brand-gold/25 select-none">•</span>
                <button
                  onClick={() => {
                    setActiveCategory('honey');
                    document.getElementById('cat-honey')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`transition-all duration-300 cursor-pointer px-3 py-1.5 rounded-xs border text-[11px] sm:text-xs ${
                    activeCategory === 'honey'
                      ? 'bg-brand-gold text-brand-black border-brand-gold shadow-[0_2px_15px_rgba(178,138,48,0.25)] font-black scale-105'
                      : 'text-brand-cream hover:text-brand-gold bg-brand-black-soft/50 border-brand-gold/10 hover:border-brand-gold/30'
                  }`}
                >
                  {getTranslation('nav_honey', lang)}
                </button>
                <span className="text-brand-gold/25 select-none">•</span>
                <button
                  onClick={() => {
                    setActiveCategory('bundles');
                    document.getElementById('cat-bundles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`transition-all duration-300 cursor-pointer px-3 py-1.5 rounded-xs border text-[11px] sm:text-xs ${
                    activeCategory === 'bundles'
                      ? 'bg-brand-gold text-brand-black border-brand-gold shadow-[0_2px_15px_rgba(178,138,48,0.25)] font-black scale-105'
                      : 'text-brand-cream hover:text-brand-gold bg-brand-black-soft/50 border-brand-gold/10 hover:border-brand-gold/30'
                  }`}
                >
                  {getTranslation('nav_bundles', lang)}
                </button>
              </div>
            </div>

            {/* Categories Stack */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

              {/* ================= CATEGORY 1: AMLOU ================= */}
              <div id="cat-amlou" className="scroll-mt-32 space-y-8 scroll-optimized-section">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-11 h-11 rounded-full border border-brand-gold/20 flex items-center justify-center bg-brand-black-soft text-brand-gold">
                    <Flame size={20} className="animate-pulse text-amber-500" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-gold">{getTranslation('nav_amlou', lang)}</h3>
                  <p className="text-xs text-brand-stone max-w-xl text-center">
                    {getTranslation('desc_amlou', lang)}
                  </p>
                  <div className="w-12 h-[1px] bg-brand-gold/30" />
                </div>

                {amlouProducts.length === 0 ? (
                  <div className="border border-brand-gold/10 bg-[#0B0F0A] p-12 text-center rounded-xs max-w-md mx-auto">
                    <p className="text-sm text-brand-stone font-display font-medium">{getTranslation('category_empty', lang)}</p>
                  </div>
                ) : (
                  <div className={`grid grid-cols-1 ${amlouProducts.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-sm mx-auto'} gap-8`}>
                    {amlouProducts.map(renderProductCard)}
                  </div>
                )}
                <div className="border-b border-brand-gold/15 pt-12" />
              </div>

              {/* ================= CATEGORY 2: ARGAN OIL ================= */}
              <div id="cat-argan" className="scroll-mt-32 space-y-8 scroll-optimized-section">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-11 h-11 rounded-full border border-brand-gold/20 flex items-center justify-center bg-brand-black-soft text-brand-gold">
                    <Droplets size={20} className="text-yellow-600 animate-pulse" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-gold">{getTranslation('nav_argan', lang)}</h3>
                  <p className="text-xs text-brand-stone max-w-xl text-center">
                    {getTranslation('desc_argan', lang)}
                  </p>
                  <div className="w-12 h-[1px] bg-brand-gold/30" />
                </div>

                {arganProducts.length === 0 ? (
                  <div className="border border-brand-gold/10 bg-[#0B0F0A] p-12 text-center rounded-xs max-w-md mx-auto">
                    <p className="text-sm text-brand-stone font-display font-medium">{getTranslation('category_empty', lang)}</p>
                  </div>
                ) : (
                  <div className={`grid grid-cols-1 ${arganProducts.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto' : 'max-w-sm mx-auto'} gap-8`}>
                    {arganProducts.map(renderProductCard)}
                  </div>
                )}
                <div className="border-b border-brand-gold/15 pt-12" />
              </div>

              {/* ================= CATEGORY 3: HONEY ================= */}
              <div id="cat-honey" className="scroll-mt-32 space-y-8 scroll-optimized-section">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-11 h-11 rounded-full border border-brand-gold/20 flex items-center justify-center bg-brand-black-soft text-brand-gold">
                    <Award size={20} className="text-yellow-500 animate-pulse" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-gold">{getTranslation('nav_honey', lang)}</h3>
                  <p className="text-xs text-brand-stone max-w-xl text-center">
                    {getTranslation('desc_honey', lang)}
                  </p>
                  <div className="w-12 h-[1px] bg-brand-gold/30" />
                </div>

                {honeyProducts.length === 0 ? (
                  <div className="border border-brand-gold/10 bg-[#0B0F0A] p-12 text-center rounded-xs max-w-md mx-auto">
                    <p className="text-sm text-brand-stone font-display font-medium">{getTranslation('category_empty', lang)}</p>
                  </div>
                ) : (
                  <div className={`grid grid-cols-1 ${honeyProducts.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto' : 'max-w-sm mx-auto'} gap-8`}>
                    {honeyProducts.map(renderProductCard)}
                  </div>
                )}
                <div className="border-b border-brand-gold/15 pt-12" />
              </div>

              {/* ================= CATEGORY 4: BUNDLES ================= */}
              <div id="cat-bundles" className="scroll-mt-32 space-y-8 scroll-optimized-section">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-11 h-11 rounded-full border border-brand-gold/20 flex items-center justify-center bg-[#000] text-brand-gold">
                    <Gift size={20} className="text-brand-gold animate-bounce" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-gold">{getTranslation('nav_bundles', lang)}</h3>
                  <p className="text-xs text-brand-stone max-w-xl text-center">
                    {getTranslation('desc_bundles', lang)}
                  </p>
                  <div className="w-12 h-[1px] bg-brand-gold/30" />
                </div>

                {bundleProducts.length === 0 ? (
                  <div className="border border-brand-gold/10 bg-[#0B0F0A] p-12 text-center rounded-xs max-w-md mx-auto">
                    <p className="text-sm text-brand-stone font-display font-medium">{getTranslation('category_empty', lang)}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bundleProducts.map(renderProductCard)}
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </section>

      {/* 4. OUR STORY TEASER */}
      <section id="story-teaser" className="py-24 bg-brand-black-soft relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-brand-olive/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Block */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-sm overflow-hidden border border-brand-gold/15 p-2 bg-brand-black">
                <img
                  src={ASSETS.naturalProduction}
                  alt="Tassila Bio Quality"
                  className="w-full h-[400px] object-cover rounded-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-black/20" />
              </div>
              
              <div className={`absolute -bottom-6 ${isRtl ? '-right-6' : '-left-6'} bg-brand-black border border-brand-gold/20 p-4 rounded-sm shadow-xl max-w-[200px] hidden sm:block`}>
                <p className="font-display text-3xl font-bold text-brand-gold leading-none">100٪</p>
                <p className="text-[10px] text-brand-stone font-sans mt-1">
                  {isRtl ? 'إنتاج بلدي يدوي غير معالج كيميائياً' : 'Homemade pure local organic production'}
                </p>
              </div>
            </div>

            {/* Copy Block */}
            <div className={`lg:col-span-7 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="text-xs text-brand-gold font-sans tracking-widest uppercase font-medium">
                {getTranslation('story_teaser_subtitle', lang)}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-brand-cream leading-tight">
                {getTranslation('story_teaser_title', lang)}
              </h2>
              <div className={`w-16 h-[1px] bg-brand-gold ${isRtl ? 'ml-auto' : 'mr-auto'}`} />
              <p className="text-xs sm:text-sm text-brand-stone leading-relaxed">
                {getTranslation('story_teaser_desc_1', lang)}
              </p>
              <p className="text-xs sm:text-sm text-brand-stone leading-relaxed">
                {getTranslation('story_teaser_desc_2', lang)}
              </p>

              <div className="pt-4">
                <button
                  id="teaser-about-btn"
                  onClick={() => setView('about')}
                  className={`inline-flex items-center gap-2 hover:gap-3 text-brand-gold hover:text-brand-gold/80 transition-all font-sans font-semibold text-xs cursor-pointer ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <span>{getTranslation('story_teaser_cta', lang)}</span>
                  <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global In-App Visual Toast Feedback Overlay */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 ${isRtl ? 'right-6' : 'left-6'} z-50 bg-[#0E150C] border border-emerald-500/30 text-brand-cream px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3 max-w-sm`}
          >
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-bold leading-relaxed">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
