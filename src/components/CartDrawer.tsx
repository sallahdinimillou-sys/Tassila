import React from 'react';
import { motion } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Lock } from 'lucide-react';
import { CartItem, Product, ViewType } from '../types';
import { ASSETS } from '../data';
import { getTranslation, translateProduct, Language } from '../translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: Product[];
  setView: (view: ViewType) => void;
  lang: Language;
  shippingCost: number;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  setCart,
  products,
  setView,
  lang
}: Omit<CartDrawerProps, 'shippingCost'>) {
  if (!isOpen) return null;

  const isRtl = lang === 'ar';

  // Get matching product details for cart items
  const cartDetails = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    return {
      ...item,
      product,
      variant
    };
  }).filter((item) => item.product && item.variant);

  // Totals calculations
  const subtotal = cartDetails.reduce((sum, item) => {
    return sum + (item.variant?.price || 0) * item.quantity;
  }, 0);

  const shippingCost = cartDetails.reduce((max, item) => {
    const itemShipping = item.product?.shippingCost ?? 0;
    return Math.max(max, itemShipping);
  }, 0);
  const total = subtotal + shippingCost;

  const updateQuantity = (productId: string, variantId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId === productId && item.variantId === variantId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => !(item.productId === productId && item.variantId === variantId));
    });
  };

  const handleCheckout = () => {
    onClose();
    setView('contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
      />

      {/* Drawer Container */}
      <div className={`absolute inset-y-0 ${isRtl ? 'left-0' : 'right-0'} max-w-full flex`}>
        <motion.div
          initial={{ x: isRtl ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: isRtl ? '-100%' : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#090D08] border-brand-gold/10 text-brand-cream shadow-2xl flex flex-col relative"
          style={{
            borderLeftWidth: isRtl ? '0px' : '1px',
            borderRightWidth: isRtl ? '1px' : '0px'
          }}
        >
          {/* Header Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold/10 via-brand-gold to-brand-gold/10 z-10" />

          {/* Drawer Header */}
          <div className="p-6 border-b border-brand-gold/10 flex items-center justify-between mt-1">
            <button
              onClick={onClose}
              className="text-brand-stone hover:text-brand-gold transition-colors p-1 rounded-sm hover:bg-brand-gold/5 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-lg font-bold text-brand-gold flex items-center gap-2">
              <span>{getTranslation('cart_title', lang)}</span>
              <ShoppingBag size={20} className="text-brand-gold" />
            </h3>
          </div>

          {/* Drawer Content */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {cartDetails.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold/50">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-brand-cream">
                    {getTranslation('cart_empty', lang)}
                  </p>
                  <p className="text-xs text-brand-stone max-w-xs mx-auto">
                    {getTranslation('cart_empty_cta', lang)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setView('home');
                  }}
                  className="px-5 py-2 text-xs font-bold text-brand-black bg-brand-gold rounded-xs hover:bg-[#cfa540] transition-colors cursor-pointer"
                >
                  {getTranslation('cart_continue_shopping', lang)}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartDetails.map((item) => {
                  const p = item.product!;
                  const v = item.variant!;
                  const { name } = translateProduct(p.id, p.name, p.description, lang);
                  const isBundle = p.category === 'bundles';
                  const sizeLabel = isBundle ? v.nameArabic : `${getTranslation('cart_item_price', lang)}: ${v.size}`;

                  return (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex items-center gap-4 bg-[#0D120C]/90 p-4 rounded-sm border border-brand-gold/5 hover:border-brand-gold/15 transition-all duration-300 relative group"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-xs overflow-hidden border border-brand-gold/10 bg-brand-black-soft flex-shrink-0">
                        <img
                          src={p.image}
                          alt={name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.fallback) {
                              target.dataset.fallback = 'true';
                              if (p.category === 'argan') target.src = ASSETS.arganBottle;
                              else if (p.category === 'honey') target.src = ASSETS.honeyJar;
                              else if (p.category === 'bundles') target.src = ASSETS.wovenBaskets;
                              else target.src = ASSETS.amlouJar;
                            }
                          }}
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-grow min-w-0 text-right flex flex-col justify-between h-full space-y-1.5">
                        <div className="text-right">
                          <h4 className="text-xs font-bold text-brand-cream truncate hover:text-brand-gold transition-colors">
                            {name}
                          </h4>
                          <span className="text-[10px] text-brand-stone block font-sans">
                            {sizeLabel}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs font-sans font-bold text-brand-gold mr-auto pl-1">
                            {v.price * item.quantity} <span className="text-[9px]">د.م</span>
                          </span>

                          <div className="flex items-center border border-brand-gold/10 rounded-xs bg-[#080B07] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.productId, item.variantId, -1)}
                              className="px-1.5 py-1 text-brand-stone hover:text-brand-gold hover:bg-brand-gold/5 transition-colors cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2 text-xs font-sans font-bold text-brand-cream">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.variantId, 1)}
                              className="px-1.5 py-1 text-brand-stone hover:text-brand-gold hover:bg-brand-gold/5 transition-colors cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-brand-stone hover:text-red-400 p-1 rounded-sm hover:bg-red-500/5 transition-colors cursor-pointer absolute top-2 left-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title={getTranslation('cart_item_remove', lang)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Area */}
          {cartDetails.length > 0 && (
            <div className="p-6 border-t border-brand-gold/10 bg-[#060805] space-y-4">
              <div className="space-y-2 text-right text-xs">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-brand-stone font-sans">
                  <span className="font-bold text-brand-cream">{subtotal} د.م</span>
                  <span>{getTranslation('cart_subtotal', lang)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center text-brand-stone font-sans">
                  <span className="font-bold text-brand-gold">
                    {shippingCost === 0 ? getTranslation('contact_free_shipping', lang) : `${shippingCost} د.م`}
                  </span>
                  <span>{getTranslation('contact_shipping_cost', lang)}</span>
                </div>

                <div className="w-full h-[1px] bg-brand-gold/5 my-2" />

                {/* Total */}
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="font-display text-brand-gold text-base font-sans">{total} د.م</span>
                  <span className="text-brand-cream font-display">{getTranslation('contact_total_amount', lang)}</span>
                </div>
              </div>

              {/* Secure Checkout Alert */}
              <div className="bg-brand-gold/5 border border-brand-gold/10 rounded-xs px-3 py-2 flex items-center justify-between text-[9px] text-brand-stone">
                <span className="font-bold text-brand-gold">{getTranslation('contact_form_title', lang)}</span>
                <div className="flex items-center gap-1.5 text-right justify-end">
                  <span>الدفع عند الاستلام آمن 100%</span>
                  <Lock size={10} className="text-brand-gold" />
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn-primary text-xs font-bold py-3 px-4 rounded-xs text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-brand-gold/5"
              >
                <ShoppingBag size={14} />
                <span>{getTranslation('cart_checkout_btn', lang)}</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
