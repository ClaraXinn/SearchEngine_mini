import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  // ✔ Your version only accepts a boolean here
  cacheComponents: true,

  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
