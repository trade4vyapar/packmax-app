"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Packmax! I am interested in bulk packaging inquiries. Please connect me with a sales engineer."
);

// Social channels that pop out of the collapsible button. Facebook/Instagram
// URLs are placeholders until the official handles are provided.
const CHANNELS = [
  {
    label: "Facebook",
    Icon: FaFacebookF,
    href: "#",
    className: "bg-[#1877F2] hover:bg-[#0d65d9]",
  },
  {
    label: "Instagram",
    Icon: FaInstagram,
    href: "#",
    className:
      "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:brightness-110",
  },
  {
    label: "WhatsApp",
    Icon: FaWhatsapp,
    href: `https://wa.me/919893115645?text=${WHATSAPP_MESSAGE}`,
    className: "bg-[#25d366] hover:bg-[#1da851]",
  },
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Pop-out social channels */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col items-center gap-3"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
              hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
            }}
          >
            {CHANNELS.map(({ label, Icon, href, className }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                variants={{
                  hidden: { opacity: 0, scale: 0, y: 10 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-all ${className}`}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsible toggle */}
      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close social links" : "Open social links"}
        aria-expanded={open}
        className="bg-[var(--color-heading)] text-white p-4 rounded-full shadow-2xl transition-colors"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="block">
          <Plus className="w-8 h-8" />
        </motion.span>
      </motion.button>
    </div>
  );
}
