"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_IMAGES = [
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2006_17_31%20PM.webp",
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2006_55_33%20PM.webp",
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2007_11_29%20PM.webp",
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2007_21_55%20PM.webp",
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2007_44_00%20PM.webp",
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2007_45_55%20PM.webp",
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2007_55_40%20PM.webp",
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2007_59_00%20PM.webp",
];

const AUTO_ADVANCE_MS = 4500;

interface HeroSectionProps {
  locationName?: string;
}

export default function HeroSection({ locationName }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every few seconds; resets the timer whenever index changes
  // (so manual dot clicks don't get instantly overridden).
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  // Preload all images so subsequent slides don't pop in.
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section
      className="relative w-full h-[58vh] sm:h-[70vh] lg:h-screen overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-md text-[var(--color-heading)] hover:bg-[var(--color-cta)] hover:text-white hover:border-[var(--color-cta)] cursor-pointer transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % HERO_IMAGES.length)}
        aria-label="Next slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-md text-[var(--color-heading)] hover:bg-[var(--color-cta)] hover:text-white hover:border-[var(--color-cta)] cursor-pointer transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={index}
          src={HERO_IMAGES[index]}
          alt={locationName ? `PackMax packaging in ${locationName}` : "PackMax packaging hero"}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-contain object-center lg:object-cover"
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      </AnimatePresence>

      {/* Slide indicators — animated progress on active dot doubles as a
          visual cue that the carousel is auto-advancing. Click any dot to
          jump straight to that slide. */}
      <div className="absolute bottom-3 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-md">
        {HERO_IMAGES.map((_, i) => {
          const isActive = i === index;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`relative h-2.5 rounded-full overflow-hidden transition-[width] duration-500 ease-out cursor-pointer ${
                isActive
                  ? "w-10 bg-black/15"
                  : "w-2.5 bg-black/25 hover:bg-black/40"
              }`}
            >
              {isActive && !paused && (
                <motion.span
                  key={`fill-${index}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-[var(--color-cta)] rounded-full"
                />
              )}
              {isActive && paused && (
                <span className="absolute inset-0 bg-[var(--color-cta)] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
