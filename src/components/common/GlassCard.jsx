"use client";

import { cn } from "@/utils/cn";

/**
 * Glassmorphism card used across product sections and feature
 * grids. The animated border is pure CSS (a conic-gradient mask)
 * so it stays smooth without needing a GSAP ticker.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export default function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "group relative rounded-4xl p-[1px] transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-4xl opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 180deg, #19D7C2, #00A693, #D8FFF8, #19D7C2)",
        }}
        aria-hidden="true"
      />
      <div
        className={cn(
          "glass-surface relative h-full rounded-4xl p-8 shadow-glass",
          "transition-shadow duration-500 group-hover:shadow-glass-lg"
        )}
      >
        {children}
      </div>
    </div>
  );
}
