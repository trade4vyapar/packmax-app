"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PremiumCTAProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  label: string;
  variant?: "primary" | "secondary" | "dark" | "outline" | "white-outline";
  icon?: ReactNode;
  className?: string;
  wFull?: boolean;
}

export default function PremiumCTA({
  href,
  onClick,
  type = "button",
  label,
  variant = "primary",
  icon,
  className = "",
  wFull = false,
}: PremiumCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Setup variant styling parameters
  let defaultBg = "bg-[#121B5A]";
  let defaultTextColor = "text-white";
  let hoverTextColor = "text-white";
  let borderStyle = "border-none";
  let gradientClasses = "from-[#1a2870] to-[#0d1340]";
  let shadowStyle = "shadow-lg shadow-[#121B5A]/30";
  let hoverShadow = "rgba(18, 27, 90, 0.45)";

  if (variant === "secondary") {
    defaultBg = "bg-white";
    defaultTextColor = "text-[#121B5A]";
    borderStyle = "border border-[var(--color-border)]";
    gradientClasses = "from-[#121B5A] to-[#1a2870]";
    shadowStyle = "shadow-sm";
    hoverShadow = "rgba(18, 27, 90, 0.2)";
  } else if (variant === "dark") {
    defaultBg = "bg-white";
    defaultTextColor = "text-[var(--color-heading)]";
    borderStyle = "border border-[var(--color-border)]";
    gradientClasses = "from-gray-900 to-black";
    shadowStyle = "shadow-sm";
    hoverShadow = "rgba(0, 0, 0, 0.25)";
  } else if (variant === "outline") {
    defaultBg = "bg-transparent";
    defaultTextColor = "text-[var(--color-heading)]";
    borderStyle = "border border-[var(--color-border)]";
    gradientClasses = "from-[var(--color-heading)] to-black";
    shadowStyle = "shadow-none";
    hoverShadow = "rgba(0, 0, 0, 0.15)";
  } else if (variant === "white-outline") {
    defaultBg = "bg-white/10";
    defaultTextColor = "text-white";
    borderStyle = "border border-white/25";
    gradientClasses = "from-white/20 to-white/25";
    shadowStyle = "shadow-none";
    hoverShadow = "rgba(255, 255, 255, 0.1)";
  }

  // Inner button contents with our premium vertical Dual-Text Slide-Wipe
  const renderInner = () => (
    <>
      {/* Dynamic Liquid Bubble Backdrop */}
      <motion.span
        className={`absolute inset-0 bg-gradient-to-r ${gradientClasses} rounded-full`}
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
      />

      {/* Dual Text Vertical Slide-Wipe Container */}
      <span className="relative z-10 h-4 overflow-hidden block whitespace-nowrap">
        <motion.span
          animate={isHovered ? { y: "-50%" } : { y: "0%" }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex flex-col"
        >
          <span className={`${defaultTextColor} font-black uppercase tracking-widest block h-4 flex items-center leading-none text-[10px] sm:text-xs whitespace-nowrap`}>
            {label}
          </span>
          <span className={`${hoverTextColor} font-black uppercase tracking-widest block h-4 flex items-center leading-none text-[10px] sm:text-xs whitespace-nowrap`}>
            {label}
          </span>
        </motion.span>
      </span>

      {icon && (
        <span className={`relative z-10 transition-transform duration-300 ${isHovered ? "translate-x-1.5 text-white" : ""}`}>
          {icon}
        </span>
      )}
    </>
  );

  const containerClasses = `relative ${wFull ? "w-full" : "inline-flex"} ${defaultBg} ${borderStyle} ${shadowStyle} px-4.5 py-3 sm:px-8 sm:py-4.5 rounded-full flex items-center justify-center gap-2 sm:gap-3 overflow-hidden select-none cursor-pointer transition-all duration-300 ${className}`;

  const hoverAnimation = {
    boxShadow: `0 15px 25px -8px ${hoverShadow}`,
  };

  const tapAnimation = { scale: 0.98 };

  const transitionSettings = { type: "spring" as const, stiffness: 450, damping: 18 };

  if (href) {
    return (
      <motion.div
        className={containerClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={transitionSettings}
      >
        <Link href={href} className="absolute inset-0 z-20" />
        {renderInner()}
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={containerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={transitionSettings}
    >
      {renderInner()}
    </motion.button>
  );
}
