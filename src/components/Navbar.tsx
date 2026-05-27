"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Menu, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteData } from "@/data/siteData";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const MotionLink = motion.create(Link);

const navLinks = [
  { label: "PRODUCTS", href: "/products" },
  { label: "ABOUT", href: "/about" },
  { label: "MARKET AREA", href: "/market-area" },
  { label: "CONTACT", href: "/contact" },
];

interface NavbarLinkProps {
  href: string;
  label: string;
  hasDropdown?: boolean;
  locationPrefix: string;
}

function NavbarLink({ href, label, hasDropdown, locationPrefix }: NavbarLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  // PRODUCTS opens the category dropdown only — it does NOT navigate.
  const Wrapper = (hasDropdown ? "div" : Link) as React.ElementType;
  const wrapperProps: Record<string, unknown> = hasDropdown
    ? { role: "button", "aria-haspopup": "menu" as const }
    : { href };

  return (
    <div
      className="relative group/navdrop"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Wrapper
        {...wrapperProps}
        className={`relative bg-white px-6 py-3.5 rounded-full text-[13px] font-bold text-[var(--color-heading)] shadow-sm hover:shadow-xl transition-all duration-300 uppercase tracking-wide flex items-center gap-2 overflow-hidden select-none ${hasDropdown ? 'cursor-default' : ''}`}
      >
        {/* Dynamic Liquid Bubble Backdrop */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-cta)] to-orange-500 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
        />

        {/* Dual Text Vertical Slide-Wipe */}
        <span className="relative z-10 h-4 overflow-hidden block">
          <motion.span
            animate={isHovered ? { y: "-50%" } : { y: "0%" }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="flex flex-col"
          >
            <span className="text-[var(--color-heading)] font-bold uppercase tracking-wide block h-4 flex items-center leading-none">
              {label}
            </span>
            <span className="text-white font-bold uppercase tracking-wide block h-4 flex items-center leading-none">
              {label}
            </span>
          </motion.span>
        </span>

        {hasDropdown && (
          <ChevronDown
            className={`w-4 h-4 relative z-10 transition-all duration-300 ${
              isHovered ? 'rotate-180 text-white' : 'text-[var(--color-heading)]'
            }`}
          />
        )}
      </Wrapper>

      {hasDropdown && (
        /* Dropdown Menu */
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] opacity-0 invisible group-hover/navdrop:opacity-100 group-hover/navdrop:visible transition-all duration-300 z-50 overflow-hidden transform origin-top scale-95 group-hover/navdrop:scale-100">
          <div className="py-2 max-h-[60vh] overflow-y-auto flex flex-col">
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SitemapBadge() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionLink
      href="/sitemap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      aria-label="Sitemap"
      className="flex items-center gap-2 bg-white border border-[var(--color-border)] px-4 py-3.5 rounded-full shadow-sm ml-4 cursor-pointer select-none relative overflow-hidden group"
    >
      {/* Background slide */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-heading)] to-black rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
      />

      <Map
        className={`w-4 h-4 relative z-10 transition-all duration-500 ${
          isHovered ? 'rotate-12 text-white' : 'text-[var(--color-cta)]'
        }`}
      />

      {/* Dual Text Vertical Slide-Wipe */}
      <span className="relative z-10 h-4 overflow-hidden block">
        <motion.span
          animate={isHovered ? { y: "-50%" } : { y: "0%" }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex flex-col"
        >
          <span className="text-[var(--color-heading)] font-bold tracking-wider block h-4 flex items-center leading-none text-[11px] uppercase">
            Sitemap
          </span>
          <span className="text-white font-bold tracking-wider block h-4 flex items-center leading-none text-[11px] uppercase">
            Sitemap
          </span>
        </motion.span>
      </span>
    </MotionLink>
  );
}

export default function Navbar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const pathname = usePathname() || "";
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocation = segments[0] || '';
  const isLocation = siteData.locations.some(l => l.slug === possibleLocation);
  const locationPrefix = isLocation ? `/${possibleLocation}` : '/indore';
  const isHomepage = pathname === "/";
  const isLocationPage = segments.length === 1 && isLocation;
  const hasHeroBanner = isHomepage || isLocationPage;

  return (
    <>
      <motion.header
        initial={hasHeroBanner ? { y: -100, opacity: 0 } : false}
        animate={hasHeroBanner ? { y: 0, opacity: 1 } : false}
        transition={hasHeroBanner ? { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 } : undefined}
        className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Logo */}
          <Link 
            href="/" 
            className="group relative px-5 py-2.5 bg-transparent rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto"
          >
            <h1
              className={`text-2xl sm:text-3xl font-black tracking-tight leading-none transition-colors duration-300 ${(!hasHeroBanner || isScrolled) ? 'text-[var(--color-heading)]' : 'text-white'}`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              PackMax<span className="text-[10px] sm:text-[12px] align-top font-bold text-[var(--color-cta)]">®</span>
            </h1>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center">
            <motion.div
              layout
              className="flex items-center bg-white rounded-full p-1.5 shadow-sm overflow-hidden"
              style={{ width: isSearchActive ? 320 : 52 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-[var(--color-heading)]"
              >
                <AnimatePresence mode="wait">
                  {isSearchActive ? (
                    <motion.div
                      key="close"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Search className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {isSearchActive && (
                  <motion.input
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    placeholder="What are you looking for?"
                    className="bg-transparent border-none outline-none px-3 text-sm font-medium text-[var(--color-text)] placeholder:text-gray-400 w-full"
                    onFocus={() => setIsSearchActive(true)}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setIsSearchActive(false);
                      }
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Right Nav (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
          {navLinks.map((link) => (
            <NavbarLink
              key={link.label}
              href={link.href}
              label={link.label}
              hasDropdown={link.label === "PRODUCTS"}
              locationPrefix={locationPrefix}
            />
          ))}

          {/* Sitemap Quick Link */}
          <SitemapBadge />
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-3 bg-white rounded-full shadow-sm pointer-events-auto text-[var(--color-heading)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-40 bg-white rounded-3xl p-6 shadow-2xl lg:hidden flex flex-col gap-4"
          >
            <div className="flex items-center bg-gray-50 rounded-full p-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm text-[var(--color-heading)]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent border-none outline-none px-4 text-sm font-medium text-[var(--color-text)] placeholder:text-gray-400 w-full"
              />
            </div>

            {navLinks.map((link) => {
              const isProducts = link.label === "PRODUCTS";
              return (
                <div key={link.label} className="flex flex-col gap-2">
                  {isProducts ? (
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="w-full px-4 py-3 flex items-center justify-between text-sm font-bold text-[var(--color-heading)] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all uppercase tracking-wide cursor-pointer border-none"
                    >
                      <span className="w-full text-center pl-4">{link.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-[var(--color-heading)] transition-transform duration-300 ${
                          mobileProductsOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-center text-sm font-bold text-[var(--color-heading)] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all uppercase tracking-wide"
                    >
                      {link.label}
                    </Link>
                  )}
                  {isProducts && mobileProductsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-1 px-2 max-h-48 overflow-y-auto"
                    >
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
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileProductsOpen(false);
                            }}
                            className="block px-4 py-2.5 text-center text-xs font-semibold text-[var(--color-text)] bg-gray-50/50 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {product}
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
