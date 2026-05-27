import Image from "next/image";
import { CheckCircle2, ShieldCheck, MapPin, Globe } from "lucide-react";

const services = [
  {
    title: "CUSTOM PRINTED TAPES",
    image: "/images/service_tapes.png",
  },
  {
    title: "SECURE POLYBAGS",
    image: "/images/service_polybags.png",
  },
  {
    title: "CORRUGATED BOXES",
    image: "/images/service_corrugated.png",
  },
  {
    title: "PROTECTIVE PACKAGING",
    image: "/images/service_protective.png",
  }
];

const features = [
  {
    icon: CheckCircle2,
    title: "PREMIUM",
    subtitle: "QUALITY",
  },
  {
    icon: ShieldCheck,
    title: "TAMPER",
    subtitle: "PROOF",
  },
  {
    icon: MapPin,
    title: "FACTORY",
    subtitle: "DIRECT",
  },
  {
    icon: Globe,
    title: "SHIPPING",
    subtitle: "GLOBALLY",
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white border-t border-[var(--color-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 gap-3">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-heading)] tracking-tight text-center">
            MANUFACTURER, <span className="text-[var(--color-cta)]">SUPPLIER</span> & WHOLESALER
          </h2>
          <p className="text-sm md:text-base font-bold text-[var(--color-heading)] opacity-60 text-center max-w-2xl">
            Packmax is your one-stop packaging manufacturer, wholesale supplier and authorised wholesaler — covering custom tapes, polybags, corrugated boxes and protective wraps for B2B clients across India.
          </p>
        </div>

        {/* Services Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20 relative">
          {/* Connector Line (visible on large screens) */}
          <div className="hidden lg:block absolute top-[60%] left-[10%] right-[10%] h-[2px] bg-[var(--color-border)] -z-10" />

          {services.map((service, idx) => (
            <div key={idx} className="flex flex-col items-center group bg-white z-10 px-2">
              {/* Title */}
              <div className="mb-8 text-center h-12 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-heading)] text-white flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-[var(--color-heading)] uppercase tracking-wider leading-tight">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? "block text-[var(--color-heading)] font-black text-lg mb-1" : ""}>{word} </span>
                  ))}
                </h3>
              </div>

              {/* Image Circle */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-2 bg-white border-2 border-[var(--color-border)] group-hover:border-[var(--color-cta)] transition-colors duration-300 shadow-xl group-hover:shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Inner ring */}
                  <div className="absolute inset-0 rounded-full border border-black/5 pointer-events-none" />
                </div>
                {/* Decorative dots */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-heading)] border-2 border-white shadow-sm transition-colors group-hover:bg-[var(--color-cta)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Badges */}
        <div className="bg-[var(--color-bg)] rounded-3xl p-6 md:p-8 flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4 shadow-sm border border-[var(--color-border)]">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex items-center gap-4 flex-1 min-w-[200px] justify-center lg:border-r lg:last:border-r-0 lg:border-[var(--color-border)]">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md border border-[var(--color-border)] text-[var(--color-heading)]">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-black text-[var(--color-heading)] leading-none mb-1">{feature.title}</span>
                  <span className="text-sm md:text-base font-bold text-[var(--color-heading)] opacity-70 leading-none">{feature.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
