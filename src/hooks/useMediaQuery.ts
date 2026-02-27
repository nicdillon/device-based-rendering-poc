"use client";

import { useState, useEffect } from "react";

/**
 * Hydration-safe media query hook.
 *
 * Returns `null` on the server and during the first client render
 * (so the component tree matches the server HTML), then resolves
 * to a boolean after hydration when `matchMedia` is available.
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
