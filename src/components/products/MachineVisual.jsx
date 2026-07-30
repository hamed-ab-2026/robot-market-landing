"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsapConfig";

/**
 * Renders a product's machine fully assembled (all pieces stacked
 * in place) with a soft, continuous idle bob so it still feels
 * alive while its section is pinned in view. The section-level
 * "slide in / settle" entrance itself is handled by the parent
 * `ProductSection`, which owns the pinned scroll timeline — this
 * component only owns the small perpetual idle motion.
 *
 * @param {Object} props
 * @param {{ svgDir: string, pieces: string[], title: string }} props.product
 */
export default function MachineVisual({ product }) {
  const wrapperRef = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const idle = gsap.to(wrapperRef.current, {
        y: "-=14",
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      return () => idle.kill();
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="relative mx-auto aspect-[4/7] w-full max-w-[340px]">
      {product.pieces.map((piece, index) => (
        <div key={piece} className="absolute inset-0" style={{ zIndex: index }}>
          <Image
            src={`${product.svgDir}/${piece}.svg`}
            alt={index === 0 ? `دستگاه ${product.title}` : ""}
            fill
            className="object-contain drop-shadow-glass-lg"
            sizes="(max-width: 768px) 280px, 340px"
          />
        </div>
      ))}
    </div>
  );
}
