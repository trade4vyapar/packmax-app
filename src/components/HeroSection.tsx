"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ─── Slide data ─────────────────────────────────────────────────────────── */
const BASE_SLIDES = [
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/3.webp", label: "Custom Printed Tape", category: "custom-brand-logo-name-printed-tape" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/8.webp", label: "E-Commerce Tapes", category: "ecommerce-tapes" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/5.webp", label: "BOPP Brown Tape", category: "bopp-brown-tape" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/2.webp", label: "BOPP Transparent Tape", category: "bopp-transparent-tape" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/4.webp", label: "BOPP Colour Tape", category: "bopp-color-tape" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/7.webp", label: "Stretch Film Roll", category: "stretch-filmroll" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/6.webp", label: "Corrugated Box", category: "corrugated-box-plain-printed" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/9.webp", label: "Corrugated Roll", category: "corrugated-roll" },
  { src: "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HOME%20PAGE%20COURSEL%20IMAGES/1.webp", label: "Air Bubble Roll", category: "air-bubble-roll" },
];

/* Triple-clone for seamless infinite loop */
const SLIDES = [...BASE_SLIDES, ...BASE_SLIDES, ...BASE_SLIDES];
const N = BASE_SLIDES.length;
const INIT_IDX = N; // start in the middle set

const GAP_PX = 12;  // px gap between slides
const AUTO_MS = 4500;

