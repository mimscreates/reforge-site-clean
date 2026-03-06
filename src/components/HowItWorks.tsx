import { motion } from "framer-motion";
import { DoorOpen, Clapperboard, Send } from "lucide-react";

const steps = [
  {
    icon: DoorOpen,
    title: "Arrival at the Studio",
    description:
      "You're welcomed by our team, shown around the studio, and your setup is prepared — microphones, cameras, lighting — all ready before you sit down.",
  },
  {
    icon: Clapperboard,
    title: "Recording",
    description:
      "Our production crew handles everything — multi-camera angles, professional lighting, and crystal-clear audio — so you can focus entirely on your content.",
  },
  {
    icon: Send,
    title: "Content Delivery",
    description:
      "Within days, you receive fully edited, ready-to-publish content — podcast episodes, social reels, and clips optimized for every platform.",
  },
];

const HowItWorks = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
          How Your Session Works
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          Three simple steps from arrival to ready-to-publish content.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="relative bg-card border border-border/50 rounded-2xl p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
          >
            {/* Step number */}
            <span className="absolute top-5 right-5 font-display text-xs font-bold text-muted-foreground/30">
              0{i + 1}
            </span>

            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <step.icon className="w-6 h-6 text-primary" />
            </div>

            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
