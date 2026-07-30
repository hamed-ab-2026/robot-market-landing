"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";

/**
 * A button that gently follows the cursor within its bounds
 * (magnetic hover) and emits a soft ripple on click. Degrades to a
 * plain button with no motion when the user prefers reduced motion,
 * or on touch devices where "hover" doesn't really apply.
 *
 * @param {Object} props
 * @param {"primary"|"ghost"} [props.variant]
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 * @param {string} [props.className]
 * @param {string} [props.as] - render as "a" for links, "button" otherwise
 * @param {string} [props.href]
 */
export default function MagneticButton({
  variant = "primary",
  children,
  onClick,
  className,
  as = "button",
  href,
  ...rest
}) {
  const buttonRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  useGSAP(
    () => {
      const el = buttonRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isTouch = window.matchMedia("(hover: none)").matches;
      if (prefersReduced || isTouch) return;

      quickX.current = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      quickY.current = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      const handleMove = (event) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        quickX.current(relX * 0.35);
        quickY.current(relY * 0.35);
      };

      const handleLeave = () => {
        quickX.current(0);
        quickY.current(0);
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: buttonRef }
  );

  const handleClick = (event) => {
    const el = buttonRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 1.6;
      ripple.style.position = "absolute";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      ripple.style.borderRadius = "9999px";
      ripple.style.background =
        variant === "primary"
          ? "rgba(255,255,255,0.35)"
          : "rgba(0,166,147,0.25)";
      ripple.style.pointerEvents = "none";
      ripple.style.transform = "scale(0)";
      ripple.style.opacity = "1";
      el.appendChild(ripple);

      gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    }

    onClick?.(event);
  };

  const Tag = as === "a" ? "a" : "button";
  const baseClasses = cn(
    "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden",
    "rounded-full px-8 py-3.5 text-base font-medium transition-colors duration-300",
    "focus-visible:outline-none",
    variant === "primary" &&
      "bg-brand-gradient text-white shadow-glow hover:shadow-glass-lg",
    variant === "ghost" &&
      "border border-primary-dark/15 bg-white/60 text-primary-dark backdrop-blur-md hover:bg-white/90",
    className
  );

  return (
    <Tag
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      className={baseClasses}
      {...rest}
    >
      {children}
    </Tag>
  );
}
