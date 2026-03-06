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
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
          Who are you?
        </h2>
        <p className="text-muted-foreground text-center mb-12 text-lg">
          Choose your profile to see the right offers for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.03, borderColor: "hsl(20 90% 55%)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo(card.target)}
              className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center text-center gap-4 cursor-pointer transition-shadow hover:shadow-[0_0_30px_-5px_hsl(20_90%_55%_/_0.3)]"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <card.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {card.title}
              </h3>
              <p className="text-muted-foreground">{card.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSelector;
