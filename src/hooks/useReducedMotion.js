"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's prefers-reduced-motion setting so animation
 * components can degrade to simple fades/opacity instead of large
 * transforms, per the accessibility requirements of the project.
 * @returns {boolean}
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const listener = (event) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
