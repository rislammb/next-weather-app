import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "openweathermap.org" }],
  },
};

export default nextConfig;
