import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aggressively cache static assets (tapes, icons, sitemaps, fonts) in /public at the edge
  async headers() {
    return [
      {
        source: "/:path*\\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
