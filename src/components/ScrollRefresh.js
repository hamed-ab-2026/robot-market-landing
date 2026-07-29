"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/utils/gsap";

/**
 * Mounted once near the root of the page. Fonts (Vazirmatn) and the
 * inline SVG artwork can finish loading/laying out slightly after
 * ScrollTrigger has already taken its initial measurements, which makes
 * pinned sections (like the Hero assembly) start blank until the user
 * scrolls back up and down again. Forcing a refresh once everything has
 * settled fixes that on the very first load.
 */
export default function ScrollRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }

    window.addEventListener("load", refresh);
    // Fallback in case fonts/images settle without firing the above events.
    const t1 = setTimeout(refresh, 300);
    const t2 = setTimeout(refresh, 1000);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
