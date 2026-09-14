import type {FloatingSnack, Locale, Machine, SiteContent} from '@/types/domain';

// ---------------------------------------------------------------------------
// Single bilingual content source (fa/en). Every UI string and every piece of
// business copy lives here, per locale. Components read via useLanguage().
// Asset paths (images/gifs/video) are locale-independent and stay the same.
// ---------------------------------------------------------------------------

const machinesFa: Machine[] = [
    {
        id: 'rm-35',
        name: 'روبات مارکت ۳۵ کانال',
        shortLabel: '۳۵ کانال',
        priceLabel: '4,180,000,000 ریال',
        priceNumeric: 4180000000,
        description: 'یخچالدار، ۳۵ کانال اختصاصی، سیستم خنک‌کننده قدرتمند، تحویل نرم، مدیریت آنلاین ۲۴ ساعته.',
        highlights: ['یخچالدار', '۳۵ کانال اختصاصی', 'تحویل نرم', 'مدیریت آنلاین ۲۴ ساعته'],
        image: '/images/machine-35-base.webp',
        imageAlt: '/images/machine-35-white.webp',
        gif: '/gifs/machine-35.gif',
    },
    {
        id: 'rm-48',
        name: 'روبات مارکت ۴۸ کانال',
        shortLabel: '۴۸ کانال',
        priceLabel: '4,980,000,000 ریال',
        priceNumeric: 4980000000,
        description: 'یخچالدار، ۴۸ کانال اختصاصی، قابلیت‌های پیشرفته مدیریت آنلاین و تحویل کالا.',
        highlights: ['یخچالدار', '۴۸ کانال اختصاصی', 'مدیریت آنلاین پیشرفته', 'تحویل هوشمند کالا'],
        image: '/images/machine-48-base.webp',
        imageAlt: '/images/machine-48-white.webp',
        gif: '/gifs/machine-48.gif',
    },
    {
        id: 'rm-60',
        name: 'روبات مارکت ۶۰ کانال',
        shortLabel: '۶۰ کانال',
        priceLabel: '5,480,000,000 ریال',
        priceNumeric: 5480000000,
        description: 'یخچالدار، ۶۰ کانال اختصاصی برای کسب‌وکارهای پرتردد.',
        highlights: ['یخچالدار', '۶۰ کانال اختصاصی', 'مناسب اماکن پرتردد', 'ظرفیت بالا'],
        image: '/images/machine-60-base.webp',
        imageAlt: '/images/machine-60-white.webp',
        gif: '/gifs/machine-60.gif',
    },
];

const machinesEn: Machine[] = [
    {
        id: 'rm-35',
        name: 'Robot Market RM-35',
        shortLabel: '35 Channels',
        priceLabel: '4,180,000,000 Rials',
        priceNumeric: 4180000000,
        description: 'Refrigerated, 35 dedicated channels, powerful cooling system, soft delivery, 24/7 online management.',
        highlights: ['Refrigerated', '35 dedicated channels', 'Soft delivery', '24/7 online management'],
        image: '/images/machine-35-base.webp',
        imageAlt: '/images/machine-35-white.webp',
        gif: '/gifs/machine-35.gif',
    },
    {
        id: 'rm-48',
        name: 'Robot Market RM-48',
        shortLabel: '48 Channels',
        priceLabel: '4,980,000,000 Rials',
        priceNumeric: 4980000000,
        description: 'Refrigerated, 48 dedicated channels, advanced online management and delivery capabilities.',
        highlights: ['Refrigerated', '48 dedicated channels', 'Advanced online management', 'Smart delivery'],
        image: '/images/machine-48-base.webp',
        imageAlt: '/images/machine-48-white.webp',
        gif: '/gifs/machine-48.gif',
    },
    {
        id: 'rm-60',
        name: 'Robot Market RM-60',
        shortLabel: '60 Channels',
        priceLabel: '5,480,000,000 Rials',
        priceNumeric: 5480000000,
        description: 'Refrigerated, 60 dedicated channels for high-traffic businesses.',
        highlights: ['Refrigerated', '60 dedicated channels', 'Ideal for high-traffic venues', 'High capacity'],
        image: '/images/machine-60-base.webp',
        imageAlt: '/images/machine-60-white.webp',
        gif: '/gifs/machine-60.gif',
    },
];

