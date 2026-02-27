"use client";

import { useState, useEffect } from "react";

interface IsrTimestampProps {
  generatedAt: string;
  revalidateSeconds: number;
}

/**
 * Displays the server-side ISR generation timestamp alongside the current
 * client time. Refresh the page after the revalidate window to see the
 * server timestamp update — proof that ISR regeneration occurred.
 */
export function IsrTimestamp({
  generatedAt,
  revalidateSeconds,
}: IsrTimestampProps) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    setNow(new Date().toISOString());
    const id = setInterval(() => setNow(new Date().toISOString()), 1000);
    return () => clearInterval(id);
  }, []);

  const serverDate = new Date(generatedAt);
  const age = now
    ? Math.round((new Date(now).getTime() - serverDate.getTime()) / 1000)
    : null;

  return (
    <section className="mx-auto max-w-3xl px-6 py-8">
      <div className="rounded-xl border border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/40 p-5 space-y-3 text-sm">
        <h2 className="font-semibold text-base">ISR Revalidation Monitor</h2>
        <div className="grid gap-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Page generated at (server)
            </span>
            <span>{serverDate.toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Current time (client)
            </span>
            <span>{now ? new Date(now).toLocaleTimeString() : "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Page age</span>
            <span
              className={
                age !== null && age >= revalidateSeconds
                  ? "text-amber-600 dark:text-amber-400 font-semibold"
                  : ""
              }
            >
              {age !== null ? `${age}s` : "—"}
              {age !== null && age >= revalidateSeconds && " (stale)"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Revalidate TTL
            </span>
            <span>{revalidateSeconds}s</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          When the page age exceeds {revalidateSeconds}s, the next request
          triggers a background regeneration. Refresh again to see the server
          timestamp update.
        </p>
      </div>
    </section>
  );
}
