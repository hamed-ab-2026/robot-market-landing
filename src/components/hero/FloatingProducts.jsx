"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsapConfig";
import floatingProducts from "@data/floatingProducts.json";

// Fixed layout slots (percentage-based) so items are spread evenly
// around the machine without overlapping it. Values are intentionally
// varied to break any obvious grid pattern.
const POSITIONS = [
  { top: "10%", left: "8%" },
  { top: "18%", left: "82%" },
  { top: "68%", left: "6%" },
  { top: "74%", left: "86%" },
  { top: "38%", left: "2%" },
  { top: "44%", left: "92%" },
];

/**
 * Continuously floating / rotating product placeholders that ring
 * the hero machine. Each item drifts at its own speed (its "depth")
 * so the whole cluster reads as a single believable 3D scene rather
 * than uniform motion.
 */
export default function FloatingProducts() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const items = gsap.utils.toArray(".floating-product");
      items.forEach((item, i) => {
        const depth = Number(item.dataset.depth || 0.5);

        gsap.to(item, {
          y: `+=${18 + depth * 26}`,
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 4 + depth * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        });

        gsap.to(item, {
          scale: 1 + depth * 0.08,
          filter: depth > 0.55 ? "blur(0.5px)" : "blur(0px)",
          duration: 5 + depth * 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // Subtle mouse-parallax: items with more "depth" move more.
      const handlePointerMove = (event) => {
        const { innerWidth, innerHeight } = window;
        const relX = event.clientX / innerWidth - 0.5;
        const relY = event.clientY / innerHeight - 0.5;

        items.forEach((item) => {
          const depth = Number(item.dataset.depth || 0.5);
          gsap.to(item, {
            x: relX * depth * 40,
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      window.addEventListener("pointermove", handlePointerMove);
      return () => window.removeEventListener("pointermove", handlePointerMove);
    },
    { scope }
  );

  return (
    <div ref={scope} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {floatingProducts.map((product, index) => {
        const position = POSITIONS[index % POSITIONS.length];
        return (
          <div
            key={product.id}
            className="floating-product absolute animate-float"
            data-depth={product.depth}
            style={{
              top: position.top,
              left: position.left,
              width: product.size,
              height: product.size,
              animationDelay: `${index * 0.4}s`,
            }}
          >
            <Image
              src={product.src}
              alt=""
              width={product.size}
              height={product.size}
              className="drop-shadow-glass"
            />
          </div>
        );
      })}
    </div>
  );
}
