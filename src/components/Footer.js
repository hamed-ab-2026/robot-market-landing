import { CONTACT, NAV_LINKS } from "@/data/content";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-ink-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-12 pb-14 border-b border-white/10">
          {/* Brand + CTA */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-black text-sm">
                RM
              </span>
              <span className="font-extrabold text-lg">روبات مارکت</span>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-7 max-w-sm">
              تولیدکننده تخصصی دستگاه‌های خودپرداز خنک‌کننده با استانداردهای مهندسی روز، برای
              فروش هوشمند و بی‌وقفه در هر مکان.
            </p>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold hover:bg-primary-hover transition-colors"
            >
              سفارش و مشاوره رایگان
            </a>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-bold text-sm text-white/80 mb-4">دسترسی سریع</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/60 hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm text-white/80 mb-4">اطلاعات تماس</h4>
            <ul className="space-y-3 text-sm text-white/60 leading-7">
              <li>{CONTACT.factory}</li>
              <li>{CONTACT.office}</li>
              <li dir="ltr" className="text-right">
                <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-primary transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام روبات مارکت"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={CONTACT.bale}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="بله روبات مارکت"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors text-xs font-bold"
              >
                بله
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} روبات مارکت. تمامی حقوق محفوظ است.</span>
          <span>طراحی و توسعه با ❤ در مشهد</span>
        </div>
      </div>
    </footer>
  );
}
