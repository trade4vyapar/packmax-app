"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Packmax! I am interested in bulk packaging inquiries. Please connect me with a sales engineer."
);

export default function FloatingChat() {
  return (
    <a
      href={`https://wa.me/919893115645?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
    >
      {/* Ripple 1 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      {/* Ripple 2 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.75,
        }}
      />
      
      <FaWhatsapp className="w-8 h-8 relative z-10" />
    </a>
  );
}

