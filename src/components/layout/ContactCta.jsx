import { FiArrowLeft } from "react-icons/fi";
import Section from "@components/common/Section";
import ScrollReveal from "@components/animations/ScrollReveal";
import MagneticButton from "@components/common/MagneticButton";
import GlassCard from "@components/common/GlassCard";

/**
 * Final call-to-action before the footer. The نav "تماس با ما"
 * link points here; the footer below carries the detailed contact
 * info, keeping this section focused on a single clear action.
 */
export default function ContactCta() {
  return (
    <Section id="contact" className="pb-16 md:pb-20">
      <ScrollReveal>
        <GlassCard className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-2xl font-bold text-primary-dark md:text-4xl">
            آماده‌اید فروش بدون توقف را تجربه کنید؟
          </h2>
          <p className="mt-4 text-primary-dark/70">
            کارشناسان روبات مارکت مدل مناسب کسب‌وکار شما را پیشنهاد می‌دهند.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton variant="primary" as="a" href="#products">
              درخواست مشاوره رایگان
              <FiArrowLeft aria-hidden="true" />
            </MagneticButton>
          </div>
        </GlassCard>
      </ScrollReveal>
    </Section>
  );
}
