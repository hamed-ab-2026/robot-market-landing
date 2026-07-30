"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsapConfig";
import floatingCatalog from "@data/floatingProducts.json";

// Four slots positioned just outside the machine's bounding box so
// items read as "floating around the device" rather than on top of
// it. Reused cyclically if a product lists fewer/more item ids.
const SLOTS = [
  { top: "-6%", left: "68%" },
  { top: "42%", left: "-20%" },
  { top: "78%", left: "84%" },
  { top: "8%", left: "-16%" },
];

/**
 * Looks up each id in `product.floatingItemIds` against the shared
 * floating-item catalog and renders it drifting gently around the
 * machine, with its own speed/scale derived from the catalog's
 * `depth` value — mirroring the hero's floating products but scoped
 * to a single section.
 *
 * @param {Object} props
 * @param {{ floatingItemIds: string[] }} props.product
 */
export default function SectionFloatingItems({ product }) {
  const scope = useRef(null);
  const items = (product.floatingItemIds || [])
    .map((id) => floatingCatalog.find((entry) => entry.id === id))
    .filter(Boolean);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const nodes = gsap.utils.toArray(".section-floating-item");
      nodes.forEach((node, i) => {
        const depth = Number(node.dataset.depth || 0.5);
        gsap.to(node, {
          y: `+=${16 + depth * 22}`,
          rotation: i % 2 === 0 ? 10 : -10,
          duration: 3.5 + depth * 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.25,
        });
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden sm:block"
    >
      {items.map((item, index) => {
        const slot = SLOTS[index % SLOTS.length];
        return (
          <div
            key={item.id}
            className="section-floating-item absolute"
            data-depth={item.depth}
            style={{ top: slot.top, left: slot.left, width: item.size, height: item.size }}
          >
            <Image
              src={item.src}
              alt=""
              width={item.size}
              height={item.size}
              className="drop-shadow-glass"
            />
          </div>
        );
      })}
    </div>
  );
}
