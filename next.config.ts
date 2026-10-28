import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* standard stable Next.js configuration */
  reactStrictMode: true,
  async redirects() {
    return [
      // "Industries" was renamed to "Solutions" as part of the website journey.
      { source: '/industries', destination: '/solutions', permanent: true },
    ];
  },
};

export default nextConfig;
