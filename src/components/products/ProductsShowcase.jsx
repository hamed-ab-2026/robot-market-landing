"use client";

import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/utils/gsapConfig";
import Container from "@components/common/Container";
import ScrollReveal from "@components/animations/ScrollReveal";
import ProductSection from "./ProductSection";
import { PIN_DISTANCE_DESKTOP, PIN_DISTANCE_MOBILE } from "@constants/motion";

/**
 * The scroll-locked product story. All pin/timeline creation for
 * every machine lives here — in one place, built only after every
 * `ProductSection` has reported its DOM nodes in — rather than each
 * section creating its own ScrollTrigger independently. That fixed
 * a real bug: on wide/desktop viewports, later sections' pins could
 * get measured before earlier ones' pin-spacers had settled, so
 * scrolling past the first machine sometimes never revealed the
 * next ones. A single `ScrollTrigger.refresh()` once everything is
 * built (and again once images/fonts finish loading) guarantees
 * correct measurements regardless of viewport size.
 *
 * A single fixed color layer sits behind the page; as the user
 * scrolls through each pinned section, that layer cross-fades to
 * the product's own vivid `bgColor` over the exact same scroll
 * range the section uses to pin, so color and motion always finish
 * together.
 */
export default function ProductsShowcase() {
  const products = useSelector((state) => state.products.items);
  const bgRef = useRef(null);
  const storyRef = useRef(null);
  const refsMap = useRef({});
  const [readyCount, setReadyCount] = useState(0);

  const handleRefsReady = useCallback((index, refs) => {
    if (!refsMap.current[index]) {
      refsMap.current[index] = refs;
      setReadyCount((count) => count + 1);
    } else {
      refsMap.current[index] = refs;
    }
  }, []);

  useGSAP(
    () => {
      const bg = bgRef.current;
      const story = storyRef.current;
      if (!bg || !story || !products.length) return;
      if (readyCount < products.length) return; // wait for every section

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(bg, { backgroundColor: products[0].bgColor });

      if (prefersReduced) {
        gsap.set(bg, { opacity: 1 });
        products.forEach((_, index) => {
          const refs = refsMap.current[index];
          if (!refs) return;
          gsap.set([refs.machineEl, refs.cardEl], {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          });
        });
        return;
      }

      // Fade the color layer in/out around the story's own bounds.
      gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top 85%",
          end: "bottom bottom",
          scrub: 0.6,
        },
      })
        .to(bg, { opacity: 1, duration: 0.15 })
        .to(bg, { opacity: 1, duration: 0.7 })
        .to(bg, { opacity: 0, duration: 0.15 });

      const mm = gsap.matchMedia();

      mm.add({ isMobile: "(max-width: 640px)" }, (context) => {
        const { isMobile } = context.conditions;
        const end = isMobile ? PIN_DISTANCE_MOBILE : PIN_DISTANCE_DESKTOP;
        const triggers = [];

        products.forEach((product, index) => {
          const refs = refsMap.current[index];
          if (!refs?.sectionEl) return;
          const { sectionEl, machineEl, cardEl } = refs;
          const fromX = product.reverseLayout ? -160 : 160;

          gsap.set(machineEl, { x: fromX, opacity: 0, scale: 0.9 });
          gsap.set(cardEl, { opacity: 0, y: 40 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          tl.to(machineEl, { x: 0, opacity: 1, scale: 1, ease: "power2.out" }, 0).to(
            cardEl,
            { opacity: 1, y: 0, ease: "power2.out" },
            0.3
          );
          triggers.push(tl.scrollTrigger);

          const colorTween = gsap.to(bg, {
            backgroundColor: product.bgColor,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end,
              scrub: 1,
            },
          });
          triggers.push(colorTween.scrollTrigger);
        });

        // Every trigger for every section now exists — recompute
        // start/end positions once against the final settled layout.
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => triggers.forEach((trigger) => trigger?.kill());
      });

      return () => mm.revert();
    },
    { dependencies: [products, readyCount], scope: storyRef }
  );

  // Images (next/image) and the Vazirmatn font can both shift layout
  // slightly after first paint — a final refresh once everything has
  // truly settled prevents any pinned section from being measured
  // against a stale (too-short) document height.
  useGSAP(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <section id="products" className="relative">
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 opacity-0"
      />

      <div className="relative py-24 md:py-28">
        <Container>
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-primary">محصولات</span>
            <h2 className="text-balance mt-3 text-3xl font-bold text-primary-dark md:text-5xl">
              مدلی متناسب با هر فضای کسب‌وکار
            </h2>
            <p className="mt-4 text-primary-dark/70">
              با هر اسکرول، یک دستگاه مقابل چشمان شما سرهم می‌شود.
            </p>
          </ScrollReveal>
        </Container>
      </div>

      <div ref={storyRef} className="relative">
        {products.map((product, index) => (
          <ProductSection
            key={product.id}
            product={product}
            index={index}
            onRefsReady={handleRefsReady}
          />
        ))}
      </div>
    </section>
  );
}
