"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Desktop-focused hero component. Demonstrates that client-side APIs
 * (mouse tracking, hover states, viewport dimensions) are fully
 * accessible after hydration within the DeviceRenderer pattern.
 */
export function HeroDesktop() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Demonstrate: client-side APIs work after hydration
  useEffect(() => {
    setViewport({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
      setMoveCount((c) => c + 1);
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="min-h-[80vh] flex items-center justify-center px-12 py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white cursor-crosshair"
    >
      <div className="max-w-4xl w-full grid grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="text-5xl">🖥️</div>
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Desktop Experience
          </h1>
          <p className="text-purple-200 text-xl leading-relaxed">
            This component is optimized for mouse interaction and larger
            viewports. It was server-rendered via ISR and hydrated without
            flicker.
          </p>
          <p className="text-purple-300 text-sm">
            Move your mouse over this hero to see real-time tracking
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-4">
          <h2 className="text-lg font-semibold text-center">
            Client API Status
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-200">Viewport</span>
              <span className="font-mono">
                {viewport.width > 0
                  ? `${viewport.width} x ${viewport.height}`
                  : "Detecting..."}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Mouse Position</span>
              <span className="font-mono">
                {isHovering
                  ? `(${mousePos.x}, ${mousePos.y})`
                  : "Outside hero"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Mouse Moves</span>
              <span className="font-mono">{moveCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Hovering</span>
              <span
                className={`font-mono ${isHovering ? "text-green-300" : "text-red-300"}`}
              >
                {isHovering ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Hydrated</span>
              <span className="font-mono text-green-300">
                {viewport.width > 0 ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
