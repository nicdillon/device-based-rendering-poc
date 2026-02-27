/**
 * Single source of truth for breakpoint values.
 * The CSS media queries in device-renderer.module.css MUST match these values.
 */
export const BREAKPOINTS = {
  mobile: 768,
} as const;

export const MOBILE_QUERY = `(max-width: ${BREAKPOINTS.mobile}px)`;
export const DESKTOP_QUERY = `(min-width: ${BREAKPOINTS.mobile + 1}px)`;
