"use client";

import { motion } from "framer-motion";
import { Factory, Layers, ShieldAlert, Truck, ChevronRight } from "lucide-react";

export default function ProcessFlow() {
  const steps = [
    {
      num: "01",
      title: "Making & Printing",
      sub: "Your Brand Logo",
      desc: "We use high-quality raw materials to make tape and print your company logo clearly in our factory.",
      icon: Factory,
      color: "from-orange-500 to-amber-600"
    },
    {
      num: "02",
      title: "Glue & Cutting",
      sub: "Perfect Roll Sizes",
      desc: "We coat the tape with strong, long-lasting glue and cut the rolls into the exact width and length you need for your boxes.",
      icon: Layers,
      color: "from-orange-500 to-[#121B5A]"
    },
    {
      num: "03",
      title: "Safe Packaging",
      sub: "Waterproof & Tearproof",
      desc: "We pack your rolls in strong boxes and wrap them in waterproof stretch film to keep them safe from rain and damage during shipping.",
      icon: ShieldAlert,
      color: "from-[#121B5A] to-[#E86A12]"
    },
    {
      num: "04",
      title: "Fast Shipping",
      sub: "Direct To Your Door",
      desc: "We load your bulk order onto trucks and ship them directly to your warehouse, store, or office anywhere in India.",
      icon: Truck,
      color: "from-orange-900 to-[var(--color-cta)]"
    }
  ];

  // Animation variants
  const scaleReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const stagger = {
    visible: { 
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <section className="py-24 px-6 bg-white border-t border-[var(--color-border)] relative overflow-hidden">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#E86A12_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-cta)] block mb-3">How It Works</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--color-heading)] tracking-tighter uppercase leading-[0.95] mb-6">
            How We Make & Deliver <br />Your Order
          </h2>
          <p className="text-sm font-bold text-[var(--color-heading)] opacity-50 leading-relaxed">
            See how we manufacture your custom tapes and shipping bags, package them safely, and deliver them directly to your business.
          </p>
        </motion.div>

        {/* Desktop Interactive SVG Flow Line (Only shown on LG screens) */}
        <div className="relative hidden lg:block w-full h-12 mb-8">
          <svg className="absolute inset-0 w-full h-full" fill="none">
            <motion.path 
              d="M 120,24 C 300,24 500,24 1100,24" 
              stroke="#e5e7eb" 
              strokeWidth="4" 
              strokeDasharray="8 8"
            />
            <motion.path 
              d="M 120,24 C 300,24 500,24 1100,24" 
              stroke="var(--color-cta)" 
              strokeWidth="4" 
              strokeDasharray="8 8"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Step Nodes Grid with staggered entrance triggers */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div 
                key={step.num}
                variants={scaleReveal}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[2rem] p-6.5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Step bubble and number overlay */}
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-md relative`}>
                      <IconComponent className="w-6 h-6" />
                      
                      {/* Arrow indicator between steps in desktop */}
                      {index < 3 && (
                        <div className="hidden lg:flex absolute left-full top-1/2 -translate-y-1/2 ml-5 w-6 h-6 items-center justify-center text-gray-300 group-hover:text-[var(--color-cta)] transition-colors z-20">
                          <ChevronRight className="w-5 h-5 animate-pulse" />
                        </div>
                      )}
                    </div>
                    
                    <span className="text-2xl font-black text-gray-200 group-hover:text-[var(--color-cta)] transition-colors uppercase select-none">
                      {step.num}
                    </span>
                  </div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--color-cta)] block mb-1">
                    {step.sub}
                  </span>
                  
                  <h4 className="text-lg font-black text-[var(--color-heading)] uppercase tracking-tight mb-3">
                    {step.title}
                  </h4>
                  
                  <p className="text-[11px] font-bold text-[var(--color-text)] opacity-70 leading-relaxed">
                    {step.desc}
                  </p>

                </div>

                <div className="border-t border-[var(--color-border)] mt-6 pt-4 text-[8px] font-black uppercase text-[var(--color-heading)] opacity-30 group-hover:opacity-100 group-hover:text-[var(--color-cta)] transition-all tracking-wider">
                  Verified Engineering Step
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
