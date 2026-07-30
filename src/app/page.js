import dynamic from "next/dynamic";
import Navbar from "@components/layout/Navbar";
import Hero from "@components/hero/Hero";
import Footer from "@components/layout/Footer";

// Below-the-fold sections are lazy-loaded: they're heavier
// (GSAP timelines, multiple SVG stacks) and never needed for the
// first paint, so splitting them keeps the hero's LCP fast.
const ProductsShowcase = dynamic(
  () => import("@components/products/ProductsShowcase")
);
const About = dynamic(() => import("@components/layout/About"));
const ContactCta = dynamic(() => import("@components/layout/ContactCta"));

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductsShowcase />
        <About />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
