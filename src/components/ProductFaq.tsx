export interface ProductFaqProps {
  productName: string;
  locationName: string;
  faq: { question: string; answer: string }[];
}

export default function ProductFaq({ productName, locationName, faq }: ProductFaqProps) {
  if (!faq.length) return null;

  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
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
    </section>
  );
}
