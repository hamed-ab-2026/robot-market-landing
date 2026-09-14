import LocationsSection from '@/components/LocationsSection';
import ShowcaseSection from "@/components/ShowcaseSection";
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import HeroSection from '@/components/HeroSection';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {

    return (
        <main className="relative bg-page">
            <Header/>
            <CartDrawer/>
            <HeroSection/>
            <ShowcaseSection/>
            <FeaturesSection/>
            <AboutSection/>
            <LocationsSection/>
            <Footer/>
        </main>
    );
}
