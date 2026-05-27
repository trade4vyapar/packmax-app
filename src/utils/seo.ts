import { Metadata } from "next";

export const SITE_URL = "https://packmaxindia.in";
export const BRAND = "Packmax India";

interface SEOMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  locationName?: string;
  productName?: string;
  categoryName?: string;
}

const MARKETPLACES = ["Amazon", "Flipkart", "Meesho", "Myntra", "Ajio", "Snapdeal", "JioMart", "Nykaa", "Shopsy", "Tata Cliq", "Limeroad", "FirstCry"];

const MASTER_LOCATIONS = [
  "Indore", "Bhopal", "Jabalpur", "Gwalior", "Satna", "Sagar", "Ujjain", "Ratlam", "Dewas",
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Jalgaon",
  "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer",
  "Raipur", "Bhilai", "Raigarh",
  "Rajkot", "Ahmedabad", "Surat", "Vadodara",
  "Agra", "Kanpur", "Lucknow", "Noida", "Ghaziabad", "Varanasi", "Meerut",
  "Hyderabad", "Bengaluru", "Mysuru", "Hubli",
  "Chennai", "Coimbatore", "Madurai",
  "Kochi", "Thiruvananthapuram", "Kerala",
  "Guwahati", "Patna", "Ranchi", "Bhubaneswar", "Cuttack",
  "Delhi", "Gurugram", "Faridabad",
  "Chandigarh", "Ludhiana", "Amritsar", "Jalandhar",
  "Dehradun", "Haridwar", "Shimla", "Jammu", "Srinagar",
  "Kolkata", "Siliguri", "Asansol",
  "Goa", "Visakhapatnam", "Vijayawada"
];

const MASTER_PRODUCTS = [
  "BOPP tape", "BOPP brown tape", "BOPP transparent tape", "BOPP color tape",
  "custom printed tape", "custom logo tape", "brand printed tape",
  "Amazon tape", "Amazon prime tape", "Amazon printed tape",
  "Flipkart tape", "Flipkart printed tape", "Meesho tape", "Myntra tape", "Ajio tape", "Nykaa tape",
  "courier bags", "tamper proof courier bags", "Amazon courier bags", "Flipkart courier bags",
  "ecommerce polybags", "printed polybags", "plain courier bags",
  "stretch film roll", "hand grade stretch film", "machine grade stretch film", "mini stretch film",
  "box strapping roll", "metal strapping clips", "PP strapping roll",
  "corrugated paper roll", "corrugated roll",
  "air bubble roll", "air bubble wrap",
  "cello tape", "industrial tape", "carton sealing tape",
  "packaging tape", "shipping tape", "self adhesive tape", "wide brown tape",
  "48mm BOPP tape", "55mm wide tape", "high micron tape"
];

const MASTER_MODIFIERS = [
  "manufacturer", "wholesale supplier", "factory", "bulk dealer",
  "distributor", "B2B supplier", "exporter", "trader", "stockist",
  "price", "online", "near me", "best quality", "cheap rates", "low price",
  "company", "industries", "shop", "store", "vendor"
];

const MASTER_BUY_VERBS = ["buy", "order", "get", "shop"];

let masterKeywordsCache: string[] | null = null;

/**
 * Builds a single, deduped, ~2000+ entry master keyword list covering
 * marketplace × location × product × modifier combinations used site-wide.
 * Result is memoized per server instance.
 */
export function getMasterKeywords(limit = 2200): string[] {
  if (masterKeywordsCache) return masterKeywordsCache.slice(0, limit);
  const set = new Set<string>();

  // Brand-anchored terms (highest priority)
  ["Packmax", "Packmax India", "Packmax tape", "Packmax packaging", "Packmax BOPP", "Packmax courier bags"].forEach(b => set.add(b));

  // Product × location (core matrix)
  MASTER_PRODUCTS.forEach(p => {
    MASTER_LOCATIONS.forEach(loc => {
      set.add(`${p} ${loc}`);
      set.add(`${p} in ${loc}`);
      set.add(`${p} manufacturer ${loc}`);
      set.add(`${p} supplier ${loc}`);
      set.add(`${p} wholesale ${loc}`);
      set.add(`buy ${p} ${loc}`);
      set.add(`${p} ${loc} packmax`);
      set.add(`packmax ${p} ${loc}`);
    });
  });

  // Marketplace × location × buy-verb (e.g. "amazon tape bhopal packmax")
  MARKETPLACES.forEach(mp => {
    MASTER_LOCATIONS.forEach(loc => {
      set.add(`${mp} tape ${loc}`);
      set.add(`${mp} tape ${loc} packmax`);
      set.add(`${mp} printed tape ${loc}`);
      set.add(`${mp} seller tape ${loc}`);
      set.add(`${mp} fulfillment tape ${loc}`);
      set.add(`${mp} courier bags ${loc}`);
      set.add(`${mp} packaging ${loc}`);
      MASTER_BUY_VERBS.forEach(v => set.add(`${v} ${mp} tape ${loc}`));
    });
  });

  // Product × modifier
  MASTER_PRODUCTS.forEach(p => {
    MASTER_MODIFIERS.forEach(m => set.add(`${p} ${m}`));
  });

  // Location-only intent
  MASTER_LOCATIONS.forEach(loc => {
    set.add(`packaging supplier ${loc}`);
    set.add(`tape manufacturer ${loc}`);
    set.add(`packaging materials wholesale ${loc}`);
    set.add(`B2B packaging ${loc}`);
    set.add(`ecommerce packaging ${loc}`);
    set.add(`courier packaging ${loc}`);
    set.add(`packmax ${loc}`);
  });

  // Generic high-value head terms
  [
    "BOPP tape manufacturer India", "custom printed tape India",
    "Amazon seller tape India", "Flipkart seller tape India", "Meesho seller packaging India",
    "wholesale courier bags India", "tamper proof bags India",
    "industrial packaging India", "B2B packaging supplier India",
    "stretch film manufacturer India", "PP strapping India",
    "corrugated roll supplier India", "air bubble wrap India",
    "custom brand logo tape", "tamper evident packaging",
    "high micron BOPP tape", "acrylic adhesive tape India",
    "rotogravure printed tape", "ecommerce packaging India"
  ].forEach(k => set.add(k));

  masterKeywordsCache = Array.from(set);
  return masterKeywordsCache.slice(0, limit);
}

