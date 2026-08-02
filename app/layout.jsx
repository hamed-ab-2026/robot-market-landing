import {Vazirmatn} from 'next/font/google';
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

export default function RootLayout({children}) {

    return (
        <html lang="fa" dir="rtl" className={`${vazirmatn.variable} light`} suppressHydrationWarning>
        <body className="bg-page text-primary antialiased transition-colors duration-300">
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
