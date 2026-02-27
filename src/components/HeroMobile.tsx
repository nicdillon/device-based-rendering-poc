"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Mobile-focused hero component. Demonstrates that client-side APIs
 * (touch events, viewport dimensions, device orientation) are fully
 * accessible after hydration within the DeviceRenderer pattern.
 */
export function HeroMobile() {
  const [touchCount, setTouchCount] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<string>("unknown");
  const heroRef = useRef<HTMLElement>(null);

  // Demonstrate: client-side APIs work after hydration
  useEffect(() => {
    setViewport({ width: window.innerWidth, height: window.innerHeight });
    setOrientation(
      screen.orientation?.type?.includes("portrait")
        ? "portrait"
        : "landscape"
    );

    const handleOrientation = () => {
      setOrientation(
        screen.orientation?.type?.includes("portrait")
          ? "portrait"
          : "landscape"
      );
    };

    screen.orientation?.addEventListener("change", handleOrientation);
    return () =>
      screen.orientation?.removeEventListener("change", handleOrientation);
  }, []);

  const handleTouch = () => {
    setTouchCount((c) => c + 1);
  };

  return (
    <section
      ref={heroRef}
      onTouchStart={handleTouch}
      onClick={handleTouch}
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-600 to-blue-800 text-white"
    >
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="text-5xl">📱</div>
        <h1 className="text-3xl font-bold tracking-tight">Mobile Experience</h1>
        <p className="text-blue-100 text-lg">
          This component is optimized for touch interaction and smaller
          viewports. It was server-rendered via ISR and hydrated without flicker.
        </p>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-3 text-left text-sm">
          <h2 className="text-base font-semibold text-center">
            Client API Status
          </h2>
          <div className="flex justify-between">
            <span className="text-blue-200">Viewport</span>
            <span className="font-mono">
              {viewport.width > 0
                ? `${viewport.width} x ${viewport.height}`
                : "Detecting..."}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Orientation</span>
            <span className="font-mono">{orientation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Touch/Tap Count</span>
            <span className="font-mono">{touchCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Hydrated</span>
            <span className="font-mono text-green-300">
              {viewport.width > 0 ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <p className="text-blue-200 text-xs">
          Tap anywhere on this hero to increment the counter
        </p>
      </div>
    </section>
  );
}
