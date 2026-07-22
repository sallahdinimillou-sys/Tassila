export type Language = 'ar' | 'fr' | 'en';

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Navigation & Header
  brand_title: {
    ar: 'TASSILA BIO',
    fr: 'TASSILA BIO',
    en: 'TASSILA BIO'
  },
  brand_subtitle: {
    ar: 'منـتـجـات طـبـيـعـيـة فـاخـرة',
    fr: 'Produits Naturels de Luxe',
    en: 'Premium Natural Products'
  },
  nav_home: {
    ar: 'الرئيسية',
    fr: 'Accueil',
    en: 'Home'
  },
  nav_about: {
    ar: 'قصتي وشغفي',
    fr: 'Mon Histoire',
    en: 'My Story'
  },
  nav_contact: {
    ar: 'اطلب الآن',
    fr: 'Commander',
    en: 'Order Now'
  },
  nav_admin: {
    ar: 'لوحة التحكم',
    fr: 'Admin',
    en: 'Admin'
  },
  announcement_1: {
    ar: 'توصيل سريع وآمن لجميع المدن المغربية • الدفع عند الاستلام',
    fr: 'Livraison rapide & sécurisée partout au Maroc • Paiement à la livraison',
    en: 'Fast & secure delivery to all Moroccan cities • Cash on delivery'
  },
  announcement_2: {
    ar: 'عسل طبيعي حر ونقي 100% مباشرة من أرياف المغرب الخلابة',
    fr: 'Miel 100% naturel & pur provenant directement du terroir marocain',
    en: '100% pure & raw natural honey straight from Morocco’s beautiful countryside'
  },
  announcement_3: {
    ar: 'منتجات طبيعية استثنائية حائزة على أعلى معايير الجودة والتحاليل المخبرية',
    fr: 'Produits naturels exceptionnels certifiés de qualité supérieure',
    en: 'Exceptional natural products certified to the highest laboratory standards'
  },
  cta_button: {
    ar: 'اطلب الآن',
    fr: 'Commander',
    en: 'Order Now'
  },
  drawer_title: {
    ar: 'قائمة المتجر الرئيسية',
    fr: 'Menu Principal',
    en: 'Main Menu'
  },
  social_follow_us: {
    ar: 'تابعوا كواليس صناعة العسل الطبيعي والزيوت الطبيعية على منصاتنا',
    fr: 'Suivez les coulisses de notre production de miel naturel sur nos réseaux',
    en: 'Follow our natural honey production and backstage story on social media'
  },

  // Hero Section
  hero_ribbon: {
    ar: 'مقطوف ومنتج باليد بكل حب',
    fr: 'Récolté et préparé à la main avec amour',
    en: 'Harvested and prepared by hand with love'
  },
  hero_title_1: {
    ar: 'الذوق المغربي الأصيل',
    fr: 'Le goût marocain authentique',
    en: 'Authentic Moroccan taste'
  },
  hero_title_2: {
    ar: 'من خيرات أراضينا ونحلنا',
    fr: 'Du terroir et de nos ruches',
    en: 'From our land and our hives'
  },
  hero_title_gold: {
    ar: 'عسل حر وأملو بلدي وزيت أركان نقي',
    fr: 'Miel Pur, Amlou Artisanal & Huile d’Argan Extra-Vierge',
    en: 'Pure Honey, Artisanal Amlou & Extra-Virgin Argan Oil'
  },
  hero_title_main: {
    ar: 'كنوز الطبيعة المغربية الفاخرة من منزلي إلى بيتك',
    fr: 'Les trésors de la nature marocaine, de ma maison à la vôtre',
    en: 'Moroccan natural treasures, directly from my home to yours'
  },
  hero_desc: {
    ar: 'أصنع كل قطرة بشغف وأمانة تامة وفقاً للوصفات العائلية المتوارثة. منتجات طبيعية 100% خالية من المواد الحافظة والسكر المضاف، تدعم التعاونيات النسائية ومربي النحل المحليين.',
    fr: 'Chaque goutte est préparée avec passion et intégrité selon des recettes familiales ancestrales. Produits 100% naturels sans conservateurs ni sucre ajouté, soutenant les coopératives locales.',
    en: 'Every single drop is crafted with passion and absolute integrity following inherited family recipes. 100% natural products, free of preservatives and added sugar, supporting local cooperatives.'
  },
  explore_store: {
    ar: 'اكتشف روائع المتجر',
    fr: 'Découvrir la Boutique',
    en: 'Explore Store'
  },
  family_story: {
    ar: 'قصة تاسيلا بيو',
    fr: 'L’Histoire de Tassila',
    en: 'The Tassila Story'
  },
  hero_cta_browse: {
    ar: 'تصفح منتجاتنا الفاخرة',
    fr: 'Découvrir la collection',
    en: 'Browse premium products'
  },
  hero_cta_story: {
    ar: 'اقرأ حكايتنا وشغفنا',
    fr: 'Notre histoire',
    en: 'Our story & heritage'
  },

  // Categories & Headers
  cat_all: {
    ar: 'الكل',
    fr: 'Tout',
    en: 'All'
  },
  cat_amlou: {
    ar: 'أملو فاخر باللوز وأركان',
    fr: 'Amlou Royal Amande & Argan',
    en: 'Premium Almond & Argan Amlou'
  },
  cat_argan: {
    ar: 'زيت الأركان',
    fr: 'Huile d’Argan',
    en: 'Argan Oil'
  },
  cat_argan_cosmetic: {
    ar: 'زيت أركان تجميلي نقي',
    fr: "Huile d'Argan Cosmétique Pure",
    en: 'Pure Cosmetic Argan Oil'
  },
  cat_argan_culinary: {
    ar: 'زيت أركان غذائي محمص',
    fr: "Huile d'Argan Culinaire Torréfiée",
    en: 'Toasted Culinary Argan Oil'
  },
  cat_honey: {
    ar: 'العسل الطبيعي',
    fr: 'Miel Naturel',
    en: 'Natural Honey'
  },
  cat_honey_label: {
    ar: 'عسل نحل طبيعي حر ونقي',
    fr: 'Miel Naturel Pur & Brut',
    en: 'Pure & Raw Natural Honey'
  },
  cat_bundles: {
    ar: 'باقات التذوق',
    fr: 'Coffrets Cadeaux',
    en: 'Gift Bundles'
  },
  cat_bundles_label: {
    ar: 'باقات وصناديق هدايا مميزة',
    fr: 'Coffrets Cadeaux & Trios',
    en: 'Premium Gift Sets & Bundles'
  },
  cat_tagline_amlou: {
    ar: 'طاقة طبيعية ومذاق مغربي أصيل لا يقاوم',
    fr: 'Énergie naturelle et saveur marocaine authentique',
    en: 'Natural energy and irresistible traditional flavor'
  },
  cat_tagline_argan: {
    ar: 'الذهب السائل للعناية الفاخرة وتنكيه الأطباق',
    fr: 'L’or liquide pour les soins et la gastronomie fine',
    en: 'Liquid gold for cosmetics and premium dining'
  },
  cat_tagline_honey: {
    ar: 'عسل علاجي حر ونقي مباشرة من خلايا النحل',
    fr: 'Miel thérapeutique brut issu directement de la ruche',
    en: 'Therapeutic and raw honey straight from the hive'
  },
  cat_tagline_bundles: {
    ar: 'مجموعات استثنائية بأسعار مخفضة وشحن مجاني',
    fr: 'Assortiments exclusifs avec livraison offerte',
    en: 'Exclusive gift sets with discounted prices and free shipping'
  },
  store_title: {
    ar: 'معرض الكنوز الطبيعية الفاخرة',
    fr: 'Galerie des Trésors Naturels',
    en: 'Premium Natural Treasures Gallery'
  },
  store_subtitle: {
    ar: 'انتقي منتجاتك الطبيعية المفضلة المصنوعة يدوياً بكل حب وأمانة',
    fr: 'Sélectionnez vos produits naturels préférés, faits main avec amour et intégrité',
    en: 'Select your favorite natural products, handcrafted with love and integrity'
  },
  catalog_subtitle: {
    ar: 'منتجات بيولوجية ممتازة معبأة يدويًا',
    fr: "Produits biologiques d'exception mis en pot à la main",
    en: 'Exceptional organic products, carefully hand-bottled'
  },
  catalog_title: {
    ar: 'تصفح كنز الطبيعة المغربية',
    fr: 'Découvrez nos trésors naturels',
    en: 'Discover our natural treasures'
  },
  catalog_desc: {
    ar: 'نقدم لكم عسل نحل معالج نقي، أملو تقليدي مطحون بالرحى، وزيت أركان بكر نقي معصور على البارد. توصيل سريع لجميع مدن المغرب.',
    fr: "Nous proposons du miel pur thérapeutique, de l'Amlou traditionnel moulu sur pierre, et de l'huile d'argan pressée à froid. Livraison partout au Maroc.",
    en: 'We offer therapeutic pure honey, traditional stone-ground Amlou, and cold-pressed extra virgin argan oil. Fast shipping throughout Morocco.'
  },

  // Category descriptions (seen on cards)
  nav_amlou: {
    ar: 'أملو فاخر',
    fr: 'Amlou Royal',
    en: 'Amlou'
  },
  desc_amlou: {
    ar: 'طاقة وحيوية ومذاق أصيل يجمع بين اللوز المحمص وزيت الأركان الفاخر وعسل الليمون.',
    fr: "Énergie et saveur authentique unissant amandes torréfiées, huile d'argan et miel d'oranger.",
    en: 'Natural energy and traditional flavor uniting roasted almonds, pure argan oil, and honey.'
  },
  nav_argan: {
    ar: 'زيت الأركان',
    fr: 'Huile d’Argan',
    en: 'Argan Oil'
  },
  desc_argan: {
    ar: 'الذهب السائل المستخلص من ثمار شجرة الأركان النادرة بسوس، نقي وبكر 100٪.',
    fr: "L'or liquide extrait des fruits de l'arganier du Souss, 100% pur, vierge et authentique.",
    en: 'Liquid gold extracted from argan fruits of Souss, 100% pure, virgin, and authentic.'
  },
  nav_honey: {
    ar: 'العسل الطبيعي',
    fr: 'Miel Naturel',
    en: 'Natural Honey'
  },
  desc_honey: {
    ar: 'عسل علاجي مستخلص بوعي وأمانة من مناحلنا الجبلية، مفحوص مخبرياً ومضمون الجودة.',
    fr: "Miel thérapeutique récolté avec éthique, testé en laboratoire et de qualité garantie.",
    en: 'Therapeutic raw honey harvested with ethics, laboratory tested, and quality guaranteed.'
  },
  nav_bundles: {
    ar: 'باقات التذوق',
    fr: 'Coffrets Cadeaux',
    en: 'Gift Bundles'
  },
  desc_bundles: {
    ar: 'باقات هدايا وتذوق تجمع بين أجود منتجاتنا بأسعار مخفضة وشحن منزلي مجاني.',
    fr: "Assortiments cadeaux combinant nos meilleurs produits à prix réduit avec livraison gratuite.",
    en: 'Gift bundles combining our best products at a discounted price with free shipping.'
  },

  // Product details & variants selection
  product_select_size: {
    ar: 'اختر الحجم',
    fr: 'Choisir le format',
    en: 'Select size'
  },
  product_size: {
    ar: 'الحجم',
    fr: 'Format',
    en: 'Size'
  },
  product_discounted_price: {
    ar: 'سعر التخفيض',
    fr: 'Prix réduit',
    en: 'Discounted price'
  },
  currency_dh: {
    ar: 'د.م',
    fr: 'DH',
    en: 'DH'
  },
  product_shipping_prefix: {
    ar: '+ الشحن:',
    fr: '+ Livraison:',
    en: '+ Shipping:'
  },
  product_free_shipping_short: {
    ar: 'شحن مجاني',
    fr: 'Livraison gratuite',
    en: 'Free shipping'
  },
  product_add_to_cart: {
    ar: 'أضف إلى السلة',
    fr: 'Ajouter au Panier',
    en: 'Add to Cart'
  },
  product_out_of_stock: {
    ar: 'نفدت الكمية',
    fr: 'Rupture de stock',
    en: 'Out of Stock'
  },
  product_order_now: {
    ar: 'اطلب الآن (الدفع عند الاستلام)',
    fr: 'Commander maintenant (Paiement à la livraison)',
    en: 'Order Now (Cash on Delivery)'
  },

  // Values & Badges Section
  values_header_tag: {
    ar: 'لماذا تاسيلا بيو؟',
    fr: 'Pourquoi Tassila Bio ?',
    en: 'Why Tassila Bio?'
  },
  values_header_title: {
    ar: 'قيم وأمانة نحافظ عليها في كل منتج',
    fr: 'Des valeurs et une intégrité préservées dans chaque produit',
    en: 'Values and integrity we preserve in every product'
  },
  values_header_desc: {
    ar: 'ألتزم بتقديم الأفضل لعائلتك من خلال الإنتاج البيتي المسؤول والصادق والمستدام.',
    fr: 'Je m’engage à offrir le meilleur à votre famille grâce à une production artisanale, honnête et durable.',
    en: 'I am committed to delivering the very best to your family through responsible, honest, and sustainable home crafting.'
  },
  value_1_title: {
    ar: 'شغف وحرفة يدوية',
    fr: 'Passion & Savoir-faire',
    en: 'Passion & Handcrafting'
  },
  value_1_desc: {
    ar: 'أحضر وأعبئ كل منتج بيدي من منزلي بكل أمانة وشغف لأضمن جودة تليق بذوقكم الرفيع.',
    fr: 'Je prépare et conditionne chaque produit de mes propres mains avec soin pour garantir une qualité digne de vous.',
    en: 'I prepare and package each product with my own hands from my home with honesty and passion to ensure top-tier quality.'
  },
  value_2_title: {
    ar: 'تضامن مباشر وتجارة عادلة',
    fr: 'Soutien & Commerce Équitable',
    en: 'Direct Solidarity & Fair Trade'
  },
  value_2_desc: {
    ar: 'أتعامل بشكل شخصي ومباشر مع تعاونيات نسائية في سوس ومربي النحل في الأطلس لدعم عائلاتهم.',
    fr: 'Je travaille en direct avec des coopératives de femmes dans le Souss et des apiculteurs de l’Atlas pour soutenir leurs familles.',
    en: 'I work personally and directly with women’s cooperatives in Souss and Atlas beekeepers to support their families.'
  },
  value_3_title: {
    ar: 'نقاء طبيعي مطلق',
    fr: 'Pureté Absolue',
    en: 'Absolute Natural Purity'
  },
  value_3_desc: {
    ar: 'جميع منتجاتي بكر، غير مصفاة كيميائياً، خالية تماماً من المواد الحافظة والسكر المضاف والملونات.',
    fr: 'Tous mes produits sont vierges, non filtrés chimiquement, sans conservateurs, colorants ou sucres ajoutés.',
    en: 'All my products are virgin, unfiltered, and entirely free of preservatives, added sugar, and artificial coloring.'
  },
  value_4_title: {
    ar: 'إرث عائلي موروث',
    fr: 'Héritage Familial',
    en: 'Inherent Family Legacy'
  },
  value_4_desc: {
    ar: 'أتبع نفس الوصفات والطرق التقليدية التي ورثتها عن عائلتي لحفظ الطعم والفوائد الصحية الأصلية.',
    fr: 'Je perpétue les mêmes recettes traditionnelles héritées de ma famille pour préserver le goût et les bienfaits authentiques.',
    en: 'I follow the exact traditional recipes inherited from my family to preserve the genuine taste and health benefits.'
  },

  badge_1_title: {
    ar: 'طبيعي 100% وعضوي',
    fr: '100% Naturel & Bio',
    en: '100% Natural & Organic'
  },
  badge_1_desc: {
    ar: 'خالٍ تماماً من السكر المضاف والمواد الكيميائية الحافظة والمصنعة.',
    fr: 'Totalement sans sucres ajoutés, conservateurs ou additifs chimiques.',
    en: 'Completely free of added sugar, preservatives, or artificial additives.'
  },
  badge_2_title: {
    ar: 'تحضير منزلي وتعبئة يدوية',
    fr: 'Préparation Maison',
    en: 'Handcrafted & Home-bottled'
  },
  badge_2_desc: {
    ar: 'نعقم الأواني ونعبئ كل منتج بيدينا قطعة بقطعة بكل أمانة وحرص.',
    fr: 'Nous stérilisons les contenants et mettons en pot chaque produit à la main.',
    en: 'We sterilize and hand-bottle each product one by one with utmost care.'
  },
  badge_3_title: {
    ar: 'مفحوص ومضمون مخبرياً',
    fr: 'Qualité Labo Certifiée',
    en: 'Certified & Tested'
  },
  badge_3_desc: {
    ar: 'جميع أنواع العسل تخضع لتحاليل مخبرية دقيقة لتأكيد نقائها وجودتها.',
    fr: 'Tous nos miels sont analysés en laboratoire pour certifier leur pureté.',
    en: 'All our honey varieties are laboratory tested to confirm their raw purity.'
  },
  badge_4_title: {
    ar: 'شحن سريع لجميع مدن المغرب',
    fr: 'Expédition Express',
    en: 'Express Shipping'
  },
  badge_4_desc: {
    ar: 'نوصل طلبك لغاية باب البيت والدفع عند الاستلام والمعاينة.',
    fr: 'Livraison directe à domicile avec paiement et vérification à la livraison.',
    en: 'Direct home delivery with cash on delivery and product verification.'
  },

  // Story Teaser (Homepage)
  story_teaser_subtitle: {
    ar: 'شغف العائلة والأمانة في الإنتاج',
    fr: 'Passion familiale & Engagement d\'intégrité',
    en: 'Family Passion & Commitment of Integrity'
  },
  story_teaser_title: {
    ar: 'حكايتنا مع كنوز الأرض الطيبة',
    fr: 'Notre histoire avec les trésors du terroir',
    en: 'Our story with the treasures of the land'
  },
  story_teaser_desc_1: {
    ar: 'نشأت عائلتنا في أحضان ريف المغرب الخصب، حيث كان عسل النحل وزيت الأركان عهداً يومياً للصحة والبركة. أسسنا تاسيلا بيو لنشارك معكم هذه الأمانة العائلية.',
    fr: 'Notre famille a grandi dans les campagnes marocaines, où le miel et l\'argan sont synonymes de bien-être quotidien. Nous partageons ce secret avec vous.',
    en: 'Our family grew up in the fertile Moroccan countryside, where honey and argan oil were a daily covenant of health. We share this family trust with you.'
  },
  story_teaser_desc_2: {
    ar: 'كل برطمان يمر عبر أيدينا: من عصر الأركان التجميلي على البارد إلى طحن الأملو بالرحى التقليدية وتعبئته يدوياً دون أي إضافات اصطناعية.',
    fr: 'Chaque pot passe entre nos mains : du pressage à froid de l\'argan au meulage traditionnel de l\'Amlou et au conditionnement manuel soigné.',
    en: 'Every jar passes through our hands: from cold-pressing argan to stone-grinding Amlou and carefully bottling it manually with no additives.'
  },
  story_teaser_cta: {
    ar: 'اكتشف قصتنا الكاملة وصور الكواليس',
    fr: 'Lire toute notre histoire et voir les coulisses',
    en: 'Read our full story and view the backstage'
  },

  // Gallery Section
  gallery_header_tag: {
    ar: 'ألبوم كواليسنا',
    fr: 'Aperçu des Coulisses',
    en: 'Our Backstage Gallery'
  },
  gallery_header_title: {
    ar: 'رحلة إنتاج طبيعية من قلب الطبيعة المغربية',
    fr: 'Un voyage au cœur de la production naturelle marocaine',
    en: 'A natural production journey from the heart of Morocco'
  },
  gallery_header_desc: {
    ar: 'صور حقيقية تروي قصة الأرض والعمل المخلص لتقديم منتجات طبيعية نقية 100%.',
    fr: 'Des images authentiques qui racontent l’histoire de la terre et du travail dévoué pour des produits 100% purs.',
    en: 'Genuine photos telling the story of the land and faithful work to deliver 100% pure natural products.'
  },

  // About View (My Story)
  about_tag: {
    ar: 'قصتي وشغفي',
    fr: 'Mon Histoire & Ma Passion',
    en: 'My Story & Passion'
  },
  about_title: {
    ar: 'حكاية وأصالة "تاسيلا بيو"',
    fr: 'L’authenticité et l’origine de "Tassila Bio"',
    en: 'The authenticity and origin of "Tassila Bio"'
  },
  about_subtitle: {
    ar: 'كيف تحول الشغف بالمنزل إلى عهد لتقديم أنقى منتجات الأرض والخيرات الطبيعية',
    fr: 'Comment la passion à la maison est devenue un engagement à offrir le meilleur du terroir',
    en: 'How home passion turned into a commitment to deliver the earth’s purest blessings'
  },
  about_p1_heading: {
    ar: 'البداية.. من قلب الأطلس وسوس الدافئ',
    fr: 'Le début.. du cœur de l’Atlas et du Souss chaleureux',
    en: 'The beginning.. from the heart of Atlas and warm Souss'
  },
  about_p1_text: {
    ar: 'اسمي يوسف، وقد نشأت في كنف عائلة سوسية مغربية عريقة، حيث كان العسل الطبيعي الحر وزيت الأركان النقي يمثلان أساس الحياة اليومية والشفاء والبركة. لطالما شاهدت أبي وهو يربي النحل في الأطلس وجبال الأندلس، ويتعلم أسرار جني العسل في الفصول المناسبة دون إيذاء النحل أو تخريب البيئة.',
    fr: 'Je m’appelle Youssef. J’ai grandi au sein d’une authentique famille marocaine du Souss, où le miel naturel pur et l’huile d’argan représentaient le cœur de la vie quotidienne, de la guérison et de la bénédiction. J’ai toujours vu mon père élever des abeilles dans l’Atlas, apprenant les secrets de récolte respectueux du rythme de la nature.',
    en: 'My name is Youssef, and I grew up in an ancient Moroccan Souss family, where pure natural honey and pure argan oil were the cornerstones of daily life, healing, and blessing. I watched my father raise bees in the Atlas mountains, learning the secrets of harvesting at the right seasons without harming the bees or the environment.'
  },
  about_p2_heading: {
    ar: 'تأصيل الأمانة والإنتاج البيتي المستدام',
    fr: 'Ancrer l’intégrité et la production artisanale durable',
    en: 'Establishing integrity and sustainable home-crafting'
  },
  about_p2_text: {
    ar: 'عندما أسست "تاسيلا بيو"، كان هدفي بسيطاً وواضحاً: إعادة ربط عائلات المدن بجذورهم الطبيعية، وتوفير منتج طبيعي وبكر 100% يحمل أمانتي وتوقيعي الشخصي. لا نستخدم أي آلات إنتاج ضخمة أو فلاتر كيميائية تغير خواص العسل وزيت الأركان، بل نعتمد على الضغط والتعصير التقليدي على البارد وتعبئة الأواني المنزلية المعقمة بحرص شديد قطعة بقطعة.',
    fr: 'Lorsque j’ai fondé "Tassila Bio", mon objectif était simple et clair : reconnecter les familles urbaines à leurs racines naturelles, et fournir un produit 100% naturel et vierge portant ma propre signature et ma garantie d’intégrité. Nous n’utilisons pas de machines industrielles massives ni de filtres chimiques qui altèrent les propriétés des miels ou de l’argan.',
    en: 'When I founded "Tassila Bio", my goal was simple and clear: to reconnect city families to their natural roots, and provide a 100% natural, virgin product carrying my personal integrity. We do not use massive industrial machinery or chemical filters that change honey and argan’s natural properties. Instead, we rely on cold-press and careful handcrafted bottling.'
  },
  about_quote: {
    ar: '"أملو والعسل وزيت الأركان ليست مجرد سلع تجارية بالنسبة لي، بل هي أمانة صحية وغذائية، وواجب وطني لحفظ موروث أجدادنا ومشاركة خيرات بلدنا مع عائلاتكم بكل صدق وأمانة."',
    fr: '"L’Amlou, le miel et l’huile d’argan ne sont pas de simples marchandises pour moi, mais une responsabilité de santé, de nutrition et un devoir de préserver l’héritage de nos ancêtres avec intégrité."',
    en: '"Amlou, honey, and argan oil are not mere commodities to me, but a health and nutritional trust, and a national duty to preserve our ancestors’ heritage and share our land’s blessings with your families with complete honesty."'
  },
  about_p3_heading: {
    ar: 'شركاء الأرض: دعم التعاونيات النسائية',
    fr: 'Partenaires de la terre : Soutien aux coopératives de femmes',
    en: 'Partners of the Land: Supporting Women’s Cooperatives'
  },
  about_p3_text: {
    ar: 'إننا فخورون بأن كل قنينة أركان تشتريها تساهم بشكل مباشر في دعم التعاونيات النسائية التقليدية في منطقة تارودانت وتزنيت بسوس، حيث تقوم السيدات بفرز حبات الأركان وتكسيرها يدوياً بكل مهارة. هذا العمل المشترك يضمن لهن دخلاً عادلاً ومستداماً يحفظ كرامتهن ويعيل أطفالهن. نعدكم بأن نظل أوفياء لهذه القيم، وأن يظل عهد "تاسيلا بيو" دائماً: نقاء مطلق، أمانة من البداية حتى وصول الطلب لبيتك.',
    fr: 'Nous sommes fiers que chaque bouteille d’argan que vous achetez soutienne directement des coopératives de femmes traditionnelles de Taroudant et Tiznit dans le Souss, assurant un revenu équitable. Nous promettons de rester fidèles à ces valeurs : pureté absolue et intégrité totale du terroir jusqu’à chez vous.',
    en: 'We are proud that every bottle of argan you buy directly supports traditional women’s cooperatives in Taroudant and Tiznit in Souss, where women skillfully crack argan nuts by hand. This ensures a fair and sustainable income. We promise to stay true to these values: absolute purity and integrity from the start until the order reaches your home.'
  },

  about_hero_subtitle: {
    ar: 'أصالة وشغف مغربي موروث',
    fr: 'Authenticité & Passion Marocaine',
    en: 'Authentic Moroccan Heritage & Passion'
  },
  about_hero_title: {
    ar: 'حكاية وأصالة تاسيلا بيو',
    fr: "L'Histoire et l'Authenticité de Tassila Bio",
    en: 'The Story & Authenticity of Tassila Bio'
  },
  about_hero_desc: {
    ar: 'تأسست تاسيلا بيو على عهد تقديم أنقى منتجات الأرض والخيرات الطبيعية من منزلي إلى بيتك بكل حب وأمانة.',
    fr: 'Tassila Bio est née de l\'engagement de vous offrir le meilleur du terroir marocain, préparé maison avec amour.',
    en: 'Tassila Bio was born from the commitment to offer you the finest of Moroccan terroir, prepared at home with love.'
  },
  about_story_ribbon: {
    ar: 'حكاية الأرض والأمانة',
    fr: 'L\'histoire de la terre et de l\'éthique',
    en: 'The Story of the Land & Ethics'
  },
  about_story_title: {
    ar: 'من خيرات الأطلس وسوس الدافئ',
    fr: "Des bienfaits de l'Atlas et du Souss",
    en: 'From the blessings of Atlas and Souss'
  },
  about_story_desc_1: {
    ar: 'اسمي يوسف، وقد نشأت في كنف عائلة سوسية مغربية عريقة، حيث كان العسل الطبيعي الحر وزيت الأركان النقي يمثلان أساس الحياة اليومية والشفاء والبركة. لطالما شاهدت أبي يربي النحل في سوس ويحرص على جني المنتجات الطبيعية في مواسمها دون الإضرار بالبيئة.',
    fr: 'Je m\'appelle Youssef. J\'aimerais partager avec vous notre héritage familial soussi marocain, où le miel naturel et l\'huile d\'argan étaient le centre de la guérison et du bien-être quotidien, inspiré par mon père qui élevait ses propres abeilles dans le Souss et veillait à récolter les produits naturels en saison sans nuire à l\'environnement.',
    en: 'My name is Youssef, and I grew up in an authentic Moroccan Souss family, where pure natural honey and argan oil were the heart of daily life. I watched my father raise bees in Souss and make sure to harvest natural products in their seasons without harming the environment.'
  },
  about_story_desc_2: {
    ar: 'عندما أسست تاسيلا بيو، كان هدفي بسيطاً وواضحاً: توفير منتج طبيعي وبكر 100٪ يحمل توقيعي الشخصي وضمان الأمانة الكاملة. لا نستخدم آلات صناعية تغير خواص الطبيعة، بل نعتمد على العصر والكبس التقليدي على البارد وتعبئة الأواني المنزلية المعقمة بحرص شديد قطعة بقطعة.',
    fr: 'En fondant Tassila Bio, mon but était de reconnecter les citadins à la nature avec des produits 100% naturels et vierges signés de ma main. Sans machines industrielles altérant la qualité, nous pressons à froid et mettons en pots de manière stérile.',
    en: 'In founding Tassila Bio, my goal was to reconnect city dwellers to nature with 100% natural, virgin products signed by my hand. Without industrial machinery altering quality, we cold-press and bottle in a sterile home setting.'
  },
  about_values_ribbon: {
    ar: 'مبادئنا الراسخة',
    fr: 'Nos principes fondamentaux',
    en: 'Our strong principles'
  },
  about_values_title: {
    ar: 'قيم وأمانة نحافظ عليها في كل منتج',
    fr: 'Des valeurs et une intégrité préservées',
    en: 'Values and integrity we preserve in every product'
  },
  about_val_1_title: {
    ar: 'شغف وحرفة يدوية',
    fr: 'Passion & Savoir-faire',
    en: 'Passion & Craftsmanship'
  },
  about_val_1_desc: {
    ar: 'أحضر وأعبئ كل منتج بيدي من منزلي بكل أمانة وشغف لأضمن جودة تليق بذوقكم الرفيع.',
    fr: 'Je prépare et conditionne chaque produit de mes propres mains avec soin pour garantir une qualité digne de vous.',
    en: 'I prepare and bottle every product with my own hands with care to guarantee a quality worthy of your taste.'
  },
  about_val_2_title: {
    ar: 'تضامن مباشر وتجارة عادلة',
    fr: 'Soutien & Commerce Équitable',
    en: 'Direct Solidarity & Fair Trade'
  },
  about_val_2_desc: {
    ar: 'أتعامل بشكل شخصي ومباشر مع تعاونيات نسائية في سوس ومربي النحل في الأطلس لدعم عائلاتهم.',
    fr: 'Je travaille en direct avec des coopératives de femmes dans le Souss et des apiculteurs de l\'Atlas pour soutenir leurs familles.',
    en: 'I work personally and directly with women\'s cooperatives in Souss and Atlas beekeepers to support their families.'
  },
  about_val_3_title: {
    ar: 'نقاء طبيعي مطلق',
    fr: 'Pureté Absolue',
    en: 'Absolute Purity'
  },
  about_val_3_desc: {
    ar: 'جميع منتجاتي بكر، غير مصفاة كيميائيًا، خالية تمامًا من المواد الحافظة والسكر المضاف والملونات.',
    fr: 'Tous mes produits sont vierges, non filtrés chimiquement, sans conservateurs, colorants ou sucres ajoutés.',
    en: 'All my products are virgin, unfiltered, and entirely free of preservatives, added sugar, and artificial coloring.'
  },
  about_val_4_title: {
    ar: 'إرث عائلي موروث',
    fr: 'Héritage Familial',
    en: 'Inherent Family Legacy'
  },
  about_val_4_desc: {
    ar: 'أتبع نفس الوصفات والطرق التقليدية التي ورثتها عن عائلتي لحفظ الطعم والفوائد الصحية الأصلية.',
    fr: 'Je perpétue les mêmes recettes traditionnelles héritées de ma famille pour préserver le goût et les bienfaits authentiques.',
    en: 'I follow the exact traditional recipes inherited from my family to preserve the genuine taste and health benefits.'
  },
  about_gallery_ribbon: {
    ar: 'ألبوم الذكريات والكواليس',
    fr: 'Album souvenirs & coulisses',
    en: 'Souvenirs & Backstage Album'
  },
  about_gallery_title: {
    ar: 'رحلة إنتاج طبيعية من قلب الطبيعة المغربية',
    fr: 'Un voyage au cœur de la production marocaine',
    en: 'A production journey from the heart of Morocco'
  },
  about_gallery_desc: {
    ar: 'صور حقيقية تروي قصة الأرض والعمل المخلص لتقديم منتجات طبيعية نقية 100%.',
    fr: 'Des images authentiques racontant l\'histoire de la terre et du travail dévoué pour des produits 100% purs.',
    en: 'Genuine photos telling the story of the land and faithful work to deliver 100% pure products.'
  },

  // Contact / Ordering View
  contact_header_tag: {
    ar: 'اتصال مباشر وسريع',
    fr: 'Commande Directe & Rapide',
    en: 'Direct & Fast Order'
  },
  contact_header_title: {
    ar: 'تواصل معنا واطلب الآن',
    fr: 'Contactez-nous & Commandez',
    en: 'Contact Us & Place Your Order'
  },
  contact_header_desc: {
    ar: 'الطلب عبر دكاني مباشر وسهل للغاية. املأ استمارة طلب الكنز الطبيعي أدناه وسأتواصل معكم شخصياً عبر الهاتف لتأكيد طلبيتك وتنسيق عملية الشحن المباشر الآمن إلى منزلك.',
    fr: 'Commander sur ma boutique est simple et direct. Remplissez le formulaire ci-dessous et je vous contacterai personnellement par téléphone pour confirmer et coordonner la livraison à domicile.',
    en: 'Ordering on my shop is simple and direct. Fill out the order form below and I will contact you personally by phone to confirm your order and coordinate secure delivery straight to your doorstep.'
  },
  contact_form_title: {
    ar: 'طلب مباشر بالدفع عند الاستلام',
    fr: 'Commande Directe - Paiement à la Livraison',
    en: 'Direct Order - Cash on Delivery'
  },
  contact_form_back: {
    ar: 'الرجوع لمعرض المنتجات',
    fr: 'Retour à la boutique',
    en: 'Back to products'
  },
  contact_field_name: {
    ar: 'الاسم الكامل الكريم',
    fr: 'Nom Complet',
    en: 'Full Name'
  },
  contact_field_name_placeholder: {
    ar: 'مثال: أحمد الإدريسي',
    fr: 'Ex: Jean Dupont',
    en: 'e.g. John Doe'
  },
  contact_field_phone: {
    ar: 'رقم الهاتف للتواصل وتأكيد الشحن',
    fr: 'Numéro de Téléphone (Confirmation)',
    en: 'Phone Number (For Confirmation)'
  },
  contact_field_phone_placeholder: {
    ar: 'مثال: 0626505050',
    fr: 'Ex: 0626505050',
    en: 'e.g. 0626505050'
  },
  contact_field_product: {
    ar: 'المنتج والحجم المطلوب تجريبه',
    fr: 'Produit et format souhaité',
    en: 'Desired product and size'
  },
  contact_field_quantity: {
    ar: 'الكمية المطلوبة',
    fr: 'Quantité',
    en: 'Quantity'
  },
  contact_field_message: {
    ar: 'ملاحظات خاصة بالشحن وعنوان التوصيل (اختياري)',
    fr: 'Instructions de livraison & adresse complète (Optionnel)',
    en: 'Delivery notes & full shipping address (Optional)'
  },
  contact_field_message_placeholder: {
    ar: 'يرجى كتابة عنوانك بالتفصيل هنا لتسهيل وسرعة عمل المندوب...',
    fr: 'Veuillez saisir votre adresse détaillée pour faciliter la livraison...',
    en: 'Please type your detailed shipping address here for fast delivery...'
  },
  contact_validation_name: {
    ar: 'يرجى إدخال الاسم الكامل لضمان جودة التسليم.',
    fr: 'Veuillez saisir votre nom complet.',
    en: 'Please enter your full name.'
  },
  contact_validation_phone: {
    ar: 'يرجى إدخال رقم الهاتف للتواصل وتأكيد الشحن.',
    fr: 'Veuillez saisir un numéro de téléphone valide.',
    en: 'Please enter a valid phone number.'
  },
  contact_validation_qty: {
    ar: 'يرجى اختيار كمية لا تقل عن قطعة واحدة.',
    fr: 'La quantité doit être supérieure à 0.',
    en: 'Quantity must be 1 or more.'
  },
  contact_validation_cart_empty: {
    ar: 'سلة التسوق فارغة، يرجى إضافة منتجات أولاً.',
    fr: 'Votre panier est vide. Veuillez ajouter des produits.',
    en: 'Your shopping cart is empty. Please add products first.'
  },
  contact_shipping_cost: {
    ar: 'تكلفة الشحن الآمن والخدمة للمدن',
    fr: 'Frais de livraison à domicile',
    en: 'Secure home shipping cost'
  },
  contact_free_shipping: {
    ar: 'شحن مجاني',
    fr: 'Gratuit',
    en: 'Free shipping'
  },
  contact_total_amount: {
    ar: 'المجموع الكلي المطلوب عند الاستلام',
    fr: 'Montant Total à Payer à la Livraison',
    en: 'Total Amount to Pay on Delivery'
  },
  contact_submit_btn: {
    ar: 'تأكيد وحفظ الطلب الفوري',
    fr: 'Confirmer la Commande',
    en: 'Confirm & Place Order'
  },
  contact_trust_title: {
    ar: 'أمانة تضمن ثقتكم الغالية',
    fr: 'Une intégrité qui garantit votre confiance',
    en: 'Integrity that guarantees your trust'
  },
  contact_trust_item1_title: {
    ar: 'عسل طبيعي مضمون 100%',
    fr: 'Miel Naturel Garanti 100%',
    en: '100% Guaranteed Natural Honey'
  },
  contact_trust_item1_desc: {
    ar: 'خضع للفحص الدقيق والتحليلات المختبرية لضمان خلوه المطلق من السكر الاصطناعي والمواد الحافظة.',
    fr: 'Analysé rigoureusement en laboratoire pour garantir l’absence totale de sucres ajoutés ou de conservateurs.',
    en: 'Rigorously laboratory tested to guarantee absolute freedom from artificial sugars or preservatives.'
  },
  contact_trust_item2_title: {
    ar: 'التعصير البكر على البارد',
    fr: 'Pression à Froid de Luxe',
    en: 'Cold-pressed Extra Virgin'
  },
  contact_trust_item2_desc: {
    ar: 'يتم تعصير زيت الأركان ميكانيكياً بدون استخدام حرارة أو مذيبات لحفظ كامل الفيتامينات والمعادن المغذية.',
    fr: 'L’huile d’argan est extraite mécaniquement sans chaleur pour préserver toutes ses vitamins nourrissantes.',
    en: 'Argan oil is extracted mechanically without heat or chemicals to preserve all natural nourishing vitamins.'
  },
  contact_trust_item3_title: {
    ar: 'تحضير بيتي معقم بدقة',
    fr: 'Préparation Maison Ultra-Propre',
    en: 'Meticulous Home Packaging'
  },
  contact_trust_item3_desc: {
    ar: 'أقوم بتحضير وتعبئة كل منتج بنفسي من المطبخ البيتي المعقم بظروف رعاية تامة كأنها لعائلتي الشخصية.',
    fr: 'Je prépare et conditionne chaque bocal moi-même dans un environnement familial stérile avec un soin infini.',
    en: 'I prepare and bottle every product myself in a sterile home setting with the same care as for my own family.'
  },

  contact_error_name: {
    ar: 'يرجى إدخال الاسم الكامل لضمان دقة توصيل الطلب.',
    fr: 'Veuillez entrer votre nom complet pour la livraison.',
    en: 'Please enter your full name for accurate delivery.'
  },
  contact_whatsapp_chat_prefill: {
    ar: 'السلام عليكم أخي يوسف، قمت بتقديم طلب عبر الموقع وأريد تأكيد الطلبية.',
    fr: 'Bonjour Youssef, je viens de passer commande sur le site et je souhaite la confirmer.',
    en: 'Hello Youssef, I just placed an order on the website and I want to confirm it.'
  },
  contact_subtitle: {
    ar: 'خطوة واحدة تفصلك عن كنزك الطبيعي',
    fr: 'Plus qu\'une étape pour obtenir votre trésor',
    en: 'Just one step away from your natural treasure'
  },
  contact_title_banner: {
    ar: 'استمارة الطلب المباشر الفوري',
    fr: 'Formulaire de Commande Directe',
    en: 'Direct Instant Order Form'
  },
  contact_desc: {
    ar: 'الطلب بسيط وسريع للغاية. املأ بياناتك أدناه وسأتواصل معكم شخصياً عبر الهاتف لتأكيد طلبيتك وتنسيق عملية الشحن المباشر والآمن لغاية باب بيتك.',
    fr: 'Commander est simple et rapide. Remplissez vos coordonnées ci-dessous et je vous contacterai personnellement par téléphone pour confirmer et coordonner la livraison.',
    en: 'Ordering is simple and quick. Fill in your details below and I will personally contact you by phone to confirm your order and coordinate home delivery.'
  },
  contact_notes_label: {
    ar: 'عنوان التوصيل المفصل وملاحظات الشحن',
    fr: 'Adresse de livraison détaillée & instructions',
    en: 'Detailed shipping address & delivery notes'
  },
  contact_notes_placeholder: {
    ar: 'مثال: زنقة الحرية، عمارة 5، شقة 12، حي الرياض، الرباط (يرجى كتابة العنوان بالتفصيل لتسهيل عمل مندوب التوصيل)...',
    fr: 'Ex: Rue de la Liberté, Immeuble 5, Appt 12, Hay Riad, Rabat. Veuillez détailler pour faciliter la livraison...',
    en: 'e.g. 12 Liberty Street, Appt 5, Hay Riad, Rabat. Please write in detail to assist the delivery driver...'
  },
  contact_full_name_label: {
    ar: 'الاسم الكامل الكريم',
    fr: 'Nom Complet',
    en: 'Full Name'
  },
  contact_name_placeholder: {
    ar: 'مثال: أحمد الإدريسي',
    fr: 'Ex: Ahmed El Idrissi',
    en: 'e.g. Ahmed El Idrissi'
  },
  contact_items_ordered_label: {
    ar: 'المنتجات التي اخترتها',
    fr: 'Produits sélectionnés',
    en: 'Your selected products'
  },
  contact_optional: {
    ar: 'اختياري',
    fr: 'Optionnel',
    en: 'Optional'
  },
  contact_invoice_title: {
    ar: 'ملخص الفاتورة والحساب',
    fr: 'Résumé de la facture',
    en: 'Invoice Summary'
  },
  contact_cancel: {
    ar: 'إلغاء والعودة للمتجر',
    fr: 'Annuler et retourner',
    en: 'Cancel and return'
  },
  contact_confirm_order_btn: {
    ar: 'تأكيد الطلب الفوري الآن',
    fr: 'Confirmer la commande maintenant',
    en: 'Confirm Instant Order Now'
  },
  contact_cod_guarantee: {
    ar: '🤝 الدفع عند الاستلام متاح 100٪. عاين منتجاتك وتأكد من جودتها العالية قبل الدفع.',
    fr: '🤝 Paiement 100% à la livraison. Vérifiez la qualité de vos produits avant de payer.',
    en: '🤝 100% Cash on Delivery. Inspect your products and check their high quality before paying.'
  },
  contact_wa_card_title: {
    ar: 'محادثة مباشرة عبر الواتساب',
    fr: 'Discussion WhatsApp Directe',
    en: 'Direct WhatsApp Discussion'
  },
  contact_wa_card_desc: {
    ar: 'هل تفضل الطلب مباشرة بالتحدث معنا؟ اضغط هنا لبدء محادثة فورية وتسهيل طلبك.',
    fr: 'Vous préférez commander directement en discutant ? Cliquez ici pour lancer WhatsApp.',
    en: 'Prefer to order by directly chatting with us? Click here to start a WhatsApp chat.'
  },
  contact_wa_card_cta: {
    ar: 'تحدث معي على الواتساب',
    fr: 'Discuter sur WhatsApp',
    en: 'Chat with me on WhatsApp'
  },
  contact_email_card_title: {
    ar: 'البريد الإلكتروني الرسمي',
    fr: 'Email Officiel',
    en: 'Official Email'
  },
  contact_email_card_desc: {
    ar: 'للاستفسارات التجارية، طلبات الجملة أو التعاون، يرجى مراسلتنا في أي وقت.',
    fr: 'Pour les demandes commerciales, de gros ou de partenariat, écrivez-nous.',
    en: 'For business inquiries, wholesale, or partnership, write to us.'
  },
  contact_guarantee_title: {
    ar: 'ضمان تاسيلا بيو الذهبي للنقاء',
    fr: 'La Garantie Pureté Or de Tassila Bio',
    en: 'Tassila Bio Golden Purity Guarantee'
  },
  contact_guarantee_desc: {
    ar: 'جميع منتجاتنا طبيعية وبكر وخام 100٪. نضمن جودتها التامة، وإذا ثبت مخبرياً غير ذلك، نسترجع منتجاتنا فوراً ونعيد لك كامل نقودك.',
    fr: 'Tous nos produits sont 100% naturels et vierges. Si une analyse prouve le contraire, nous vous remboursons intégralement.',
    en: 'All our products are 100% natural and virgin. If a laboratory analysis proves otherwise, we will fully refund you.'
  },
  contact_privacy_tip: {
    ar: 'خصوصية بياناتك آمنة ومحمية بالكامل ولا يتم مشاركتها أبداً.',
    fr: 'Vos données personnelles sont protégées, sécurisées et jamais partagées.',
    en: 'Your personal data is fully protected, secured, and never shared.'
  },
  contact_back_to_catalog: {
    ar: 'العودة لمعرض المنتجات',
    fr: 'Retour au catalogue',
    en: 'Back to Catalog'
  },

  // Success screen
  success_title: {
    ar: 'تم تسجيل طلبيتك بنجاح!',
    fr: 'Votre commande a été enregistrée !',
    en: 'Order Placed Successfully!'
  },
  success_desc: {
    ar: 'لقد تلقينا طلبكم وحفظناه في نظامنا الآمن. تم فتح محادثة الواتساب تلقائياً لإرسال تفاصيل الفاتورة مباشرة للطلب والبدء في إجراءات الشحن الفوري.',
    fr: 'Nous avons bien reçu votre commande. Une discussion WhatsApp s’ouvre automatiquement pour vous envoyer le reçu de votre commande et lancer l’expédition immédiate.',
    en: 'We have received your order. A WhatsApp chat opens automatically to send you your order receipt details and initiate immediate shipping.'
  },
  success_invoice_title: {
    ar: 'تفاصيل طلبيتك المسجلة',
    fr: 'Détails de Votre Commande',
    en: 'Registered Order Details'
  },
  success_client_name: {
    ar: 'الاسم الكريم',
    fr: 'Client',
    en: 'Customer Name'
  },
  success_phone_label: {
    ar: 'الهاتف',
    fr: 'Téléphone',
    en: 'Phone'
  },
  success_phone_whatsapp_ok: {
    ar: 'مباشر وتلقائي عبر الواتساب',
    fr: 'Direct et automatique via WhatsApp',
    en: 'Direct & automatic via WhatsApp'
  },
  success_order_items: {
    ar: 'المنتجات المطلوبة',
    fr: 'Produits Commandés',
    en: 'Ordered Items'
  },
  success_item_qty: {
    ar: 'الكمية',
    fr: 'Quantité',
    en: 'Quantity'
  },
  success_total_with_shipping: {
    ar: 'المجموع المطلوب (الشحن متضمن)',
    fr: 'Total à payer (Livraison incluse)',
    en: 'Total due (Shipping included)'
  },
  success_whatsapp_btn: {
    ar: 'اضغط هنا لإرسال الفاتورة للواتساب يدوياً',
    fr: 'Cliquez ici pour envoyer le reçu sur WhatsApp',
    en: 'Click here to send invoice to WhatsApp manually'
  },
  success_whatsapp_hint: {
    ar: '💡 إذا لم يفتح الواتساب معك تلقائياً، اضغط على الزر الأخضر أعلاه لإرسال الفاتورة مباشرة للمشرف وتسريع الشحن!',
    fr: '💡 Si WhatsApp ne s’ouvre pas tout seul, cliquez sur le bouton vert ci-dessus pour envoyer le reçu au gérant !',
    en: '💡 If WhatsApp doesn’t open automatically, click the green button above to send the receipt and speed up shipping!'
  },
  success_btn_home: {
    ar: 'العودة للمعرض الرئيسي',
    fr: 'Retour à la page d’accueil',
    en: 'Back to Main Store'
  },
  success_btn_again: {
    ar: 'تقديم طلب جديد آخر',
    fr: 'Passer une nouvelle commande',
    en: 'Place another order'
  },
  success_invoice_details: {
    ar: 'تفاصيل فاتورة الطلب',
    fr: 'Détails de la facture',
    en: 'Order Invoice Details'
  },
  success_invoice_name: {
    ar: 'اسم العميل',
    fr: 'Nom du client',
    en: 'Customer Name'
  },
  success_invoice_status: {
    ar: 'حالة الطلب',
    fr: 'Statut de la commande',
    en: 'Order Status'
  },
  success_invoice_wa_confirm: {
    ar: 'قيد التأكيد الهاتفي / الواتساب',
    fr: 'En attente de confirmation WhatsApp / Téléphone',
    en: 'Awaiting WhatsApp / Phone confirmation'
  },
  success_invoice_products: {
    ar: 'المنتجات المطلوبة',
    fr: 'Produits commandés',
    en: 'Ordered Products'
  },
  success_invoice_total: {
    ar: 'المجموع الكلي المطلوب عند الاستلام',
    fr: 'Montant total dû à la livraison',
    en: 'Total amount due on delivery'
  },
  success_wa_btn_manual: {
    ar: 'أرسل الفاتورة للواتساب الآن لتسريع الشحن',
    fr: 'Envoyer le reçu sur WhatsApp pour accélérer l\'envoi',
    en: 'Send invoice to WhatsApp now to speed up shipping'
  },
  success_wa_btn_tip: {
    ar: '💡 إذا لم يفتح الواتساب معك تلقائياً، اضغط على الزر الأخضر أعلاه لإرسال تفاصيل الفاتورة مباشرة للمشرف والبدء في تجهيز شحنتك.',
    fr: '💡 Si WhatsApp ne s\'ouvre pas tout seul, cliquez sur le bouton vert ci-dessus pour envoyer les détails au gérant et lancer l\'expédition.',
    en: '💡 If WhatsApp doesn\'t open automatically, click the green button above to send the details to the manager and start preparing your shipment.'
  },
  success_back_home: {
    ar: 'العودة للمعرض الرئيسي',
    fr: "Retour à l'accueil",
    en: 'Back to Home Store'
  },
  success_order_new: {
    ar: 'تقديم طلب جديد آخر',
    fr: 'Passer une autre commande',
    en: 'Place another order'
  },

  // Cart Component
  cart_title: {
    ar: 'سلة الشراء',
    fr: 'Votre Panier',
    en: 'Shopping Cart'
  },
  cart_empty: {
    ar: 'سلة الشراء فارغة حالياً!',
    fr: 'Votre panier est vide !',
    en: 'Your shopping cart is empty!'
  },
  cart_empty_cta: {
    ar: 'تصفح المنتجات وأضف كنزاً طبيعياً لسلّتك',
    fr: 'Parcourez la boutique pour ajouter un trésor naturel',
    en: 'Browse products and add a natural treasure'
  },
  cart_items_count: {
    ar: 'منتجات مضافة',
    fr: 'articles ajoutés',
    en: 'items added'
  },
  cart_add_to: {
    ar: 'أضف إلى السلة',
    fr: 'Ajouter au Panier',
    en: 'Add to Cart'
  },
  cart_added_toast: {
    ar: 'تمت الإضافة للسلة بنجاح! 🛒✨',
    fr: 'Ajouté au panier avec succès ! 🛒✨',
    en: 'Added to cart successfully! 🛒✨'
  },
  cart_added_success: {
    ar: 'تمت إضافته إلى السلة بنجاح! 🛒✨',
    fr: 'a été ajouté au panier avec succès ! 🛒✨',
    en: 'has been added to the cart successfully! 🛒✨'
  },
  cart_item_remove: {
    ar: 'حذف',
    fr: 'Supprimer',
    en: 'Remove'
  },
  cart_item_price: {
    ar: 'السعر',
    fr: 'Prix',
    en: 'Price'
  },
  cart_subtotal: {
    ar: 'المجموع الفرعي',
    fr: 'Sous-total',
    en: 'Subtotal'
  },
  cart_checkout_btn: {
    ar: 'الذهاب لتأكيد الطلب والدفع عند الاستلام',
    fr: 'Procéder à la commande (Paiement à la livraison)',
    en: 'Proceed to Checkout & Cash on Delivery'
  },
  cart_continue_shopping: {
    ar: 'مواصلة التسوق',
    fr: 'Continuer les achats',
    en: 'Continue Shopping'
  },
  product_stock_out: {
    ar: 'نفدت الكمية',
    fr: 'Rupture de stock',
    en: 'Out of Stock'
  },

  // Footer labels
  footer_desc: {
    ar: 'دكانك العائلي الموثوق لأجود أنواع العسل الحر الطبيعي، أملو التقليدي باللوز وأركان، وزيت الأركان البكر المعصور على البارد. محضر بكل حب وأمانة في بيتنا لتصل البركة والصحة لبيتكم.',
    fr: 'Votre boutique familiale de confiance pour le miel pur, l\'Amlou traditionnel et l\'huile d\'argan pressée à froid. Préparé maison avec amour et intégrité.',
    en: 'Your trusted family shop for raw honey, traditional Amlou, and cold-pressed argan oil. Homemade with love and integrity.'
  },
  footer_links_title: {
    ar: 'روابط سريعة',
    fr: 'Liens Rapides',
    en: 'Quick Links'
  },
  footer_contact_title: {
    ar: 'تواصل مباشر مع المنتج',
    fr: 'Contact Direct',
    en: 'Direct Contact'
  },
  footer_contact_desc: {
    ar: 'يوسف - متاح للإجابة على استفساراتكم وتأكيد طلبياتكم وتلقي آرائكم الكريمة عبر الهاتف أو الواتساب طيلة اليوم.',
    fr: 'Youssef - Disponible pour répondre à vos questions, confirmer vos commandes et recevoir vos avis par téléphone ou WhatsApp.',
    en: 'Youssef - Available to answer your questions, confirm your orders, and receive your feedback via phone or WhatsApp.'
  },

  // Dynamic products translations key helper
  product_name_amlou: {
    ar: 'أملو باللوز وأركان الفاخر',
    fr: 'Amlou Royal aux Amandes & Argan',
    en: 'Premium Almond & Argan Amlou'
  },
  product_desc_amlou: {
    ar: 'مزيج تقليدي فريد يجمع بين اللوز البلدي المحمص، عسل البرتقال الطبيعي، وزيت الأركان البكر المعصور على البارد.',
    fr: 'Un mélange traditionnel unique combinant des amandes locales torréfiées, du miel d’oranger naturel et de l’huile d’argan vierge pressée à froid.',
    en: 'A unique traditional blend of roasted local almonds, pure orange blossom honey, and cold-pressed virgin argan oil.'
  },
  product_name_argan_cosmetic: {
    ar: 'زيت الأركان التجميلي النقي',
    fr: 'Huile d’Argan Cosmétique Pure',
    en: 'Pure Cosmetic Argan Oil'
  },
  product_desc_argan_cosmetic: {
    ar: 'ذهب سائل نقي 100٪ معصور على البارد، مثالي لتغذية البشرة وتجديد حيوية الشعر وتقوية الأظافر.',
    fr: 'De l’or liquide 100% pur, pressé à froid, idéal pour nourrir la peau, revitaliser les cheveux et renforcer les ongles.',
    en: '100% pure cold-pressed liquid gold, perfect for skin nourishment, hair vitalization, and nail strengthening.'
  },
  product_name_argan_food: {
    ar: 'زيت الأركان الغذائي المحمص',
    fr: 'Huile d’Argan Culinaire Torréfiée',
    en: 'Toasted Culinary Argan Oil'
  },
  product_desc_argan_food: {
    ar: 'زيت أركان ذو نكهة محمرة تقليدية فريدة، مثالي لصحن الفطور وتنكيه الأطباق المغربية الراقية والشهية.',
    fr: 'Une huile d’argan au goût torréfié traditionnel unique, idéale pour le petit-déjeuner et pour sublimer vos plats.',
    en: 'Toasted argan oil with a unique rich traditional nutty flavor, perfect for breakfast and seasoning fine dishes.'
  },
  product_name_honey_lemon: {
    ar: 'عسل الليمون الطبيعي',
    fr: 'Miel d’Oranger Naturel',
    en: 'Natural Orange Blossom Honey'
  },
  product_desc_honey_lemon: {
    ar: 'عسل نحل طبيعي نقي ومستخلص من بساتين البرتقال والليمون المغربية الزكية والمنعشة، غني بالفوائد والمذاق العذب.',
    fr: 'Un miel naturel pur récolté dans les vergers d’orangers marocains, réputé pour son parfum floral doux et ses vertus apaisantes.',
    en: 'Pure natural honey harvested from sweet citrus orchards in Morocco, rich in health benefits with a delicate floral flavor.'
  },
  product_name_honey_herbs: {
    ar: 'عسل الأعشاب الجبلية الممتاز',
    fr: 'Miel d’Herbes Sauvages de Montagne',
    en: 'Premium Mountain Wildflower Honey'
  },
  product_desc_honey_herbs: {
    ar: 'عسل جبلي داكن وعلاجي مستخلص من أعالي جبال الأطلس حيث يتغذى النحل على الأعشاب الطبية والبرية النادرة.',
    fr: 'Miel de montagne foncé et thérapeutique, récolté dans le Haut Atlas où les abeilles butinent des herbes médicinales sauvages.',
    en: 'Dark and therapeutic mountain honey harvested from High Atlas peaks, rich in rare wild medicinal herbs.'
  },
  product_name_bundle_royal: {
    ar: 'باقة التذوق العائلية الفاخرة',
    fr: 'Coffret Dégustation Familial',
    en: 'Luxury Family Tasting Bundle'
  },
  product_desc_bundle_royal: {
    ar: 'مجموعة متكاملة من أروع نتاج منزلي: برطمان أملو باللوز وأركان (350غ) + عسل الليمون الطبيعي (1 كغ) + زيت الأركان الغذائي الفاخر (250مل).',
    fr: 'Un assortiment complet de nos meilleurs produits : pot d’Amlou (350g) + Miel d’Oranger (1kg) + Huile d’Argan Culinaire (250ml).',
    en: 'A perfect collection of our finest home creations: one jar of Almond Amlou (350g) + Citrus Honey (1kg) + Culinary Argan Oil (250ml).'
  },
  product_name_bundle_wellness: {
    ar: 'باقة الجمال والنقاء الطبيعي',
    fr: 'Coffret Beauté & Pureté',
    en: 'Beauty & Wellness Bundle'
  },
  product_desc_bundle_wellness: {
    ar: 'أهدي بشرتك وشعرك سر النقاء المغربي: زجاجة زيت الأركان التجميلي النقي (100مل) + برطمان عسل الأعشاب الجبلية الممتاز (1 كغ).',
    fr: 'Offrez-vous le secret de pureté marocain : Huile d’Argan Cosmétique Pure (100ml) + Miel de Montagne Premium (1kg).',
    en: 'Give your skin and hair the gift of Moroccan purity: one bottle of Pure Cosmetic Argan (100ml) + Premium Mountain Honey (1kg).'
  },
  product_name_bundle_breakfast: {
    ar: 'باقة تاسيلا الشاملة المميزة',
    fr: 'Coffret Impérial Tassila',
    en: 'Signature Tassila Feast Bundle'
  },
  product_desc_bundle_breakfast: {
    ar: 'أحضر المذاق البلدي الحقيقي لمائدتك: برطمان أملو باللوز وأركان (700غ) + عسل الأعشاب الجبلية (1 كغ) + زيت الأركان الغذائي (500مل).',
    fr: 'Le goût authentique du terroir sur votre table : pot d’Amlou (700g) + Miel de Montagne (1kg) + Huile d’Argan Culinaire (500ml).',
    en: 'Bring the genuine traditional flavor to your table: one giant jar of Amlou (700g) + Mountain Honey (1kg) + Culinary Argan (500ml).'
  },

  // Admin View elements
  admin_dashboard_title: {
    ar: 'إدارة متجر تاسيلا بيو السحابي',
    fr: 'Gestion de Tassila Bio',
    en: 'Tassila Bio Cloud Management'
  },
  admin_orders_tab: {
    ar: 'إدارة الطلبيات',
    fr: 'Commandes',
    en: 'Orders'
  },
  admin_products_tab: {
    ar: 'إدارة المنتجات',
    fr: 'Produits',
    en: 'Products'
  },
  admin_settings_tab: {
    ar: 'إعدادات المتجر',
    fr: 'Paramètres',
    en: 'Store Settings'
  },
  admin_logout: {
    ar: 'تسجيل الخروج',
    fr: 'Déconnexion',
    en: 'Log Out'
  },
  store_empty: {
    ar: 'لا توجد منتجات متاحة حالياً، يرجى العودة لاحقاً',
    fr: 'Aucun produit disponible pour le moment, veuillez revenir plus tard',
    en: 'No products available at the moment, please check back later'
  },
  category_empty: {
    ar: 'هذا القسم فارغ حالياً، يرجى العودة لاحقاً',
    fr: 'Cette catégorie est actuellement vide, veuillez revenir plus tard',
    en: 'This category is currently empty, please check back later'
  }
};

export function getTranslation(key: string, lang: Language): string {
  const transObj = TRANSLATIONS[key];
  if (!transObj) return key;
  return transObj[lang] || transObj['ar'] || key;
}

export function translateProduct(prodId: string, name: string, description: string, lang: Language): { name: string, description: string } {
  const nameKey = `product_name_${prodId}`;
  const descKey = `product_desc_${prodId}`;

  const transName = TRANSLATIONS[nameKey] ? TRANSLATIONS[nameKey][lang] : name;
  const transDesc = TRANSLATIONS[descKey] ? TRANSLATIONS[descKey][lang] : description;

  return { name: transName, description: transDesc };
}
