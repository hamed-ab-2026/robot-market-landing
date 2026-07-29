import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata = {
  title: "روبات مارکت | تولیدکننده دستگاه‌های وندینگ ماشین صنعتی",
  description:
    "روبات مارکت، تولیدکننده تخصصی دستگاه‌های خودپرداز (وندینگ ماشین) خنک‌کننده با استانداردهای مهندسی روز و بازگشت سرمایه مطمئن. سفارش و مشاوره رایگان.",
  keywords: [
    "وندینگ ماشین",
    "دستگاه خودپرداز",
    "روبات مارکت",
    "دستگاه فروش خودکار",
    "vending machine",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-vazir antialiased">{children}</body>
    </html>
  );
}
