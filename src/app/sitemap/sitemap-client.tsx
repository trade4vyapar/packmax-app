"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, FileText, Layers, Package, MapPin } from "lucide-react";
import { siteData } from "@/data/siteData";
import { CATEGORIES } from "@/components/EcommerceCategory";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Default location used to root products + categories under a real route.
// The site routes products at /[location]/[product] and categories at /[location]/[category-slug].
const DEFAULT_LOCATION = "india";

const PAGES: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Market Area", href: "/market-area" },
  { label: "Shipping & Returns Policy", href: "/shipping" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  accent: string;
  items: { label: string; href: string }[];
}

function Section({ title, icon, accent, items }: SectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white shadow-sm"
          style={{ backgroundColor: accent }}
        >
          {icon}
        </span>
        <h2
          className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
          style={{ color: accent, fontFamily: "Space Grotesk, sans-serif" }}
        >
          {title}
        </h2>
        <span className="ml-2 text-sm font-semibold text-gray-400">
          ({items.length})
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={`${item.href}-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: Math.min(idx * 0.01, 0.2) }}
          >
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-2 bg-white border border-[var(--color-border)] hover:border-[var(--color-heading)] hover:bg-[var(--color-heading)] px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-[13px] sm:text-sm font-bold text-[var(--color-heading)] group-hover:text-white tracking-tight truncate">
                {item.label}
              </span>
              <ChevronRight className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-[var(--color-cta)] transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function SitemapClient() {
  const categories = CATEGORIES.map((name) => ({
    label: name,
    href: `/${DEFAULT_LOCATION}/${slugify(name)}`,
  }));

  const products = siteData.products
    .map((p) => ({
      label: p.name,
      href: `/${DEFAULT_LOCATION}/${p.slug}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const locations = siteData.locations.map((l) => ({
    label: `${l.name}, ${l.state}`,
    href: `/${l.slug}`,
  }));

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-6 lg:pt-10 pb-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--color-cta)]/10 text-[var(--color-cta)] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Site Directory
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-heading)] tracking-tight mb-3"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Sitemap
          </h1>
          <div className="w-24 h-1 bg-[var(--color-cta)] mx-auto rounded-full mb-4" />
          <p className="text-base sm:text-lg text-[var(--color-text)]/70 max-w-2xl mx-auto">
            Every page, product category, individual product, and city we serve —
            click any item below to navigate directly.
          </p>
        </motion.div>

        <Section
          title="Pages"
          icon={<FileText className="w-5 h-5" />}
          accent="#E86A12"
          items={PAGES}
        />

        <Section
          title="Categories"
          icon={<Layers className="w-5 h-5" />}
          accent="#121B5A"
          items={categories}
        />

        <Section
          title="Products"
          icon={<Package className="w-5 h-5" />}
          accent="#E86A12"
          items={products}
        />

        <Section
          title="Cities We Serve"
          icon={<MapPin className="w-5 h-5" />}
          accent="#121B5A"
          items={locations}
        />
      </div>
    </main>
  );
}
