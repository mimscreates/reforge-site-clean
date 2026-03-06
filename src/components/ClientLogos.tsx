import logo1 from "@/assets/logos/logo-1.avif";
import logo2 from "@/assets/logos/logo-2.webp";
import logo3 from "@/assets/logos/logo-3.jpg";
import logo4 from "@/assets/logos/logo-4.png";
import logo5 from "@/assets/logos/logo-5.png";
import logo6 from "@/assets/logos/logo-6.png";
import logo7 from "@/assets/logos/logo-7.webp";

const logos = [
  { src: logo1, alt: "Client 1" },
  { src: logo2, alt: "Client 2" },
  { src: logo3, alt: "Expertise France" },
  { src: logo4, alt: "Arès International Group" },
  { src: logo5, alt: "Trésors Naturels" },
  { src: logo6, alt: "Didon Clinic" },
  { src: logo7, alt: "Client 7" },
];

const ClientLogos = () => {
  // Double the logos for seamless infinite scroll
  const allLogos = [...logos, ...logos];

  return (
    <section className="py-12 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-muted-foreground/60 text-xs md:text-sm uppercase tracking-[0.15em] font-medium">
          Trusted by creators, brands and companies
        </p>
      </div>

      {/* Carousel with edge fades */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
        />

        {/* Scrolling track */}
        <div className="flex items-center gap-12 md:gap-20 animate-logo-scroll hover:[animation-play-state:paused] w-max">
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center h-10 md:h-14 transition-all duration-300 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto max-w-[100px] md:max-w-[140px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
