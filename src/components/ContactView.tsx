import React, { useState, useEffect } from 'react';
import { Mail, ShoppingBag, Send, CheckCircle, ArrowRight, Phone, MessageSquare, ShieldCheck, Heart, Trash2 } from 'lucide-react';
import { Product, Order, ViewType, SiteSettings, CartItem } from '../types';
import { getTranslation, translateProduct, Language } from '../translations';

interface ContactViewProps {
  products: Product[];
  setView: (view: ViewType) => void;
  settings?: SiteSettings;
  lang: Language;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onSubmitOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => void;
}

export default function ContactView({
  products,
  setView,
  settings,
  lang,
  cart,
  setCart,
  onSubmitOrder
}: ContactViewProps) {
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Track last submitted details to generate direct WhatsApp link
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<{
    fullName: string;
    productLabel: string;
    quantity: number;
    totalAmount: number;
    message?: string;
  } | null>(null);

  const isRtl = lang === 'ar';

  // Build the list of cart item details
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

  const totalAmount = subtotal + shippingCost;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = getTranslation('contact_error_name', lang);
    }
    if (cartDetails.length === 0) {
      newErrors.cart = getTranslation('cart_empty', lang);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Create itemized textual order description
    const productLabel = cartDetails.map((item) => {
      const p = item.product!;
      const v = item.variant!;
      const { name } = translateProduct(p.id, p.name, p.description, lang);
      const isBundle = p.category === 'bundles';
      const sizeDisplay = isBundle ? v.nameArabic : v.size;
      return `${name} (${sizeDisplay}) x ${item.quantity}`;
    }).join(', ');

    const totalQuantity = cartDetails.reduce((sum, item) => sum + item.quantity, 0);

    // Save order in Firestore
    onSubmitOrder({
      fullName: fullName.trim(),
      phone: '', // Filled in on confirmation or verified via WA
      productSku: cart.map(item => `${item.productId}__${item.variantId}`).join(', '),
      productName: productLabel,
      quantity: totalQuantity,
      message: message.trim() || undefined
    });

    const orderDetails = {
      fullName: fullName.trim(),
      productLabel,
      quantity: totalQuantity,
      totalAmount,
      message: message.trim() || undefined
    };

    setLastSubmittedOrder(orderDetails);
    setIsSubmitted(true);

    // Clear cart
    setCart([]);

    // Build the WhatsApp message and open it automatically
    const adminWhatsapp = settings?.whatsappNumber || '212620245050';
    const cleanWhatsapp = adminWhatsapp.replace(/\+/g, '').replace(/\s+/g, '');
    
    // Multi-language styled receipt message
    let orderMsg = '';
    if (lang === 'ar') {
      orderMsg = `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ 🌿✨\n\nمرحباً "تاسيلا بيو" | Tassila Bio 👋💚\n\nلقد قمت بتقديم طلب شراء مباشر عبر الموقع الإلكتروني:\n\n👤 *اسم الزبون الكريم:* ${orderDetails.fullName}\n📦 *المنتجات المطلوبة:*\n`;
      cartDetails.forEach((item) => {
        const p = item.product!;
        const v = item.variant!;
        const { name } = translateProduct(p.id, p.name, p.description, 'ar');
        const isBundle = p.category === 'bundles';
        const sizeDisplay = isBundle ? v.nameArabic : v.size;
        orderMsg += `  - ${name} (${sizeDisplay}) × ${item.quantity} \n`;
      });
      orderMsg += `\n🚚 *تكلفة الشحن:* ${shippingCost === 0 ? 'شحن مجاني' : `${shippingCost} د.م`}\n💳 *المجموع الكلي النهائي:* ${orderDetails.totalAmount} د.م (الدفع عند الاستلام)\n\n${orderDetails.message ? `📝 *ملاحظات الشحن والتوصيل:* ${orderDetails.message}\n\n` : ''}يرجى تأكيد استلام الطلب وتجهيزه للتسليم السريع 🌾🚚\nدمتم في حفظ الله ورعايته 🤲✨`;
    } else if (lang === 'fr') {
      orderMsg = `Au nom d'Allah, le Tout-Miséricordieux, le Très-Miséricordieux 🌿✨\n\nBonjour Tassila Bio 👋💚\n\nJe viens de passer une commande sur votre site internet :\n\n👤 *Client :* ${orderDetails.fullName}\n📦 *Produits commandés :*\n`;
      cartDetails.forEach((item) => {
        const p = item.product!;
        const v = item.variant!;
        const { name } = translateProduct(p.id, p.name, p.description, 'fr');
        const isBundle = p.category === 'bundles';
        const sizeDisplay = isBundle ? v.nameArabic : v.size;
        orderMsg += `  - ${name} (${sizeDisplay}) × ${item.quantity}\n`;
      });
      orderMsg += `\n🚚 *Livraison :* ${shippingCost === 0 ? 'Gratuite' : `${shippingCost} DH`}\n💳 *Montant Total :* ${orderDetails.totalAmount} DH (Paiement à la livraison)\n\n${orderDetails.message ? `📝 *Notes :* ${orderDetails.message}\n\n` : ''}Veuillez confirmer la réception de ma commande pour préparer l'expédition rapidement 🌾🚚\nMerci !`;
    } else {
      orderMsg = `In the name of Allah, the Most Gracious, the Most Merciful 🌿✨\n\nHello Tassila Bio 👋💚\n\nI just placed an order on your website:\n\n👤 *Customer Name :* ${orderDetails.fullName}\n📦 *Ordered Items :*\n`;
      cartDetails.forEach((item) => {
        const p = item.product!;
        const v = item.variant!;
        const { name } = translateProduct(p.id, p.name, p.description, 'en');
        const isBundle = p.category === 'bundles';
        const sizeDisplay = isBundle ? v.nameArabic : v.size;
        orderMsg += `  - ${name} (${sizeDisplay}) × ${item.quantity}\n`;
      });
      orderMsg += `\n🚚 *Shipping :* ${shippingCost === 0 ? 'Free Shipping' : `${shippingCost} DH`}\n💳 *Total Amount :* ${orderDetails.totalAmount} DH (Cash on Delivery)\n\n${orderDetails.message ? `📝 *Notes :* ${orderDetails.message}\n\n` : ''}Please confirm receipt of my order to arrange fast shipping 🌾🚚\nThank you!`;
    }

    const orderWhatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(orderMsg)}`;
    
    try {
      window.open(orderWhatsappUrl, '_blank');
    } catch (err) {
      console.error('Failed to open WhatsApp automatically', err);
    }

    // Reset inputs
    setFullName('');
    setMessage('');
  };

  // WhatsApp configuration links
  const adminWhatsapp = settings?.whatsappNumber || '+212620245050';
  const cleanWhatsapp = adminWhatsapp.replace(/\+/g, '').replace(/\s+/g, '');
  const directChatUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(getTranslation('contact_whatsapp_chat_prefill', lang))}`;

  // WhatsApp link for success state
  let orderWhatsappUrl = '';
  if (lastSubmittedOrder) {
    let orderMsg = '';
    if (lang === 'ar') {
      orderMsg = `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ 🌿✨\n\nمرحباً "تاسيلا بيو" | Tassila Bio 👋💚\n\nلقد قمت بتقديم طلب شراء مباشر عبر الموقع الإلكتروني:\n\n👤 *اسم الزبون الكريم:* ${lastSubmittedOrder.fullName}\n📦 *المنتجات المطلوبة:* ${lastSubmittedOrder.productLabel}\n💳 *المجموع الكلي النهائي:* ${lastSubmittedOrder.totalAmount} د.م (الدفع عند الاستلام)\n\n${lastSubmittedOrder.message ? `📝 *ملاحظات الشحن والتوصيل:* ${lastSubmittedOrder.message}\n\n` : ''}يرجى تأكيد استلام الطلب وتجهيزه للتسليم السريع 🌾🚚\nدمتم في حفظ الله ورعايته 🤲✨`;
    } else {
      orderMsg = `Bonjour Tassila Bio 👋💚\n\nCommande passée par ${lastSubmittedOrder.fullName} :\n📦 *Produits :* ${lastSubmittedOrder.productLabel}\n💳 *Total :* ${lastSubmittedOrder.totalAmount} DH (Paiement à la livraison)\n\nMerci !`;
    }
    orderWhatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(orderMsg)}`;
  }

  return (
    <div id="contact-view" className="bg-brand-black text-brand-cream min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-brand-olive/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO BANNER */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
            <span className="text-[10px] sm:text-xs text-brand-gold font-sans tracking-[0.2em] uppercase font-bold">
              {getTranslation('contact_subtitle', lang)}
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {getTranslation('contact_title_banner', lang)}
          </h1>
          <div className="w-12 h-[1.5px] bg-[#B28A30] mx-auto mb-5" />
          <p className="text-xs sm:text-sm text-brand-stone leading-relaxed">
            {getTranslation('contact_desc', lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: FORM AND BILLING CONTAINER */}
          <div className="lg:col-span-8 bg-[#0D120C]/80 backdrop-blur-sm border border-brand-gold/10 p-6 sm:p-8 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.4)] relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold/10 via-brand-gold to-brand-gold/10" />
            
            {isSubmitted ? (
              /* GORGEOUS SUCCESS STATE WITH DIRECT WHATSAPP INTEGRATION */
              <div id="contact-success-state" className="py-10 text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-brand-olive/15 text-brand-gold flex items-center justify-center mx-auto border border-brand-gold/20 shadow-[0_0_20px_rgba(178,138,48,0.15)] animate-bounce">
                  <CheckCircle size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-brand-gold">
                    {getTranslation('success_title', lang)}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-stone leading-relaxed max-w-md mx-auto">
                    {getTranslation('success_desc', lang)}
                  </p>
                </div>

                {lastSubmittedOrder && (
                  <div className={`bg-[#131912] p-4 rounded-sm border border-brand-gold/10 max-w-md mx-auto space-y-2.5 shadow-inner ${isRtl ? 'text-right' : 'text-left'}`}>
                    <h4 className={`text-xs font-bold text-brand-gold border-b border-brand-gold/10 pb-1.5 flex items-center gap-1.5 ${isRtl ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}>
                      <span>{getTranslation('success_invoice_details', lang)}</span>
                      <ShoppingBag size={12} />
                    </h4>
                    <div className="text-xs space-y-1 text-brand-stone font-sans">
                      <p>👤 <strong>{getTranslation('success_invoice_name', lang)}:</strong> {lastSubmittedOrder.fullName}</p>
                      <p>🟢 <strong>{getTranslation('success_invoice_status', lang)}:</strong> {getTranslation('success_invoice_wa_confirm', lang)}</p>
                      <p className="line-clamp-3">📦 <strong>{getTranslation('success_invoice_products', lang)}:</strong> {lastSubmittedOrder.productLabel}</p>
                      <p className="text-brand-gold font-bold text-sm pt-1 border-t border-brand-gold/5 mt-2">
                        💰 {getTranslation('success_invoice_total', lang)}: {lastSubmittedOrder.totalAmount} د.م
                      </p>
                    </div>
                  </div>
                )}

                {/* WhatsApp Order Transmission Button */}
                {lastSubmittedOrder && (
                  <div className="pt-2 max-w-md mx-auto space-y-2">
                    <a
                      href={orderWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-3.5 px-6 font-bold text-xs sm:text-sm rounded-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:shadow-[0_4px_20px_rgba(37,211,102,0.35)] scale-105"
                    >
                      <MessageSquare size={16} />
                      <span>{getTranslation('success_wa_btn_manual', lang)}</span>
                    </a>
                    <p className="text-[10px] text-brand-stone">
                      {getTranslation('success_wa_btn_tip', lang)}
                    </p>
                  </div>
                )}

                <div className={`pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-brand-gold/5 mt-6 max-w-md mx-auto ${isRtl ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <button
                    id="success-btn-home"
                    onClick={() => setView('home')}
                    className="w-full sm:w-1/2 bg-transparent hover:bg-brand-gold/10 text-brand-cream border border-brand-gold/30 hover:border-brand-gold py-2.5 text-xs font-bold rounded-sm transition-colors cursor-pointer"
                  >
                    {getTranslation('success_back_home', lang)}
                  </button>
                  <button
                    id="success-btn-again"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-1/2 bg-[#B28A30]/10 hover:bg-[#B28A30]/20 text-brand-gold border border-brand-gold/30 py-2.5 text-xs font-bold rounded-sm transition-colors cursor-pointer"
                  >
                    {getTranslation('success_order_new', lang)}
                  </button>
                </div>
              </div>
            ) : (
              /* FORM LAYOUT */
              <form id="contact-order-form" onSubmit={handleSubmit} className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex flex-col sm:flex-row items-center justify-between border-b border-brand-gold/10 pb-3.5 gap-3 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <button
                    type="button"
                    onClick={() => setView('home')}
                    className={`w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-bold text-brand-stone hover:text-brand-gold transition-all duration-300 cursor-pointer bg-brand-gold/5 hover:bg-brand-gold/10 px-3.5 py-2 rounded-sm border border-brand-gold/10 hover:border-brand-gold/30 hover:scale-[1.02] ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <ArrowRight size={14} className={`text-brand-gold ${isRtl ? '' : 'rotate-180'}`} />
                    <span>{getTranslation('contact_back_to_catalog', lang)}</span>
                  </button>
                  <h2 className={`font-display text-lg font-bold text-brand-gold flex items-center gap-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span>{getTranslation('contact_form_title', lang)}</span>
                    <ShoppingBag size={18} className="text-brand-gold" />
                  </h2>
                </div>

                {cartDetails.length === 0 ? (
                  /* EMPTY PANIER WARNING */
                  <div className="text-center py-12 space-y-4">
                    <p className="text-sm font-bold text-brand-stone">{getTranslation('cart_empty', lang)}</p>
                    <button
                      type="button"
                      onClick={() => setView('home')}
                      className="btn-primary px-5 py-2.5 text-xs"
                    >
                      {getTranslation('cart_continue_shopping', lang)}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="block text-[11px] sm:text-xs text-brand-stone font-sans font-semibold">
                        {getTranslation('contact_full_name_label', lang)} <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors(prev => { const copy = { ...prev }; delete copy.fullName; return copy; });
                          }
                        }}
                        placeholder={getTranslation('contact_name_placeholder', lang)}
                        className={`w-full bg-[#080B07] text-brand-cream border ${
                          errors.fullName ? 'border-red-500' : 'border-brand-gold/15'
                        } focus:border-brand-gold rounded-sm py-2.5 px-3.5 text-xs focus:ring-1 focus:ring-brand-gold/30 focus:outline-none transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                      {errors.fullName && <p className="text-red-400 text-[10px] mt-1 font-sans font-bold">{errors.fullName}</p>}
                    </div>

                    {/* Interactive Itemized Order Summary */}
                    <div className="space-y-3">
                      <label className="block text-[11px] sm:text-xs text-brand-stone font-sans font-semibold">
                        {getTranslation('contact_items_ordered_label', lang)}
                      </label>
                      <div className="space-y-2.5 max-h-60 overflow-y-auto scrollbar-thin">
                        {cartDetails.map((item) => {
                          const p = item.product!;
                          const v = item.variant!;
                          const { name } = translateProduct(p.id, p.name, p.description, lang);
                          const isBundle = p.category === 'bundles';
                          const sizeLabel = isBundle ? v.nameArabic : `${getTranslation('cart_item_price', lang)}: ${v.size}`;

                          return (
                            <div
                              key={`${item.productId}-${item.variantId}`}
                              className={`flex items-center gap-3 bg-[#080B07] p-3 rounded-sm border border-brand-gold/10 hover:border-brand-gold/20 transition-colors relative group ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                              {/* Product Thumbnail */}
                              <div className="w-12 h-12 rounded-xs overflow-hidden border border-brand-gold/10 bg-brand-black-soft flex-shrink-0">
                                <img
                                  src={p.image}
                                  alt={name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* details */}
                              <div className={`flex-grow min-w-0 flex flex-col justify-between h-full ${isRtl ? 'text-right' : 'text-left'}`}>
                                <div>
                                  <h4 className="text-xs font-bold text-brand-cream truncate pr-1">
                                    {name}
                                  </h4>
                                  <span className="text-[10px] text-brand-stone block font-sans">
                                    {sizeLabel}
                                  </span>
                                </div>

                                {/* Controls */}
                                <div className={`flex items-center gap-2 mt-1.5 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                                  <div className="flex items-center border border-brand-gold/10 rounded-xs bg-[#040603] overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(item.productId, item.variantId, -1)}
                                      className="px-1.5 py-0.5 text-brand-stone hover:text-brand-gold transition-colors cursor-pointer text-[10px]"
                                    >
                                      -
                                    </button>
                                    <span className="px-2 text-[10px] font-sans font-bold text-brand-cream">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(item.productId, item.variantId, 1)}
                                      className="px-1.5 py-0.5 text-brand-stone hover:text-brand-gold transition-colors cursor-pointer text-[10px]"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span className="text-xs font-sans font-bold text-brand-gold">
                                    {v.price * item.quantity} د.م
                                  </span>
                                </div>
                              </div>

                              {/* trash remove item */}
                              <button
                                type="button"
                                onClick={() => removeItem(item.productId, item.variantId)}
                                className={`text-brand-stone hover:text-red-400 p-1 rounded-sm hover:bg-red-500/5 transition-colors cursor-pointer absolute top-2 ${isRtl ? 'left-2' : 'right-2'} opacity-0 group-hover:opacity-100 focus:opacity-100`}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delivery Notes */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-[11px] sm:text-xs text-brand-stone font-sans font-semibold">
                        {getTranslation('contact_notes_label', lang)} <span className="text-brand-stone text-[10px] font-normal">({getTranslation('contact_optional', lang)})</span>
                      </label>
                      <textarea
                        id="message"
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={getTranslation('contact_notes_placeholder', lang)}
                        className={`w-full bg-[#080B07] text-brand-cream border border-brand-gold/15 focus:border-brand-gold rounded-sm py-2 px-3.5 text-xs focus:ring-1 focus:ring-brand-gold/30 focus:outline-none transition-all resize-none ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    {/* Invoice block */}
                    <div className={`bg-[#131912]/90 p-4 rounded-sm border border-brand-gold/10 space-y-3 font-sans ${isRtl ? 'text-right' : 'text-left'}`}>
                      <h4 className={`text-xs font-bold text-brand-gold flex items-center gap-1 border-b border-brand-gold/5 pb-1.5 ${isRtl ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}>
                        <span>{getTranslation('contact_invoice_title', lang)}</span>
                        <ShieldCheck size={12} />
                      </h4>
                      <div className="space-y-1.5 text-xs text-brand-stone font-sans">
                        <div className={`flex justify-between items-center ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span className="font-bold text-brand-cream font-sans">{subtotal} د.م</span>
                          <span>{getTranslation('cart_subtotal', lang)}:</span>
                        </div>
                        <div className={`flex justify-between items-center border-b border-brand-gold/5 pb-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span className="font-bold text-brand-cream font-sans">{shippingCost === 0 ? getTranslation('contact_free_shipping', lang) : `${shippingCost} د.م`}</span>
                          <span>{getTranslation('contact_shipping_cost', lang)}:</span>
                        </div>
                        <div className={`flex justify-between text-brand-gold font-bold text-sm pt-1.5 items-center ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span className="font-sans text-brand-gold text-base">{totalAmount} د.م</span>
                          <span className="text-xs font-bold">{getTranslation('contact_total_amount', lang)}:</span>
                        </div>
                      </div>
                    </div>

                    {/* Submissions buttons */}
                    <div className={`pt-2 flex flex-col sm:flex-row gap-3 ${isRtl ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                      <button
                        type="button"
                        onClick={() => setView('home')}
                        className="w-full sm:w-1/3 bg-transparent hover:bg-brand-gold/5 text-brand-stone hover:text-brand-cream py-3.5 px-6 font-bold text-xs sm:text-sm rounded-sm border border-brand-gold/20 hover:border-brand-gold/40 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>{getTranslation('contact_cancel', lang)}</span>
                      </button>
                      <button
                        id="submit-order-btn"
                        type="submit"
                        className="w-full sm:w-2/3 bg-[#B28A30] hover:bg-[#967425] text-white py-3.5 px-6 font-bold text-xs sm:text-sm rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(178,138,48,0.25)] hover:shadow-[0_0_25px_rgba(178,138,48,0.4)] animate-pulse hover:animate-none"
                      >
                        <Send size={14} className={isRtl ? 'rotate-180' : ''} />
                        <span>{getTranslation('contact_confirm_order_btn', lang)}</span>
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-brand-stone mt-2.5 flex items-center justify-center gap-1">
                      <span>{getTranslation('contact_cod_guarantee', lang)}</span>
                      <Heart size={10} className="text-brand-gold fill-brand-gold/20" />
                    </p>
                  </>
                )}
              </form>
            )}
          </div>

          {/* RIGHT: CONTACT INFO CARDS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* WHATSAPP CARD */}
            <div className={`bg-[#0D120C]/80 backdrop-blur-sm border border-brand-gold/10 p-5 rounded-sm space-y-5 shadow-lg relative group overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-[3px] h-full bg-[#25D366]`} />
              <div className={`w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-1 border border-[#25D366]/20 ${isRtl ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
                <Phone size={18} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-base font-bold text-white">{getTranslation('contact_wa_card_title', lang)}</h3>
                <p className="text-[11px] text-brand-stone leading-relaxed">
                  {getTranslation('contact_wa_card_desc', lang)}
                </p>
                <div className={`bg-[#080B07] p-2.5 rounded-sm border border-brand-gold/5 flex items-center justify-between gap-2 mt-4 font-sans text-xs ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <a
                    href={directChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline transition-colors font-sans text-xs select-all font-bold"
                  >
                    {adminWhatsapp}
                  </a>
                  <MessageSquare size={13} className="text-brand-stone" />
                </div>
              </div>
              <a
                href={directChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/25 py-2 rounded-sm text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-3 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <span>{getTranslation('contact_wa_card_cta', lang)}</span>
                <MessageSquare size={12} />
              </a>
            </div>

            {/* EMAIL DETAILS CARD */}
            <div className={`bg-[#0D120C]/80 backdrop-blur-sm border border-brand-gold/10 p-5 rounded-sm space-y-5 shadow-lg relative overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-[3px] h-full bg-brand-gold`} />
              <div className={`w-10 h-10 rounded-full bg-brand-olive/15 text-brand-gold flex items-center justify-center mb-1 border border-brand-gold/25 ${isRtl ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
                <Mail size={16} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-base font-bold text-white">{getTranslation('contact_email_card_title', lang)}</h3>
                <p className="text-[11px] text-brand-stone leading-relaxed">
                  {getTranslation('contact_email_card_desc', lang)}
                </p>
                <div className={`bg-[#080B07] p-2.5 rounded-sm border border-brand-gold/5 flex items-center justify-between gap-2 mt-4 font-sans text-xs ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <a
                    id="contact-email-link"
                    href="mailto:Tassilabio26@gmail.com"
                    className="text-brand-gold hover:text-brand-gold/80 transition-colors font-sans select-all font-semibold"
                  >
                    Tassilabio26@gmail.com
                  </a>
                  <Mail size={13} className="text-brand-stone" />
                </div>
              </div>
            </div>

            {/* SECURITY/GUARANTEE CARD */}
            <div className={`bg-[#0D120C]/80 backdrop-blur-sm border border-brand-gold/15 p-5 rounded-sm space-y-3.5 shadow-md ${isRtl ? 'text-right' : 'text-left'}`}>
              <h4 className={`font-display text-sm font-bold text-brand-gold flex items-center gap-1.5 ${isRtl ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}>
                <span>{getTranslation('contact_guarantee_title', lang)}</span>
                <ShieldCheck size={14} />
              </h4>
              <p className="text-[11px] text-brand-stone leading-relaxed">
                {getTranslation('contact_guarantee_desc', lang)}
              </p>
              <div className="border-t border-brand-gold/10 pt-3 text-[10px] text-brand-stone leading-relaxed">
                🛡️ {getTranslation('contact_privacy_tip', lang)}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
