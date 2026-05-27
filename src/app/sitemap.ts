import type { MetadataRoute } from "next";
import { siteData } from "@/data/siteData";
import { CATEGORIES } from "@/components/EcommerceCategory";
import { SITE_URL } from "@/utils/seo";

/**
 * Split the sitemap into typed sections so Google Search Console reports
 * indexation per content bucket. Next 16 auto-emits a sitemap index at
 * /sitemap.xml that links to each chunk at /sitemap/[id].xml.
 *
 * Submit this URL to Google Search Console:
 *   https://packmaxindia.in/sitemap.xml
 */
export async function generateSitemaps() {
  return [
    { id: "static" },
    { id: "locations" },
    { id: "location-products" },
    { id: "location-categories" },
  ];
}

const NOW = new Date();

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

const CATEGORY_SLUGS = CATEGORIES.map(slugify);

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;

  switch (id) {
    case "static":
      return buildStatic();
    case "locations":
      return buildLocations();
    case "location-products":
      return buildLocationProducts();
    case "location-categories":
      return buildLocationCategories();
    default:
      return [];
  }
}

function buildStatic(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/market-area", priority: 0.7, changeFrequency: "weekly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/shipping", priority: 0.4, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: NOW,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

function buildLocations(): MetadataRoute.Sitemap {
  return siteData.locations.map((location) => ({
    url: `${SITE_URL}/${location.slug}`,
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: 0.85,
  }));
}

function buildLocationProducts(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  siteData.locations.forEach((location) => {
    siteData.products.forEach((product) => {
      // Slight boost for marketplace tapes (Amazon/Flipkart/Meesho etc.) since
      // those are the highest-intent queries we want ranked first.
      const isMarketplace = /amazon|flipkart|meesho|myntra|ajio|nykaa/i.test(product.name);
      entries.push({
        url: `${SITE_URL}/${location.slug}/${product.slug}`,
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: isMarketplace ? 0.95 : 0.85,
        images: [product.image],
      });
    });
  });
  return entries;
}

function buildLocationCategories(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  siteData.locations.forEach((location) => {
    CATEGORY_SLUGS.forEach((categorySlug) => {
      entries.push({
        url: `${SITE_URL}/${location.slug}/${categorySlug}`,
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });
  return entries;
}
