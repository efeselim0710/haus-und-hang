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
  // Frame-Sequence (immutable, ~85 MB) langfristig im Browser-Cache halten —
  // sonst lädt Vercel/CDN bei jedem Reload alle 290 sichtbaren Frames neu.
  async headers() {
    return [
      {
        source: "/video/frames/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
