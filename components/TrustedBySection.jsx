'use client';

/**
 * سکشن «مشتریانی که به ما اعتماد کرده‌اند» — یک نوار لوگوی بی‌پایان (marquee)
 * که به‌آرامی و پیوسته حرکت می‌کند. برای ساخت افکت حلقه‌ی بی‌پایان، لیست
 * لوگوها را دو بار پشت‌سرهم رندر می‌کنیم و با انیمیشن CSS آن را جابه‌جا می‌کنیم.
 *
 * نکته فنی: مسیر (track) همیشه جهت LTR دارد، چون منطق «حرکت به چپ» انیمیشن
 * فرض بر همین جهت است — دقیقاً همان مشکلی که در اسکرول افقی محصولات داشتیم و
 * حلش کردیم. این‌جا هم برای جلوگیری از همان باگ، جهت را ثابت نگه داشتیم.
 */

import { useLanguage } from '@/app/context/LanguageContext';

export default function TrustedBySection() {
  const { t } = useLanguage();
  const clients = t.trustedBy.clients;
  // لیست لوگوها را دو برابر می‌کنیم تا وقتی نیمه اول با انیمیشن رد شد،
  // نیمه دوم دقیقاً از همان‌جا ادامه بدهد و چشم متوجه پرش/شکاف نشود.
  const doubledClients = [...clients, ...clients];

  return (
    <section className="relative px-6 md:px-16 py-16 md:py-20 bg-page border-t border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-brand-400 text-sm font-semibold tracking-wide">{t.trustedBy.eyebrow}</span>
          <h2 className="text-xl md:text-2xl font-extrabold text-primary mt-2">{t.trustedBy.title}</h2>
        </div>
      </div>

      {/* یک محو تدریجی (fade mask) دو طرف نوار، تا لبه‌های لوگوها بریده به‌نظر نرسد */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee gap-10" dir="ltr">
          {doubledClients.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="w-40 md:w-48 shrink-0 flex items-center justify-center bg-surface border border-subtle rounded-xl p-4 opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src={`/images/clients/client-${((i % clients.length) + 1)}.svg`}
                alt={client.name}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
