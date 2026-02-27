import { DeviceRenderer } from "@/components/DeviceRenderer";
import { HeroMobile } from "@/components/HeroMobile";
import { HeroDesktop } from "@/components/HeroDesktop";
import { IsrTimestamp } from "@/components/IsrTimestamp";

// ISR revalidation inherited from (shop)/layout.tsx (10s).
// The generated HTML contains BOTH mobile and desktop heroes.
// CSS media queries hide the wrong one before first paint (zero flicker).
// After hydration, the hidden variant is unmounted to free resources.

export default function HomePage() {
  // This timestamp is captured at build/ISR generation time on the server.
  // It will stay the same until the page is revalidated.
  const generatedAt = new Date().toISOString();

  return (
    <main>
      <DeviceRenderer
        mobile={<HeroMobile />}
        desktop={<HeroDesktop />}
      />

      <IsrTimestamp generatedAt={generatedAt} revalidateSeconds={60} />

      <section className="py-16 px-6 max-w-3xl mx-auto space-y-6 text-center">
        <h2 className="text-2xl font-bold">How This Works</h2>
        <div className="grid gap-4 text-left text-sm">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-1">
            <h3 className="font-semibold">1. ISR Generates Static HTML</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Both mobile and desktop hero components are rendered into the
              cached HTML. One response serves all devices.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-1">
            <h3 className="font-semibold">2. CSS Hides the Wrong Variant</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Render-blocking CSS media queries evaluate before first paint. The
              browser never shows the wrong hero — zero flicker guaranteed.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-1">
            <h3 className="font-semibold">3. Hydration Cleans Up</h3>
            <p className="text-gray-600 dark:text-gray-400">
              After React hydrates, <code>matchMedia</code> detects the viewport
              and unmounts the hidden component — freeing memory and event
              listeners.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-1">
            <h3 className="font-semibold">4. Client APIs Are Available</h3>
            <p className="text-gray-600 dark:text-gray-400">
              The remaining hero component has full access to browser APIs:
              touch events, mouse tracking, viewport dimensions, orientation,
              and more.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
