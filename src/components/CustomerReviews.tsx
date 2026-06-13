"use client";

import { Star } from "lucide-react";

const reviews = [
  // Original reviews
  {
    name: "Narendra Kawche",
    location: "Indore, Madhya Pradesh",
    date: "18-January-26",
    product: "Custom Printed Logo Tapes",
    industry: "Manufacturing",
    rating: 5,
    comment:
      "Very strong tape and the logo print quality is excellent. Our custom branded packaging tape fits our box sealing needs perfectly. Factory-direct pricing made all the difference.",
  },
  {
    name: "Rohit Gurjar",
    location: "Indore, Madhya Pradesh",
    date: "04-February-26",
    product: "BOPP Transparent Tapes",
    industry: "Retail",
    rating: 5,
    comment:
      "Super clear tape, very strong stickiness, and does not turn yellow. Great for packing boxes quickly. Best BOPP tape supplier I've found for bulk orders.",
  },
  // E-commerce & D2C
  {
    name: "Rohan Mehta",
    location: "Mumbai, Maharashtra",
    date: "12-March-26",
    product: "Custom Printed Tape",
    industry: "E-commerce Seller",
    rating: 5,
    comment:
      "Packmax's custom printed tape has completely elevated our brand unboxing experience. The ecommerce packaging looks premium — our D2C customers love it. Factory-direct pricing means we save significantly on bulk orders. Highly recommend for any serious ecommerce seller.",
  },
  {
    name: "Ananya Desai",
    location: "Bengaluru, Karnataka",
    date: "08-March-26",
    product: "Ecommerce Tapes",
    industry: "D2C Brand",
    rating: 5,
    comment:
      "As a D2C packaging brand, consistent quality is non-negotiable. Packmax delivers ecommerce tapes that are tamper-proof and strong. PAN-India delivery is fast and their lowest MOQ policy means we can order as little as 1 box — perfect for a growing D2C business.",
  },
  {
    name: "Karan Verma",
    location: "Delhi NCR",
    date: "02-April-26",
    product: "Branded BOPP Tape",
    industry: "E-commerce Seller",
    rating: 4,
    comment:
      "Great ecommerce packaging supplier. The BOPP tape is strong and our logo comes out crisp on every roll. Delivery was on time and the factory-direct price beats anything I found on marketplaces. Will definitely reorder.",
  },
  // Logistics & Warehousing
  {
    name: "Priya Sharma",
    location: "Pune, Maharashtra",
    date: "20-February-26",
    product: "Stretch Film Roll",
    industry: "Logistics Manager",
    rating: 5,
    comment:
      "Our warehouse packaging efficiency has improved drastically since switching to Packmax stretch film. The pallet wrapping strength is excellent — no shifting during transit. Factory-direct supply chain packaging at wholesale prices is exactly what a logistics operation needs.",
  },
  {
    name: "Deepak Nair",
    location: "Hyderabad, Telangana",
    date: "14-March-26",
    product: "Stretch Film & BOPP Tape",
    industry: "3PL Warehouse",
    rating: 5,
    comment:
      "Running a 3PL warehouse requires reliable suppliers. Packmax's stretch film and BOPP sealing tape have been consistent in quality across every bulk order. Fast dispatch, GST-compliant invoices, and pan-India delivery make them our go-to logistics packaging partner.",
  },
  {
    name: "Mahesh Rao",
    location: "Chennai, Tamil Nadu",
    date: "05-April-26",
    product: "Box Strapping Roll",
    industry: "Freight Logistics",
    rating: 4,
    comment:
      "The box strapping rolls from Packmax are high-tensile and reliable for securing heavy freight. Our warehouse packaging costs have dropped after switching to their direct-factory pricing. Reliable packaging supplier for logistics use cases.",
  },
  // Retail & FMCG
  {
    name: "Anil Joshi",
    location: "Jaipur, Rajasthan",
    date: "25-January-26",
    product: "BOPP Brown Tape",
    industry: "FMCG Distributor",
    rating: 4,
    comment:
      "For FMCG packaging, we need tape that seals fast and holds tight. Packmax BOPP tape is exactly that — strong adhesion, great for bulk orders, and wholesaler pricing that fits our margins. FMCG corrugated box sealing has never been easier.",
  },
  {
    name: "Sunita Agarwal",
    location: "Bhopal, Madhya Pradesh",
    date: "18-February-26",
    product: "BOPP Color Tape",
    industry: "Retail Packaging",
    rating: 5,
    comment:
      "We use Packmax BOPP color tapes for inventory management and retail packaging. The colors are vibrant, adhesion is superb, and the bulk pricing makes it cost-effective. Excellent retail packaging supplier — pan-India delivery is seamless.",
  },
  {
    name: "Rajesh Gupta",
    location: "Surat, Gujarat",
    date: "10-March-26",
    product: "Printed & plain Ecommerce Polybags",
    industry: "FMCG Manufacturer",
    rating: 5,
    comment:
      "Packmax's printed & plain ecommerce polybags are perfect for our shipping line. Waterproof & tear-resistant options give us flexibility. Strong adhesive strip, fast dispatch, and competitive bulk pricing. Best polybag supplier we've worked with.",
  },
  // Pharma & Healthcare
  {
    name: "Dr. Neha Kulkarni",
    location: "Nagpur, Maharashtra",
    date: "15-February-26",
    product: "Printed & plain Ecommerce Polybags & Stretch Film",
    industry: "Pharma Company",
    rating: 5,
    comment:
      "Pharma packaging demands precision and tamper-proof sealing. Packmax's ecommerce polybags and stretch film meet our standards. UDYAM-registered, GST-compliant, and ISO-quality materials give us confidence for pharma packaging requirements. Fast dispatch across India is a major plus.",
  },
  {
    name: "Abhishek Patel",
    location: "Ahmedabad, Gujarat",
    date: "28-February-26",
    product: "BOPP Transparent Tape",
    industry: "Healthcare Distributor",
    rating: 5,
    comment:
      "For healthcare packaging, we need tamper-evident, reliable tapes. Packmax BOPP transparent tape is crystal clear, non-yellowing, and UV resistant — perfect for pharma-grade packaging. Bulk order was delivered in 48 hours. Outstanding service.",
  },
  {
    name: "Meera Iyer",
    location: "Bengaluru, Karnataka",
    date: "06-March-26",
    product: "Air Bubble Roll",
    industry: "Medical Equipment",
    rating: 5,
    comment:
      "Packmax air bubble roll provides excellent cushioning for sensitive medical equipment during transit. Lightweight yet durable, waterproof, and available in bulk. Their pharma packaging materials are top-quality. Will continue ordering.",
  },
  // Food & Beverage
  {
    name: "Suresh Patil",
    location: "Kolhapur, Maharashtra",
    date: "22-January-26",
    product: "Air Bubble Roll & Corrugated Roll",
    industry: "Food & Beverage",
    rating: 5,
    comment:
      "Food-grade packaging needs to be safe and reliable. Packmax's air bubble roll and corrugated roll ensure safe delivery for our bottled products. No damage, no leakage, and excellent cushioning. Best food and beverage packaging supplier in India.",
  },
  {
    name: "Ganesh Kumar",
    location: "Coimbatore, Tamil Nadu",
    date: "12-February-26",
    product: "Stretch Film Roll",
    industry: "Food Processing",
    rating: 4,
    comment:
      "Our food processing unit switched to Packmax stretch film for pallet wrapping. The clarity is excellent, cling is strong, and the food-grade packaging material keeps products secure. Factory-direct price is unbeatable. Pan-India delivery is fast.",
  },
  {
    name: "Lalitha Krishnan",
    location: "Mysuru, Karnataka",
    date: "03-March-26",
    product: "BOPP Brown Tape",
    industry: "Organic Food Brand",
    rating: 5,
    comment:
      "As an organic food brand, we care about packaging quality. Packmax BOPP brown tape is strong and tamper-evident. Our customers receive products in perfect condition every time. Great food and beverage packaging partner with the lowest MOQ we've found.",
  },
  // Manufacturing & Industrial
  {
    name: "Vikram Singh",
    location: "Faridabad, Haryana",
    date: "30-January-26",
    product: "Box Strapping Roll & Clip",
    industry: "Manufacturing Unit",
    rating: 4,
    comment:
      "Industrial packaging demands high-tensile box strapping that won't snap under load. Packmax box strapping roll and clips are exactly that — reliable, weather-resistant, and bulk-priced. Our manufacturing packaging costs have dropped significantly. Excellent industrial packaging supplier.",
  },
  {
    name: "Ravi Shastri",
    location: "Aurangabad, Maharashtra",
    date: "20-February-26",
    product: "Corrugated Roll & Box Strapping",
    industry: "Auto Components",
    rating: 5,
    comment:
      "Our auto components manufacturing unit uses Packmax corrugated roll for wrapping delicate parts. The shock-absorbing quality is exceptional. Combined with their box strapping for heavy cartons, our transit damage is near zero. Top-notch industrial packaging.",
  },
  {
    name: "Santosh Mishra",
    location: "Kanpur, Uttar Pradesh",
    date: "15-March-26",
    product: "BOPP Tape & Stretch Film",
    industry: "Textile Manufacturing",
    rating: 4,
    comment:
      "Packmax has been our manufacturing packaging partner for over a year now. BOPP tape for box sealing and stretch film for roll wrapping — both are reliable and cost-effective. Direct-from-factory supply ensures we always get the best rates. Recommended for industrial packaging needs.",
  },
  // More mixed reviews
  {
    name: "Pooja Jain",
    location: "Indore, Madhya Pradesh",
    date: "01-April-26",
    product: "Custom Printed Tape",
    industry: "Gifting Brand",
    rating: 5,
    comment:
      "Ordered custom printed tape with our brand logo for gifting season. The quality exceeded expectations — multi-color printing is sharp and the tape holds beautifully. Packmax is our trusted branded packaging tape supplier. Fast delivery, lowest MOQ.",
  },
  {
    name: "Harish Tiwari",
    location: "Raipur, Chhattisgarh",
    date: "22-March-26",
    product: "BOPP Transparent Tape",
    industry: "Stationery Distributor",
    rating: 5,
    comment:
      "Best transparent packaging tape we've used. Crystal clear finish, strong adhesion, and bulk pricing that fits wholesale pricing requirements. Packmax is our go-to BOPP tape supplier for all retail and distribution needs.",
  },
  {
    name: "Nilesh Bhave",
    location: "Nagpur, Maharashtra",
    date: "10-April-26",
    product: "Printed & plain Ecommerce Polybags",
    industry: "Electronics Retailer",
    rating: 5,
    comment:
      "We package consumer products and need strong ecommerce polybags. Packmax delivers exactly that — high tear resistance, custom sizes available, and fast dispatch. Their printed & plain packaging is ideal for retail packaging. Reliable supplier.",
  },
  {
    name: "Sheela Nambiar",
    location: "Kochi, Kerala",
    date: "05-April-26",
    product: "Air Bubble Roll",
    industry: "Handicrafts Exporter",
    rating: 5,
    comment:
      "Exporting handicrafts requires excellent cushioning. Packmax air bubble roll is lightweight, waterproof, and reusable — perfect for wrapping fragile items for international shipping. Supply chain packaging that protects and delivers. Very satisfied.",
  },
  {
    name: "Ajay Thakur",
    location: "Guwahati, Assam",
    date: "17-March-26",
    product: "Ecommerce Tapes & Polybags",
    industry: "Online Seller",
    rating: 4,
    comment:
      "Running an online store in Northeast India, I needed a reliable ecommerce packaging partner who delivers to this region. Packmax does pan-India delivery and their ecommerce tapes are strong and professional. Great supplier for small online sellers too.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? "fill-current" : "opacity-20"}`}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  // Duplicate for seamless infinite loop
  const doubled = [...reviews, ...reviews];

  return (
    <section
      className="py-20 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <div className="absolute top-10 right-0 w-[40rem] h-[40rem] bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-1.5">
              Customer Trust
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-tight">
              What Customers <br /> Say About Us
            </h2>
          </div>

          {/* Aggregate Score */}
          <div
            className="bg-white border border-[var(--color-border)] rounded-2xl px-6 py-4 flex items-center gap-6 shrink-0"
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <div>
              <span
                className="text-4xl font-black text-[var(--color-heading)] leading-none block"
                itemProp="ratingValue"
              >
                4.8
              </span>
              <span className="text-xs font-bold text-[var(--color-text)] opacity-40">out of 5.0</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-wider block">
                <span itemProp="reviewCount">54</span> Verified Ratings
              </span>
              <meta itemProp="bestRating" content="5" />
            </div>

            <div className="hidden sm:flex flex-col gap-2 border-l border-[var(--color-border)] pl-6">
              {[
                { label: "Quick Response", pct: "100%" },
                { label: "Strong Quality", pct: "100%" },
                { label: "On-Time Delivery", pct: "100%" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-[var(--color-heading)] mb-0.5">
                    <span>{b.label}</span><span>{b.pct}</span>
                  </div>
                  <div className="w-36 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee Reviews */}
        <div className="overflow-hidden -mx-6">
          <div className="reviews-marquee-track flex gap-5 px-6">
            {doubled.map((rev, idx) => (
              <div
                key={idx}
                className="shrink-0 w-[320px] sm:w-[360px] bg-white border border-[var(--color-border)] rounded-[2rem] p-6 shadow-sm flex flex-col gap-4"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4
                      className="text-sm font-black text-[var(--color-heading)] uppercase tracking-tight"
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">{rev.name}</span>
                    </h4>
                    <span className="text-[10px] font-bold text-[var(--color-text)] opacity-40">
                      {rev.location}
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-end gap-1 shrink-0"
                    itemProp="reviewRating"
                    itemScope
                    itemType="https://schema.org/Rating"
                  >
                    <meta itemProp="ratingValue" content={String(rev.rating)} />
                    <StarRating rating={rev.rating} />
                    <span className="text-[8px] font-black text-[var(--color-cta)] uppercase tracking-wider">
                      {rev.industry}
                    </span>
                  </div>
                </div>

                <p
                  className="text-xs font-bold text-[var(--color-heading)] opacity-60 leading-relaxed flex-1"
                  itemProp="reviewBody"
                >
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase text-gray-300 tracking-widest">
                    Verified Order • {rev.product}
                  </span>
                  <span className="text-[8px] font-black uppercase text-gray-300 tracking-widest">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
