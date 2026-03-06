import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Building2, Handshake, ArrowRight } from "lucide-react";

const segments = [
  {
    id: "creators",
    icon: Mic,
    title: "Creators",
    description: "Start a podcast or build your personal brand with professional studio sessions.",
    link: "/creator-packs",
    cta: "Explore Creator Packs",
  },
  {
    id: "companies",
    icon: Building2,
    title: "Companies",
    description: "Create content that builds authority and attracts clients with recurring production.",
    link: "/corporate-packs",
    cta: "Explore Corporate Packs",
  },
  {
    id: "agencies",
    icon: Handshake,
    title: "Agencies",
    description: "Produce high-quality podcast and video content for your clients at scale.",
    link: "/corporate-packs#partnership",
    cta: "Become a Partner",
  },
];

const WhoWeWorkWith = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
            Who We Work With
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Whether you're a creator, a company, or an agency — we have the right solution for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                to={seg.link}
                className="group bg-card border border-border/50 rounded-2xl p-7 flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-8px_hsl(20_90%_55%_/_0.2)] block h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <seg.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {seg.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {seg.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium mt-auto group-hover:gap-2.5 transition-all">
                  {seg.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
