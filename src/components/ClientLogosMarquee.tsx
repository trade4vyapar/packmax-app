"use client";

const LOGO_BASE =
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/Client%20Customers%20LOGOS";

const CLIENT_LOGOS: { src: string; alt: string }[] = [
  { src: `${LOGO_BASE}/1638378570784.jpg`, alt: "Happy client" },
  { src: `${LOGO_BASE}/1676980096275.jpg`, alt: "Happy client" },
  { src: `${LOGO_BASE}/5de4a4a3a2f4640001598756.jpg`, alt: "Happy client" },
  { src: `${LOGO_BASE}/71BQ60POFvL._AC_UF350%2C350_QL80_.jpg`, alt: "Happy client" },
  { src: `${LOGO_BASE}/Cartref-Logo.png`, alt: "Cartref" },
  { src: `${LOGO_BASE}/GG%20Automotive%20Gears%20Limited%204.jpg`, alt: "GG Automotive Gears Limited" },
];

export default function ClientLogosMarquee() {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-12 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-cta)] block mb-1.5">
          Trusted By
        </span>
        <h2 className="text-lg sm:text-xl font-black text-[var(--color-heading)] uppercase tracking-tight leading-tight">
          Our Happy Customers
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track gap-10 sm:gap-14 items-center">
          {loop.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="shrink-0 flex items-center justify-center h-16 sm:h-20 w-28 sm:w-36 rounded-xl bg-white border border-[var(--color-border)] px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