export const content: Record<Locale, SiteContent> = {
    fa: {
        dir: 'rtl',
        lang: 'fa',
        meta: {
            title: 'روبات مارکت | دستگاه‌های وندینگ هوشمند',
            description:
                'روبات مارکت؛ دستگاه‌های فروش خودکار هوشمند با مدیریت آنلاین، تحویل نرم و طراحی مدرن.',
        },
        nav: {
            home: 'خانه',
            showcase: 'دستگاه‌ها',
            about: 'درباره ما',
            locations: 'مکان‌های نصب',
            contact: 'تماس با ما',
            login: 'ورود به پنل کاربری',
        },
        hero: {
            loading: 'در حال بارگذاری روبات مارکت…',
            cta: 'مشاهده دستگاه‌ها',
            slides: [
                {
                    id: 'slide-1',
                    kicker: 'روبات مارکت',
                    titleLines: ['فروش خودکار،', 'هوشمند و بی‌وقفه'],
                    sub: 'تجربه‌ای نوین از خرید آسان و سریع با دستگاه‌های وندینگ روبات مارکت.',
                    image: '/images/machine-slide-0.webp',
                },
                {
                    id: 'slide-2',
                    kicker: 'یخچالدار',
                    titleLines: ['خنک‌کننده قدرتمند،', 'کیفیت تضمینی'],
                    sub: 'نگهداری اصولی تنقلات و نوشیدنی سرد، ۲۴ ساعته و بدون نیاز به نیروی انسانی.',
                    image: '/images/machine-slide-1.webp',
                },
                {
                    id: 'slide-3',
                    kicker: 'مدیریت آنلاین',
                    titleLines: ['کنترل کامل کسب‌وکار', 'از راه دور'],
                    sub: 'مدیریت موجودی، فروش و گزارش‌گیری آنلاین، هر ساعت از شبانه‌روز.',
                    image: '/images/machine-slide-2.webp',
                },
            ],
        },
        cart: {
            title: 'سبد خرید',
            empty: 'سبد خرید شما خالی است',
            total: 'جمع کل',
            checkout: 'پرداخت / تسویه حساب',
            checkoutToast: 'درگاه پرداخت به‌زودی متصل می‌شود.',
            addToast: (name) => `${name} به سبد خرید اضافه شد`,
        },
        machineActions: {
            addToCart: 'افزودن به سبد خرید',
            quickView: 'مشاهده سریع',
            wishlistAdd: 'افزودن به علاقه‌مندی‌ها',
            wishlistRemove: 'حذف از علاقه‌مندی‌ها',
            hoverHint: 'نشانگر را روی دستگاه حرکت دهید',
            altVariant: 'رنگ جایگزین',
            gifAlt: (name) => `نمایش عملکرد ${name}`,
        },
        machines: machinesFa,
        features: [
            {
                id: 'warranty',
                icon: 'safety',
                title: 'ضمانت کالا',
                description: 'کلیه محصولات شرکت دارای یک سال خدمات پس از فروش می‌باشند.'
            },
            {
                id: 'consulting',
                icon: 'consulting',
                title: 'مشاوره تخصصی و رایگان',
                description: 'خدمات مشاوره رایگان در مورد نوع دستگاه و چیدمان محصولات.'
            },
            {
                id: 'installment',
                icon: 'installment',
                title: 'امکان خرید اقساطی',
                description: 'امکان خرید اقساط با شرایط آسان و مناسب جهت کلیه مشاغل.'
            },
            {
                id: 'packaging',
                icon: 'packaging',
                title: 'بسته‌بندی ایمن',
                description: 'با درخواست شما، محصولات با بسته‌بندی باکس پالت با هزینه‌ای اندک ارسال می‌شود.'
            },
        ],
        about: {
            eyebrow: 'معرفی شرکت',
            legalName: 'شرکت نگین سازان پیشگام رادمهر آتوسا',
            more: 'ادامه مطلب',
            less: 'نمایش کمتر',
            paragraphs: [
                'شرکت نگین سازان پیشگام رادمهر آتوسا با شماره ثبت ۸۴۰۹۴ با نام‌های «ایده آوران پیشگام آتوسا» به شماره ثبت ۶۳۰۹۷ و «پیشگام گستر نگین آتوسا» به شماره ثبت ۷۳۴۱۶، از سال ۱۳۹۶ فعالیت خود را با تولید دستگاه‌های دقیق فرآوری زعفران آغاز نمود و با تشکیل شبکه گسترده توزیع و پخش زعفران در سراسر کشور، در سال ۱۴۰۱ با تولید دستگاه‌های وندینگ ماشین با نام تجاری «روبات مارکت» ویژه فروش زعفران وارد این حوزه شد.',
                'سال ۱۴۰۲ برای حفظ کیفیت زعفران، قابلیت سرمایش به این دستگاه‌ها افزوده شد و روبات مارکت قابلیت عرضه و فروش تنقلات و نوشیدنی سرد را نیز به دست آورد؛ تا اینکه در بهار سال ۱۴۰۳ با معرفی گسترده دستگاه‌های «روبات مارکت»، این ربات‌ها به‌عنوان فروشنده رسمی تنقلات و نوشیدنی‌های سرد در ایران معرفی شدند.',
                'روبات مارکت تنها یک نام نیست، بلکه نماد تفکری نوین و پیشرو در صنعت فروش خودکار است. آنچه در روبات مارکت اتفاق می‌افتد با تکیه بر دانش فنی مهندسین و بهره‌گیری از تکنولوژی روز دنیا، تجلی پیدا کرده است. هر دستگاه روبات مارکت یک دستیار هوشمند و خستگی‌ناپذیر است که با دقت و سرعت بالا، پلی میان نیاز مصرف‌کنندگان و اهداف تجاری شما می‌سازد.',
                'تعهد ما تولید دستگاه‌هایی با کیفیت بالا، طراحی مدرن و عملکردی بی‌نقص است تا تجربه‌ای متفاوت از خرید و درآمدزایی رقم بخورد. روبات مارکت نماد اعتماد، نوآوری و تلاش برای پیشرفت صنعت فروش خودکار است.',
                'در کالبد روبات مارکت، صدها ساعت کار مهندسی و تست‌های عملیاتی نهفته است. ما بر این باوریم که دوام و طول عمر دستگاه‌ها مهم‌ترین شاخص برای سرمایه‌گذاری مشتریان ماست. به همین دلیل، در تمامی مراحل تولید، از انتخاب بهترین متریال و قطعات الکترونیک گرفته تا مونتاژ نهایی، استانداردهای سخت‌گیرانه‌ای را رعایت می‌کنیم تا دستگاه‌ها در شرایط مختلف، عملکردی پایدار و بدون نقص داشته باشند.',
                'دستگاه‌های هوشمند ما با رابط کاربری ساده و در عین حال پیشرفته، تجربه‌ای لذت‌بخش را برای کاربران و خریداران فراهم می‌کنند. سیستم‌های پرداخت امن، قابلیت اتصال به اینترنت برای مدیریت آنلاین و نظارت بر قیمت اجناس، از جمله ویژگی‌هایی است که روبات مارکت را از سایر رقبا متمایز می‌کند. ما تلاش کرده‌ایم فرآیند خرید را به سادگی چند لمس ساده تبدیل کنیم تا مشتریان شما در هر ساعت از شبانه‌روز، در کمترین زمان به کالای موردنظر خود دسترسی پیدا کنند. روبات مارکت تنها یک تولیدکننده نیست، بلکه مشاوری قابل اعتماد برای توسعه کسب‌وکار شماست؛ لذا راهکارهای فروش خودکار متناسب با نیازهای شما طراحی و ارائه می‌شوند.',
                'فرقی نمی‌کند یک فروشگاه زنجیره‌ای بزرگ داشته باشید یا مدیر یک مجموعه اداری کوچک باشید؛ دستگاه‌های ما این امکان را می‌دهند که بدون محدودیت زمانی و مکانی و بدون نگرانی از مشکلات نیروی انسانی، فروش خود را افزایش دهید.',
                'آنچه از ورای تولیدات تخصصی و پیشروی روبات مارکت قابل مشاهده است، تکنولوژی‌ای است که جایگزین نمونه‌های خارجی شده و نه‌تنها نیازهای داخلی را برطرف می‌کند، بلکه در آینده‌ای نچندان دور سهم قابل رقابتی را در بازارهای خارجی از آن خود خواهد کرد. افتخار ما این است که محصولی ایرانی می‌سازیم که با استانداردهای جهانی رقابت می‌کند و گامی کوچک اما استوار در جهت خودکفایی و شکوفایی اقتصاد کشور برمی‌داریم.',
            ],
        },
        locations: {
            title: 'مکان مناسب برای نصب روبات مارکت',
            items: [
                {
                    id: 'hotels',
                    icon: 'hotel',
                    title: 'هتل‌ها و مراکز اقامتی',
                    description: 'هر جایی که جمعیت زیادی در صف انتظار قرار دارند، به‌جز درآمد، روبات مارکت جزو امکانات رفاهی آن مکان محسوب شده و میزان رضایت مراجعان را نیز افزایش می‌دهد.'
                },
                {
                    id: 'schools',
                    icon: 'school',
                    title: 'مراکز آموزشی و مدارس',
                    description: 'در صورتی که هر یک از دانش‌آموزان و دانشجویان برای خرید مایحتاج خود به خارج از مجموعه مراجعه کنند و خدای‌ناکرده اتفاقی بیفتد، مسئولیت آن مستقیماً به عهده مدیر آموزشگاه است. در نتیجه وجود یک روبات مارکت در هر آموزشگاه ضروری است.'
                },
                {
                    id: 'pharmacies',
                    icon: 'pharmacy',
                    title: 'داروخانه‌ها و سوپرمارکت‌ها',
                    description: 'برای فروش محصولات جنسی و پیشگیری، ویژه مشتریانی که برای خرید آن معذوریت دارند.'
                },
                {
                    id: 'hospitals',
                    icon: 'hospital',
                    title: 'بیمارستان‌ها و مراکز درمانی',
                    description: 'برای فروش محصولات جنسی و پیشگیری، ویژه مشتریانی که برای خرید آن معذوریت دارند.'
                },
                {
                    id: 'night-shift',
                    icon: 'night',
                    title: 'کشیک شیفت شب',
                    description: 'امکان تعبیه روبات مارکت پشت شیشه سکوریت مغازه‌ها نیز وجود دارد تا در زمان تعطیلی فروشگاه و حتی نیمه‌شب‌ها، روبات زحمتکش در حال خدمت‌دهی به مشتریان عزیز شما باشد.'
                },
                {
                    id: 'specialty',
                    icon: 'specialty',
                    title: 'محصولات تخصصی',
                    description: 'اگر تولیدکننده هستید یا نماینده تولیدکننده محصولی خاص هستید، یک روبات مارکت می‌تواند مسئولیت معرفی و عرضه محصولات تخصصی شما را نیز بر عهده بگیرد.'
                },
            ],
        },
        footer: {
            aboutLabel: 'روبات مارکت',
            aboutText: 'ارائه‌دهنده دستگاه‌های وندینگ هوشمند برای کسب‌وکارهای مدرن — محصولی از شرکت نگین سازان پیشگام رادمهر آتوسا.',
            quickLinks: 'دسترسی سریع',
            contactTitle: 'تماس با ما',
            factoryLabel: 'کارخانه',
            salesLabel: 'دفتر فروش مرکزی',
            rights: 'تمامی حقوق محفوظ است.',
        },
        contactInfo: {
            orderPhone: '۰۹۱۵۱۶۰۱۸۴۷',
            orderPhoneHref: '09151601847',
            factoryAddress: 'مشهد، کیلومتر ۸ جاده مشهد - چناران، دور برگردان اصلی شهرک صنعتی توس به سمت مشهد، بعد از نیروگاه، اولین فرعی سمت راست (خیابان کاله)، اولین کوچه سمت راست، پلاک ۱۱۰، شرکت نگین سازان پیشگام رادمهر آتوسا',
            salesOfficeAddress: 'مشهد، نبش پیامبر اعظم ۷، جنب بیمارستان رضوی، برج نخل، واحد ۴۰۱',
            socialLinks: [
                {id: 'instagram', label: 'صفحه اینستاگرام', href: 'http://instagram.com/vending_machin_life'},
                {id: 'bale-join', label: 'کانال پیام‌رسان بله', href: 'https://ble.ir/join/AiTbV6UpBA'},
                {id: 'bale-site', label: 'وب‌سایت', href: 'https://my-rm.com/'},
            ],
        },
    },

    en: {
        dir: 'ltr',
        lang: 'en',
        meta: {
            title: 'Robot Market | Smart Vending Machines',
            description:
                'Robot Market — smart vending machines with online management, soft delivery and modern design.',
        },
        nav: {
            home: 'Home',
            showcase: 'Machines',
            about: 'About Us',
            locations: 'Where to Install',
            contact: 'Contact',
            login: 'Sign In',
        },
        hero: {
            loading: 'Loading Robot Market…',
            cta: 'View Machines',
            slides: [
                {
                    id: 'slide-1',
                    kicker: 'Robot Market',
                    titleLines: ['Automated selling,', 'smart & non-stop'],
                    sub: 'A new experience of fast, easy shopping with Robot Market vending machines.',
                    image: '/images/machine-slide-0.webp',
                },
                {
                    id: 'slide-2',
                    kicker: 'Refrigerated',
                    titleLines: ['Powerful cooling,', 'guaranteed quality'],
                    sub: 'Proper storage for snacks and cold drinks, 24/7, with no staff required.',
                    image: '/images/machine-slide-1.webp',
                },
                {
                    id: 'slide-3',
                    kicker: 'Online Management',
                    titleLines: ['Full control of your', 'business, remotely'],
                    sub: 'Manage inventory, sales, and reports online, any hour of the day.',
                    image: '/images/machine-slide-2.webp',
                },
            ],
        },
        cart: {
            title: 'Cart',
            empty: 'Your cart is empty',
            total: 'Total',
            checkout: 'Checkout',
            checkoutToast: 'Payment gateway will be connected soon.',
            addToast: (name) => `${name} added to cart`,
        },
        machineActions: {
            addToCart: 'Add to Cart',
            quickView: 'Quick View',
            wishlistAdd: 'Add to Wishlist',
            wishlistRemove: 'Remove from Wishlist',
            hoverHint: 'Move your cursor over the machine',
            altVariant: 'Alternate color',
            gifAlt: (name) => `${name} in action`,
        },
        machines: machinesEn,
        features: [
            {
                id: 'warranty',
                icon: 'safety',
                title: 'Product Warranty',
                description: 'All our products come with one year of after-sales service.'
            },
            {
                id: 'consulting',
                icon: 'consulting',
                title: 'Free Expert Consulting',
                description: 'Free consulting on the right machine type and product layout.'
            },
            {
                id: 'installment',
                icon: 'installment',
                title: 'Installment Purchase',
                description: 'Flexible, easy installment plans suitable for any business.'
            },
            {
                id: 'packaging',
                icon: 'packaging',
                title: 'Secure Packaging',
                description: 'On request, products ship in pallet-box packaging for a small fee.'
            },
        ],
        about: {
            eyebrow: 'Company Profile',
            legalName: 'Negin Sazan Pishgam Radmehr Atousa Co.',
            more: 'Read more',
            less: 'Show less',
            paragraphs: [
                'Negin Sazan Pishgam Radmehr Atousa Co. (registration No. 84094), also known as "Ideh Avaran Pishgam Atousa" (No. 63097) and "Pishgam Gostar Negin Atousa" (No. 73416), began operations in 2017 producing precision saffron-processing machines. After building a nationwide saffron distribution network, in 2022 the company entered the vending-machine industry with saffron-dedicated machines under the "Robot Market" brand.',
                'In 2023, cooling capability was added to preserve saffron quality, and Robot Market gained the ability to sell snacks and cold drinks as well. By spring 2024, with the wide rollout of "Robot Market" machines, these robots were introduced as an official retailer of snacks and cold drinks in Iran.',
                'Robot Market is not just a name — it is a symbol of a modern, forward-looking way of thinking in the vending industry. What happens inside Robot Market is the result of our engineers\' technical expertise combined with today\'s technology. Every Robot Market machine is a tireless, intelligent assistant that bridges consumer needs and your business goals with precision and speed.',
                'Our commitment is to build high-quality machines with modern design and flawless performance, delivering a different experience of shopping and revenue generation. Robot Market stands for trust, innovation, and continuous progress in the vending industry.',
                'Hundreds of hours of engineering work and operational testing go into every Robot Market unit. We believe durability and machine lifespan are the most important measures of our customers\' investment. That is why, from selecting the best materials and electronic components to final assembly, we follow strict standards so our machines perform reliably in any condition.',
                'Our smart machines offer a simple yet advanced user interface for an enjoyable experience. Secure payment systems and internet connectivity for online management and price monitoring set Robot Market apart from competitors. We have made the purchase process as simple as a few taps, so your customers can access what they need, any time of day, in the shortest time possible. Robot Market is not just a manufacturer — it is a trusted advisor for growing your business, designing automated sales solutions tailored to your needs.',
                'Whether you run a large retail chain or manage a small office, our machines let you increase sales without time or location limits, and without worrying about staffing issues.',
                'Behind Robot Market\'s specialized, forward-looking products lies technology that replaces foreign alternatives — meeting domestic needs today, and poised to compete meaningfully in export markets in the near future. We take pride in building an Iranian product that competes with global standards — a small but firm step toward self-sufficiency and economic growth.',
            ],
        },
        locations: {
            title: 'Ideal Locations for a Robot Market Machine',
            items: [
                {
                    id: 'hotels',
                    icon: 'hotel',
                    title: 'Hotels & Accommodations',
                    description: 'Anywhere large crowds wait in line — beyond the revenue, Robot Market becomes an amenity that increases guest satisfaction.'
                },
                {
                    id: 'schools',
                    icon: 'school',
                    title: 'Schools & Educational Centers',
                    description: 'If a student has to leave campus to buy something and, God forbid, an incident occurs, responsibility falls directly on the school administrator. A Robot Market on-site is essential.'
                },
                {
                    id: 'pharmacies',
                    icon: 'pharmacy',
                    title: 'Pharmacies & Supermarkets',
                    description: 'For selling personal/health products discreetly, for customers who prefer not to purchase them in person.'
                },
                {
                    id: 'hospitals',
                    icon: 'hospital',
                    title: 'Hospitals & Medical Centers',
                    description: 'For selling personal/health products discreetly, for customers who prefer not to purchase them in person.'
                },
                {
                    id: 'night-shift',
                    icon: 'night',
                    title: 'Night-Shift Coverage',
                    description: 'Robot Market can be installed behind a shop\'s security glass, serving customers even after closing time and in the middle of the night.'
                },
                {
                    id: 'specialty',
                    icon: 'specialty',
                    title: 'Specialty Products',
                    description: 'If you manufacture or represent a specific product line, a Robot Market machine can take on introducing and offering your specialty products too.'
                },
            ],
        },
        footer: {
            aboutLabel: 'Robot Market',
            aboutText: 'Smart vending machines for modern businesses — a product of Negin Sazan Pishgam Radmehr Atousa Co.',
            quickLinks: 'Quick Links',
            contactTitle: 'Contact Us',
            factoryLabel: 'Factory',
            salesLabel: 'Central Sales Office',
            rights: 'All rights reserved.',
        },
        contactInfo: {
            orderPhone: '09151601847',
            orderPhoneHref: '09151601847',
            factoryAddress: 'Mashhad, Mashhad–Chenaran Rd. km 8, main roundabout of Toos Industrial Town toward Mashhad, after the power plant, 1st street on the right (Kaleh St.), 1st alley on the right, No. 110 — Negin Sazan Pishgam Radmehr Atousa Co.',
            salesOfficeAddress: 'Mashhad, corner of Payambar-e Azam 7, next to Razavi Hospital, Nakhl Tower, Unit 401',
            socialLinks: [
                {id: 'instagram', label: 'Instagram', href: 'http://instagram.com/vending_machin_life'},
                {id: 'bale-join', label: 'Bale Channel', href: 'https://ble.ir/join/AiTbV6UpBA'},
                {id: 'bale-site', label: 'Website', href: 'https://my-rm.com/'},
            ],
        },
    },
};

// Locale-independent asset config (positions/paths only — same in both languages).
export const floatingSnacks: FloatingSnack[] = [
    {id: 'chips-1', image: '/images/snacks/item-1.webp', size: 60, top: '5%', left: '-5%', duration: 5.5, delay: 0},
    {id: 'soda-1', image: '/images/snacks/item-2.webp', size: 55, top: '68%', left: '2%', duration: 6.2, delay: 0.6},
    {id: 'chips-2', image: '/images/snacks/item-3.webp', size: 65, top: '10%', left: '85%', duration: 4.8, delay: 0.3},
    {id: 'soda-2', image: '/images/snacks/item-4.webp', size: 55, top: '72%', left: '88%', duration: 5.9, delay: 0.9},
    {id: 'chips-3', image: '/images/snacks/item-5.webp', size: 50, top: '42%', left: '90%', duration: 6.6, delay: 1.2},
    {id: 'soda-3', image: '/images/snacks/item-6.webp', size: 55, top: '46%', left: '-4%', duration: 5.1, delay: 1.5},
];

export const showcaseVideoSrc = '/video/showcase-placeholder.mp4';
