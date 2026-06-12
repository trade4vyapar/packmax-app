"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Menu, Map, BookOpen, ShoppingCart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteData } from "@/data/siteData";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const CATEGORIES = [
  "Custom Brand Logo Name Printed tape",
  "Ecommerce Tapes",
  "BOPP Brown Tape",
  "BOPP Transparent Tape",
  "BOPP Color Tape",
  "Stretch filmroll",
  "Corrugated Box Plain Printed",
  "Corrugated Roll",
  "Air bubble roll",
  "Box Strapping roll & clip",
];

// Corrugated Box category slug maps to corrugated-box-plain-printed
const CATEGORY_SLUG_OVERRIDES: Record<string, string> = {
  "Corrugated Box Plain Printed": "corrugated-box-plain-printed",
};

interface SearchResult {
  type: "Category" | "Product";
  name: string;
  href: string;
}

// Search across categories and products. Matches are scoped to the current
// location prefix so a result keeps the visitor inside their city's catalog.
function getSearchResults(query: string, locationPrefix: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  CATEGORIES.forEach((category) => {
    if (category.toLowerCase().includes(q)) {
      results.push({
        type: "Category",
        name: category,
        href: `${locationPrefix}/${generateSlug(category)}`,
      });
    }
  });

  siteData.products.forEach((product) => {
    const haystack = `${product.name} ${product.tagline} ${product.categorySlug}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        type: "Product",
        name: product.name,
        href: `${locationPrefix}/${product.slug}`,
      });
    }
  });

  return results.slice(0, 8);
}

const MotionLink = motion.create(Link);

const navLinks = [
  { label: "PRODUCTS", href: "/products" },
  { label: "ABOUT", href: "/about" },
  { label: "MARKET AREA", href: "/market-area" },
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
        className={`relative bg-white/60 backdrop-blur-md border border-white/70 px-5 py-2.5 rounded-full text-[12px] font-bold text-[var(--color-heading)] shadow-[0_4px_16px_rgba(18,27,90,0.08)] hover:shadow-[0_8px_24px_rgba(232,106,18,0.25)] transition-all duration-300 uppercase tracking-wide flex items-center gap-2 overflow-hidden select-none ${hasDropdown ? 'cursor-default' : ''}`}
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
          <div className="py-2 max-h-[520px] overflow-y-auto flex flex-col">
            {CATEGORIES.map((product, idx) => {
              const slug = CATEGORY_SLUG_OVERRIDES[product] || generateSlug(product);
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

function ShopNowButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group/shopnow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`relative bg-[var(--color-cta)] backdrop-blur-md border border-orange-400 px-5 py-2.5 rounded-full text-[12px] font-bold text-white shadow-[0_4px_16px_rgba(232,106,18,0.3)] hover:shadow-[0_8px_24px_rgba(232,106,18,0.5)] transition-all duration-300 uppercase tracking-wide flex items-center gap-2 overflow-hidden select-none cursor-default`}
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        <span>Shop Now</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] opacity-0 invisible group-hover/shopnow:opacity-100 group-hover/shopnow:visible transition-all duration-300 z-50 overflow-hidden transform origin-top scale-95 group-hover/shopnow:scale-100">
        <div className="py-2 flex flex-col">
          <a
            href="https://packmaxindia.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 text-[13px] font-bold text-[var(--color-heading)] hover:bg-orange-50 hover:text-[var(--color-cta)] transition-colors border-b border-[var(--color-border)]/50 flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-3.5 h-3.5 text-[var(--color-cta)]" />
            </span>
            Shop on Packmax India
          </a>
          <a
            href="https://www.amazon.in/stores/PackMax/page/64AE5477-D847-401D-9AE8-F4CE4E32B047?lp_asin=B0C436YYBQ&ref_=cm_sw_r_ud_ast_store_3G6XMYWCV7YZGNNJ0WNR"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 text-[13px] font-bold text-[var(--color-heading)] hover:bg-orange-50 hover:text-[var(--color-cta)] transition-colors flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-3.5 h-3.5 text-[var(--color-cta)]" />
            </span>
            Shop on Amazon
          </a>
        </div>
      </div>
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
      className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/70 px-4 py-2.5 rounded-full shadow-[0_4px_16px_rgba(18,27,90,0.08)] cursor-pointer select-none relative overflow-hidden group"
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

interface SearchBoxProps {
  variant: "desktop" | "mobile";
  locationPrefix: string;
  onNavigate?: () => void;
}

function SearchBox({ variant, locationPrefix, onNavigate }: SearchBoxProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(variant === "mobile");
  const [query, setQuery] = useState("");

  const results = getSearchResults(query, locationPrefix);
  const showResults = active && query.trim().length > 0;

  const go = (href: string) => {
    setQuery("");
    if (variant === "desktop") setActive(false);
    onNavigate?.();
    router.push(href);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) go(results[0].href);
  };

  // Desktop: focus the input as soon as the bar expands.
  useEffect(() => {
    if (variant === "desktop" && active) inputRef.current?.focus();
  }, [active, variant]);

  const resultsDropdown = showResults ? (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden z-50">
      {results.length > 0 ? (
        <div className="max-h-80 overflow-y-auto py-1">
          {results.map((r) => (
            <button
              key={`${r.type}-${r.href}`}
              type="button"
              // onMouseDown fires before the input's onBlur, so the click is
              // never swallowed by the bar collapsing.
              onMouseDown={(e) => {
                e.preventDefault();
                go(r.href);
              }}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-[var(--color-bg)] transition-colors"
            >
              <span className="text-[13px] font-bold text-[var(--color-heading)] truncate">
                {r.name}
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider text-[var(--color-cta)] shrink-0">
                {r.type}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4 py-3 text-[13px] font-semibold text-gray-400">
          No matches for &ldquo;{query.trim()}&rdquo;
        </div>
      )}
    </div>
  ) : null;

  if (variant === "mobile") {
    return (
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="flex items-center bg-gray-50 rounded-full p-2">
          <button
            type="submit"
            aria-label="Search"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm text-[var(--color-heading)] shrink-0"
          >
            <Search className="w-5 h-5" />
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent border-none outline-none px-4 text-sm font-medium text-[var(--color-text)] placeholder:text-gray-400 w-full"
          />
        </div>
        {resultsDropdown}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <motion.div
        layout
        className="flex items-center bg-white/60 backdrop-blur-md border border-white/70 rounded-full p-1 shadow-[0_4px_16px_rgba(18,27,90,0.08)] overflow-hidden"
        style={{ width: active ? 320 : 42 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button
          type="button"
          onClick={() =>
            setActive((a) => {
              if (a) setQuery("");
              return !a;
            })
          }
          aria-label={active ? "Close search" : "Open search"}
          className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center hover:bg-white/70 transition-colors text-[var(--color-heading)]"
        >
          <AnimatePresence mode="wait">
            {active ? (
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
          {active && (
            <motion.input
              ref={inputRef}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="bg-transparent border-none outline-none px-3 text-sm font-medium text-[var(--color-text)] placeholder:text-gray-400 w-full"
              onBlur={(e) => {
                // Collapse only when empty; result clicks use onMouseDown so
                // they fire before this blur.
                if (e.target.value === "") setActive(false);
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      {resultsDropdown}
    </form>
  );
}

export default function Navbar() {
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
  const locationPrefix = isLocation ? `/${possibleLocation}` : '/india';
  const isHomepage = pathname === "/";
  const isLocationPage = segments.length === 1 && isLocation;
  const hasHeroBanner = isHomepage || isLocationPage;

  return (
    <>
      <motion.header
        initial={hasHeroBanner ? { y: -100, opacity: 0 } : false}
        animate={hasHeroBanner ? { y: 0, opacity: 1 } : false}
        transition={hasHeroBanner ? { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 } : undefined}
        className={`sticky top-0 left-0 right-0 z-50 h-14 lg:h-16 px-3 sm:px-5 flex items-center justify-between gap-4 transition-colors duration-500 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(18,27,90,0.06)]' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-4 h-full">
          {/* Logo — oversized, allowed to bleed past the navbar's visual height */}
          <Link
            href="/"
            className="group relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/packmax-logo.webp"
              alt="PackMax"
              className="h-11 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
            />
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center">
            <SearchBox variant="desktop" locationPrefix={locationPrefix} />
          </div>
        </div>

        {/* Right Nav (Desktop) — glass pill wraps only the buttons */}
        <div
          className="hidden lg:flex items-center gap-2 rounded-full px-2 py-1.5 bg-white/35 backdrop-blur-xl border border-white/60 ring-1 ring-black/5 shadow-[0_8px_32px_rgba(18,27,90,0.12)]"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)',
          }}
        >
          {navLinks.map((link) => (
            <NavbarLink
              key={link.label}
              href={link.href}
              label={link.label}
              hasDropdown={link.label === "PRODUCTS"}
              locationPrefix={locationPrefix}
            />
          ))}

          {/* Shop Now Dropdown */}
          <ShopNowButton />

          {/* Catalogue Button */}
          <a
            href="/catalogue.pdf"
            target="_blank"
            download
            className="relative bg-white/60 backdrop-blur-md border border-white/70 px-5 py-2.5 rounded-full text-[12px] font-bold text-[var(--color-heading)] shadow-[0_4px_16px_rgba(18,27,90,0.08)] hover:shadow-[0_8px_24px_rgba(232,106,18,0.25)] transition-all duration-300 uppercase tracking-wide flex items-center gap-2 overflow-hidden select-none hover:bg-[var(--color-cta)] hover:text-white"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Catalogue
          </a>



          {/* Sitemap Quick Link */}
          <SitemapBadge />
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2.5 bg-white/60 backdrop-blur-md border border-white/70 rounded-full shadow-[0_4px_16px_rgba(18,27,90,0.08)] text-[var(--color-heading)]"
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
            className="fixed inset-x-4 top-16 z-40 bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 shadow-[0_20px_60px_rgba(18,27,90,0.25)] lg:hidden flex flex-col gap-4"
          >
            <SearchBox
              variant="mobile"
              locationPrefix={locationPrefix}
              onNavigate={() => setMobileOpen(false)}
            />

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
                      {CATEGORIES.map((product, idx) => {
                        const slug = CATEGORY_SLUG_OVERRIDES[product] || generateSlug(product);
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

            {/* Mobile Shop Now */}
            <div className="flex flex-col gap-2">
              <a
                href="https://packmaxindia.shop/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[var(--color-cta)] rounded-xl transition-all uppercase tracking-wide"
              >
                <ShoppingCart className="w-4 h-4" /> Shop on Packmax India
              </a>
              <a
                href="https://www.amazon.in/stores/PackMax/page/64AE5477-D847-401D-9AE8-F4CE4E32B047?lp_asin=B0C436YYBQ&ref_=cm_sw_r_ud_ast_store_3G6XMYWCV7YZGNNJ0WNR"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[var(--color-heading)] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all uppercase tracking-wide"
              >
                <ShoppingCart className="w-4 h-4 text-[var(--color-cta)]" /> Shop on Amazon
              </a>
            </div>

            {/* Mobile Catalogue */}
            <a
              href="/catalogue.pdf"
              target="_blank"
              download
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[var(--color-heading)] bg-gray-50 hover:bg-gray-100 border border-[var(--color-border)] rounded-xl transition-all uppercase tracking-wide"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-cta)]" /> Catalogue
            </a>

            {/* Mobile WhatsApp */}
            <a
              href="https://wa.me/919893973939"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#25D366] rounded-xl transition-all uppercase tracking-wide"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>

            <Link
              href="/sitemap"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[var(--color-heading)] bg-[var(--color-bg)] hover:bg-gray-100 border border-[var(--color-border)] rounded-xl transition-all uppercase tracking-wide"
            >
              <Map className="w-4 h-4 text-[var(--color-cta)]" />
              Sitemap
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
