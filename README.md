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

- `app/page.tsx`: صفحه اصلی شامل هیرو، ویترین دستگاه‌ها، مزایا، درباره ما و محل‌های مناسب نصب.
- `app/layout.tsx`: هدر، فوتر و پیام توسعه مشترک بین صفحات.
- `app/cart/page.tsx`: صفحه مستقل سبد خرید.
- `app/products/page.tsx`: همه محصولات با فیلتر دسته‌بندی ذخیره‌شده در URL؛ برای نمونه `/products?category=warm-vending`.
- `data/products.ts`: دسته‌بندی‌ها و شناسه سه محصول منتخب ویترین اسکرولی Home؛ سایر محصولات فقط در فهرست کامل نمایش داده می‌شوند.
- `app/products/[id]/page.tsx`: صفحه جزئیات هر دستگاه، تصاویر، ویژگی‌ها و کنترل تعداد.
- `components/HeroSection.tsx`: اسلایدر تصاویر دستگاه‌ها.
- `components/ShowcaseSection.tsx`: انتخاب نمایش موبایل یا ویترین افقی دسکتاپ.
- `components/HorizontalShowcase.tsx`: ویترین افقی با GSAP و ویدیوی پس‌زمینه وابسته به اسکرول.
- `components/MobileShowcase.tsx`: فهرست دستگاه‌ها در موبایل.
- `components/VendingCard.tsx` و `components/FloatingItems.tsx`: نمایش دستگاه و جلوه‌های تصویری.
- `components/CartPage.tsx`، `components/QuantityControl.tsx` و `store/`: سبد خرید و کنترل افزایش و کاهش تعداد با Redux.
- `components/CartPersistence.tsx`: حفظ شناسه و تعداد دستگاه‌ها در مرورگر.
- `components/DevelopmentNotice.tsx`: پیام اولین بازدید؛ پس از بسته‌شدن دوباره در همان مرورگر نمایش داده نمی‌شود.
- `data/content.ts`: محتوای فارسی و انگلیسی، مشخصات و قیمت دستگاه‌ها و مسیر رسانه‌ها.
- `data/commerce.ts`: متن‌های دوزبانه سبد خرید، جزئیات محصول و پیام توسعه.
- `app/context/` و `app/providers.tsx`: زبان، جهت صفحه، تم و تنظیمات Ant Design.
- `app/globals.css`: رنگ‌ها و استایل‌های مشترک.
- `public/`: تصاویر دستگاه‌ها، اقلام شناور، گیف‌ها و ویدیوی ویترین.

## زبان و تم

زبان فارسی/انگلیسی و حالت روشن/تیره از هدر تغییر می‌کنند و ترجیح کاربر در localStorage ذخیره می‌شود.
ویترین افقی برای محاسبات اسکرول همیشه جهت LTR دارد، اما متن کارت‌ها جهت زبان فعال را رعایت می‌کند.

## ورود و سبد خرید

دکمه ورود به https://panel.my-rm.com متصل است.
سبد خرید در مسیر `/cart` نمایش داده می‌شود و انتخاب‌ها پس از بارگذاری مجدد حفظ می‌شوند.
کنترل‌های مثبت و منفی در کارت‌ها، صفحه محصول و سبد هماهنگ‌اند؛ کاهش تعداد از یک به صفر دستگاه را از سبد حذف می‌کند.
پرداخت هنوز متصل نیست؛ دکمه پرداخت غیرفعال است و توضیح آن نمایش داده می‌شود.

## تنظیم API

برای تعیین آدرس بک‌اند، از `.env.local.example` یک فایل `.env.local` بسازید و
`NEXT_PUBLIC_API_BASE_URL` را تنظیم کنید. کلاینت مشترک API در `lib/axios.ts` قرار دارد.

## جایگزینی رسانه‌ها

فایل‌های واقعی را با مسیرهای موجود در `data/content.ts` جایگزین کنید یا مسیرها را در همان فایل تغییر دهید.
ویدیوی پس‌زمینه ویترین از `public/video/showcase-placeholder.mp4` خوانده می‌شود.
