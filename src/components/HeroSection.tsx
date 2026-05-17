"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CheckCircle2, MapPin, Package, ShieldCheck, Box } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteData } from "@/data/siteData";
import Link from "next/link";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const slides = [
  {
    id: 1,
    headingLine1: "All Customized",
    headingLine2: "Packing Solutions",
    tagline: "Your Trusted Partner in Premium Packaging",
    description: "Based in Indore, we manufacture top-quality Brown Tape, Courier Bags, and Custom Logo Tapes. Serving B2B clients Pan India with samples before bulk production.",
    color: "#C05800",
    icon: Package
  },
  {
    id: 2,
    headingLine1: "Premium Printed",
    headingLine2: "Logo Tapes",
    tagline: "Turn packaging into a branding tool",
    description: "Every brand's packaging can be customized. We print your company logo directly onto high-quality tape with your exact brand colors and dimensions.",
    color: "#38240D",
    icon: ShieldCheck
  },
  {
    id: 3,
    headingLine1: "Durable & Secure",
    headingLine2: "Courier Bags",
    tagline: "Secure transit for e-commerce",
    description: "Amazon, Meesho, and Flipkart style tamper-proof courier bags. Tear-resistant and available in multiple sizes for safe shipping across all states.",
    color: "#C05800",
    icon: Box
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg)] pt-32 pb-20 px-8 lg:px-20">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(var(--color-heading) 1px, transparent 1px), linear-gradient(90deg, var(--color-heading) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[var(--color-border)] shadow-sm text-[11px] font-black text-[var(--color-cta)] tracking-[0.2em] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-cta)] animate-pulse" />
            {locationName ? `Serving ${locationName} • Factory in Indore` : "Est. December 2021 • Indore, MP"}
          </motion.div>

          <div className="relative min-h-[420px] sm:min-h-[380px] w-full mb-12 flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction < 0 ? 50 : -50, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-start"
              >
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-8 text-[var(--color-heading)] uppercase"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {slides[currentSlide].headingLine1} <br />
                  <span className="text-[var(--color-cta)]">{currentSlide === 0 && locationName ? `Supply in ${locationName}` : slides[currentSlide].headingLine2}</span>
                </h1>

                <p className="text-xl sm:text-2xl font-bold text-[var(--color-heading)] mb-6 tracking-tight">
                  {slides[currentSlide].tagline}
                </p>

                <p className="text-lg text-[var(--color-text)] max-w-xl leading-relaxed font-medium mb-10 opacity-80">
                  {currentSlide === 0 && locationName ? `Delivering premium packaging solutions directly to businesses and industrial zones across ${locationName} with guaranteed quality.` : slides[currentSlide].description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a href="/contact" className="group px-10 py-5 rounded-full bg-[var(--color-cta)] text-[#FDFBD4] font-black text-xs shadow-2xl shadow-[#C05800]/30 hover:bg-[var(--color-cta-hover)] hover:-translate-y-1 transition-all flex items-center gap-3 tracking-widest uppercase">
                    Get a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div
                    className="relative group/dropdown"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <a href="/products" className="px-10 py-5 rounded-full bg-white border-2 border-[var(--color-border)] text-[var(--color-heading)] font-black text-xs hover:shadow-xl hover:-translate-y-1 transition-all tracking-widest uppercase inline-flex items-center gap-2">
                      Our Products <ChevronDown className="w-4 h-4 group-hover/dropdown:rotate-180 transition-transform" />
                    </a>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50 overflow-hidden transform origin-top scale-95 group-hover/dropdown:scale-100">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 w-full pt-6 border-t border-[var(--color-border)]">
            {/* Controls */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <button onClick={prevSlide} className="w-11 h-11 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-white transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextSlide} className="w-11 h-11 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-heading)] hover:bg-[var(--color-heading)] hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[var(--color-heading)] tracking-[0.2em] uppercase mb-1">
                  0{currentSlide + 1} / 03
                </span>
                <div className="h-[2px] w-20 bg-[var(--color-border)] relative overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ x: `${currentSlide * 100}%` }}
                    className="absolute top-0 left-0 h-full w-1/3 bg-[var(--color-cta)]"
                  />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-cta)]" />
                <div>
                  <p className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-widest">Pan India</p>
                  <p className="text-[9px] font-bold opacity-50 uppercase tracking-tighter">Reliable Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-cta)]" />
                <div>
                  <p className="text-[10px] font-black text-[var(--color-heading)] uppercase tracking-widest">Indore Based</p>
                  <p className="text-[9px] font-bold opacity-50 uppercase tracking-tighter">Manufacturing Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Visual */}
        <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-80 h-80 lg:w-96 lg:h-96"
            >
              <div className="absolute inset-0 bg-white rounded-[4rem] shadow-2xl rotate-6 border border-[var(--color-border)]" />
              <div
                className="absolute inset-0 rounded-[4rem] flex flex-col items-center justify-center p-12 transition-colors duration-700"
                style={{ backgroundColor: slides[currentSlide].color + "08" }}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {(() => {
                    const Icon = slides[currentSlide].icon;
                    return <Icon className="w-28 h-28" style={{ color: slides[currentSlide].color }} strokeWidth={1} />;
                  })()}
                </motion.div>

                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 bg-white px-4 py-2 rounded-xl shadow-md border border-[var(--color-border)] text-[9px] font-black uppercase tracking-[0.1em] text-[var(--color-heading)]"
                >
                  Premium Quality
                </motion.div>
                <motion.div
                  animate={{ x: [0, -8, 0] }}
                  transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 left-6 bg-[var(--color-cta)] px-4 py-2 rounded-xl shadow-md text-[9px] font-black uppercase tracking-[0.1em] text-white"
                >
                  Custom Branding
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[var(--color-cta)]/5 rounded-full blur-[100px] -z-10" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-4">
        <span className="[writing-mode:vertical-lr] text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-heading)] opacity-30">Scroll Down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-4 h-4 text-[var(--color-cta)]" />
        </motion.div>
      </div>
    </section>
  );
}
