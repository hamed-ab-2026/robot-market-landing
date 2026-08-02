'use client';

// سکشن معرفی شرکت با متن بلند؛ به‌خاطر طولانی بودن متن، یک دکمه «ادامه مطلب» برای باز/بسته کردن دارد.

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const visibleParagraphs = expanded ? t.about.paragraphs : t.about.paragraphs.slice(0, 2);

  return (
    <section id="about" className="relative px-6 md:px-16 py-20 md:py-28 bg-elevated border-t border-subtle">
      <div className="max-w-4xl mx-auto">
        <span className="text-brand-400 text-sm font-semibold tracking-wide">{t.about.eyebrow}</span>
        <h2 className="text-2xl md:text-4xl font-extrabold brand-gradient-text mt-3 mb-8">
          {t.about.legalName}
        </h2>

        <div className="flex flex-col gap-5">
          {visibleParagraphs.map((p, i) => (
            <p key={i} className="text-secondary leading-8 text-base md:text-lg text-justify">
              {p}
            </p>
          ))}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors"
        >
          {expanded ? t.about.less : t.about.more}
          <span className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>˅</span>
        </button>
      </div>
    </section>
  );
}
