import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, ShieldAlert, Home, Sparkles, MessageSquare, Instagram, Facebook, ShoppingCart, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, SiteSettings } from '../types';
import { ASSETS } from '../data';
import { getTranslation, Language } from '../translations';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  settings?: SiteSettings;
  lang: Language;
  setLang: (lang: Language) => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({
  currentView,
  setView,
  settings,
  lang,
  setLang,
  cartCount,
  onCartClick
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  const announcements = [
    { text: getTranslation('announcement_1', lang), icon: '🚚' },
    { text: getTranslation('announcement_2', lang), icon: '🌿' },
    { text: getTranslation('announcement_3', lang), icon: '✨' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [lang]);

  const navItems = [
    { label: getTranslation('nav_home', lang), view: 'home' as ViewType, icon: Home },
    { label: getTranslation('nav_about', lang), view: 'about' as ViewType, icon: Sparkles },
    { label: getTranslation('nav_contact', lang), view: 'nav_contact', icon: MessageSquare }, // Changed from 'contact' to 'nav_contact' to translate separately if needed, but redirects to contact
    { label: getTranslation('nav_admin', lang), view: 'admin' as ViewType, icon: ShieldAlert },
  ];

  const handleNavClick = (view: string) => {
    if (view === 'nav_contact') {
      setView('contact');
    } else {
      setView(view as ViewType);
    }
  };

  const isRtl = lang === 'ar';

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-500"
    >
      {/* 1. PREMIUM PROMOTIONAL ANNOUNCEMENT BAR */}
      <div 
        className={`bg-gradient-to-r from-[#0C0A06] via-[#1F190F] to-[#0C0A06] border-b border-brand-gold/15 text-brand-gold font-sans tracking-wide transition-all duration-500 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 border-none' : 'max-h-12 py-2.5 opacity-100'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[10px] sm:text-xs ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="hidden sm:flex items-center gap-2.5 text-brand-stone text-[10px]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-emerald-400">
                {isRtl ? 'مستعدون لتلقي الطلبيات' : 'Ready for orders'}
              </span>
            </span>
          </div>
          
          <div className="mx-auto sm:mx-0 relative h-5 w-full max-w-[340px] sm:max-w-md overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={announcementIdx}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute flex items-center justify-center gap-2 text-center text-brand-gold font-medium w-full"
              >
                <span>{announcements[announcementIdx].icon}</span>
                <span className="font-sans text-[11px] sm:text-xs">{announcements[announcementIdx].text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center gap-4 text-brand-gold font-bold font-sans">
            <span className="flex items-center gap-1 text-[10px] tracking-widest text-brand-gold">
              {isRtl ? '🌿 طبيعي ونقي 100%' : '🌿 100% Pure & Natural'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div
        className={`transition-all duration-500 w-full ${
          isScrolled
            ? 'px-4 sm:px-6 lg:px-8 mt-3 sm:mt-4'
            : 'px-0 mt-0'
        }`}
      >
        <div
          className={`transition-all duration-500 max-w-7xl mx-auto ${
            isScrolled
              ? 'bg-brand-black/97 border border-brand-gold/25 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.85)] backdrop-blur-md py-1 px-5 sm:px-7'
              : 'bg-gradient-to-b from-brand-black/95 via-brand-black/70 to-transparent py-4 px-4 sm:px-8 border-b border-white/[0.03]'
          }`}
        >
          <div className={`flex items-center justify-between h-16 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            
            {/* Logo and Wordmark */}
            <button
              id="header-logo-btn"
              onClick={() => {
                setView('home');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 focus:outline-none group cursor-pointer text-right"
            >
              <div className={`relative rounded-full overflow-hidden border border-brand-gold/30 p-0.5 bg-brand-black-soft transition-all duration-500 group-hover:scale-105 group-hover:border-brand-gold/80 shadow-[0_0_15px_rgba(201,164,69,0.15)] group-hover:shadow-[0_0_22px_rgba(201,164,69,0.3)] ${
                isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              }`}>
                <img
                  src={ASSETS.logo}
                  alt="Tassila Bio"
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:rotate-[8deg]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = '/images/logo_tassila_1783872761746.jpg';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-display text-lg sm:text-2xl font-bold tracking-wide leading-none transition-all duration-300 bg-gradient-to-l from-brand-gold via-[#F3D078] to-brand-cream bg-clip-text text-transparent group-hover:brightness-110">
                  {getTranslation('brand_title', lang)}
                </span>
                <span className="text-[9px] sm:text-[10px] text-brand-stone font-sans tracking-widest uppercase mt-1 flex items-center gap-1 transition-all duration-300 group-hover:text-brand-cream">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  {getTranslation('brand_subtitle', lang)}
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav 
              id="desktop-nav" 
              className={`hidden md:flex items-center gap-1.5 bg-brand-black-soft/90 border border-brand-gold/15 rounded-full p-1.5 shadow-[inset_0_0_12px_rgba(201,164,69,0.03)] ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, index) => {
                const isActive = currentView === item.view || (item.view === 'nav_contact' && currentView === 'contact');
                return (
                  <button
                    id={`desktop-nav-${item.view}`}
                    key={item.view}
                    onClick={() => handleNavClick(item.view)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`flex items-center gap-2 text-xs lg:text-sm font-sans font-medium transition-all duration-300 cursor-pointer relative py-2 px-4 rounded-full z-10 ${
                      isActive
                        ? 'text-brand-black font-bold'
                        : 'text-brand-cream hover:text-brand-gold'
                    }`}
                  >
                    {/* Hover Pill Background Indicator */}
                    {hoveredIndex === index && !isActive && (
                      <motion.div
                        layoutId="hoveredNavBackground"
                        className="absolute inset-0 bg-brand-gold/10 rounded-full -z-10 border border-brand-gold/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Active Tab Spring Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-gradient-to-r from-brand-gold to-[#D4AF37] rounded-full -z-10 shadow-[0_4px_14px_rgba(201,164,69,0.4)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <item.icon size={13} className={isActive ? 'text-brand-black' : 'text-brand-stone group-hover:text-brand-gold transition-colors'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Action, Language Selector, Cart Icon & Socials */}
            <div className={`hidden md:flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Language Picker */}
              <div className="flex items-center gap-1 border border-brand-gold/15 bg-brand-black-soft/40 px-1.5 py-0.5 rounded-full text-[9px] font-sans font-bold">
                <Globe size={11} className="text-brand-stone ml-1" />
                {(['ar', 'fr', 'en'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-1.5 py-0.5 rounded-full transition-all duration-300 cursor-pointer ${
                      lang === l
                        ? 'bg-brand-gold text-brand-black font-bold'
                        : 'text-brand-stone hover:text-brand-cream'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Shopping Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2.5 text-brand-stone hover:text-brand-gold bg-brand-black-soft/90 border border-brand-gold/10 hover:border-brand-gold/30 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center shadow-sm"
                title={getTranslation('cart_title', lang)}
              >
                <ShoppingCart size={15} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-brand-black text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-pulse font-sans">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className={`flex items-center gap-3 border-brand-gold/15 ${isRtl ? 'border-l pl-4 ml-1' : 'border-r pr-4 mr-1'}`}>
                {settings?.instagramLink && (
                  <a
                    href={settings.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-brand-black-soft/90 border border-brand-gold/10 flex items-center justify-center text-brand-stone hover:text-brand-gold hover:border-brand-gold/40 hover:scale-110 transition-all duration-300 shadow-sm"
                    title="Instagram"
                  >
                    <Instagram size={14} />
                  </a>
                )}
                {settings?.facebookLink && (
                  <a
                    href={settings.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-brand-black-soft/90 border border-brand-gold/10 flex items-center justify-center text-brand-stone hover:text-brand-gold hover:border-brand-gold/40 hover:scale-110 transition-all duration-300 shadow-sm"
                    title="Facebook"
                  >
                    <Facebook size={14} />
                  </a>
                )}
              </div>

              <button
                id="desktop-cta-btn"
                onClick={() => setView('contact')}
                className="relative group overflow-hidden px-5 py-2.5 bg-gradient-to-l from-brand-gold to-[#D4AF37] hover:from-[#E6C24A] hover:to-brand-gold text-brand-black rounded-full text-xs font-bold cursor-pointer flex items-center gap-2 shadow-[0_4px_15px_rgba(201,164,69,0.25)] hover:shadow-[0_4px_22px_rgba(201,164,69,0.45)] transition-all duration-300"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <Mail size={14} className="group-hover:scale-110 transition-transform duration-300" />
                <span>{getTranslation('nav_contact', lang)}</span>
              </button>
            </div>

            {/* Mobile Actions: Language Selector, Cart Icon, Drawer Toggle */}
            <div className={`md:hidden flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Mobile Cart Trigger */}
              <button
                onClick={onCartClick}
                className="relative p-2.5 text-brand-stone hover:text-brand-gold bg-brand-black-soft/90 border border-brand-gold/10 rounded-full cursor-pointer flex items-center justify-center shadow-md"
              >
                <ShoppingCart size={15} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse font-sans">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`text-brand-cream hover:text-brand-gold p-2.5 cursor-pointer focus:outline-none bg-brand-black-soft border rounded-full transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${
                  isMobileMenuOpen ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-brand-gold/15'
                }`}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`md:hidden absolute top-full left-4 right-4 bg-[#0F0D0A]/98 border border-brand-gold/25 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95)] overflow-hidden z-50 mt-2 ${isRtl ? 'text-right' : 'text-left'}`}
          >
            <div className="px-5 pt-4 pb-6 space-y-4">
              <div className={`flex items-center justify-between pb-2 border-b border-brand-gold/15 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="block text-[10px] text-brand-stone uppercase tracking-widest font-sans font-bold">
                  {getTranslation('drawer_title', lang)}
                </span>

                {/* Mobile Language Chooser */}
                <div className="flex items-center gap-1 border border-brand-gold/10 bg-[#080604] px-1.5 py-0.5 rounded-full text-[9px] font-sans font-bold">
                  {(['ar', 'fr', 'en'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-1.5 py-0.5 rounded-full transition-all duration-300 cursor-pointer ${
                        lang === l
                          ? 'bg-brand-gold text-brand-black font-bold'
                          : 'text-brand-stone hover:text-brand-cream'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = currentView === item.view || (item.view === 'nav_contact' && currentView === 'contact');
                  return (
                    <button
                      id={`mobile-nav-${item.view}`}
                      key={item.view}
                      onClick={() => {
                        handleNavClick(item.view);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-xs font-sans font-medium transition-all duration-200 ${isRtl ? 'flex-row-reverse' : 'flex-row'} ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-gold/15 to-transparent text-brand-gold border-r-4 border-brand-gold font-bold shadow-[inset_0_0_12px_rgba(201,164,69,0.05)]'
                          : 'text-brand-cream hover:bg-brand-black-soft/50 hover:text-brand-gold'
                      }`}
                    >
                      <span className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                        <item.icon size={14} className={isActive ? 'text-brand-gold' : 'text-brand-stone'} />
                        <span>{item.label}</span>
                      </span>
                      {isActive && <span className="text-brand-gold text-[10px]">✦</span>}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-brand-gold/10 space-y-3">
                <button
                  id="mobile-cta-btn"
                  onClick={() => {
                    setView('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative group overflow-hidden w-full btn-primary py-3 text-center flex items-center justify-center gap-2 cursor-pointer font-bold rounded-lg text-xs"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  <Mail size={14} />
                  <span>{getTranslation('nav_contact', lang)}</span>
                </button>

                {/* Follow Us section */}
                <div className="flex flex-col items-center justify-center gap-2 pt-2 text-center">
                  <span className="text-[9px] text-brand-stone leading-relaxed font-sans max-w-[220px]">
                    {getTranslation('social_follow_us', lang)}
                  </span>
                  <div className="flex items-center gap-2.5">
                    {settings?.instagramLink && (
                      <a
                        href={settings.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-brand-black-soft border border-brand-gold/10 flex items-center justify-center text-brand-stone hover:text-brand-gold hover:border-brand-gold/35 transition-colors"
                        title="Instagram"
                      >
                        <Instagram size={13} />
                      </a>
                    )}
                    {settings?.facebookLink && (
                      <a
                        href={settings.facebookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-brand-black-soft border border-brand-gold/10 flex items-center justify-center text-brand-stone hover:text-brand-gold hover:border-brand-gold/35 transition-colors"
                        title="Facebook"
                      >
                        <Facebook size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
