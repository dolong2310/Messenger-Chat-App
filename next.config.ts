import type { NextConfig } from "next";
// const { withSuperjson } = require('next-superjson-plugin');

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
// export default withSuperjson()(nextConfig);
