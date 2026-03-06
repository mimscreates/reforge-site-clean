import { motion } from "framer-motion";
import { DoorOpen, Clapperboard, Send } from "lucide-react";

const steps = [
  {
    icon: DoorOpen,
    number: "01",
    title: "Arrive at the Studio",
    description:
      "You're welcomed by our team — setup, mics, cameras, and lighting are all ready before you sit down.",
  },
  {
    icon: Clapperboard,
    number: "02",
    title: "Record Your Session",
    description:
      "Our crew handles multi-camera, lighting, and audio so you can focus entirely on your content.",
  },
  {
    icon: Send,
    number: "03",
    title: "Receive Your Content",
    description:
      "Within days, get fully edited episodes, reels, and clips optimized for every platform.",
  },
];

const HowItWorks = () => (
  <section className="py-12 md:py-20 px-4">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
          How Your Session Works
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          Three simple steps from arrival to ready-to-publish content.
        </p>
      </motion.div>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
        {/* Connector line */}
        <div className="absolute top-5 left-[16.67%] right-[16.67%] h-px bg-border" />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="flex flex-col items-center text-center px-6"
          >
            {/* Number badge */}
            <div className="relative z-10 w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center mb-5">
              <span className="font-display text-xs font-bold text-primary">
                {step.number}
              </span>
            </div>

            <step.icon className="w-5 h-5 text-primary mb-3" />

            <h3 className="font-display text-base font-bold text-foreground mb-1.5">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative pl-8">
        {/* Vertical connector line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="relative"
            >
              {/* Number badge */}
              <div className="absolute -left-8 top-0 w-[30px] h-[30px] rounded-full border border-border bg-background flex items-center justify-center z-10">
                <span className="font-display text-[10px] font-bold text-primary">
                  {step.number}
                </span>
              </div>

              <div className="pl-2">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className="w-4 h-4 text-primary" />
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
