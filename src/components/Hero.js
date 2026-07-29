"use client";

import {useEffect, useRef} from "react";
import {VMTop, VMMiddle, VMBottom} from "./VendingMachineParts";
import {gsap, ScrollTrigger} from "@/utils/gsap";

const FEATURES = [
    {
        id: "ui",
        label: "نمایشگر لمسی هوشمند",
        desc: "رابط کاربری فارسی و انتخاب سریع کالا",
        top: "8%",
        side: "left",
    },
    {
        id: "cooling",
        label: "سیستم خنک‌کننده صنعتی",
        desc: "کمپرسور مستقل با کنترل دمای دقیق",
        top: "42%",
        side: "right",
    },
    {
        id: "payment",
        label: "ترمینال پرداخت هوشمند",
        desc: "کارتخوان بانکی و پرداخت آنلاین",
        top: "78%",
        side: "left",
    },
    {
        id: "body",
        label: "بدنه فولادی ضدضربه",
        desc: "مقاوم در برابر سرقت و ضربه",
        top: "60%",
        side: "right",
    },
];

export default function Hero() {
    const sectionRef = useRef(null);
    const topRef = useRef(null);
    const midRef = useRef(null);
    const botRef = useRef(null);
    const calloutsRef = useRef([]);
    const eyebrowRef = useRef(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            mm.add(
                {
                    isDesktop: "(min-width: 1024px)",
                    isMobile: "(max-width: 1023px)",
                },
                (context) => {
                    const {isMobile} = context.conditions;
                    const distance = isMobile ? 120 : 220;
                    const scrollLength = isMobile ? 1200 : 1800;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: `+=${scrollLength}`,
                            scrub: 0.8,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    tl.fromTo(
                        topRef.current,
                        {y: -distance, opacity: 0.4},
                        {y: 0, opacity: 1, duration: 1, ease: "power2.out"},
                        0
                    )
                        .fromTo(
                            botRef.current,
                            {y: distance, opacity: 0.4},
                            {y: 0, opacity: 1, duration: 1, ease: "power2.out"},
                            0
                        )
                        .fromTo(
                            midRef.current,
                            {opacity: 0, scale: 0.92},
                            {opacity: 1, scale: 1, duration: 1, ease: "power2.out"},
                            0.15
                        )
                        .to({}, {duration: 0.35}) // brief hold once assembled (pin breathing room)
                        .fromTo(
                            calloutsRef.current,
                            {opacity: 0, x: (i) => (i % 2 === 0 ? -24 : 24)},
                            {opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: "power2.out"},
                            ">-0.1"
                        )
                        .fromTo(
                            eyebrowRef.current,
                            {opacity: 1},
                            {opacity: 0.5, duration: 0.3},
                            "<"
                        );

                    return () => tl.scrollTrigger?.kill();
                }
            );
        }, sectionRef);

        // Fonts/SVG layout can settle a beat after this effect runs — refresh
        // once more on the next frame so the pin/scrub distances are accurate
        // on the very first load, not just after a manual scroll-refresh.
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            cancelAnimationFrame(raf);
            ctx.revert();
        };
    }, []);

    return (
        <section
            id="top"
            ref={sectionRef}
            className="relative min-h-screen bg-primary-light blueprint-grid pt-16 sm:pt-20 md:pt-28"
        >
            <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center h-full">
                {/* Copy */}
                <div className="order-2 lg:order-none relative z-10 pb-10 lg:pb-0 text-center lg:text-right">
          <span
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-3 md:px-4 py-1.5 text-[11px] md:text-xs font-bold text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"/>
            از تجهیزات زعفران‌کوبی ۱۳۹۶ تا وندینگ ماشین هوشمند
          </span>
                    <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-black text-ink-900 leading-[1.2] text-balance">
                        روبات مارکت،
                        <span className="text-primary"> مهندسی فروش خودکار</span> برای کسب‌وکار شما
                    </h1>
                    <p className="mt-5 text-sm sm:text-base md:text-lg text-ink-500 leading-7 md:leading-8 max-w-xl mx-auto lg:mx-0">
                        تولیدکننده وندینگ ماشین‌های خنک‌کننده صنعتی با استانداردهای مهندسی روز، طراحی‌شده
                        برای فروش بدون‌وقفه، ۲۴ ساعته و بازگشت سرمایه مطمئن.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                        <a
                            href="#products"
                            className="rounded-full bg-primary px-6 md:px-7 py-3 md:py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover hover:-translate-y-0.5 transition-all"
                        >
                            مشاهده محصولات
                        </a>
                        <a
                            href="#contact"
                            className="rounded-full border-2 border-primary/30 px-6 md:px-7 py-3 md:py-3.5 text-sm font-bold text-ink-900 hover:border-primary hover:text-primary transition-all"
                        >
                            سفارش و مشاوره رایگان
                        </a>
                    </div>
                    <p className="mt-6 text-xs text-ink-500">
                        برای مشاهده اسکرول کنید — دستگاه به‌صورت زنده در برابر چشمان شما مونتاژ می‌شود
                    </p>
                </div>

                {/* GSAP Assembly Machine */}
                <div
                    className="order-1 lg:order-none relative h-[46vh] sm:h-[55vh] lg:h-[80vh] flex items-center justify-center">
                    <div className="relative w-[170px] sm:w-[220px] md:w-[260px] lg:w-[300px]">
                        <div ref={topRef} className="relative z-30 will-change-transform">
                            <VMTop/>
                        </div>
                        <div ref={midRef} className="relative z-20 -mt-px will-change-transform">
                            <VMMiddle/>
                        </div>
                        <div ref={botRef} className="relative z-30 -mt-px will-change-transform">
                            <VMBottom/>
                        </div>

                        {/* Feature callouts */}
                        {FEATURES.map((f, i) => (
                            <div
                                key={f.id}
                                ref={(el) => (calloutsRef.current[i] = el)}
                                className={`hidden sm:flex absolute items-center gap-2 w-40 md:w-48 opacity-0 ${
                                    f.side === "left" ? "right-full ml-3 flex-row-reverse text-right" : "left-full mr-3 text-right"
                                }`}
                                style={{top: f.top}}
                            >
                                {f.side === "left" && (
                                    <span className="h-px w-6 md:w-10 bg-primary/60 shrink-0"/>
                                )}
                                <span>
                  <span className="block text-xs md:text-sm font-bold text-ink-900">
                    {f.label}
                  </span>
                  <span className="block text-[10px] md:text-xs text-ink-500">{f.desc}</span>
                </span>
                                {f.side === "right" && (
                                    <span className="h-px w-6 md:w-10 bg-primary/60 shrink-0"/>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile feature list (callout lines are desktop-only) */}
            <div className="sm:hidden max-w-md mx-auto px-5 pb-10 grid grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                    <div key={f.id} className="rounded-xl bg-white/70 border border-primary/15 p-3">
                        <p className="text-xs font-bold text-ink-900">{f.label}</p>
                        <p className="text-[10px] text-ink-500 mt-1">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
