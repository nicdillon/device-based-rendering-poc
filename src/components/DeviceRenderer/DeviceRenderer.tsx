"use client";

import { type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MOBILE_QUERY } from "@/lib/breakpoints";
import styles from "./device-renderer.module.css";

interface DeviceRendererProps {
  mobile: ReactNode;
  desktop: ReactNode;
}

/**
 * Renders both mobile and desktop variants into the HTML (ISR-compatible),
 * uses CSS media queries to hide the wrong one (zero flicker), then after
 * hydration unmounts the hidden variant to free resources.
 *
 * Hydration contract:
 * - Server render: both children rendered inside CSS-controlled wrappers
 * - First client render: identical to server (isMobile === null → render both)
 * - After useEffect: matchMedia resolves → only matching child stays mounted
 */
export function DeviceRenderer({ mobile, desktop }: DeviceRendererProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY);

  // Pre-hydration: render both. CSS hides the wrong one before first paint.
  if (isMobile === null) {
    return (
      <>
        <div className={styles.mobile}>{mobile}</div>
        <div className={styles.desktop}>{desktop}</div>
      </>
    );
  }

  // Post-hydration: only the matching variant is mounted.
  // The other is unmounted, freeing memory and stopping effects.
  return isMobile ? (
    <div className={styles.mobile}>{mobile}</div>
  ) : (
    <div className={styles.desktop}>{desktop}</div>
  );
}
