import { FiInstagram, FiLinkedin, FiMessageCircle } from "react-icons/fi";
import Container from "@components/common/Container";
import { NAV_LINKS } from "@constants/nav";

const SOCIAL_LINKS = [
  { key: "instagram", label: "اینستاگرام", href: "#", icon: FiInstagram },
  { key: "linkedin", label: "لینکدین", href: "#", icon: FiLinkedin },
  { key: "telegram", label: "تلگرام", href: "#", icon: FiMessageCircle },
];

/**
 * Placeholder footer content is intentionally generic — every
 * string here is meant to be swapped for real company copy before
 * launch, but the structure (about / quick links / contact /
 * social / legal bar) is production-ready.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-dark/10 bg-primary-dark text-primary-light">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-white">روبات مارکت</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-primary-light/70">
            طراحی و تولید دستگاه‌های وندینگ ماشین یخچالدار هوشمند برای
            کسب‌وکارهایی که می‌خواهند بدون وقفه بفروشند.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map(({ key, label, href, icon: Icon }) => (
              <a
                key={key}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary-accent hover:text-primary-dark"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="لینک‌های سریع">
          <h3 className="text-sm font-semibold text-white">لینک‌های سریع</h3>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="text-sm text-primary-light/70 transition-colors hover:text-primary-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-white">تماس با ما</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-light/70">
            {/* TODO: Replace with real company contact details */}
            <li>تهران، ایران</li>
            <li dir="ltr" className="text-right">+98 21 0000 0000</li>
            <li dir="ltr" className="text-right">info@robotmarket.example.com</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-primary-light/60 md:flex-row">
          <p>© {year} روبات مارکت. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-accent">
              حریم خصوصی
            </a>
            <a href="#" className="hover:text-primary-accent">
              قوانین و مقررات
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
