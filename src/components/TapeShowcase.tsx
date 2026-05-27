"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { siteData } from "@/data/siteData";
import PremiumCTA from "@/components/PremiumCTA";

const AUTO_ADVANCE_MS = 3000;

export default function TapeShowcase() {
  const featuredSlugs = [
    "custom-brand-printed-tape",
    "bopp-brown-tape-roll",
    "stretch-film-roll",
    "plain-courier-bags",
    "flipkart-tape",
    "bopp-color-tape-roll",
    "bopp-transparent-tape-roll",
    "corrugated-paper-roll",
    "air-bubble-wrap",
    "box-strapping-roll",
  ];
  const featuredProducts = featuredSlugs
    .map((slug) => siteData.products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof siteData.products;

  // Duplicate the list so the carousel can loop seamlessly forever.
  const loopedProducts = [...featuredProducts, ...featuredProducts];

  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Returns the pixel width of one card + the gap that follows it. We use this
  // as our "step" for advancing/rewinding and as the half-track length for
  // seamless wrap.
  const getStep = (el: HTMLElement): number => {
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return 0;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  // After any smooth scroll settles, if we've crossed into the duplicated
  // half of the track, snap the scroll position back to the equivalent card
  // in the original half — instant, so the user never sees the jump.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const step = getStep(el);
        if (!step) return;
        const halfWidth = step * featuredProducts.length;
        if (el.scrollLeft >= halfWidth) {
          el.scrollTo({ left: el.scrollLeft - halfWidth });
        }
      }, 250);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
    };
  }, [featuredProducts.length]);

  // Auto-advance one card every 3s.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const step = getStep(el);
      if (!step) return;
      el.scrollBy({ left: step, behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const manualScroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = getStep(el);
    if (!step) return;
    const halfWidth = step * featuredProducts.length;
    // If we'd scroll past the start, jump forward by one full set first so
    // the resulting smooth scroll back stays inside bounds — infinite rewind.
    if (dir === -1 && el.scrollLeft < step) {
      el.scrollTo({ left: el.scrollLeft + halfWidth });
      requestAnimationFrame(() => {
        el.scrollBy({ left: -step, behavior: "smooth" });
      });
      return;
    }
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-16 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12"
        >
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-2">
              Top Sellers from Our Manufacturing Hub
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none">
              Featured Products
            </h2>
          </div>
          <p className="text-xs font-bold text-[var(--color-heading)] opacity-50 max-w-sm">
            Our top-selling industrial packaging — manufactured in-house and distributed through our authorised supplier network to dealers and B2B buyers across India.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={() => manualScroll(-1)}
            aria-label="Previous featured product"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--color-border)] shadow-md text-[var(--color-heading)] hover:bg-[var(--color-cta)] hover:text-white hover:border-[var(--color-cta)] cursor-pointer transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => manualScroll(1)}
            aria-label="Next featured product"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--color-border)] shadow-md text-[var(--color-heading)] hover:bg-[var(--color-cta)] hover:text-white hover:border-[var(--color-cta)] cursor-pointer transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={trackRef}
            className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loopedProducts.map((prod, idx) => (
              <motion.div
                key={`${prod.id}-${idx}`}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="snap-start shrink-0 w-[270px] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)] group bg-white border border-[var(--color-border)] rounded-2.5xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[var(--color-bg)] border border-[var(--color-border)] relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[8px] font-black text-[var(--color-cta)] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Shield className="w-2.5 h-2.5" /> High Stick
                    </div>
                  </div>

                  <h3 className="text-sm font-black text-[var(--color-heading)] uppercase tracking-tight mb-1.5 leading-tight">
                    {prod.name}
                  </h3>

                  <p className="text-[10px] font-bold text-[var(--color-text)] opacity-60 leading-relaxed mb-4 line-clamp-2">
                    {prod.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    <span className="text-[8px] font-black uppercase bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-heading)] px-2 py-0.5 rounded-full">
                      {prod.specs.thickness}
                    </span>
                    <span className="text-[8px] font-black uppercase bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-heading)] px-2 py-0.5 rounded-full">
                      {prod.specs.material}
                    </span>
                  </div>
                </div>

                <PremiumCTA
                  href={`/indore/${prod.slug}`}
                  label="Inquire Specs"
                  variant="secondary"
                  icon={<ArrowRight className="w-3 h-3" />}
                  className="w-full py-3 h-10 text-[9px] rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
