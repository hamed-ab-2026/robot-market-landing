import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HorizontalShowcase from '@/components/HorizontalShowcase';
import TrustedBySection from '@/components/TrustedBySection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import CatalogSection from '@/components/CatalogSection';
import LocationsSection from '@/components/LocationsSection';
import IntroVideoSection from '@/components/IntroVideoSection';
import MapSection from '@/components/MapSection';
import TicketForm from '@/components/TicketForm';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ChatWidget from '@/components/ChatWidget';

// چیدمان کامل صفحه اصلی. ترتیب سکشن‌ها از بالا به پایین:
// هیرو (اسلایدر) -> ویترین محصولات (اسکرول افقی + ویدیو) -> مشتریان ما ->
// مزایا -> درباره ما -> کاتالوگ -> مکان‌های نصب -> ویدیوی معرفی -> نقشه ->
// فرم تیکت -> فوتر. همه‌ی سکشن‌ها به‌جز هیرو و ویترین محصولات، رنگ زمینه‌شان
// به‌ترتیب بین سه تن روشن/متوسط/برجسته (bg-page / bg-surface / bg-elevated)
// می‌چرخد تا هنگام اسکرول یک تغییر رنگ ظریف حس شود.
export default function HomePage() {
  return (
    <main className="relative bg-page">
      <Header />
      <CartDrawer />
      <ChatWidget />

      <HeroSection />

      <HorizontalShowcase />

      <TrustedBySection />

      <FeaturesSection />

      <AboutSection />

      <CatalogSection />

      <LocationsSection />

      <IntroVideoSection />

      <MapSection />

      <TicketForm />

      <Footer />
    </main>
  );
}
