import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Award, ShieldCheck, Flame, Users, Calendar, Trees } from 'lucide-react';
import { GALLERY_PHOTOS, ASSETS } from '../data';
import { getTranslation, Language } from '../translations';

interface AboutViewProps {
  lang: Language;
}

export default function AboutView({ lang }: AboutViewProps) {
  const isRtl = lang === 'ar';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="text-brand-gold animate-pulse" size={20} />;
      case 'Heart': return <Heart className="text-brand-gold" size={20} />;
      case 'Award': return <Award className="text-brand-gold" size={20} />;
      case 'Flame': return <Flame className="text-brand-gold" size={20} />;
      default: return <Sparkles className="text-brand-gold" size={20} />;
    }
  };

  const translatedValues = [
    { title: getTranslation('about_val_1_title', lang), description: getTranslation('about_val_1_desc', lang), icon: 'Sparkles' },
    { title: getTranslation('about_val_2_title', lang), description: getTranslation('about_val_2_desc', lang), icon: 'Heart' },
    { title: getTranslation('about_val_3_title', lang), description: getTranslation('about_val_3_desc', lang), icon: 'Award' },
    { title: getTranslation('about_val_4_title', lang), description: getTranslation('about_val_4_desc', lang), icon: 'Flame' },
  ];

  return (
    <div id="about-view" className="bg-brand-black text-brand-cream min-h-screen pt-24 pb-20">
      
      {/* 1. TOP HERO BANNER */}
      <section id="about-hero" className="relative h-80 flex items-center justify-center overflow-hidden border-b border-brand-gold/10">
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.olivesAmbiance}
            alt="Tassila Bio Story"
            className="w-full h-full object-cover scale-105 transition-transform duration-[4s]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = '/images/olives_ambiance_1783872823882.jpg';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/40 z-10" />
        </div>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <span className="text-xs text-brand-gold font-sans tracking-widest uppercase font-medium">
            {getTranslation('about_hero_subtitle', lang)}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-brand-gold mt-1">
            {getTranslation('about_hero_title', lang)}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-brand-stone font-light max-w-xl mx-auto leading-relaxed">
            {getTranslation('about_hero_desc', lang)}
          </p>
          <div className="gold-divider-sm mt-4" />
        </div>
      </section>

      {/* 2. STORY / BRAND STATEMENT */}
      <section id="about-story" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'text-right' : 'text-left'}`}>
          
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`flex items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <span className="w-8 h-[1px] bg-brand-gold" />
              <span className="text-xs text-brand-gold font-sans uppercase tracking-widest font-semibold">
                {getTranslation('about_story_ribbon', lang)}
              </span>
            </div>
            
            <h2 className="font-display text-xl sm:text-3xl font-bold text-brand-cream leading-tight">
              {getTranslation('about_story_title', lang)}
            </h2>
            
            <p className="text-xs sm:text-sm text-brand-stone leading-relaxed">
              {getTranslation('about_story_desc_1', lang)}
            </p>

            <p className="text-xs sm:text-sm text-brand-stone leading-relaxed">
              {getTranslation('about_story_desc_2', lang)}
            </p>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4`}>
              <div className={`flex items-center gap-3 p-3 rounded-sm bg-brand-black-soft border border-brand-gold/5 ${isRtl ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}>
                <span className="text-xs text-brand-cream font-medium">
                  {lang === 'ar' ? 'علاقة مباشرة مع 12+ تعاونية نسائية' : lang === 'fr' ? 'Relation directe avec 12+ coopératives de femmes' : 'Direct relationship with 12+ women cooperatives'}
                </span>
                <Users size={18} className="text-brand-gold" />
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-sm bg-brand-black-soft border border-brand-gold/5 ${isRtl ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}>
                <span className="text-xs text-brand-cream font-medium">
                  {lang === 'ar' ? 'دعم الأسر الريفية وحماية أشجار الأركان' : lang === 'fr' ? 'Soutien des familles rurales & protection de l\'arganier' : 'Supporting rural families & protecting argan trees'}
                </span>
                <Trees size={18} className="text-brand-gold" />
              </div>
            </div>
          </div>

          {/* Large Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-brand-gold/15 p-2 bg-brand-black">
              <img
                src={ASSETS.amlouJarStory}
                alt="Tassila Bio Amlou"
                className="w-full h-[400px] object-cover rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = '/images/amlou_jar_story_1784123762869.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-brand-black/20" />
            </div>
            {/* Stamp decoration */}
            <div className={`absolute -top-4 ${isRtl ? '-left-4' : '-right-4'} w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-black text-brand-gold rotate-12 shadow-2xl`}>
              <span className="font-display text-[9px] font-bold tracking-widest text-center leading-tight">
                {lang === 'ar' ? 'أمانة يدوية 100٪' : lang === 'fr' ? 'Artisanal 100%' : '100% Homemade'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VALUES GRID */}
      <section id="about-values" className="py-20 bg-brand-black-soft border-t border-b border-brand-gold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-brand-gold font-sans tracking-widest uppercase font-semibold">
              {getTranslation('about_values_ribbon', lang)}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 text-brand-cream">
              {getTranslation('about_values_title', lang)}
            </h2>
            <div className="gold-divider-sm my-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {translatedValues.map((value, index) => (
              <div
                id={`about-value-item-${index}`}
                key={index}
                className={`bg-brand-black border border-brand-gold/10 hover:border-brand-gold/35 p-6 rounded-sm transition-all duration-300 group hover:-translate-y-1 ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className={`w-11 h-11 rounded-full border border-brand-gold/20 flex items-center justify-center mb-4 bg-brand-black-soft ${isRtl ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
                  {getIcon(value.icon)}
                </div>
                <h3 className="font-display text-lg font-bold text-brand-cream group-hover:text-brand-gold transition-colors mb-2">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-stone leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PHOTO GALLERY */}
      <section id="about-gallery" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-brand-gold font-sans tracking-widest uppercase font-semibold">
            {getTranslation('about_gallery_ribbon', lang)}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 text-brand-cream">
            {getTranslation('about_gallery_title', lang)}
          </h2>
          <div className="gold-divider-sm my-4" />
          <p className="text-xs text-brand-stone leading-relaxed max-w-xl mx-auto">
            {getTranslation('about_gallery_desc', lang)}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              id={`gallery-photo-container-${index}`}
              key={index}
              className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-brand-gold/10 hover:border-brand-gold/45 bg-brand-black-soft transition-all duration-300 group cursor-pointer shadow-md"
            >
              <img
                src={photo}
                alt={`Tassila Bio Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = ASSETS.amlouJar;
                  }
                }}
              />
              <div className="absolute inset-4 border border-brand-gold/0 group-hover:border-brand-gold/30 transition-all duration-300 pointer-events-none" />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
