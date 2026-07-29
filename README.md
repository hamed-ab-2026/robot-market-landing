# روبات مارکت — سایت نمایش محصولات

## نصب و اجرا

```bash
npm install
npm run dev
```

سپس آدرس `http://localhost:3000` را در مرورگر باز کنید.

## ساختار پروژه

```
src/
  app/            # layout.js و page.js (App Router)
  components/     # کامپوننت‌های بخش‌های سایت
  data/           # محتوای متنی و محصولات (content.js)
  utils/api.js    # نمونه Axios برای اتصال به API در آینده
```

## نکات

- رنگ اصلی برند در `tailwind.config.js` روی `#00a693` تنظیم شده است.
- فونت وزیرمتن به‌صورت خودکار از `next/font/google` بارگذاری می‌شود.
- برای جایگزینی عکس واقعی دستگاه به‌جای طرح SVG، فایل
  `src/components/VendingMachineParts.js` را ویرایش کنید.
- برای اتصال فرم "سفارش و مشاوره" یا دکمه "افزودن به سبد" به بک‌اند واقعی،
  از توابع آماده در `src/utils/api.js` استفاده کنید.
