import { FiZap, FiShield, FiTrendingUp } from "react-icons/fi";
import Section from "@components/common/Section";
import ScrollReveal from "@components/animations/ScrollReveal";
import GlassCard from "@components/common/GlassCard";

const HIGHLIGHTS = [
  {
    icon: FiZap,
    title: "راه‌اندازی سریع",
    text: "نصب و راه‌اندازی دستگاه در محل شما در کوتاه‌ترین زمان ممکن.",
  },
  {
    icon: FiShield,
    title: "پشتیبانی مطمئن",
    text: "پایش آنلاین سلامت دستگاه و پشتیبانی فنی مستمر.",
  },
  {
    icon: FiTrendingUp,
    title: "درآمد پایدار",
    text: "فروش ۲۴ ساعته بدون نیاز به نیروی انسانی ثابت.",
  },
];

/**
 * Brand-story section. Copy here is placeholder-quality but
 * production-shaped — swap the paragraph and highlight text for
 * real company messaging when available.
 */
export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <ScrollReveal>
          <span className="text-sm font-semibold text-primary">درباره ما</span>
          <h2 className="text-balance mt-3 text-3xl font-bold text-primary-dark md:text-5xl">
            روبات مارکت، شریک فروش هوشمند شما
          </h2>
          <p className="mt-6 text-primary-dark/70 leading-8">
            {/* TODO: Replace with real company story/copy */}
            روبات مارکت با تمرکز بر طراحی دستگاه‌های وندینگ ماشین یخچالدار،
            تجربه‌ای مدرن، سریع و بدون وقفه برای مصرف‌کننده نهایی و درآمدی
            پایدار برای صاحبان کسب‌وکار فراهم می‌کند.
          </p>
        </ScrollReveal>

        <div className="grid gap-5">
          {HIGHLIGHTS.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <GlassCard className="!p-0">
                <div className="flex items-start gap-4 p-6">
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
                    <item.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary-dark">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-primary-dark/60">
                      {item.text}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
