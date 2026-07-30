"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsapConfig";

const PARTICLE_COUNT = 24;

/**
 * The ambient, always-moving layer behind the hero: three soft
 * blurred gradient blobs drifting on independent loops, a radial
 * glow pulsing gently, and a scattering of tiny floating particles.
 * Everything here is decorative (aria-hidden) and purely GSAP-driven
 * so it can run at 60fps without layout thrash.
 */
export default function HeroBackground() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const blobs = gsap.utils.toArray(".hero-blob");
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 === 0 ? 60 : -50,
          y: i % 2 === 0 ? -40 : 50,
          duration: 10 + i * 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.to(".hero-glow", {
        opacity: 0.9,
        scale: 1.08,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const particles = gsap.utils.toArray(".hero-particle");
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: `-=${gsap.utils.random(40, 120)}`,
          x: `+=${gsap.utils.random(-30, 30)}`,
          opacity: gsap.utils.random(0.2, 0.8),
          duration: gsap.utils.random(4, 9),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 3),
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-glow bg-brand-radial absolute left-1/2 top-1/3 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-3xl" />

      <div className="hero-blob absolute -right-24 top-10 h-[26rem] w-[26rem] rounded-full bg-primary-accent/40 blur-3xl" />
      <div className="hero-blob absolute -left-16 top-1/2 h-[22rem] w-[22rem] rounded-full bg-primary/40 blur-3xl" />
      <div className="hero-blob absolute bottom-0 right-1/3 h-[20rem] w-[20rem] rounded-full bg-primary-light/60 blur-3xl" />

      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <span
          key={index}
          className="hero-particle absolute h-1.5 w-1.5 rounded-full bg-primary-accent"
          style={{
            left: `${(index * 137.5) % 100}%`,
            top: `${(index * 71.3) % 100}%`,
            opacity: 0.4,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-surface/10" />
    </div>
  );
}
