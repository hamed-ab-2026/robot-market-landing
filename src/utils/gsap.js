"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering the plugin synchronously at module scope (guarded for SSR)
// avoids the race condition where ScrollTrigger measures the page before
// fonts/images have finished loading, which is what caused the "blank on
// first load, fixed after scrolling back up" bug.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers fire resize events when the address bar shows/hides
  // while scrolling. ScrollTrigger would otherwise treat that as a real
  // viewport change and re-run its (expensive, sometimes wrong) pin
  // calculations mid-scroll, which is what made the assembled machine
  // disappear or freeze on phones.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
