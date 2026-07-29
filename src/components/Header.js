"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, CONTACT } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,166,147,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-14 md:h-20">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 group min-w-0">
          <span className="relative flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-black text-[10px] md:text-sm">
            RM
            <span className="absolute inset-0 rounded-lg ring-2 ring-primary/30 scale-110 group-hover:scale-125 transition-transform" />
          </span>
          <span className="flex flex-col leading-tight min-w-0">
            <span className="font-extrabold text-ink-900 text-xs sm:text-sm md:text-lg truncate">
              روبات مارکت
            </span>
            <span className="hidden sm:block text-[10px] md:text-xs text-ink-500 tracking-wide truncate">
              تولیدکننده وندینگ ماشین صنعتی
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-700 hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:right-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${CONTACT.phoneHref}`}
            dir="ltr"
            className="text-sm font-semibold text-ink-700 hover:text-primary transition-colors"
          >
            {CONTACT.phone}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 transition-all"
          >
            سفارش و مشاوره
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 text-primary"
          aria-label="باز کردن منو"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-primary/10 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ink-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white text-center"
          >
            سفارش و مشاوره
          </a>
        </div>
      )}
    </header>
  );
}
