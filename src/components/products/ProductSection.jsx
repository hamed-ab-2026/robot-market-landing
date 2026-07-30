"use client";

import { useEffect, useRef } from "react";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import GlassCard from "@components/common/GlassCard";
import MagneticButton from "@components/common/MagneticButton";
import MachineVisual from "./MachineVisual";
import SectionFloatingItems from "./SectionFloatingItems";
import { cn } from "@/utils/cn";

const FEATURES = [
  "سیستم خنک‌کننده قدرتمند",
  "مکانیزم تحویل نرم و بی‌صدا",
  "مدیریت و پایش آنلاین",
];

/**
 * One presentational "chapter" of the product story. This
 * component itself owns no ScrollTrigger/pin — it only renders the
 * machine + info card and, once mounted, reports its three DOM
 * nodes (section root, machine wrapper, card) up to
 * `ProductsShowcase` via `onRefsReady`.
 *
 * Why: creating each section's pinned ScrollTrigger from its own
 * sibling component led to a real bug on wide/desktop viewports —
 * later sections' pins could be measured before earlier sections'
 * pin-spacers were reliably in place, so scrolling past the first
 * machine sometimes never revealed the next ones. Centralizing all
 * pin/timeline creation in the parent (after every section has
 * reported in, then calling `ScrollTrigger.refresh()` once)
 * guarantees correct measurement regardless of viewport size.
 *
 * @param {Object} props
 * @param {Object} props.product
 * @param {number} props.index
 * @param {(index: number, refs: { sectionEl: HTMLElement, machineEl: HTMLElement, cardEl: HTMLElement }) => void} props.onRefsReady
 */
export default function ProductSection({ product, index, onRefsReady }) {
  const sectionRef = useRef(null);
  const machineWrapRef = useRef(null);
  const cardRef = useRef(null);
  const isReversed = product.reverseLayout;
  const isDark = product.bgColor && isColorDark(product.bgColor);

  useEffect(() => {
    onRefsReady?.(index, {
      sectionEl: sectionRef.current,
      machineEl: machineWrapRef.current,
      cardEl: cardRef.current,
    });
  }, [index, onRefsReady]);

  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden py-20"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        <div
          ref={machineWrapRef}
          className={cn("relative", isReversed ? "md:order-2" : "md:order-1")}
        >
          <SectionFloatingItems product={product} />
          {isDark && (
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-white/20 blur-3xl"
            />
          )}
          <MachineVisual product={product} />
        </div>

        <div
          ref={cardRef}
          className={cn(isReversed ? "md:order-1" : "md:order-2")}
        >
          <GlassCard>
            <span className="text-sm font-semibold text-primary">
              {product.brand} · {product.channels} کانال
            </span>
            <h3 className="mt-3 text-3xl font-bold text-primary-dark md:text-4xl">
              {product.title}
            </h3>
            <p className="mt-2 text-2xl font-bold text-primary-dark/90">
              {product.price}
              <span className="mr-1 text-sm font-normal text-primary-dark/50">
                تومان
              </span>
            </p>

            <p className="mt-5 text-sm leading-8 text-primary-dark/70">
              {product.description.split("\n\n")[1] ?? product.description}
            </p>

            <ul className="mt-6 space-y-3">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-primary-dark/80"
                >
                  <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-primary-light text-primary">
                    <FiCheck size={12} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <MagneticButton variant="primary" className="mt-8 w-full md:w-auto">
              استعلام قیمت و خرید
              <FiArrowLeft aria-hidden="true" />
            </MagneticButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

/**
 * Cheap luminance check used to decide whether a section's vivid
 * `bgColor` still reads as dark enough to warrant a soft white glow
 * behind the machine for extra contrast/drama.
 * @param {string} hex
 * @returns {boolean}
 */
function isColorDark(hex) {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.55;
}
