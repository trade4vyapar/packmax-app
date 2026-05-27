"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, CheckCircle2, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteData } from "@/data/siteData";
import Link from "next/link";
import PremiumCTA from "@/components/PremiumCTA";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const HERO_VIDEO_URL =
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/Hero%20Video%281%29%281%29.mp4";
const HERO_POSTER = "/images/packaging_solutions.png";

export default function HeroSection({ locationName }: { locationName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const pathname = usePathname() || "";
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocation = segments[0] || '';
  const isLocation = siteData.locations.some(l => l.slug === possibleLocation);
  const locationPrefix = isLocation ? `/${possibleLocation}` : '';

  // Ensure the video stays playing — some browsers pause it after tab switches.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const tryPlay = () => {
      el.play().catch(() => {
        // Autoplay may be blocked until user interaction; that's fine.
      });
    };
    tryPlay();
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const headingLine1 = "Your Packaging,";
  const headingLine2 = locationName ? `Delivered in ${locationName}` : "Your Identity";
  const tagline = "Trusted B2B packaging manufacturer, supplier & wholesaler";
  const description = locationName
    ? `Packmax is the trusted manufacturer, wholesale supplier and authorised wholesaler of packing tapes and courier bags in ${locationName} — direct-factory rates, B2B bulk supply and dependable delivery to dealers, retailers and e-commerce sellers.`
    : "Packmax is a direct-factory manufacturer, wholesale supplier and pan-India wholesaler of custom-printed tapes, rolls and industrial-grade courier bags for modern businesses, e-commerce sellers and warehouses.";

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black pt-32 pb-12 lg:pb-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.78)" }}
        />
        {/* Bottom gradient only — keeps text readable without darkening the left side */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-end h-full mt-auto">
        <div className="max-w-3xl flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 xs:gap-3 px-4 py-2 xs:px-5 xs:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] xs:text-[10px] sm:text-[11px] font-black text-white tracking-[0.1em] xs:tracking-[0.2em] uppercase whitespace-nowrap shadow-xl"
          >
            <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-[var(--color-cta)] animate-pulse" />
            {locationName ? `Serving ${locationName} • Factory in Indore` : "Est. December 2021 • Indore, MP"}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full mb-10 flex flex-col items-start text-white"
          >
            <h1 className="text-[2.5rem] xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-white drop-shadow-lg">
              {headingLine1} <br />
              <span className="text-[var(--color-cta)] drop-shadow-md">{headingLine2}</span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
              {tagline}
            </p>

            <p className="text-lg text-white/90 max-w-xl leading-relaxed font-medium mb-10 drop-shadow-sm">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
              <PremiumCTA
                href="/contact"
                label="Get a Quote"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              />

              <div className="relative group/dropdown">
                <PremiumCTA
                  label="Our Products"
                  variant="secondary"
                  icon={<ChevronDown className="w-4 h-4 transition-transform group-hover/dropdown:rotate-180" />}
                />

                <div className="absolute bottom-full left-0 mb-4 w-72 bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50 overflow-hidden transform origin-bottom scale-95 group-hover/dropdown:scale-100">
                  <div className="py-2 max-h-[50vh] overflow-y-auto flex flex-col">
                    {[
                      "Ecommerce Tapes",
                      "Printed & plain Ecommerce Polybags",
                      "Stretch filmroll",
                      "BOPP Color Tape",
                      "BOPP Transparent Tape",
                      "Box Strapping roll & clip",
                      "Corrugated Roll",
                      "Custom Brand Logo Name Printed tape",
                      "Air bubble roll",
                      "BOPP Brown Tape",
                    ].map((product, idx) => {
                      const slug = generateSlug(product);
                      return (
                        <Link
                          key={idx}
                          href={`${locationPrefix}/${slug}`}
                          className="px-5 py-3 text-[13px] font-bold text-[var(--color-heading)] hover:bg-[var(--color-bg)] hover:text-[var(--color-cta)] transition-colors border-b border-[var(--color-border)]/50 last:border-0"
                        >
                          {product}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-wrap gap-6 lg:gap-8 w-full pt-8 border-t border-white/20"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[var(--color-cta)]" />
              <div>
                <p className="text-[11px] font-black text-white uppercase tracking-widest drop-shadow-sm">Pan India</p>
                <p className="text-[9px] font-bold text-white/70 uppercase tracking-tighter">Reliable Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[var(--color-cta)]" />
              <div>
                <p className="text-[11px] font-black text-white uppercase tracking-widest drop-shadow-sm">Indore Based</p>
                <p className="text-[9px] font-bold text-white/70 uppercase tracking-tighter">Manufacturing Hub</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
