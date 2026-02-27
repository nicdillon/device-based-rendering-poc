import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  staticPageGenerationTimeout: 600,

  experimental: {
    webVitalsAttribution: ["FCP", "LCP", "CLS", "FID", "TTFB", "INP"],
    staticGenerationRetryCount: 2,
    staticGenerationMaxConcurrency: 4,
    staticGenerationMinPagesPerWorker: 8,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
