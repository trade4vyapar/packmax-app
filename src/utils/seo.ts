import { Metadata } from "next";

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
    "Adhesive Tapes Manufacturer India", "Packaging Film Suppliers"
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

  // If a location is provided, heavily target that location with all products
  if (locationName) {
    products.forEach(p => {
      modifiers.forEach(mod => {
        keywordsSet.add(`${p} ${mod} ${locationName}`);
      });
      keywordsSet.add(`buy ${p} wholesale in ${locationName}`);
      keywordsSet.add(`${p} supplier ${locationName}`);
      keywordsSet.add(`cheap industrial ${p} ${locationName}`);
    });
  }

  // If a product is provided, heavily target that product across all locations
  if (productName) {
    locations.forEach(loc => {
      modifiers.forEach(mod => {
        keywordsSet.add(`${productName} ${mod} ${loc}`);
      });
      keywordsSet.add(`wholesale ${productName} ${loc}`);
      keywordsSet.add(`bulk supply ${productName} ${loc}`);
    });
  }

  // If a category is provided, heavily target that category
  if (categoryName) {
    locations.forEach(loc => {
      keywordsSet.add(`${categoryName} manufacturer ${loc}`);
      keywordsSet.add(`bulk ${categoryName} supplier ${loc}`);
      keywordsSet.add(`industrial ${categoryName} factory ${loc}`);
    });
  }

  // God Mode: If no specific target, generate a massive matrix of location x product keywords (up to 4000+)
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
  const url = `https://packmaxindia.in${path}`;
  const dynamicList = generateDynamicKeywords(locationName, productName, categoryName);
  const keywordsList = keywords 
    ? `${keywords}, ${dynamicList.join(", ")}`
    : dynamicList.join(", ");

  return {
    title: `${title} | Packmax India`,
    description,
    keywords: keywordsList,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Packmax India`,
      description,
      url,
      siteName: "Packmax India",
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
      title: `${title} | Packmax India`,
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
