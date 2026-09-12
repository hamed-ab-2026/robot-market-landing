import LocationsSection from '@/components/LocationsSection';
import ShowcaseSection from "@/components/ShowcaseSection";
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import HeroSection from '@/components/HeroSection';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TrustedBySection from '@/components/TrustedBySection';
import CatalogSection from '@/components/CatalogSection';
import IntroVideoSection from '@/components/IntroVideoSection';
import MapSection from '@/components/MapSection';
import TicketForm from '@/components/TicketForm';
import ChatWidget from '@/components/ChatWidget';


export default function HomePage() {


    return (
        <main className="relative bg-page">
            <Header/>
            <CartDrawer/>
            {/*<ChatWidget/>*/}
            <HeroSection/>
            <ShowcaseSection/>
            {/*<TrustedBySection/>*/}
            <FeaturesSection/>
            <AboutSection/>
            {/*<CatalogSection/>*/}
            <LocationsSection/>
            {/*<IntroVideoSection/>*/}
            {/*<MapSection/>*/}
            {/*<TicketForm/>*/}
            <Footer/>
        </main>
    );
}
