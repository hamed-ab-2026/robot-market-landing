/**
 * Shared scroll-distance constants for the pinned, scroll-driven
 * product story. Both `ProductSection` (which owns the pin +
 * assembly timeline) and `ProductsShowcase` (which cross-fades the
 * background color behind it) must use the exact same start/end so
 * their two independent ScrollTriggers stay perfectly in sync.
 */
export const PIN_DISTANCE_DESKTOP = "+=140%";
export const PIN_DISTANCE_MOBILE = "+=90%";
