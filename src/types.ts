export interface ProductVariant {
  id: string; // SKU ID
  size: string; // e.g. "30ml", "200g", "1kg"
  price: number; // in DH
  nameArabic: string; // label in Arabic
  stock?: number; // Stock quantity (undefined or number)
  cost?: number; // Internal cost price (profit tracking)
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'honey' | 'amlou' | 'argan' | 'bundles';
  variants: ProductVariant[];
  shippingCost?: number; // Delivery / Shipping cost in DH (0 for free shipping)
}

export interface Order {
  id: string;
  fullName: string;
  phone: string;
  productSku: string; // Product ID + Sku ID
  productName: string; // e.g., "أملو 350g"
  quantity: number;
  message?: string;
  date: string;
  status: 'pending' | 'completed';
}

export type ViewType = 'home' | 'about' | 'contact' | 'admin';

export interface SkuPriceEdit {
  id: string; // e.g., "argan_cosmetic_30"
  productName: string; // e.g., "زيت الأركان التجميلي"
  size: string; // e.g., "30ml"
  price: number;
}

export interface SiteSettings {
  whatsappNumber: string;
  instagramLink: string;
  facebookLink: string;
  tiktokLink: string;
  shippingCost: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}
