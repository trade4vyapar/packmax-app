import { siteData } from "@/data/siteData";
import { CATEGORIES } from "@/components/EcommerceCategory";
import { SITE_URL, BRAND } from "@/utils/seo";

// Serves /llms.txt — a plain-text overview of the site for LLM / AI crawlers,
// following the llms.txt convention (https://llmstxt.org). Built from siteData
// so it never drifts from the catalog.
export const dynamic = "force-static";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export function GET() {
  // Use the national hub (/india) as the canonical city for catalog links.
  const HUB = "india";

  const products = siteData.products
    .map((p) => `- [${p.name}](${SITE_URL}/${HUB}/${p.slug}): ${p.tagline} — ${p.description}`)
    .join("\n");

  const categories = CATEGORIES
    .map((c) => `- [${c}](${SITE_URL}/${HUB}/${slugify(c)})`)
    .join("\n");

  const locations = siteData.locations
    .map((l) => `- [${l.name}, ${l.state}](${SITE_URL}/${l.slug}): ${l.description}`)
    .join("\n");

  const body = `# ${BRAND}

> ${BRAND} is a direct-from-factory manufacturer and pan-India wholesale supplier of BOPP packaging tapes, custom brand/logo printed tapes, e-commerce courier bags & polybags, stretch films, corrugated rolls, air bubble rolls and box strapping. B2B wholesale rates with 48-72 hour dispatch from our Indore (Madhya Pradesh) plant.

- Website: ${SITE_URL}
- Email: info@packmaxindia.in
- Phone: +91 98931 15645
- Business type: Manufacturer • Wholesale Supplier • Authorised Wholesaler (B2B)

## How URLs work

Every product and category is available for each service city using the pattern:
- Product: ${SITE_URL}/{city-slug}/{product-slug}  (e.g. ${SITE_URL}/${HUB}/amazon-tape, ${SITE_URL}/mumbai/amazon-tape)
- Category: ${SITE_URL}/{city-slug}/{category-slug}
- City hub: ${SITE_URL}/{city-slug}

The links below use the national /${HUB} hub as the canonical reference.

## Products

${products}

## Product Categories

${categories}

## Key Pages

- [Home](${SITE_URL}/): Company overview and featured products
- [About](${SITE_URL}/about): About ${BRAND}
- [Contact](${SITE_URL}/contact): B2B inquiry form, WhatsApp and phone
- [Market Area](${SITE_URL}/market-area): Cities and regions served
- [Shipping](${SITE_URL}/shipping): Dispatch and logistics information
- [Terms](${SITE_URL}/terms): Terms and conditions
- [HTML Sitemap](${SITE_URL}/sitemap): Full page index

## Service Locations

${locations}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
