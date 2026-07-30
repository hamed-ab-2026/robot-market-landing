"use client";

import { useEffect, useRef } from "react";
import { Drawer } from "antd";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMobileNav,
  closeMobileNav,
  setNavScrolled,
} from "@redux/slices/uiSlice";
import { NAV_LINKS, DASHBOARD_LINK } from "@constants/nav";
import Container from "@components/common/Container";
import MagneticButton from "@components/common/MagneticButton";
import { cn } from "@/utils/cn";

/**
 * Sticky navigation. Starts fully transparent over the hero and
 * morphs into a glass surface once the page scrolls past a small
 * threshold — driven by a lightweight scroll listener rather than
 * ScrollTrigger, since this is a simple boolean toggle, not a
 * scrubbed animation.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const isScrolled = useSelector((state) => state.ui.isNavScrolled);
  const isMobileNavOpen = useSelector((state) => state.ui.isMobileNavOpen);
  const thresholdReached = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== thresholdReached.current) {
        thresholdReached.current = scrolled;
        dispatch(setNavScrolled(scrolled));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-surface shadow-glass py-3"
          : "border-transparent bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        <a href="#home" className="text-lg font-bold text-primary-dark">
          روبات مارکت
        </a>

        <nav
          aria-label="پیمایش اصلی"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-primary-dark/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <MagneticButton
            variant="ghost"
            as="a"
            href={DASHBOARD_LINK.href}
            className="!px-6 !py-2 text-sm"
          >
            {DASHBOARD_LINK.label}
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label="باز کردن منو"
          onClick={() => dispatch(toggleMobileNav())}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-primary-dark shadow-glass md:hidden"
        >
          <FiMenu size={20} aria-hidden="true" />
        </button>
      </Container>

      <Drawer
        title="روبات مارکت"
        placement="top"
        height="auto"
        open={isMobileNavOpen}
        onClose={() => dispatch(closeMobileNav())}
        closeIcon={<FiX size={18} />}
      >
        <nav
          aria-label="پیمایش موبایل"
          className="flex flex-col gap-5 pb-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => dispatch(closeMobileNav())}
              className="text-base font-medium text-primary-dark"
            >
              {link.label}
            </a>
          ))}
          <a
            href={DASHBOARD_LINK.href}
            onClick={() => dispatch(closeMobileNav())}
            className="text-base font-medium text-primary"
          >
            {DASHBOARD_LINK.label}
          </a>
        </nav>
      </Drawer>
    </header>
  );
}
