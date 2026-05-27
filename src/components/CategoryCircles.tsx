"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteData } from "@/data/siteData";

const MotionLink = motion.create(Link);

const DEFAULT_LOCATION = "indore";

// Each entry pairs a display label with an actual category slug + a
// representative product slug whose image we surface in the circle.
const CATEGORY_CIRCLES = [
  { label: "Ecommerce Tapes", categorySlug: "ecommerce-tapes", productSlug: "amazon-prime-tape" },
  { label: "Courier Polybags", categorySlug: "printed-plain-ecommerce-polybags", productSlug: "amazon-courier-bags" },
  { label: "Stretch Film", categorySlug: "stretch-filmroll", productSlug: "stretch-film-roll" },
  { label: "BOPP Color Tape", categorySlug: "bopp-color-tape", productSlug: "bopp-color-tape-roll" },
  { label: "Transparent Tape", categorySlug: "bopp-transparent-tape", productSlug: "bopp-transparent-tape-roll" },
  { label: "Box Strapping", categorySlug: "box-strapping-roll-clip", productSlug: "box-strapping-roll" },
  { label: "Corrugated Roll", categorySlug: "corrugated-roll", productSlug: "corrugated-paper-roll" },
  { label: "Custom Logo Tape", categorySlug: "custom-brand-logo-name-printed-tape", productSlug: "custom-brand-printed-tape" },
  { label: "Air Bubble Roll", categorySlug: "air-bubble-roll", productSlug: "air-bubble-wrap" },
  { label: "BOPP Brown Tape", categorySlug: "bopp-brown-tape", productSlug: "bopp-brown-tape-roll" },
];

interface CategoryItem {
  label: string;
  href: string;
  image: string;
}

function Circle({ item }: { item: CategoryItem }) {
  return (
    <MotionLink
      href={item.href}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group shrink-0 flex flex-col items-center text-center w-[140px] sm:w-[160px]"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-md border border-[var(--color-border)] overflow-hidden mb-3 transition-all duration-300 group-hover:shadow-xl group-hover:border-[var(--color-cta)] group-hover:scale-105">
        <img
          src={item.image}
          alt={item.label}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-[var(--color-cta)] transition-all duration-300" />
      </div>

      <span className="text-[12px] sm:text-[13px] font-bold text-[var(--color-heading)] group-hover:text-[var(--color-cta)] transition-colors leading-tight">
        {item.label}
      </span>
    </MotionLink>
  );
}

export default function CategoryCircles() {
  const items: CategoryItem[] = CATEGORY_CIRCLES.map((c) => {
    const product = siteData.products.find((p) => p.slug === c.productSlug);
    return {
      label: c.label,
      href: `/${DEFAULT_LOCATION}/${c.categorySlug}`,
      image:
        product?.image ??
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    };
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // ~3 cards per click on desktop, ~1.5 on mobile
    const step = Math.max(el.clientWidth * 0.6, 200);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[var(--color-bg)] via-white to-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-10 -left-20 w-80 h-80 bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-orange-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-6"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block mb-3">
            Explore Our Range
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Shop By Category
          </h2>
          <div className="w-20 h-1 bg-[var(--color-cta)] mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-12">
          {/* Prev button */}
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Previous categories"
            className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--color-border)] shadow-md transition-all ${
              canPrev
                ? "text-[var(--color-heading)] hover:bg-[var(--color-cta)] hover:text-white hover:border-[var(--color-cta)] cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Next categories"
            className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--color-border)] shadow-md transition-all ${
              canNext
                ? "text-[var(--color-heading)] hover:bg-[var(--color-cta)] hover:text-white hover:border-[var(--color-cta)] cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item) => (
              <div key={item.href} className="snap-start">
                <Circle item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
