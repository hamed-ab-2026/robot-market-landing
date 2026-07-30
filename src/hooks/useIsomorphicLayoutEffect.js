"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect throws a warning during SSR. This swaps to a
 * plain useEffect on the server so GSAP-driven components can be
 * imported anywhere without triggering Next.js warnings.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
