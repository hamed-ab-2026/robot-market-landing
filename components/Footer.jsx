'use client';

// فوتر سایت: درباره ما کوتاه، لینک‌های شبکه اجتماعی، دسترسی سریع، و اطلاعات تماس/آدرس.

import { PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const c = t.contactInfo;

  return (
    <footer id="contact" className="relative border-t border-subtle bg-elevated">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-14 grid md:grid-cols-3 gap-10 text-center md:text-start">
        <div>
          <h3 className="text-primary font-bold text-lg mb-3">{t.footer.aboutLabel}</h3>
          <p className="text-secondary text-sm leading-7">{t.footer.aboutText}</p>
          <div className="flex flex-col gap-2 mt-4">
            {c.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold text-lg mb-3">{t.footer.quickLinks}</h3>
          <ul className="flex flex-col gap-2 text-sm text-secondary">
            <li><a href="#hero" className="hover:text-brand-400">{t.nav.home}</a></li>
            <li><a href="#showcase" className="hover:text-brand-400">{t.nav.showcase}</a></li>
            <li><a href="#about" className="hover:text-brand-400">{t.nav.about}</a></li>
            <li><a href="#catalog" className="hover:text-brand-400">{t.nav.catalog}</a></li>
            <li><a href="#locations" className="hover:text-brand-400">{t.nav.locations}</a></li>
            <li><a href="#video" className="hover:text-brand-400">{t.nav.video}</a></li>
            <li><a href="#map" className="hover:text-brand-400">{t.nav.map}</a></li>
            <li><a href="#support" className="hover:text-brand-400">{t.nav.support}</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-primary font-bold text-lg mb-3">{t.footer.contactTitle}</h3>
          <div className="flex flex-col gap-4 text-sm text-secondary">
            <a
              href={`tel:${c.orderPhoneHref}`}
              className="flex items-center justify-center md:justify-start gap-2 hover:text-brand-400 transition-colors"
              dir="ltr"
            >
              <PhoneOutlined />
              <span>{c.orderPhone}</span>
            </a>

            <div className="flex items-start justify-center md:justify-start gap-2">
              <EnvironmentOutlined className="mt-0.5 shrink-0" />
              <div className="text-start">
                <p className="text-primary-90 font-semibold mb-1">{t.footer.salesLabel}</p>
                <p className="leading-7">{c.salesOfficeAddress}</p>
              </div>
            </div>

            <div className="flex items-start justify-center md:justify-start gap-2">
              <EnvironmentOutlined className="mt-0.5 shrink-0" />
              <div className="text-start">
                <p className="text-primary-90 font-semibold mb-1">{t.footer.factoryLabel}</p>
                <p className="leading-7">{c.factoryAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-subtle py-5 text-center text-xs text-secondary">
        © {new Date().getFullYear()} {t.footer.aboutLabel}. {t.footer.rights}
      </div>
    </footer>
  );
}
