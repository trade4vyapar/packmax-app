"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Package,
  Layers,
  ShoppingBag,
  Truck,
  Stamp,
  Box,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import PremiumCTA from "@/components/PremiumCTA";

const products = [
  {
    icon: Package,
    title: "Brown Tape",
    slug: "bopp-brown-tape",
    description:
      "Strong brown tape designed to seal heavy cartons and shipping boxes safely.",
  },
  {
    icon: Layers,
    title: "Transparent Tape",
    slug: "transparent-tape",
    description:
      "Clear packing tape that sticks strongly and looks clean on any package.",
  },
  {
    icon: ShoppingBag,
    title: "Packaging Bags",
    slug: "packaging-bags",
    description:
      "Strong, tear-resistant shipping bags available in all standard sizes.",
  },
  {
    icon: Truck,
    title: "Courier Bags",
    slug: "tamper-proof-courier-bags",
    description:
      "Tamper-proof courier bags exactly like Amazon and Flipkart use for e-commerce deliveries.",
  },
  {
    icon: Stamp,
    title: "Printed Logo Tapes",
    slug: "custom-printed-tape",
    description:
      "Print your own company logo or name directly on high-quality adhesive tape.",
  },
  {
    icon: Box,
    title: "Branded Packaging",
    slug: "branded-packaging",
    description:
      "Fully customized boxes and packing materials designed exactly how you want.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function FeaturesSection({ locationName, locationSlug }: { locationName?: string, locationSlug?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-32 px-6 relative bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-bold text-[var(--color-cta)] uppercase tracking-widest mb-4 block">
            Our Products
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-6 tracking-tight text-[var(--color-heading)] uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            High-Quality Packing Supplies
          </h2>
          <p className="text-[var(--color-text)] text-lg max-w-2xl mx-auto font-medium">
            We make and supply a full range of packing materials for online shops, factories, and businesses {locationName ? `in ${locationName}` : 'Pan India'}.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
        >
          {products.map((product) => {
            const Icon = product.icon;
            const href = locationSlug ? `/${locationSlug}/${product.slug}` : `/indore/${product.slug}`;
            return (
              <Link href={href} key={product.title} className="block">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl sm:rounded-3xl p-4 sm:p-8 group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Icon */}
                    <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-6 bg-white shadow-sm border border-[var(--color-border)] group-hover:bg-[var(--color-cta)] group-hover:border-[var(--color-cta)] transition-colors duration-300">
                      <Icon className="w-4 h-4 sm:w-7 sm:h-7 text-[var(--color-cta)] group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3
                      className="text-xs sm:text-2xl font-black mb-1.5 sm:mb-3 text-[var(--color-heading)] tracking-tight uppercase"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-[var(--color-text)] text-[9px] sm:text-base leading-normal sm:leading-relaxed font-medium mb-4 sm:mb-6 opacity-75 sm:opacity-100 line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center text-[9px] sm:text-sm font-bold text-[var(--color-cta)] uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                    Details <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-[var(--color-cta)] transition-all duration-500" />
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <PremiumCTA 
            href="/products"
            label="View All Products"
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
          />
        </motion.div>
      </div>
    </section>
  );
}
