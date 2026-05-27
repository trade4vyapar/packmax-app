const HERO_IMAGE_URL =
  "https://oqwg1j9jjcgxcmdg.public.blob.vercel-storage.com/HERO%20COUROSEL/ChatGPT%20Image%20May%2027%2C%202026%2C%2006_17_31%20PM.webp";

interface HeroSectionProps {
  locationName?: string;
}

export default function HeroSection({ locationName }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      <img
        src={HERO_IMAGE_URL}
        alt={locationName ? `PackMax packaging in ${locationName}` : "PackMax packaging hero"}
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
      />
    </section>
  );
}
