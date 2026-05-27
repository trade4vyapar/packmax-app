"use client";

import { motion } from "framer-motion";
import { Send, TestTube, Printer, Truck, CheckCircle2 } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      num: "01",
      icon: Send,
      title: "Send Your Requirement",
      desc: "Share your spec with our supplier team — tape size, thickness, courier bag dimensions and bulk order quantity for dealers, wholesalers or end-clients.",
      side: "left"
    },
    {
      num: "02",
      icon: TestTube,
      title: "Free Manufacturer Samples",
      desc: "As the direct manufacturer we ship free physical samples to your office, dealership or distribution hub for quality and adhesion testing.",
      side: "right"
    },
    {
      num: "03",
      icon: Printer,
      title: "Custom Manufacturing",
      desc: "On approval, the manufacturer line prints your logo, coats the BOPP and packs each carton ready for our supplier and wholesaler network.",
      side: "left"
    },
    {
      num: "04",
      icon: Truck,
      title: "Wholesaler Delivery",
      desc: "Bulk consignments are dispatched through our wholesaler network direct to your warehouse, retail outlet or sub-supplier across India.",
      side: "right"
    }
  ];

  // Animation variants
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const scaleCenter = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 14 }
    }
  };

  return (
    <section className="py-28 px-6 bg-white border-t border-[var(--color-border)] relative overflow-hidden pb-40">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-50 opacity-60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />
 
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-28"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block mb-3">Manufacturer-to-Wholesaler Workflow</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-none mb-6">
            How To Order From the Manufacturer
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
            Order custom packaging directly from the manufacturer — our wholesale supplier team and authorised wholesaler network handle the rest, in four simple steps.
          </p>
        </motion.div>

        {/* Alternate Roadmap Container */}
        <div className="relative mt-12">
          
          {/* Central Vertical SVG Roadmap Line (Only for desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] hidden lg:block bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-[var(--color-cta)] to-amber-600 h-1/2 absolute top-0"
              animate={{ 
                y: ["-100%", "200%"] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
            />
          </div>

          {/* Left Vertical SVG Roadmap Line (Only for Mobile) */}
          <div className="absolute left-6 top-0 bottom-0 w-[3px] block lg:hidden bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-[var(--color-cta)] to-amber-600 h-1/3 absolute top-0"
              animate={{ 
                y: ["-100%", "300%"] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5, 
                ease: "easeInOut" 
              }}
            />
          </div>

          {/* Staggered Alternating Road Grid */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = step.side === "left";

              return (
                <motion.div 
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-120px" }}
                  className="grid grid-cols-1 lg:grid-cols-9 items-center gap-4 lg:gap-0"
                >
                  
                   {/* Left Side Component (Desktop only) */}
                  <motion.div 
                    variants={slideInLeft}
                    className={`hidden lg:block lg:col-span-4 ${isLeft ? "lg:text-right lg:pr-12" : "lg:opacity-0 pointer-events-none"}`}
                  >
                    {isLeft && (
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase text-[var(--color-cta)] tracking-wider">Step {step.num}</span>
                        <h3 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-[var(--color-text)] opacity-60 leading-relaxed max-w-md lg:ml-auto">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Central Node Circle */}
                  <motion.div 
                    variants={scaleCenter}
                    className="lg:col-span-1 flex justify-start pl-12 lg:pl-0 lg:justify-center relative z-20"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-100 shadow-md flex items-center justify-center text-[var(--color-cta)] hover:border-[var(--color-cta)] hover:scale-110 transition-all duration-300 relative group cursor-default">
                      <Icon className="w-5 h-5" />
                      
                      {/* Tooltip number bubble */}
                      <span className="absolute -top-6 bg-[var(--color-heading)] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Step {step.num}
                      </span>
                    </div>
                  </motion.div>

                  {/* Right Side Component / Mobile Container */}
                  <motion.div 
                    variants={slideInRight}
                    className={`col-span-1 lg:col-span-4 pl-16 lg:pl-12 text-left ${isLeft ? "block lg:hidden" : "block"}`}
                  >
                    
                    {/* Render content on the right for desktop right-steps, or for all steps on mobile */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase text-[var(--color-cta)] tracking-wider">Step {step.num}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-[var(--color-heading)] uppercase tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-[var(--color-text)] opacity-60 leading-relaxed max-w-md">
                        {step.desc}
                      </p>
                    </div>

                  </motion.div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
