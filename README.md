# روبات مارکت — Vending Machine Showcase

صفحه معرفی دستگاه‌های وندینگ روبات مارکت، ساخته‌شده با Next.js، TypeScript، React و Ant Design.

## اجرا

```bash
npm install
npm run dev
```

سایت در http://localhost:3000 در دسترس است.

## بررسی نوع‌ها

```bash
npm run typecheck
```

کد برنامه با TypeScript و حالت strict بررسی می‌شود. نوع‌های مشترک در `types/domain.ts` و هوک‌های Redux در `store/hooks.ts` قرار دارند.
تنظیمات Next.js و PostCSS برای سازگاری با ابزارهای فعلی به JavaScript باقی مانده‌اند؛ تنظیمات Tailwind در `tailwind.config.ts` است.

## ساخت نسخه نهایی

```bash
npm run build
npm start
```

خروجی standalone برای اجرای Docker تنظیم شده است.

## ساختار و بخش‌های فعال

- `app/page.tsx`: صفحه اصلی شامل هدر، سبد خرید، هیرو، ویترین دستگاه‌ها، مزایا، درباره ما، محل‌های مناسب نصب و فوتر.
- `components/HeroSection.tsx`: اسلایدر تصاویر دستگاه‌ها.
- `components/ShowcaseSection.tsx`: انتخاب نمایش موبایل یا ویترین افقی دسکتاپ.
- `components/HorizontalShowcase.tsx`: ویترین افقی با GSAP و ویدیوی پس‌زمینه وابسته به اسکرول.
- `components/MobileShowcase.tsx`: فهرست دستگاه‌ها در موبایل.
- `components/VendingCard.tsx` و `components/FloatingItems.tsx`: نمایش دستگاه و جلوه‌های تصویری.
- `components/CartDrawer.tsx` و `store/`: سبد خرید و مدیریت تعداد دستگاه‌ها با Redux.
- `data/content.ts`: محتوای فارسی و انگلیسی، مشخصات و قیمت دستگاه‌ها و مسیر رسانه‌ها.
- `app/context/` و `app/providers.tsx`: زبان، جهت صفحه، تم و تنظیمات Ant Design.
- `app/globals.css`: رنگ‌ها و استایل‌های مشترک.
- `public/`: تصاویر دستگاه‌ها، اقلام شناور، گیف‌ها و ویدیوی ویترین.

## زبان و تم

زبان فارسی/انگلیسی و حالت روشن/تیره از هدر تغییر می‌کنند و ترجیح کاربر در localStorage ذخیره می‌شود.
ویترین افقی برای محاسبات اسکرول همیشه جهت LTR دارد، اما متن کارت‌ها جهت زبان فعال را رعایت می‌کند.

## ورود و سبد خرید

دکمه ورود به https://panel.my-rm.com متصل است.
سبد خرید در حافظه نگه‌داری می‌شود و با بارگذاری مجدد صفحه پاک می‌شود.
پرداخت هنوز متصل نیست؛ دکمه پرداخت در `CartDrawer.tsx` پیام نمایشی نشان می‌دهد.

## تنظیم API

برای تعیین آدرس بک‌اند، از `.env.local.example` یک فایل `.env.local` بسازید و
`NEXT_PUBLIC_API_BASE_URL` را تنظیم کنید. کلاینت مشترک API در `lib/axios.ts` قرار دارد.

## جایگزینی رسانه‌ها

فایل‌های واقعی را با مسیرهای موجود در `data/content.ts` جایگزین کنید یا مسیرها را در همان فایل تغییر دهید.
ویدیوی پس‌زمینه ویترین از `public/video/showcase-placeholder.mp4` خوانده می‌شود.