export function generateDynamicKeywords(
  locationName?: string,
  productName?: string,
  categoryName?: string
): string[] {
  const baseKeywords = [
    "BOPP Tape Manufacturer", "Custom Printed Tape", "Packaging Tapes",
    "Self Adhesive Tapes", "Brown Tape Wholesaler", "Transparent Tape Factory",
    "Color Tape Supplier", "Courier Bags Manufacturer", "Security Polybags",
    "Stretch Film Roll", "Box Strapping Roll", "Corrugated Paper Roll",
    "Air Bubble Wrap Roll", "Industrial Packaging Material", "B2B Sealing Tapes",
    "Wholesale Packaging Supplies", "Custom Logo Tapes", "Printed Packaging",
    "Ecommerce Packaging Materials", "Shipping Tapes Bulk", "Tamper Evident Bags",
    "Adhesive Tapes Manufacturer India", "Packaging Film Suppliers", "Packmax",
    "Packmax India", "Packmax tape", "Packmax packaging"
  ];

  const products = [
    "BOPP Brown Tape", "Transparent Tape", "Custom Printed Logo Tape",
    "Red BOPP Color Tape", "Green BOPP Color Tape", "Yellow BOPP Color Tape",
    "Plain Courier Bags", "Tamper Proof Courier Bags", "Stretch Film Roll",
    "Box Strapping Roll", "Metal Strapping Clips", "Corrugated Roll", "Air Bubble Roll",
    "Amazon Printed Tape", "Flipkart Printed Tape", "Meesho Printed Tape", "Myntra Tape"
  ];

  const locations = [
    "Indore", "Bhopal", "Jabalpur", "Gwalior", "Satna", "Sagar", "Ujjain", "Ratlam", "Dewas",
    "Mumbai", "Pune", "Jaipur", "Jodhpur", "Udaipur", "Raipur", "Bhilai", "Rajkot", "Agra",
    "Kanpur", "Hyderabad", "Bengaluru", "Delhi", "Noida", "Gurugram", "Ahmedabad", "Chennai",
    "Surat", "Vadodara", "Lucknow", "Patna", "Kolkata", "Bhubaneswar", "Ranchi", "Guwahati",
    "Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Dehradun", "Shimla", "Jammu"
  ];

  const modifiers = [
    "manufacturer in", "wholesale supplier in", "factory in", "bulk dealers in",
    "distributor in", "cheap prices in", "B2B seller in", "best quality in"
  ];

  const keywordsSet = new Set<string>(baseKeywords);

  if (locationName) {
    products.forEach(p => {
      modifiers.forEach(mod => {
        keywordsSet.add(`${p} ${mod} ${locationName}`);
      });
      keywordsSet.add(`buy ${p} wholesale in ${locationName}`);
      keywordsSet.add(`${p} supplier ${locationName}`);
      keywordsSet.add(`cheap industrial ${p} ${locationName}`);
      keywordsSet.add(`Packmax ${p} ${locationName}`);
    });

    // Marketplace + location query patterns (e.g. "amazon tape bhopal packmax")
    MARKETPLACES.forEach(mp => {
      keywordsSet.add(`${mp} tape ${locationName}`);
      keywordsSet.add(`${mp} tape ${locationName} packmax`);
      keywordsSet.add(`${mp} printed tape ${locationName}`);
      keywordsSet.add(`${mp} courier bags ${locationName}`);
      keywordsSet.add(`${mp} packaging ${locationName}`);
      keywordsSet.add(`${mp} seller tape supplier ${locationName}`);
      keywordsSet.add(`buy ${mp} tape ${locationName}`);
      keywordsSet.add(`${mp} fulfillment tape ${locationName}`);
    });
  }

  if (productName) {
    locations.forEach(loc => {
      modifiers.forEach(mod => {
        keywordsSet.add(`${productName} ${mod} ${loc}`);
      });
      keywordsSet.add(`wholesale ${productName} ${loc}`);
      keywordsSet.add(`bulk supply ${productName} ${loc}`);
      keywordsSet.add(`${productName} ${loc} packmax`);
      keywordsSet.add(`packmax ${productName} ${loc}`);
    });

    // Detect marketplace mention in product name to expand keyword set
    const matchedMp = MARKETPLACES.find(mp => productName.toLowerCase().includes(mp.toLowerCase()));
    if (matchedMp) {
      locations.forEach(loc => {
        keywordsSet.add(`${matchedMp} tape ${loc}`);
        keywordsSet.add(`${matchedMp} tape ${loc} packmax`);
        keywordsSet.add(`${matchedMp} printed tape supplier ${loc}`);
        keywordsSet.add(`buy ${matchedMp} tape online ${loc}`);
      });
    }
  }

  if (categoryName) {
    locations.forEach(loc => {
      keywordsSet.add(`${categoryName} manufacturer ${loc}`);
      keywordsSet.add(`bulk ${categoryName} supplier ${loc}`);
      keywordsSet.add(`industrial ${categoryName} factory ${loc}`);
    });
  }

  if (!locationName && !productName && !categoryName) {
    locations.forEach(loc => {
      products.forEach(p => {
        keywordsSet.add(`${p} supplier in ${loc}`);
        keywordsSet.add(`${p} manufacturer ${loc}`);
        keywordsSet.add(`buy ${p} bulk ${loc}`);
        keywordsSet.add(`${p} wholesale distributor ${loc}`);
      });
    });
  }

  return Array.from(keywordsSet);
}

