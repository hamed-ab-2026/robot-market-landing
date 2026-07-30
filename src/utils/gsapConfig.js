"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP plugins are registered exactly once here. Every animation
 * component imports `gsap` from this file (re-exported below)
 * instead of importing "gsap" directly, so registration always
 * runs before any timeline is built.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
