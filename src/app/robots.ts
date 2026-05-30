import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow every crawler (search engines, image bots, and AI/LLM crawlers)
    // to access the entire site — nothing is disallowed.
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
