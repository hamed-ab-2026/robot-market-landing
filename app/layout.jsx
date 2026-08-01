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
  // Default server-rendered shell: Persian + dark. ThemeProvider/LanguageProvider
  // read localStorage on mount and correct lang/dir/class client-side if needed —
  // suppressHydrationWarning avoids a noisy (harmless) mismatch warning for that swap.
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} dark`} suppressHydrationWarning>
      <body className="bg-page text-primary antialiased transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
