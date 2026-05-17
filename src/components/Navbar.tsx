"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";

const MotionLink = motion.create(Link);

const navLinks = [
  { label: "PRODUCTS", href: "/#products" },
  { label: "ABOUT", href: "/about" },
  { label: "MARKET AREA", href: "/market-area" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Logo */}
          <Link href="/" className="group relative">
            <h1
              className="text-3xl font-black tracking-tight text-[var(--color-heading)]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              PackMax<span className="text-[12px] align-top font-bold text-[var(--color-cta)]">®</span>
            </h1>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center">
            <motion.div
              layout
              className="flex items-center bg-white rounded-full p-1.5 shadow-sm overflow-hidden"
              style={{ width: isSearchActive ? 320 : 180 }}
            >
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-[var(--color-heading)]"
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

              <motion.input
                layout
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
            </motion.div>
          </div>
        </div>

        {/* Right Nav (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
          {navLinks.map((link) => {
            if (link.label === "PRODUCTS") {
              return (
                <div key={link.label} className="relative group/navdrop">
                  <MotionLink
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white px-6 py-3.5 rounded-full text-[13px] font-bold text-[var(--color-heading)] shadow-sm hover:shadow-md transition-shadow uppercase tracking-wide flex items-center gap-2"
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 group-hover/navdrop:rotate-180 transition-transform" />
                  </MotionLink>
                  
                  {/* Dropdown Menu */}
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
                      ].map((product, idx) => (
                        <Link 
                          key={idx} 
                          href="/products"
                          className="px-5 py-3 text-[13px] font-bold text-[var(--color-heading)] hover:bg-[var(--color-bg)] hover:text-[var(--color-cta)] transition-colors border-b border-[var(--color-border)]/50 last:border-0"
                        >
                          {product}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <MotionLink
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white px-6 py-3.5 rounded-full text-[13px] font-bold text-[var(--color-heading)] shadow-sm hover:shadow-md transition-shadow uppercase tracking-wide"
              >
                {link.label}
              </MotionLink>
            );
          })}

          {/* Language Selector */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-[13px] font-bold text-[var(--color-heading)] ml-4 uppercase tracking-wide"
          >
            EN <ChevronDown className="w-4 h-4" />
          </motion.button>
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

            {navLinks.map((link) => (
              <div key={link.label} className="flex flex-col gap-2">
                <Link
                  href={link.href}
                  onClick={() => link.label !== "PRODUCTS" && setMobileOpen(false)}
                  className="block px-4 py-3 text-center text-sm font-bold text-[var(--color-heading)] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all uppercase tracking-wide"
                >
                  {link.label}
                </Link>
                {link.label === "PRODUCTS" && (
                  <div className="flex flex-col gap-1 px-2 max-h-48 overflow-y-auto">
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
                    ].map((product, idx) => (
                      <Link 
                        key={idx} 
                        href="/products"
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-center text-xs font-semibold text-[var(--color-text)] bg-gray-50/50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {product}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
