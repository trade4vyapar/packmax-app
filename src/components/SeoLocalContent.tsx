import Link from "next/link";

export interface SeoLocalContentProps {
  productName: string;
  locationName: string;
  state: string;
  marketplace?: string | null;
  faq: { question: string; answer: string }[];
  relatedLinks?: { label: string; href: string }[];
}

export default function SeoLocalContent({
  productName,
  locationName,
  state,
  marketplace,
  faq,
  relatedLinks = [],
}: SeoLocalContentProps) {
  const heading = marketplace
    ? `${productName} Manufacturer, Supplier & Wholesaler in ${locationName} — Trusted by ${marketplace} Sellers`
    : `${productName} Manufacturer, Supplier & Wholesaler in ${locationName}, ${state}`;

  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-heading)] uppercase tracking-tight mb-4">
          {heading}
        </h2>
        <p className="text-base text-[var(--color-text)] opacity-80 leading-relaxed max-w-4xl mb-4">
          Packmax India is the direct-factory <strong>manufacturer, wholesale supplier and authorised wholesaler</strong> of <strong>{productName}</strong> for dealers, wholesalers and B2B buyers in{" "}
          <strong>{locationName}, {state}</strong>.
          {marketplace
            ? ` As the manufacturer, we engineer this ${productName} to ${marketplace}'s seller packaging specification — high-tack acrylic adhesive, 45–50 micron BOPP, tamper-evident edge — and supply it through our authorised wholesaler network to ${marketplace} fulfillment sellers across ${locationName} and the surrounding industrial zones.`
            : ` Our manufacturer-supplier team dispatches ${productName} in 48–72 hours to industrial estates across ${locationName}, with custom-print options and wholesaler-grade bulk B2B pricing.`}
        </p>
        <p className="text-base text-[var(--color-text)] opacity-80 leading-relaxed max-w-4xl mb-4">
          Looking for a{" "}
          <strong>
            {marketplace ? `${marketplace.toLowerCase()} tape manufacturer / supplier / wholesaler in ${locationName.toLowerCase()}` : `${productName.toLowerCase()} manufacturer, supplier and wholesaler in ${locationName.toLowerCase()}`}
          </strong>
          ? You're on the right page — this is the official Packmax manufacturer & supplier listing for {locationName}.
        </p>
        <p className="text-base text-[var(--color-text)] opacity-80 leading-relaxed max-w-4xl">
          Packmax serves the full B2B chain: <strong>manufacturer</strong> (in-house BOPP casting & rotogravure printing), <strong>supplier</strong> (wholesale dispatch to retailers and dealers), and <strong>wholesaler</strong> (authorised channel partner network across {state} and pan-India). Whether you need a single bulk shipment or a long-term wholesaler contract for {productName.toLowerCase()} in {locationName}, our team handles it end-to-end.
        </p>

        {relatedLinks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-[var(--color-cta)] mb-3">
              Also available in {locationName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200 hover:border-[var(--color-cta)] hover:text-[var(--color-cta)] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight mb-6">
            Frequently asked questions — {productName} in {locationName}
          </h3>
          <div className="space-y-4 max-w-4xl">
            {faq.map((f) => (
              <details
                key={f.question}
                className="group border border-gray-200 rounded-2xl p-5 bg-gray-50 hover:bg-white transition-colors"
              >
                <summary className="cursor-pointer font-bold text-[var(--color-heading)] text-base list-none flex justify-between items-start gap-4">
                  <span>{f.question}</span>
                  <span className="text-[var(--color-cta)] text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-[var(--color-text)] opacity-80 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
