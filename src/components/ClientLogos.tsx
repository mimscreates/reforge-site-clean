import { motion } from "framer-motion";
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
  return (
    <section className="relative py-14 md:py-24 bg-background overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(20 91% 55% / 0.04), transparent)",
        }}
      />

      <div className="relative container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
            Trusted by Creators, Brands & Companies
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Companies and creators trust KAUN to produce high-quality podcasts
            and media content.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group flex items-center justify-center rounded-[20px] border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto max-w-[120px] object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
