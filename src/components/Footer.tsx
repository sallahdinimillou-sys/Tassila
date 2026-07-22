import React from 'react';
import { Mail, Shield } from 'lucide-react';
import { ViewType, SiteSettings } from '../types';
import { ASSETS } from '../data';
import { getTranslation, Language } from '../translations';

interface FooterProps {
  setView: (view: ViewType) => void;
  settings?: SiteSettings;
  lang: Language;
}

export default function Footer({ setView, settings, lang }: FooterProps) {
  const isRtl = lang === 'ar';

  return (
    <footer id="main-footer" className="bg-brand-black-soft border-t border-brand-gold/10 pt-16 pb-8 text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 items-start pb-12 ${isRtl ? 'text-right' : 'text-left'}`}>
          
          {/* Column 1: Brand Info */}
          <div className={`flex flex-col items-center ${isRtl ? 'md:items-start text-center md:text-right' : 'md:items-end text-center md:text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <img
                src={ASSETS.logo}
                alt="Tassila Bio"
                className="w-11 h-11 object-cover rounded-full border border-brand-gold/20 p-0.5"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = '/images/logo_tassila_1783872761746.jpg';
                  }
                }}
              />
              <span className="font-display text-2xl font-bold text-brand-gold">
                {getTranslation('brand_title', lang)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-brand-stone max-w-sm leading-relaxed">
              {getTranslation('footer_desc', lang)}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-display text-base font-bold text-brand-gold mb-4 relative pb-2">
              {getTranslation('footer_links_title', lang)}
              <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-8 h-[1px] bg-brand-gold/40" />
            </h4>
            <ul className="space-y-3 text-center">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => setView('home')}
                  className="text-brand-cream hover:text-brand-gold transition-colors text-xs font-sans cursor-pointer"
                >
                  {getTranslation('nav_home', lang)}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => setView('about')}
                  className="text-brand-cream hover:text-brand-gold transition-colors text-xs font-sans cursor-pointer"
                >
                  {getTranslation('nav_about', lang)}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => setView('contact')}
                  className="text-brand-cream hover:text-brand-gold transition-colors text-xs font-sans cursor-pointer"
                >
                  {getTranslation('nav_contact', lang)}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div className={`flex flex-col items-center ${isRtl ? 'md:items-end text-center md:text-left' : 'md:items-start text-center md:text-right'}`}>
            <h4 className="font-display text-base font-bold text-brand-gold mb-4 relative pb-2">
              {getTranslation('footer_contact_title', lang)}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-8 h-[1px] bg-brand-gold/40" />
            </h4>
            <div className={`flex items-center gap-3 justify-center text-brand-cream ${isRtl ? 'md:justify-end flex-row' : 'md:justify-start flex-row-reverse'}`}>
              <span className="text-xs sm:text-sm font-sans select-all">Tassilabio26@gmail.com</span>
              <Mail size={16} className="text-brand-gold" />
            </div>
            <p className="text-xs text-brand-stone mt-4 max-w-xs leading-relaxed">
              {getTranslation('footer_contact_desc', lang)}
            </p>
          </div>

        </div>

        {/* Dynamic Social Icons Row */}
        {settings && (settings.instagramLink || settings.facebookLink || settings.tiktokLink) && (
          <div className="flex justify-center gap-6 pb-8">
            {settings.instagramLink && (
              <a
                href={settings.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            )}
            {settings.facebookLink && (
              <a
                href={settings.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
            )}
            {settings.tiktokLink && (
              <a
                href={settings.tiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 shadow-sm"
                aria-label="TikTok"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.18 1.12 1.25 2.7 2.06 4.36 2.27v3.74c-1.84-.04-3.62-.64-5.12-1.74-.18-.13-.35-.27-.51-.41-.06 2.3-.02 4.61-.04 6.91-.05 1.77-.52 3.52-1.45 5.01-1.42 2.19-3.79 3.73-6.4 4.01-2.28.22-4.63-.35-6.48-1.72-2.19-1.64-3.48-4.27-3.41-7.03.04-2.87 1.48-5.6 3.91-7.11 1.73-1.07 3.78-1.52 5.8-1.26v3.83c-1.12-.19-2.3.06-3.23.73-1.11.81-1.72 2.15-1.66 3.53.05 1.53.86 2.94 2.19 3.65.98.53 2.12.67 3.19.42 1.28-.3 2.37-1.23 2.82-2.45.24-.65.34-1.35.33-2.04.02-4.08-.01-8.16.01-12.24z"/>
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Traditional Ornamental Gold Line */}
        <div className="gold-divider mb-8" />

        {/* Bottom Bar: Copyright and Hidden Admin Link */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-stone ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
          <p className="font-sans text-center sm:text-right">
            &copy; {new Date().getFullYear()} Tassila Bio. {lang === 'ar' ? 'جميع الحقوق محفوظة. منتجات طبيعية فاخرة 100%.' : lang === 'fr' ? 'Tous droits réservés. Produits 100% naturels.' : 'All rights reserved. 100% Natural Luxury.'}
          </p>
          
          {/* Small de-emphasized Admin Dashboard link */}
          <button
            id="footer-nav-admin"
            onClick={() => setView('admin')}
            className={`flex items-center gap-1.5 hover:text-brand-gold transition-colors text-xs font-sans text-brand-stone/40 hover:text-brand-stone cursor-pointer group ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <Shield size={12} className="text-brand-stone/40 group-hover:text-brand-gold transition-colors" />
            <span>{getTranslation('nav_admin', lang)}</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