/* px translateX for track so slide[idx] is centred */
function trackX(containerW: number, idx: number, peekPx: number) {
  const slideW = containerW - peekPx * 2;
  return peekPx - idx * (slideW + GAP_PX);
}

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface HeroSectionProps {
  locationName?: string;
  locationSlug?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function HeroSection({ locationName, locationSlug }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [idx, setIdx] = useState(INIT_IDX);
  const [animated, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [contW, setContW] = useState(0);

  /* Real 0-based index into BASE_SLIDES */
  const realIdx = ((idx - INIT_IDX) % N + N) % N;
  const slide = BASE_SLIDES[realIdx];
  const href = locationSlug
    ? `/${locationSlug}/${slide.category}`
    : `/${slide.category}`;

  /* ── Measure container → recalculate translate ── */
  const measure = useCallback(() => {
    if (containerRef.current) setContW(containerRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  /* ── Apply translate directly to track DOM node (avoids React re-render lag) ── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || contW === 0) return;
    const peekPx = contW < 768 ? 0 : contW < 1024 ? 80 : 150;
    const x = trackX(contW, idx, peekPx);
    el.style.transition = animated ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)" : "none";
    el.style.transform = `translateX(${x}px)`;
  }, [idx, contW, animated]);

  /* ── Infinite-loop snap: after transition ends, jump to middle clone ── */
  const onTransitionEnd = useCallback(() => {
    if (idx < N || idx >= N * 2) {
      const newIdx = INIT_IDX + realIdx;
      setAnim(false);
      setIdx(newIdx);
    }
  }, [idx, realIdx]);

  /* Re-enable animation one frame after instant snap */
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setAnim(true);
      setIdx(i => i + 1);
    }, AUTO_MS);
    return () => clearTimeout(id);
  }, [idx, paused]);

  /* ── Preload ── */
  useEffect(() => {
    BASE_SLIDES.forEach(s => { const i = new Image(); i.src = s.src; });
  }, []);

  /* ── Navigate ── */
  const go = (dir: 1 | -1) => { setAnim(true); setIdx(i => i + dir); };

  /* ── Slide dimensions for track ── */
  const peekPx = contW < 768 ? 0 : contW < 1024 ? 80 : 150;
  const slideW = contW > 0 ? contW - peekPx * 2 : undefined;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          PEEK CAROUSEL
          ═══════════════════════════════════════════════════════ */}
      <div
        className="w-full bg-white select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Clipping window */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{
            height: contW === 0
              ? "400px"
              : contW < 640
                ? "200px"
                : contW < 768
                  ? "300px"
                  : "min(550px, 65vh)"
          }}
        >
          {/* ── Track ── */}
          <div
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            className="absolute top-0 left-0 flex items-stretch h-full"
            style={{ gap: GAP_PX, willChange: "transform" }}
          >
            {SLIDES.map((s, i) => {
              const isActive = i === idx;
              const slideHref = locationSlug
                ? `/${locationSlug}/${s.category}`
                : `/${s.category}`;

              return (
                <div
                  key={i}
                  style={{ width: slideW ?? "80vw", flexShrink: 0 }}
                  className="relative overflow-hidden"
                >
                  {isActive ? (
                    <Link
                      href={slideHref}
                      aria-label={`View ${s.label}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={s.src}
                        alt={locationName ? `${s.label} — PackMax in ${locationName}` : `${s.label} — PackMax India`}
                        className="w-full h-full object-cover object-top"
                        loading={realIdx === 0 && i === INIT_IDX ? "eager" : "lazy"}
                      />
                    </Link>
                  ) : (
                    /* Inactive slides: click moves carousel to that slide */
                    <button
                      type="button"
                      onClick={() => { setAnim(true); setIdx(i); }}
                      className="block w-full h-full cursor-pointer border-none p-0 m-0 bg-transparent"
                      aria-label={`Go to ${s.label}`}
                    >
                      <img
                        src={s.src}
                        alt=""
                        aria-hidden
                        className="w-full h-full object-cover object-top opacity-50"
                        loading="lazy"
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Left arrow — overlaid on the left peek area ── */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20
                       flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11
                       bg-white/80 backdrop-blur-sm shadow-md
                       text-[var(--color-heading)]
                       hover:bg-[var(--color-cta)] hover:text-white
                       cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* ── Right arrow ── */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20
                       flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11
                       bg-white/80 backdrop-blur-sm shadow-md
                       text-[var(--color-heading)]
                       hover:bg-[var(--color-cta)] hover:text-white
                       cursor-pointer transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CONTROLS — fully OUTSIDE the image, centred below
            ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center gap-3 py-4">

          {/* CTA button */}
          <Link
            href={href}
            className="group inline-flex items-center gap-2
                       bg-[var(--color-cta)]
                       px-7 py-3 sm:px-9 sm:py-3.5
                       text-xs sm:text-sm font-bold uppercase tracking-widest
                       text-white
                       shadow-lg shadow-[var(--color-cta)]/30
                       hover:bg-[#0B122A] transition-colors"
          >
            Shop {slide.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {BASE_SLIDES.map((_, i) => {
              const isActive = i === realIdx;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setAnim(true); setIdx(INIT_IDX + i); }}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative h-2 overflow-hidden transition-all duration-500 cursor-pointer
                    ${isActive ? "w-8 bg-black/15" : "w-2 bg-black/20 hover:bg-black/35"}`}
                >
                  {isActive && !paused && (
                    <motion.span
                      key={`fill-${realIdx}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-[var(--color-cta)]"
                    />
                  )}
                  {isActive && paused && (
                    <span className="absolute inset-0 bg-[var(--color-cta)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MARQUEE STRIP ── */}
      <div className="w-full bg-[#121B5A] overflow-hidden py-3 border-y border-[#1a2470]">
        <div className="marquee-track flex items-center whitespace-nowrap">
          {["A", "B"].map((k) => (
            <span key={k} className="inline-flex items-center text-white text-xs sm:text-sm font-bold px-8">
              🚀 INDIA&apos;S LOWEST MOQ — Order as little as 1 Box. No minimum commitment. No bulk headaches. Just great packaging, delivered fast.&nbsp;&nbsp;|&nbsp;&nbsp;📦 DIRECT FROM MANUFACTURER — Skip the middleman. Get factory prices.&nbsp;&nbsp;|&nbsp;&nbsp;✅ PAN-INDIA DELIVERY available&nbsp;&nbsp;|&nbsp;&nbsp;🏭 UDYAM-REGISTERED &amp; GST-COMPLIANT manufacturer &amp; supplier&nbsp;&nbsp;|&nbsp;&nbsp;⚡ 48-72h FAST DISPATCH across India
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
