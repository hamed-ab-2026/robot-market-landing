import { Vazirmatn } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StoreProvider from "@/redux/provider";
import AntThemeProvider from "@/components/ui/AntThemeProvider";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const SITE_URL = "https://robotmarket.example.com";
const SITE_NAME = "روبات مارکت";
const SITE_DESCRIPTION =
  "روبات مارکت، تولیدکننده دستگاه‌های وندینگ ماشین یخچالدار هوشمند با مدل‌های ۳۵، ۴۸ و ۶۰ کانال برای کسب‌وکارهای پرتردد.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "روبات مارکت | دستگاه‌های وندینگ ماشین هوشمند",
    template: "%s | روبات مارکت",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "وندینگ ماشین",
    "دستگاه فروش خودکار",
    "روبات مارکت",
    "یخچال هوشمند",
    "vending machine",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "روبات مارکت | دستگاه‌های وندینگ ماشین هوشمند",
    description: SITE_DESCRIPTION,
    images: [
      {
        // TODO: Replace with a real 1200x630 OG raster image before launch.
        url: "/icons/og-placeholder.svg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "روبات مارکت | دستگاه‌های وندینگ ماشین هوشمند",
    description: SITE_DESCRIPTION,
    images: ["/icons/og-placeholder.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#00A693",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon.svg`,
    description: SITE_DESCRIPTION,
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "روبات مارکت 35 کانال" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "روبات مارکت 48 کانال" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "روبات مارکت 60 کانال" } },
    ],
  };

  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-vazir bg-surface text-primary-dark antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StoreProvider>
          <AntdRegistry>
            <AntThemeProvider>{children}</AntThemeProvider>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
