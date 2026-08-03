'use client';

/**
 * سکشن اول سایت (Hero) — ایده کلی از صفحه وندینگ سایت Sielaff گرفته شده:
 * یک اسلایدر تمام‌عرض که هر ۵ ثانیه به‌صورت خودکار به اسلاید بعدی می‌رود،
 * همراه با یک شکل مورب رنگی (به‌جای قرمز آن‌ها، رنگ سبز برند خودمان #00a693)،
 * عنوان بزرگ دو خطی، و دکمه‌های فلش قبلی/بعدی برای ناوبری دستی.
 */

import {useCallback, useEffect, useRef, useState} from 'react';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {useLanguage} from '@/app/context/LanguageContext';

const AUTOPLAY_DELAY = 5000; // هر ۵ ثانیه اسلاید عوض می‌شود

export default function HeroSection() {
    const {t, dir} = useLanguage();
    const slides = t.hero.slides;
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef(null);

    // رفتن به اسلاید بعدی (با چرخش به اول لیست وقتی به آخر رسید)
    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    // تایمر پخش خودکار: هر بار که اسلاید عوض می‌شود، تایمر قبلی پاک و یک تایمر
    // جدید ۵ ثانیه‌ای ست می‌شود. با کلیک دستی روی فلش‌ها هم همین تابع دوباره
    // صدا زده می‌شود تا شمارش از نو شروع شود (تجربه کاربری بهتر).
    const restartAutoplay = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(goToNext, AUTOPLAY_DELAY);
    }, [goToNext]);

    useEffect(() => {
        restartAutoplay();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [restartAutoplay]);

    const handleManualNav = (direction) => {
        if (direction === 'next') goToNext();
        else goToPrev();
        restartAutoplay(); // شمارش ۵ ثانیه بعد از کلیک دستی از نو شروع شود
    };

    const slide = slides[activeIndex];

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden bg-page">
            {/* ------------------------------------------------------------------ */}
            {/* شکل مورب تزئینی سمت راست/چپ — نسخه سبز برند به‌جای قرمز Sielaff       */}
            {/* ------------------------------------------------------------------ */}
            <div
                className="absolute inset-y-0 w-1/3 hidden md:block"
                style={{
                    background: 'linear-gradient(135deg, #00a693 0%, #017065 60%, #0b3d38 100%)',
                    clipPath:
                        dir === 'rtl'
                            ? 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)'
                            : 'polygon(0 0, 70% 0, 100% 100%, 0% 100%)',
                }}
            />

            {/* ------------------------------------------------------------------ */}
            {/* اسلایدهای عکس — همه اسلایدها روی هم قرار دارند و فقط با opacity     */}
            {/* محو/نمایان می‌شوند (transition نرم به‌جای پرش ناگهانی)                */}
            {/* ------------------------------------------------------------------ */}
            <div className="absolute inset-0">
                {slides.map((s, i) => (
                    <div
                        key={s.id}
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out"
                        style={{opacity: i === activeIndex ? 1 : 0, pointerEvents: i === activeIndex ? 'auto' : 'none'}}
                        aria-hidden={i !== activeIndex}
                    >
                        <img
                            src={s.image}
                            alt={s.titleLines.join(' ')}
                            className="h-[55%] md:h-[70%] w-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                ))}
            </div>

            {/* لایه‌ی نیمه‌شفاف پشت متن، برای خوانایی روی هر عکسی */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(4,18,15,0.05) 0%, rgba(4,18,15,0.15) 60%, rgba(4,18,15,0.35) 100%)',
                }}
            />

            {/* ------------------------------------------------------------------ */}
            {/* متن روی اسلاید: کیکر کوچک + عنوان بزرگ دو خطی + توضیح + دکمه CTA     */}
            {/* ------------------------------------------------------------------ */}
            <div
                className="relative  z-10 h-full flex flex-col justify-end md:justify-end px-6 md:px-16 pb-28 md:pb-72">
                <div className="max-w-2xl">
                  <span className="text-brand-400 font-semibold tracking-widest text-sm uppercase">
                    {slide.kicker}
                  </span>
                    <h1 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        {slide.titleLines.map((line, i) => (
                            <span key={i} className="block">
                {line}
              </span>
                        ))}
                    </h1>
                    <p className="mt-5 text-white/90 text-base md:text-lg max-w-xl drop-shadow-lg">{slide.sub}</p>
                    <a
                        href="#showcase"
                        className="mt-8 inline-flex items-center gap-2 bg-brand hover:bg-brand-400 text-ink-950 font-bold px-8 py-3.5 rounded-full transition-colors shadow-brandGlow"
                    >
                        {t.hero.cta}
                    </a>
                </div>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* فلش‌های ناوبری دستی (قبلی / بعدی) — وسط دو طرف   */}
            {/* ------------------------------------------------------------------ */}
            <button
                onClick={() => handleManualNav('prev')}
                aria-label="previous slide"
                className="hidden sm:flex absolute top-1/2 -translate-y-1/2 start-4 z-20 w-11 h-11 rounded-full bg-page-70 border border-subtle items-center justify-center text-primary hover:bg-brand hover:text-ink-950 transition-colors"
            >
                <LeftOutlined/>
            </button>
            <button
                onClick={() => handleManualNav('next')}
                aria-label="next slide"
                className="hidden sm:flex absolute top-1/2 -translate-y-1/2 end-4 z-20 w-11 h-11 rounded-full bg-page-70 border border-subtle items-center justify-center text-primary hover:bg-brand hover:text-ink-950 transition-colors"
            >
                <RightOutlined/>
            </button>

            {/* نقطه‌های شمارشگر اسلاید پایین صفحه — کلیک روی هرکدام مستقیم به همان اسلاید می‌رود */}
            <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center gap-2">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => {
                            setActiveIndex(i);
                            restartAutoplay();
                        }}
                        aria-label={`slide ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${
                            i === activeIndex ? 'w-8 bg-brand' : 'w-2 bg-brand/30 hover:bg-brand/60'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
