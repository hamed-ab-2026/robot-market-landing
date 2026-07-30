/**
 * Central design tokens for Robot Market.
 * Keep this in sync with tailwind.config.js so JS-driven
 * (GSAP / Ant Design) styling always matches the Tailwind palette.
 */
export const COLORS = {
  primary: "#00A693",
  dark: "#063D39",
  accent: "#19D7C2",
  light: "#D8FFF8",
  background: "#F7FBFB",
};

export const FONT_FAMILY = "var(--font-vazirmatn), Tahoma, sans-serif";

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
};

export const EASE = {
  soft: "power3.out",
  softInOut: "power3.inOut",
  expo: "expo.out",
};
