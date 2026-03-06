import { motion } from "framer-motion";
import { Mic, Building2 } from "lucide-react";

const cards = [
  {
    id: "creator",
    icon: Mic,
    title: "I am a Creator",
    description: "I want to record a professional podcast session.",
    target: "creator-packs",
  },
  {
    id: "company",
    icon: Building2,
    title: "I am a Company",
    description: "I want recurring podcast production for my brand.",
    target: "corporate-packs",
  },
];

const AudienceSelector = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-3">
          Who are you?
        </h2>
        <p className="text-muted-foreground text-center mb-10 text-sm md:text-base">
          Choose your profile to see the right offers for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, borderColor: "hsl(20 90% 55%)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo(card.target)}
              className="bg-card border border-border/50 rounded-xl p-7 flex flex-col items-center text-center gap-3 cursor-pointer transition-shadow hover:shadow-[0_0_25px_-5px_hsl(20_90%_55%_/_0.25)]"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm">{card.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSelector;
