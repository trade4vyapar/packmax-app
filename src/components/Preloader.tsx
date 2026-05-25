"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Box, Package, ShieldCheck, Truck } from "lucide-react";

const iconSequence = [Package, Box, ShieldCheck, Truck];

export default function Preloader() {
  const pathname = usePathname();
  const [index, setIndex] = useState(0);
  const [showPreloader, setShowPreloader] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. Only on home page
    if (pathname !== "/") return;
    
    // 2. Only once per session
    const hasSeen = sessionStorage.getItem("packmax_preloader_seen");
    if (hasSeen) return;

    setShowPreloader(true);
    document.body.style.overflow = "hidden";

    // 3. Cycle through icons every 500ms
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === iconSequence.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    const timer = setTimeout(() => {
      setShowPreloader(false);
      setIsFinished(true);
      document.body.style.overflow = "auto";
      sessionStorage.setItem("packmax_preloader_seen", "true");
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [pathname]);

  // Handle case where we aren't on home or already finished
  if (isFinished || (!showPreloader && pathname !== "/")) return null;

  const CurrentIcon = iconSequence[index];

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          key="preloader"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ 
            clipPath: "inset(100% 0 0 0)",
            transition: { duration: 1.1, ease: [0.83, 0, 0.17, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-heading)]"
        >
          <div className="flex flex-col items-center">
            {/* Animated Icon Sequence */}
            <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute"
                >
                  <CurrentIcon className="w-20 h-20 text-[var(--color-cta)]" strokeWidth={1} />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Minimal Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center"
            >
              <h1 
                className="text-4xl md:text-6xl font-black text-[#F7F5F4] tracking-tighter uppercase"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Packmax India<span className="text-[var(--color-cta)]">.</span>
              </h1>
              
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                className="h-[1px] bg-[var(--color-cta)] w-full mt-4 origin-left opacity-50"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2 }}
                className="mt-6 text-[10px] font-black text-[#F7F5F4] uppercase tracking-[0.6em]"
              >
                Premium Packaging Solutions
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
