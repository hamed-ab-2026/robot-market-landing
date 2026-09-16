import LocationsSection from '@/components/LocationsSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
    return (
        <main className="relative bg-page">
            <HeroSection />
            <ShowcaseSection />
            <FeaturesSection />
            <AboutSection />
            <LocationsSection />
        </main>
    );
}
