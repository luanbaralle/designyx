import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/**" },
      { protocol: "https", hostname: "replicate.delivery", pathname: "/**" },
      { protocol: "https", hostname: "*.replicate.delivery", pathname: "/**" },
    ],
  },
};

export default nextConfig;
