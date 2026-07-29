"use client";

import { useEffect, useRef } from "react";
import { LOCATIONS } from "@/data/content";
import { Icon } from "./Icons";
import { gsap } from "@/utils/gsap";

export default function Locations() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".location-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".location-grid",
            start: "top 82%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="locations" ref={rootRef} className="relative py-24 md:py-32 bg-primary-light">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold text-primary tracking-wide">مکان‌های مناسب نصب</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-ink-900">
            هرجا نیاز به فروش بی‌وقفه باشد، جای وندینگ ماشین است
          </h2>
          <p className="mt-4 text-ink-500 leading-7">
            دستگاه‌های روبات مارکت برای انطباق با فضاهای مختلف طراحی شده‌اند؛ از فضاهای پرتردد تا
            نصب پشت ویترین برای فروش شبانه.
          </p>
        </div>

        <div className="location-grid mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="location-card group relative rounded-2xl bg-white p-6 border border-primary/10 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 opacity-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon name={loc.icon} />
              </div>
              <h3 className="mt-5 font-bold text-ink-900 text-lg">{loc.title}</h3>
              <p className="mt-2 text-sm text-ink-500 leading-7">{loc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
