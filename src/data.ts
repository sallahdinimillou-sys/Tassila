import { Product } from './types';

import logo from './assets/images/logo_tassila_1783872761746.jpg';
import amlouJar from './assets/images/amlou_jar_1783872775704.jpg';
import honeyJar from './assets/images/honey_jar_1783872787213.jpg';
import arganBottle from './assets/images/argan_oil_bottle_1783872799205.jpg';
import honeycombAmbiance from './assets/images/honeycomb_ambiance_1783872811408.jpg';
import olivesAmbiance from './assets/images/olives_ambiance_1783872823882.jpg';
import wovenBaskets from './assets/images/woven_baskets_ambiance_1783872843367.jpg';
import naturalProduction from './assets/images/moroccan_natural_production.jpg';
import amlouJarStory from './assets/images/amlou_jar_story_1784123762869.jpg';

// Exact image paths generated for the brand (using Vite imports for 100% reliability in production/Vercel)
export const ASSETS = {
  logo,
  amlouJar,
  honeyJar,
  arganBottle,
  honeycombAmbiance,
  olivesAmbiance,
  wovenBaskets,
  naturalProduction,
  amlouJarStory,
};

// Create a lookup mapping from file name to the Vite-bundled asset URL.
// This allows resolving Firestore database URLs (even if stored with old paths) to correct hashed bundle URLs.
export const ASSETS_MAP: Record<string, string> = {
  'logo_tassila_1783872761746.jpg': logo,
  'amlou_jar_1783872775704.jpg': amlouJar,
  'honey_jar_1783872787213.jpg': honeyJar,
  'argan_oil_bottle_1783872799205.jpg': arganBottle,
  'honeycomb_ambiance_1783872811408.jpg': honeycombAmbiance,
  'olives_ambiance_1783872823882.jpg': olivesAmbiance,
  'woven_baskets_ambiance_1783872843367.jpg': wovenBaskets,
  'moroccan_natural_production.jpg': naturalProduction,
  'amlou_jar_story_1784123762869.jpg': amlouJarStory,
};

