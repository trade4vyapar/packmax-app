export const siteData = {
  products: [
    {
      id: "bopp-brown-tape",
      name: "BOPP Brown Tape",
      slug: "bopp-brown-tape",
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
    { name: "Indore", slug: "indore", state: "Madhya Pradesh", description: "As a leading manufacturer based in Indore, we provide rapid delivery to all industrial zones in the city." },
    { name: "Mumbai", slug: "mumbai", state: "Maharashtra", description: "Serving the financial capital with high-volume industrial packaging supplies and logistics support." },
    { name: "Delhi NCR", slug: "delhi-ncr", state: "Delhi", description: "Extensive distribution network across Delhi, Noida, and Gurugram for e-commerce and retail sectors." },
    { name: "Ahmedabad", slug: "ahmedabad", state: "Gujarat", description: "Providing robust packaging solutions to the manufacturing and textile hubs of Gujarat." },
    { name: "Pune", slug: "pune", state: "Maharashtra", description: "Specialized packaging tapes and stretch films for the automotive and IT sectors in Pune." }
  ]
};

export type Product = typeof siteData.products[0];
export type Location = typeof siteData.locations[0];
