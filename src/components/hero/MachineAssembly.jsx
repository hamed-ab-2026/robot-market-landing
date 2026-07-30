"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/utils/gsapConfig";
import { useDispatch } from "react-redux";
import { setHeroAssembled } from "@redux/slices/uiSlice";
import heroMachine from "@data/products.json";

// The hero uses the first product's piece set as the "signature"
// machine. Swap this constant to feature a different model.
const HERO_PRODUCT = heroMachine[0];

/**
 * Renders the hero product's SVG pieces scattered around the
 * viewport, then uses a scrubbed, pinned ScrollTrigger timeline to
 * fly every piece back into its assembled position — the
 * "satisfying" scroll moment the brief calls for.
 *
 * Piece order (back to front) is intentional: body sits behind the
 * shelving and screen, the door glass sits on top, and the base
 * anchors the whole thing visually.
 */
export default function MachineAssembly() {
  const wrapperRef = useRef(null);
  const piecesRef = useRef([]);
  const dispatch = useDispatch();

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const pieces = piecesRef.current.filter(Boolean);
      if (!pieces.length) return;

      // Deterministic-feeling but varied scatter target per piece.
      const scatter = pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const radius = gsap.utils.random(260, 420);
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius * 0.6 - 40,
          rotation: gsap.utils.random(-70, 70),
          scale: gsap.utils.random(0.55, 0.85),
        };
      });

      if (prefersReduced) {
        // Reduced motion: pieces simply appear already assembled.
        gsap.set(pieces, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
        dispatch(setHeroAssembled(true));
        return;
      }

      gsap.set(pieces, (i) => ({
        x: scatter[i].x,
        y: scatter[i].y,
        rotation: scatter[i].rotation,
        scale: scatter[i].scale,
        opacity: 0.9,
        transformOrigin: "50% 50%",
      }));

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1025px)",
          isTablet: "(min-width: 641px) and (max-width: 1024px)",
          isMobile: "(max-width: 640px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              // Mobile gets a shorter, lighter scrub distance to
              // keep the animation snappy on small screens.
              end: isMobile ? "+=80%" : "+=140%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onLeave: () => dispatch(setHeroAssembled(true)),
              onEnterBack: () => dispatch(setHeroAssembled(false)),
            },
          });

          tl.to(pieces, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.inOut",
            stagger: 0.06,
          }).to(
            wrapperRef.current,
            { scale: isMobile ? 1.02 : 1.05, duration: 0.3, ease: "power1.out" },
            "-=0.15"
          );

          return () => tl.scrollTrigger?.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: wrapperRef, dependencies: [] }
  );

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto flex h-[70vh] max-h-[640px] w-full max-w-[420px] items-center justify-center md:h-[78vh]"
      role="img"
      aria-label={`تصویر دستگاه ${HERO_PRODUCT.title} در حال مونتاژ`}
    >
      {HERO_PRODUCT.pieces.map((piece, index) => (
        <div
          key={piece}
          ref={(el) => (piecesRef.current[index] = el)}
          className="absolute inset-0"
          style={{ zIndex: index }}
        >
          <Image
            src={`${HERO_PRODUCT.svgDir}/${piece}.svg`}
            alt=""
            fill
            priority={index < 2}
            className="object-contain drop-shadow-glass-lg"
            sizes="(max-width: 768px) 320px, 420px"
          />
        </div>
      ))}
    </div>
  );
}