export const DEFAULT_PRODUCTS: Product[] = [
  // 1. AMLOU CATEGORY
  {
    id: 'amlou',
    name: 'أملو باللوز وأركان الفاخر',
    description: 'مزيج تقليدي فريد يجمع بين اللوز البلدي المحمص، عسل البرتقال الطبيعي، وزيت الأركان البكر المعصور على البارد.',
    image: ASSETS.amlouJar,
    category: 'amlou',
    variants: [
      { id: 'amlou_200', size: '200غ', price: 50, nameArabic: 'أملو 200غ' },
      { id: 'amlou_350', size: '350غ', price: 90, nameArabic: 'أملو 350غ' },
      { id: 'amlou_700', size: '700غ', price: 180, nameArabic: 'أملو 700غ' },
    ]
  },
  
  // 2. ARGAN OIL CATEGORY
  {
    id: 'argan_cosmetic',
    name: 'زيت الأركان التجميلي النقي',
    description: 'ذهب سائل نقي 100٪ معصور على البارد، مثالي لتغذية البشرة وتجديد حيوية الشعر وتقوية الأظافر.',
    image: ASSETS.arganBottle,
    category: 'argan',
    variants: [
      { id: 'argan_cos_30', size: '30مل', price: 50, nameArabic: 'زيت الأركان التجميلي 30مل' },
      { id: 'argan_cos_50', size: '50مل', price: 70, nameArabic: 'زيت الأركان التجميلي 50مل' },
      { id: 'argan_cos_100', size: '100مل', price: 110, nameArabic: 'زيت الأركان التجميلي 100مل' },
    ]
  },
  {
    id: 'argan_food',
    name: 'زيت الأركان الغذائي المحمص',
    description: 'زيت أركان ذو نكهة محمرة تقليدية فريدة، مثالي لصحن الفطور وتنكيه الأطباق المغربية الراقية والشهية.',
    image: ASSETS.arganBottle,
    category: 'argan',
    variants: [
      { id: 'argan_food_250', size: '250مل', price: 180, nameArabic: 'زيت الأركان الغذائي 250مل' },
      { id: 'argan_food_500', size: '500مل', price: 370, nameArabic: 'زيت الأركان الغذائي 500مل' },
      { id: 'argan_food_1000', size: '1لتر', price: 700, nameArabic: 'زيت الأركان الغذائي 1لتر' },
    ]
  },

  // 3. HONEY CATEGORY
  {
    id: 'honey_lemon',
    name: 'عسل الليمون الطبيعي',
    description: 'عسل نحل طبيعي نقي ومستخلص من بساتين البرتقال والليمون المغربية الزكية والمنعشة، غني بالفوائد والمذاق العذب.',
    image: ASSETS.honeyJar,
    category: 'honey',
    variants: [
      { id: 'honey_lem_1kg', size: '1كغ', price: 100, nameArabic: 'عسل الليمون 1كغ' },
    ]
  },
  {
    id: 'honey_herbs',
    name: 'عسل الأعشاب الجبلية الممتاز',
    description: 'عسل جبلي داكن وعلاجي مستخلص من أعالي جبال الأطلس حيث يتغذى النحل على الأعشاب الطبية والبرية النادرة.',
    image: ASSETS.honeyJar,
    category: 'honey',
    variants: [
      { id: 'honey_erb_1kg', size: '1كغ', price: 150, nameArabic: 'عسل الأعشاب 1كغ' },
    ]
  },

  // 4. BUNDLES CATEGORY
  {
    id: 'bundle_royal',
    name: 'باقة التذوق العائلية الفاخرة',
    description: 'مجموعة متكاملة من أروع نتاج منزلي: برطمان أملو باللوز وأركان (350غ) + عسل الليمون الطبيعي (1 كغ) + زيت الأركان الغذائي الفاخر (250مل).',
    image: ASSETS.wovenBaskets,
    category: 'bundles',
    variants: [
      { id: 'bundle_roy', size: 'طقم كامل', price: 340, nameArabic: 'باقة التذوق العائلية' },
    ]
  },
  {
    id: 'bundle_wellness',
    name: 'باقة الجمال والنقاء الطبيعي',
    description: 'أهدي بشرتك وشعرك سر النقاء المغربي: زجاجة زيت الأركان التجميلي النقي (100مل) + برطمان عسل الأعشاب الجبلية الممتاز (1 كغ).',
    image: ASSETS.logo,
    category: 'bundles',
    variants: [
      { id: 'bundle_well', size: 'طقم كامل', price: 230, nameArabic: 'باقة الجمال والنقاء' },
    ]
  },
  {
    id: 'bundle_breakfast',
    name: 'باقة تاسيلا الشاملة المميزة',
    description: 'أحضر المذاق البلدي الحقيقي لمائدتك: برطمان أملو باللوز وأركان (700غ) + عسل الأعشاب الجبلية (1 كغ) + زيت الأركان الغذائي (500مل).',
    image: ASSETS.amlouJar,
    category: 'bundles',
    variants: [
      { id: 'bundle_bf', size: 'طقم كامل', price: 790, nameArabic: 'باقة تاسيلا الشاملة' },
    ]
  }
];

export const VALUES = [
  {
    title: 'شغف وحرفة يدوية',
    description: 'أحضر وأعبئ كل منتج بيدي من منزلي بكل أمانة وشغف لأضمن جودة تليق بذوقكم الرفيع.',
    icon: 'Sparkles'
  },
  {
    title: 'تضامن مباشر وتجارة عادلة',
    description: 'أتعامل بشكل شخصي ومباشر مع تعاونيات نسائية في سوس ومربي النحل في الأطلس لدعم عائلاتهم.',
    icon: 'Heart'
  },
  {
    title: 'نقاء طبيعي مطلق',
    description: 'جميع منتجاتي بكر، غير مصفاة كيميائياً، خالية تماماً من المواد الحافظة والسكر المضاف والملونات.',
    icon: 'Award'
  },
  {
    title: 'إرث عائلي موروث',
    description: 'أتبع نفس الوصفات والطرق التقليدية التي ورثتها عن عائلتي لحفظ الطعم والفوائد الصحية الأصلية.',
    icon: 'Flame'
  }
];

export const GALLERY_PHOTOS = [
  ASSETS.honeycombAmbiance,
  ASSETS.olivesAmbiance,
  ASSETS.naturalProduction,
  ASSETS.amlouJar,
  ASSETS.arganBottle,
  ASSETS.honeyJar
];
