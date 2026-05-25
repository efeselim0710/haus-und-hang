import type { NextConfig } from "next";

// Frame-Sequence (public/video/frames/*.jpg) wird via Canvas/new Image() im
// Hero geladen — geht NICHT durch next/image. Deshalb hier kein
// images.unoptimized-Pfad nötig.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
