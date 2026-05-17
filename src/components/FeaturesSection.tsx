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

const products = [
  {
    icon: Package,
    title: "Brown Tape",
    slug: "bopp-brown-tape",
    description:
      "High-strength brown packaging tape suitable for all your heavy-duty box sealing and logistics needs.",
  },
  {
    icon: Layers,
    title: "Transparent Tape",
    slug: "transparent-tape",
    description:
      "Crystal clear BOPP tape offering excellent adhesion and finish for retail and standard packaging.",
  },
  {
    icon: ShoppingBag,
    title: "Packaging Bags",
    slug: "packaging-bags",
    description:
      "Durable, tear-resistant packaging bags available in multiple sizes for safe and secure transit.",
  },
  {
    icon: Truck,
    title: "Courier Bags",
    slug: "tamper-proof-courier-bags",
    description:
      "Amazon, Meesho, and Flipkart style tamper-proof courier bags for reliable e-commerce shipping.",
  },
  {
    icon: Stamp,
    title: "Printed Logo Tapes",
    slug: "custom-printed-tape",
    description:
      "Turn your packaging into a branding tool. We print your company logo directly onto high-quality tape.",
  },
  {
    icon: Box,
    title: "Branded Packaging",
    slug: "branded-packaging",
    description:
      "Fully customized boxes and packaging solutions tailored to your exact brand colors, size, and design.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-bold text-[var(--color-cta)] uppercase tracking-widest mb-4 block">
            Our Products
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-6 tracking-tight text-[var(--color-heading)] uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Premium Packaging
          </h2>
          <p className="text-[var(--color-text)] text-lg max-w-2xl mx-auto font-medium">
            We supply a comprehensive range of packaging solutions serving e-commerce, pharma, FMCG, and manufacturing industries {locationName ? `in ${locationName}` : 'Pan India'}.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => {
            const Icon = product.icon;
            const href = locationSlug ? `/${locationSlug}/${product.slug}` : `/indore/${product.slug}`;
            return (
              <Link href={href} key={product.title} className="block">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-3xl p-8 group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Icon */}
                  <div className="relative w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-white shadow-sm border border-[var(--color-border)] group-hover:bg-[var(--color-cta)] group-hover:border-[var(--color-cta)] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[var(--color-cta)] group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3
                    className="text-2xl font-black mb-3 text-[var(--color-heading)] tracking-tight"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-[var(--color-text)] leading-relaxed font-medium mb-6">
                    {product.description}
                  </p>

                  <div className="flex items-center text-sm font-bold text-[var(--color-cta)] uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full bg-[var(--color-cta)] transition-all duration-500" />
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
          <Link href="/products" className="px-8 py-4 rounded-full bg-[var(--color-heading)] text-white font-bold text-sm tracking-widest uppercase hover:bg-black transition-colors shadow-lg flex items-center gap-2">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
