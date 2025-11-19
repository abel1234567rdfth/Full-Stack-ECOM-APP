import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",

        port: "5000",
        pathname: "/uploads/products/**",
      },
    ],
  },
};

export default nextConfig;
