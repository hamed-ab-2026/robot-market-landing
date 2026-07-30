"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/utils/gsapConfig";
import { EASE } from "@/constants/theme";

/**
 * Fades + rises a block into view once it enters the viewport.
 * Used for headings, paragraphs and cards that don't need a
 * bespoke timeline of their own. Respects prefers-reduced-motion
 * by skipping the transform and only cross-fading.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay]
 * @param {number} [props.y] - starting vertical offset in px
 * @param {string} [props.className]
 * @param {"div"|"span"} [props.as]
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = "div",
}) {
  const ref = useRef(null);
  const Tag = as;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(el, { opacity: 0, y: prefersReduced ? 0 : y });

      const anim = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: EASE.soft,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      return () => anim.scrollTrigger?.kill();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
