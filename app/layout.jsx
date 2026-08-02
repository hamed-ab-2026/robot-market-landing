import { Vazirmatn } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata = {
  title: 'روبات مارکت | دستگاه‌های وندینگ هوشمند',
  description:
    'روبات مارکت؛ دستگاه‌های فروش خودکار هوشمند با مدیریت آنلاین، تحویل نرم و طراحی مدرن.',
};

export default function RootLayout({ children }) {
  // پوسته پیش‌فرض سمت سرور: فارسی + حالت روشن (Light).
  // ThemeProvider/LanguageProvider بعد از mount شدن، اگر کاربر قبلاً تم/زبان
  // دیگری را انتخاب کرده بود (ذخیره‌شده در localStorage)، آن را روی <html> اعمال
  // می‌کنند؛ suppressHydrationWarning جلوی هشدار بی‌ضرر عدم‌تطابق را می‌گیرد.
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} light`} suppressHydrationWarning>
      <body className="bg-page text-primary antialiased transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