export function generateSEOMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
  locationName,
  productName,
  categoryName
}: SEOMetadataProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const dynamicList = generateDynamicKeywords(locationName, productName, categoryName);
  const master = getMasterKeywords();
  // Page-specific dynamic keywords first (highest relevance), then master site-wide pool.
  const merged = new Set<string>();
  if (keywords) keywords.split(",").map(s => s.trim()).filter(Boolean).forEach(k => merged.add(k));
  dynamicList.forEach(k => merged.add(k));
  master.forEach(k => merged.add(k));
  // Cap final list to keep response size manageable (~2200 keywords).
  const keywordsList = Array.from(merged).slice(0, 2200).join(", ");

  return {
    title: `${title} | ${BRAND}`,
    description,
    keywords: keywordsList,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${BRAND}`,
      description,
      url,
      siteName: BRAND,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND}`,
      description,
      images: [ogImage],
      creator: "@PackmaxIndia",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* --------------------- Structured Data (JSON-LD) helpers --------------------- */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  image: string;
  sku?: string;
  brand?: string;
  url: string;
  locationName?: string;
  ratingValue?: string | number;
  reviewCount?: number;
  category?: string;
}

export function productSchema(p: ProductSchemaInput) {
  const fullUrl = p.url.startsWith("http") ? p.url : `${SITE_URL}${p.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.locationName ? `${p.name} in ${p.locationName}` : p.name,
    description: p.description,
    image: [p.image],
    sku: p.sku || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    brand: {
      "@type": "Brand",
      name: p.brand || BRAND,
    },
    category: p.category,
    offers: {
      "@type": "Offer",
      url: fullUrl,
      priceCurrency: "INR",
      price: "0",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: BRAND,
      },
      areaServed: p.locationName
        ? {
            "@type": "City",
            name: p.locationName,
          }
        : undefined,
    },
    aggregateRating:
      p.ratingValue && p.reviewCount
        ? {
            "@type": "AggregateRating",
            ratingValue: String(p.ratingValue),
            reviewCount: String(p.reviewCount),
          }
        : undefined,
  };
}

export interface LocalBusinessInput {
  name?: string;
  url: string;
  image?: string;
  city: string;
  state: string;
  streetAddress?: string;
  postalCode?: string;
  description?: string;
}

export function localBusinessSchema(b: LocalBusinessInput) {
  const fullUrl = b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${fullUrl}#business`,
    name: b.name || `${BRAND} — ${b.city}`,
    url: fullUrl,
    image: b.image || `${SITE_URL}/amazon-prime-tape.png`,
    description: b.description,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress,
      addressLocality: b.city,
      addressRegion: b.state,
      postalCode: b.postalCode,
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: b.city,
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: BRAND,
    alternateName: ["Packmax", "Packmax Tapes"],
    url: SITE_URL,
    logo: `${SITE_URL}/amazon-prime-tape.png`,
    sameAs: [
      "https://www.facebook.com/packmaxindia",
      "https://www.instagram.com/packmaxindia",
      "https://www.linkedin.com/company/packmaxindia",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BRAND,
    publisher: { "@id": `${SITE_URL}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/products?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
