"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingChat() {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-[var(--color-cta)] text-white p-4 rounded-full shadow-2xl hover:bg-[var(--color-cta-hover)] transition-colors"
      onClick={() => alert("Chat functionality coming soon!")}
    >
      <MessageCircle className="w-8 h-8" />
    </motion.button>
  );
}
