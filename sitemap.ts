import { MetadataRoute } from "next";
import { siteData } from "@/data/siteData";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://packmaxindia.in";
  const changeFrequency = "weekly" as const;
  const currentDate = new Date();

  // 1. Static Pages
  const staticPages = ["", "/about", "/contact", "/market-area", "/products"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Product Pages (e.g., /products/bopp-brown-tape)
  const productPages = siteData.products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency,
    priority: 0.9,
  }));

  // 3. Location Pages (e.g., /mumbai)
  const locationPages = siteData.locations.map((location) => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: currentDate,
    changeFrequency,
    priority: 0.8,
  }));

  // 4. Location Product Pages (e.g., /mumbai/bopp-brown-tape)
  const locationProductPages = siteData.locations.flatMap((location) =>
    siteData.products.map((product) => ({
      url: `${baseUrl}/${location.slug}/${product.slug}`,
      lastModified: currentDate,
      changeFrequency,
      priority: 0.85,
    }))
  );

  // 5. Location Category Pages (e.g., /mumbai/ecommerce-tapes)
  const categories = [
    "ecommerce-tapes",
    "printed-plain-ecommerce-polybags",
    "stretch-filmroll",
    "bopp-color-tape",
    "bopp-transparent-tape",
    "box-strapping-roll-clip",
    "corrugated-roll",
    "custom-brand-logo-name-printed-tape",
    "air-bubble-roll",
    "bopp-brown-tape"
  ];

  const locationCategoryPages = siteData.locations.flatMap((location) =>
    categories.map((categorySlug) => ({
      url: `${baseUrl}/${location.slug}/${categorySlug}`,
      lastModified: currentDate,
      changeFrequency,
      priority: 0.85,
    }))
  );

  return [
    ...staticPages,
    ...productPages,
    ...locationPages,
    ...locationProductPages,
    ...locationCategoryPages,
  ];
}
