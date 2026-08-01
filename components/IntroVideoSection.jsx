'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { introVideoSrc, introVideoPoster } from '@/data/content';

export default function IntroVideoSection() {
  const { t } = useLanguage();

  return (
    <section id="video" className="relative px-6 md:px-16 py-20 md:py-28 bg-surface border-t border-subtle">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-brand-400 text-sm font-semibold tracking-wide">{t.introVideo.eyebrow}</span>
        <h2 className="text-2xl md:text-4xl font-extrabold brand-gradient-text mt-3 mb-3">
          {t.introVideo.title}
        </h2>
        <p className="text-secondary text-sm md:text-base mb-10">{t.introVideo.subtitle}</p>

        {/*
          TODO: replace /public/video/company-intro-placeholder.mp4 with the real
          company introduction video (keep the same filename, or update
          `introVideoSrc` in data/content.js). The poster image shows before
          playback starts — swap /public/images/video-poster.svg the same way.
        */}
        <div className="rounded-2xl overflow-hidden border border-subtle shadow-brandGlow">
          <video controls poster={introVideoPoster} className="w-full aspect-video bg-black">
            <source src={introVideoSrc} type="video/mp4" />
            {t.introVideo.videoNotSupported}
          </video>
        </div>
      </div>
    </section>
  );
}
