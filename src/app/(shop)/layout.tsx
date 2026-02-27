import type { PropsWithChildren } from "react";

// ISR: revalidate every 10 seconds for local testing.
// All pages within the (shop) route group inherit this revalidation period.
export const revalidate = 60;

export default function ShopLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
