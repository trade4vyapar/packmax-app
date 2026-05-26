"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CheckCircle2, MapPin, Package, ShieldCheck, Box } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteData } from "@/data/siteData";
import Link from "next/link";
import Image from "next/image";
import PremiumCTA from "@/components/PremiumCTA";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const slides = [
  {
    id: 1,
    headingLine1: "Your Packaging,",
    headingLine2: "Your Identity",
    tagline: "Precision-engineered B2B packaging solutions",
    description: "Elevate your brand presence with custom-printed tapes, rolls, and industrial-grade courier bags designed for modern businesses.",
    color: "#E86A12",
    icon: Package,
    image: "/images/packaging_solutions.png"
  },
  {
    id: 2,
    headingLine1: "Custom Brand Logo",
    headingLine2: "Packing Tapes",
    tagline: "Put your company logo on your shipping boxes",
    description: "Make your brand look premium. We print your company logo or name directly on high-quality adhesive tape with your exact brand colors and sizes.",
    color: "#121B5A",
    icon: ShieldCheck,
    image: "/images/custom_tape.png"
  },
  {
    id: 3,
    headingLine1: "Tear-Resistant",
    headingLine2: "Courier Bags",
    tagline: "Strong waterproof mailing bags for online stores",
    description: "Strong, tamper-proof courier bags exactly like Amazon and Flipkart use. Available in all standard sizes with strong glue peel-seals to keep packages safe.",
    color: "#E86A12",
    icon: Box,
    image: "/images/courier_bag.png"
  }
];

export default function HeroSection({ locationName }: { locationName?: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const pathname = usePathname() || "";
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocation = segments[0] || '';
  const isLocation = siteData.locations.some(l => l.slug === possibleLocation);
  const locationPrefix = isLocation ? `/${possibleLocation}` : '';

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black pt-32 pb-12 lg:pb-20">
      {/* Background Image Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].headingLine2}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-end h-full mt-auto">
        {/* Left Content over Image */}
        <div className="max-w-3xl flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`badge-${currentSlide}`}
            className="mb-6 inline-flex items-center gap-2 xs:gap-3 px-4 py-2 xs:px-5 xs:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] xs:text-[10px] sm:text-[11px] font-black text-white tracking-[0.1em] xs:tracking-[0.2em] uppercase whitespace-nowrap shadow-xl"
          >
            <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-[var(--color-cta)] animate-pulse" />
            {locationName ? `Serving ${locationName} • Factory in Indore` : "Est. December 2021 • Indore, MP"}
          </motion.div>

          <div className="w-full mb-10 flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-start text-white"
              >
                <h1
                  className="text-[2.5rem] xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-white drop-shadow-lg"
                >
                  {slides[currentSlide].headingLine1} <br />
                  <span className="text-[var(--color-cta)] drop-shadow-md">{currentSlide === 0 && locationName ? `Delivered in ${locationName}` : slides[currentSlide].headingLine2}</span>
                </h1>

                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                  {slides[currentSlide].tagline}
                </p>

                <p className="text-lg text-white/90 max-w-xl leading-relaxed font-medium mb-10 drop-shadow-sm">
                  {currentSlide === 0 && locationName ? `We supply top-quality packing tapes and courier bags directly to businesses in ${locationName} at cheap factory wholesale prices.` : slides[currentSlide].description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
                  <PremiumCTA 
                    href="/contact"
                    label="Get a Quote"
                    variant="primary"
                    icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                  />

                  <div
                    className="relative group/dropdown"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <PremiumCTA 
                      href="/products"
                      label="Our Products"
                      variant="secondary"
                      icon={<ChevronDown className="w-4 h-4 transition-transform group-hover/dropdown:rotate-180" />}
                    />

                    {/* Dropdown Menu */}
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
                          "BOPP Brown Tape"
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
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls & Trust Indicators Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 w-full pt-8 border-t border-white/20">
            {/* Controls */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <motion.button 
                  onClick={prevSlide} 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  onClick={nextSlide} 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase mb-1.5">
                  0{currentSlide + 1} / 03
                </span>
                <div className="h-1 w-24 bg-white/20 relative overflow-hidden rounded-full">
                  <motion.div
                    initial={false}
                    animate={{ x: `${currentSlide * 100}%` }}
                    className="absolute top-0 left-0 h-full w-1/3 bg-[var(--color-cta)] rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 lg:gap-8">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
