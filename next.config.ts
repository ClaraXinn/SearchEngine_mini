import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,       // <-- added
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  cacheComponents: true,



  devIndicators: {
    position: "bottom-right",
  },
};

export default withSentryConfig(nextConfig, {
  org: "clara-kv",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
