import type { NextConfig } from "next";

// Static Export für Hostinger (und alle anderen plain Web-Hoster).
// next build erzeugt einen `out/` Folder mit HTML/CSS/JS/Assets, der 1:1
// auf Apache/nginx/etc. läuft. Cache-Headers + Routing kommen via
// public/.htaccess (Apache) rein.
//
// Constraints im Export-Mode:
// - headers()/redirects()/rewrites() NICHT supported → .htaccess
// - next/image default-Loader NICHT supported → images.unoptimized
// - trailingSlash: true erleichtert Apache-Routing (jede Route wird zu /name/index.html)
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
