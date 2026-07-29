"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUCTS, formatRial } from "@/data/content";
import { gsap } from "@/utils/gsap";

export default function Products() {
  const rootRef = useRef(null);
  const [added, setAdded] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".product-grid",
            start: "top 80%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = (id) => {
    setAdded((prev) => ({ ...prev, [id]: true }));
    // Static demo action — wire this to `submitConsultationRequest` in
    // src/utils/api.js once a cart/order API is available.
    setTimeout(() => setAdded((prev) => ({ ...prev, [id]: false })), 2200);
  };

  return (
    <section id="products" ref={rootRef} className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold text-primary tracking-wide">محصولات تخصصی</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-ink-900">
            مدل‌های وندینگ ماشین روبات مارکت
          </h2>
          <p className="mt-4 text-ink-500 leading-7">
            سه مدل با ظرفیت‌های مختلف، متناسب با ترافیک و فضای محل نصب شما.
          </p>
        </div>

        <div className="product-grid mt-14 grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={`product-card opacity-0 relative rounded-3xl p-7 flex flex-col border transition-all duration-300 ${
                p.highlight
                  ? "bg-ink-900 border-primary text-white lg:-translate-y-4 shadow-2xl shadow-primary/20"
                  : "bg-primary-light border-primary/10 text-ink-900 hover:-translate-y-2 hover:shadow-xl"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 right-7 rounded-full bg-primary px-4 py-1 text-[11px] font-bold text-white">
                  پرفروش‌ترین
                </span>
              )}

              <span
                className={`text-xs font-bold tracking-wide ${
                  p.highlight ? "text-info" : "text-primary"
                }`}
              >
                {p.channels} کانال
              </span>
              <h3 className="mt-2 text-xl font-black">{p.name}</h3>
              <p className={`mt-1 text-sm ${p.highlight ? "text-white/60" : "text-ink-500"}`}>
                {p.tagline}
              </p>

              <div className="mt-6">
                <span className="text-2xl md:text-3xl font-black" dir="ltr">
                  {formatRial(p.price)}
                </span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className={`mt-0.5 shrink-0 ${p.highlight ? "text-info" : "text-primary"}`}
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={p.highlight ? "text-white/85" : "text-ink-700"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleAdd(p.id)}
                className={`mt-8 w-full rounded-full py-3.5 text-sm font-bold transition-all ${
                  p.highlight
                    ? "bg-primary text-white hover:bg-primary-hover"
                    : "bg-ink-900 text-white hover:bg-primary"
                } ${added[p.id] ? "!bg-success" : ""}`}
              >
                {added[p.id] ? "به سبد سفارش اضافه شد ✓" : "افزودن به سبد سفارش"}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-500">
          قیمت‌ها به‌روزرسانی دوره‌ای دارند؛ برای استعلام نهایی و امکان پرداخت اقساطی با کارشناسان
          فروش تماس بگیرید.
        </p>
      </div>
    </section>
  );
}
