import { FiArrowLeft, FiPlay } from "react-icons/fi";
import Container from "@components/common/Container";
import MagneticButton from "@components/common/MagneticButton";
import ScrollReveal from "@components/animations/ScrollReveal";
import HeroBackground from "./HeroBackground";
import MachineAssembly from "./MachineAssembly";
import FloatingProducts from "./FloatingProducts";

/**
 * The hero: an eyebrow, a large headline, two CTAs, and the
 * scroll-driven machine assembly centerpiece with floating product
 * placeholders around it. This is the single most important
 * section on the page per the brief.
 */
export default function Hero() {
  return (
    <section id="home" className="relative isolate">
      <HeroBackground />

      <Container className="relative flex flex-col items-center gap-16 pt-40 pb-10 text-center md:pt-48">
        <div className="max-w-3xl">
          <ScrollReveal delay={0} y={16}>
            <span className="inline-flex items-center rounded-full border border-primary-dark/10 bg-white/60 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
              نسل جدید وندینگ ماشین‌های هوشمند
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-balance mt-6 text-4xl font-bold leading-[1.15] text-primary-dark md:text-6xl">
              فروشگاهی که هرگز
              <span className="bg-brand-gradient bg-clip-text text-transparent"> تعطیل نمی‌شود</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-balance mx-auto mt-6 max-w-xl text-lg text-primary-dark/70 md:text-xl">
              روبات مارکت دستگاه‌های وندینگ ماشین یخچالدار را طراحی می‌کند تا
              کسب‌وکار شما بدون نیروی انسانی، ۲۴ ساعته و هوشمند درآمدزایی کند.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton variant="primary" as="a" href="#products">
                مشاهده محصولات
                <FiArrowLeft aria-hidden="true" />
              </MagneticButton>
              <MagneticButton variant="ghost" as="a" href="#about">
                <FiPlay aria-hidden="true" />
                آشنایی با روبات مارکت
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative w-full">
          <FloatingProducts />
          <MachineAssembly />
        </div>
      </Container>
    </section>
  );
}
