import { BREAKPOINTS } from "@/constants/theme";

/**
 * GSAP matchMedia query strings, kept in one place so every
 * component that needs responsive-aware animation branches
 * (desktop / tablet / mobile) stays consistent.
 */
export const MQ = {
  desktop: `(min-width: ${BREAKPOINTS.tablet + 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.mobile + 1}px) and (max-width: ${BREAKPOINTS.tablet}px)`,
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  reducedMotion: "(prefers-reduced-motion: reduce)",
};
