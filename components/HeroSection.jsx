'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme } from '@/app/context/ThemeContext';

// Simple typewriter: types each phrase, pauses, deletes, moves to next phrase, loops.
function useTypewriter(phrases, { typeSpeed = 55, deleteSpeed = 30, holdTime = 1600 } = {}) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (!phrases?.length) return undefined;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const current = phrases[phraseIndex % phrases.length];

      if (!deleting) {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, holdTime);
          return;
        }
        timeoutId = setTimeout(tick, typeSpeed);
      } else {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          setPhraseIndex((i) => (i + 1) % phrases.length);
          timeoutId = setTimeout(tick, 300);
          return;
        }
        timeoutId = setTimeout(tick, deleteSpeed);
      }
    };

    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phraseIndex, phrases]);

  return text;
}

export default function HeroSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const introRef = useRef(null);
  const logoRef = useRef(null);
  const bgColorRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  const typedHeadline = useTypewriter(t.hero.typingPhrases);
  const isDark = theme === 'dark';

  // Intro loader fade-in / fade-out.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(logoRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' })
        .to(logoRef.current, { opacity: 0, duration: 0.5, delay: 0.4, ease: 'power1.in' })
        .to(introRef.current, { opacity: 0, duration: 0.7, ease: 'power2.inOut', pointerEvents: 'none' }, '-=0.1')
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
    });
    return () => ctx.revert();
  }, []);

  // Background behavior differs by theme:
  // - Dark mode: looping color cycle (brand green -> black -> white -> green),
  //   kept readable by the dark scrim below.
  // - Light mode: a calm, static light background (no cycling), paired with
  //   dark text and a light scrim instead.
  useEffect(() => {
    const el = bgColorRef.current;
    if (!el) return undefined;

    if (isDark) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(el, { backgroundColor: '#04120f', duration: 5, ease: 'sine.inOut' })
        .to(el, { backgroundColor: '#ffffff', duration: 5, ease: 'sine.inOut' })
        .to(el, { backgroundColor: '#00a693', duration: 5, ease: 'sine.inOut' });
      return () => tl.kill();
    }

    gsap.set(el, { backgroundColor: '#f5fbf9' });
    return undefined;
  }, [isDark]);

  const scrimStyle = isDark
    ? {
        background:
          'radial-gradient(circle at 50% 40%, rgba(4,18,15,0.35), rgba(4,18,15,0.75) 70%), linear-gradient(180deg, rgba(4,18,15,0.55) 0%, rgba(4,18,15,0.35) 45%, rgba(4,18,15,0.7) 100%)',
      }
    : {
        background:
          'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.15), rgba(255,255,255,0.55) 70%), linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.55) 100%)',
      };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Intro loader overlay */}
      <div ref={introRef} className="fixed inset-0 z-[100] bg-page flex items-center justify-center">
        <div ref={logoRef} className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center shadow-brandGlow">
            <span className="text-2xl font-bold text-ink-950">R</span>
          </div>
          <p className="text-brand-400 tracking-widest text-sm">{t.hero.loading}</p>
        </div>
      </div>

      {/* Background: cycling colors in dark mode, static light tone in light mode */}
      <div ref={bgColorRef} className="absolute inset-0" style={{ backgroundColor: '#00a693' }} />

      {/*
        TODO: swap the background above for a video once the asset is ready:

        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/hero-background.mp4"
        />

        Keep the scrim div below on top of it so the headline stays readable.
      */}

      {/* Scrim to keep text legible — tuned per theme so it never washes out the copy */}
      <div className="absolute inset-0" style={scrimStyle} />

      {/* Decorative dot grid — dark dots on light backgrounds, light dots on dark */}
      <div
        className={`absolute inset-0 opacity-[0.08] [background-size:26px_26px] ${
          isDark
            ? '[background-image:radial-gradient(#ffffff_1px,transparent_1px)]'
            : '[background-image:radial-gradient(#04231f_1px,transparent_1px)]'
        }`}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight max-w-4xl text-primary min-h-[1.4em]">
          {typedHeadline}
          <span className="typewriter-caret h-[0.9em] align-middle" />
        </h1>
        <p ref={subRef} className="mt-6 max-w-2xl text-secondary text-base md:text-xl opacity-0">
          {t.hero.sub}
        </p>
        <a
          ref={ctaRef}
          href="#showcase"
          className="opacity-0 mt-10 inline-flex items-center gap-2 bg-brand hover:bg-brand-400 text-ink-950 font-bold px-8 py-3.5 rounded-full transition-colors shadow-brandGlow"
        >
          {t.hero.cta}
        </a>
      </div>

      <div className="absolute bottom-8 inset-x-0 flex justify-center z-10">
        <div
          className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5 ${
            isDark ? 'border-white/50' : 'border-ink-900/30'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulseSoft ${isDark ? 'bg-white' : 'bg-ink-900'}`} />
        </div>
      </div>
    </section>
  );
}
