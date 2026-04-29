import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export can't use Next.js image optimization; serve images as-is.
    unoptimized: true,
  },
};

export default nextConfig;
