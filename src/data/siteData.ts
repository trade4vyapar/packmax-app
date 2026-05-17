export const siteData = {
  products: [
    {
      id: "amazon-prime-tape",
      name: "Amazon Prime Tape",
      slug: "amazon-prime-tape",
      categorySlug: "ecommerce-tapes",
      tagline: "Official Standard E-Commerce Tape",
      description: "High-grade printed packaging tape meeting strict e-commerce guidelines. Ensures secure and compliant shipments for sellers.",
      features: ["Standard Branding", "High Adhesion", "Water Resistant", "Industrial Grade"],
      specs: {
        material: "BOPP Film",
        adhesive: "Acrylic / Hotmelt",
        thickness: "45-50 Micron"
      },
      image: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/TAPES/AMAZON%20PRIME%20TAPE.webp"
    },
    {
      id: "amazon-tape",
      name: "Amazon Tape",
      slug: "amazon-tape",
      categorySlug: "ecommerce-tapes",
      tagline: "E-Commerce Fulfillment Tape",
      description: "Reliable, heavy-duty printed tape designed for Amazon fulfillment operations and third-party sellers.",
      features: ["Custom Print", "Tamper Evident", "Strong Grip"],
      specs: {
        material: "BOPP Film",
        adhesive: "Acrylic",
        thickness: "45-50 Micron"
      },
      image: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/TAPES/AMAZON%20TAPE.webp"
    },
    {
      id: "flipkart-tape",
      name: "Flipkart Tape",
      slug: "flipkart-tape",
      categorySlug: "ecommerce-tapes",
      tagline: "Official Flipkart Packaging Tape",
      description: "Standardized printed tape for Flipkart sellers. Provides excellent holding power and compliance with packaging standards.",
      features: ["Official Design", "High Strength", "Weather Resistant"],
      specs: {
        material: "BOPP Film",
        adhesive: "Acrylic",
        thickness: "45-50 Micron"
      },
      image: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/TAPES/FLIPKART%20TAPE.webp"
    },
    {
      id: "meesho-tape",
      name: "Meesho Tape",
      slug: "meesho-tape",
      categorySlug: "ecommerce-tapes",
      tagline: "Meesho Seller Packaging Tape",
      description: "Durable and highly adhesive printed tape designed specifically for Meesho sellers to secure their packages efficiently.",
      features: ["Meesho Branding", "Tamper Proof", "Quick Stick"],
      specs: {
        material: "BOPP Film",
        adhesive: "Acrylic",
        thickness: "45-50 Micron"
      },
      image: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/TAPES/MEESHO%20TAPE.webp"
    },
    {
      id: "bopp-brown-tape",
      name: "BOPP Brown Tape",
      slug: "bopp-brown-tape",
      categorySlug: "bopp-brown-tape",
      tagline: "High-Adhesion Industrial Packaging Tape",
      description: "Our premium Brown BOPP tape is engineered for heavy-duty sealing. With superior tensile strength and long-lasting adhesive, it ensures your packages remain secure during long-distance transit.",
      features: ["48mm & 72mm Widths", "High Micron Coating", "Temperature Resistant", "Easy Unwind"],
      specs: {
        material: "Biaxially Oriented Polypropylene",
        adhesive: "Acrylic / Hotmelt",
        thickness: "40-55 Micron",
        length: "65m, 100m, 650m"
      },
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "transparent-packaging-tape",
      name: "Transparent Packaging Tape",
      slug: "transparent-packaging-tape",
      categorySlug: "bopp-transparent-tape",
      tagline: "Crystal Clear Branding & Sealing",
      description: "Perfect for secondary packaging and general purpose sealing. Our transparent tapes provide a clean, professional look while maintaining industrial-grade stickiness.",
      features: ["Ultra-Clear Finish", "Non-Yellowing Adhesive", "UV Resistant", "Strong Grip"],
      specs: {
        material: "BOPP Film",
        adhesive: "Pressure Sensitive Acrylic",
        thickness: "42-50 Micron",
        length: "Customizable"
      },
      image: "https://images.unsplash.com/photo-1606206591513-adbf01ac2cee?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "printed-logo-tape",
      name: "Printed Logo Tape",
      slug: "printed-logo-tape",
      categorySlug: "custom-brand-logo-name-printed-tape",
      tagline: "Turn Your Tape into a Marketing Tool",
      description: "Boost your brand visibility with custom printed tapes. We print your company logo and brand colors directly on the tape, doubling as a tamper-evident seal.",
      features: ["Up to 3 Color Printing", "Edge-to-Edge Design", "Anti-Counterfeit", "Custom Branding"],
      specs: {
        printing: "Rotogravure",
        base_colors: "Brown, Transparent, White",
        min_order: "72 Rolls"
      },
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "courier-bags",
      name: "Tamper-Proof Courier Bags",
      slug: "courier-bags",
      categorySlug: "printed-plain-ecommerce-polybags",
      tagline: "Secure E-commerce Shipping Bags",
      description: "High-strength polyethylene courier bags with permanent adhesive strip. Once sealed, they cannot be opened without visible damage, ensuring zero-pilferage delivery.",
      features: ["POD Jacket Included", "Waterproof PE Film", "Tear-Resistant", "Eco-Friendly Options"],
      specs: {
        sizes: "6x8, 8x10, 10x12, 12x15, 14x18 (Inches)",
        thickness: "50-75 Micron",
        closure: "Permanent Self-Adhesive"
      },
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=1974&auto=format&fit=crop"
    }
  ],
  locations: [
    { name: "Indore", slug: "indore", state: "Madhya Pradesh", description: "As a leading manufacturer based in Indore, we provide rapid delivery to all industrial zones in the city.", address: "Sector-3, Pithampur Industrial Area, Indore, Madhya Pradesh 454775" },
    { name: "Mumbai", slug: "mumbai", state: "Maharashtra", description: "Serving the financial capital with high-volume industrial packaging supplies and logistics support.", address: "Goregaon East Industrial Estate, Mumbai, Maharashtra 400063" },
    { name: "Delhi NCR", slug: "delhi-ncr", state: "Delhi", description: "Extensive distribution network across Delhi, Noida, and Gurugram for e-commerce and retail sectors.", address: "A-14/15, Sector - 59, Noida, Uttar Pradesh, India 201309" },
    { name: "Ahmedabad", slug: "ahmedabad", state: "Gujarat", description: "Providing robust packaging solutions to the manufacturing and textile hubs of Gujarat.", address: "Sarkhej-Bavla Highway, Changodar, Ahmedabad, Gujarat 382213" },
    { name: "Pune", slug: "pune", state: "Maharashtra", description: "Specialized packaging tapes and stretch films for the automotive and IT sectors in Pune.", address: "Chakan Industrial Area, Phase II, Pune, Maharashtra 410501" }
  ]
};

export type Product = typeof siteData.products[0];
export type Location = typeof siteData.locations[0];
