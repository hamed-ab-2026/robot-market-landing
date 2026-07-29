"use client";

import {useEffect, useRef} from "react";
import {gsap} from "@/utils/gsap";

const TIMELINE = [
    {
        year: "۱۳۹۶",
        title: "آغاز فعالیت در تجهیزات زعفران‌کوبی",
        desc: "شروع کار با طراحی و تولید ماشین‌آلات فرآوری زعفران با تمرکز بر دقت مهندسی و کیفیت ساخت داخلی.",
    },
    {
        year: "۱۴۰۰",
        title: "ورود به صنعت اتوماسیون فروش",
        desc: "توسعه دانش فنی تیم مهندسی به سمت سامانه‌های خرده‌فروشی خودکار و مکانیزم‌های دیسپنس هوشمند.",
    },
    {
        year: "۱۴۰۲",
        title: "تولید نخستین وندینگ ماشین خنک‌کننده",
        desc: "معرفی نسل اول دستگاه‌های خودپرداز خنک‌کننده روبات مارکت با استاندارد سرمایش صنعتی.",
    },
    {
        year: "۱۴۰۳",
        title: "توسعه خط تولید و شبکه فروش سراسری",
        desc: "افزایش ظرفیت تولید، تنوع مدل‌ها (۳۵ تا ۶۰ کانال) و پشتیبانی فنی در سراسر کشور.",
    },
];

const STANDARDS = [
    {label: "استاندارد مهندسی برق و ایمنی صنعتی"},
    {label: "بدنه فولادی ضدضربه با پوشش ضدزنگ"},
    {label: "سیستم سرمایش کمپرسوری استاندارد"},
    {label: "بازگشت سرمایه (ROI) مطمئن و قابل پیش‌بینی"},
];

export default function About() {
    const rootRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".timeline-item").forEach((item, i) => {
                gsap.fromTo(
                    item,
                    {opacity: 0, y: 30},
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        },
                        delay: i * 0.05,
                    }
                );
            });

            gsap.fromTo(
                ".timeline-line",
                {scaleY: 0},
                {
                    scaleY: 1,
                    transformOrigin: "top",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".timeline-wrap",
                        start: "top 70%",
                        end: "bottom 80%",
                        scrub: 1,
                    },
                }
            );
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={rootRef} className="relative py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
                    {/* Left: intro + standards */}
                    <div>
                        <span className="text-xs font-bold text-primary tracking-wide">معرفی شرکت</span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-black text-ink-900 leading-snug">
                            مسیری مهندسی‌شده از صنعت زعفران تا اتوماسیون فروش
                        </h2>
                        <p className="mt-5 text-ink-500 leading-8">
                            روبات مارکت با پیشینه‌ای در طراحی ماشین‌آلات دقیق صنعتی، امروز یکی از تولیدکنندگان
                            تخصصی وندینگ ماشین‌های خنک‌کننده در ایران است. تیم مهندسی ما هر دستگاه را با
                            استانداردهای برق صنعتی، ایمنی مصرف‌کننده و دوام بلندمدت طراحی می‌کند تا سرمایه‌گذاری
                            شما با کمترین ریسک و بیشترین بازده همراه باشد.
                        </p>

                        <ul className="mt-8 space-y-4">
                            {STANDARDS.map((s) => (
                                <li key={s.label} className="flex items-center gap-3">
                  <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                                    <span className="text-sm md:text-base text-ink-700 font-medium">{s.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: timeline */}
                    <div className="timeline-wrap relative pr-8">
                        <div className="timeline-line absolute right-[7px] top-1 bottom-1 w-[2px] bg-primary/25"/>
                        <div className="space-y-10">
                            {TIMELINE.map((t) => (
                                <div key={t.year} className="timeline-item relative opacity-0">
                                    <span
                                        className="absolute right-[-25px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-primary-light"/>
                                    <span className="inline-block text-primary font-black text-lg mb-1">
                    {t.year}
                  </span>
                                    <h3 className="font-bold text-ink-900 text-base md:text-lg">{t.title}</h3>
                                    <p className="text-sm text-ink-500 mt-1.5 leading-7">{t.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
