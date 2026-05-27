"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { siteData } from "@/data/siteData";

interface RelatedProductsProps {
  productSlug: string;
  locationSlug?: string;
}

export default function RelatedProducts({ productSlug, locationSlug }: RelatedProductsProps) {
  const product = siteData.products.find((p) => p.slug === productSlug);
  if (!product) return null;

  const sameCategory = siteData.products.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
  );
  const related = [...sameCategory];
  if (related.length < 4) {
    const extra = siteData.products
      .filter((p) => p.id !== product.id && !related.find((r) => r.id === p.id))
      .slice(0, 4 - related.length);
    related.push(...extra);
  }

  const items = related.slice(0, 4);
  if (!items.length) return null;

  const hrefFor = (slug: string) =>
    `/${locationSlug || "indore"}/${slug}`;

  return (
    <section className="bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <div className="text-center mb-12 relative flex items-center justify-center">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
          <h2 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] uppercase tracking-widest inline-block bg-[var(--color-bg)] px-8 relative z-10">
            RELATED PRODUCTS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((rp) => (
            <motion.div
              key={rp.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-[var(--color-heading)]/5 p-5 transition-all group flex flex-col relative text-left"
            >
              <div className="absolute top-7 right-7 bg-white border border-gray-100 text-[9px] font-black tracking-widest text-gray-600 px-3 py-1.5 rounded-lg z-10 shadow-sm uppercase">
                IN STOCK
              </div>

              <Link
                href={hrefFor(rp.slug)}
                className="block relative aspect-square w-full mb-6 overflow-hidden rounded-xl bg-gray-50/50 p-6 border border-black/[0.02]"
              >
                <img
                  src={rp.image}
                  alt={rp.name}
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </Link>

              <Link href={hrefFor(rp.slug)} className="w-full">
                <h3 className="text-lg font-black text-[var(--color-heading)] mb-2 line-clamp-1 group-hover:text-[var(--color-cta)] transition-colors">
                  {rp.name}
                </h3>
              </Link>

              <p className="text-xs text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                {rp.description || `High-quality ${rp.name.toLowerCase()} suitable for various packaging and industrial needs.`}
              </p>

              <div className="mt-auto border-t border-gray-50 pt-4">
                <Link
                  href={hrefFor(rp.slug)}
                  className="w-full bg-[#0B122A] text-white text-[12px] sm:text-[13px] font-black tracking-widest uppercase px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--color-cta)] hover:shadow-lg hover:shadow-[var(--color-cta)]/20 transition-all border border-transparent"
                >
                  Select Options <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
