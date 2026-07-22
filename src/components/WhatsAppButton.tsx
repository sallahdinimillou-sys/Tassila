import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export default function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Show tooltip after a small delay on load to catch attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Auto-hide after 5 seconds to keep it tidy
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!phoneNumber || phoneNumber.trim() === '') return null;

  // Clean the phone number (remove spaces, plus sign, etc.)
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (!cleanNumber) return null;

  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  return (
    <div id="whatsapp-floating-container" className="fixed bottom-6 left-6 z-50 flex items-center gap-3 select-none">
      
      {/* Glow Rings (Radar Wave) around the button */}
      {!reducedMotion && (
        <div className="absolute inset-0 rounded-full pointer-events-none flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-[#F2C230]/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-20 h-20 rounded-full bg-[#F2C230]/10 animate-ping" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id="whatsapp-tooltip"
            initial={{ opacity: 0, scale: 0.85, x: -15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -15 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-brand-black-soft border border-brand-gold/30 text-brand-cream text-xs px-4 py-2.5 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-sans relative flex flex-col items-end gap-0.5"
            dir="rtl"
          >
            {/* Cute mini arrow on the right pointing to the button */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-black-soft border-b border-l border-brand-gold/30 rotate-45" />
            <span className="font-bold text-brand-gold text-[13px] tracking-wide">تواصل معنا الآن</span>
            <span className="text-[10px] text-brand-stone font-medium">للطلب السريع والاستفسار المباشر</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glowing Button */}
      <motion.a
        id="whatsapp-floating-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#C9A445] via-[#F2C230] to-[#FFF2CC] text-brand-black flex items-center justify-center shadow-[0_0_20px_rgba(242,194,48,0.6)] focus:outline-none border-2 border-white/40 cursor-pointer"
        animate={reducedMotion ? {} : {
          boxShadow: [
            "0 0 15px rgba(242,194,48,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
            "0 0 35px rgba(242,194,48,0.95), inset 0 2px 4px rgba(255,255,255,0.4)",
            "0 0 15px rgba(242,194,48,0.4), inset 0 2px 4px rgba(255,255,255,0.4)"
          ],
          y: [0, -4, 0]
        }}
        transition={{
          boxShadow: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={reducedMotion ? {} : { 
          scale: 1.12, 
          boxShadow: "0 0 40px rgba(242,194,48,1), inset 0 3px 6px rgba(255,255,255,0.6)"
        }}
        whileTap={reducedMotion ? {} : { scale: 0.92 }}
      >
        {/* Subtle radial inner glow highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        
        {/* Official WhatsApp SVG Vector Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 sm:w-9 sm:h-9 fill-brand-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
        >
          <path d="M12.003 21.003c-1.63 0-3.22-.42-4.63-1.21l-.33-.19-3.44.9 1.15-3.15-.22-.35c-.87-1.39-1.33-3-1.33-4.66 0-4.96 4.04-9 9-9 2.42 0 4.7 1 6.42 2.71 1.71 1.72 2.66 4 2.66 6.41 0 4.96-4.04 9-9 9zm8.56-14.99C18.43 4.08 15.34 3 12.003 3c-5.23 0-9.48 4.25-9.48 9.48 0 1.67.43 3.3 1.28 4.74L2.52 21.5l4.37-1.12c1.39.75 2.94 1.15 4.54 1.15h.01c5.23 0 9.49-4.25 9.49-9.48 0-2.53-.99-4.91-2.78-6.71L20.56 6.01zm-4.73 7.03c-.27-.14-1.62-.8-1.87-.89-.25-.09-.44-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.62-1.51-.85-2.07-.23-.55-.47-.48-.65-.49-.16 0-.35-.01-.54-.01-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44s1.05 2.82 1.2 3.01c.15.19 2.07 3.16 5.01 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.11.56-.08 1.72-.7 1.96-1.38.24-.67.24-1.25.17-1.37-.07-.13-.26-.2-.53-.33z" />
        </svg>
      </motion.a>
    </div>
  );
}
