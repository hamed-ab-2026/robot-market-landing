import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Locations from "@/components/Locations";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import ScrollRefresh from "@/components/ScrollRefresh";

export default function Home() {
  return (
    <main>
      <ScrollRefresh />
      <Header />
      <Hero />
      <About />
      <Locations />
      <Products />
      <Footer />
    </main>
  );
}
