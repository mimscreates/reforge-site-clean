import { motion } from "framer-motion";
import { Mic, Film, Scissors, Linkedin, Mail } from "lucide-react";

const outputs = [
  { icon: Mic, label: "Podcast Episode", count: "1", delay: 0 },
  { icon: Film, label: "Reels", count: "3", delay: 0.08 },
  { icon: Scissors, label: "Short Clips", count: "5", delay: 0.16 },
  { icon: Linkedin, label: "LinkedIn Posts", count: "∞", delay: 0.24 },
  { icon: Mail, label: "Newsletter Content", count: "∞", delay: 0.32 },
];

const ContentMultiplier = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
          Turn One Session into Weeks of Content
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          A single recording session produces everything you need to stay visible across every platform.
        </p>
      </motion.div>

      {/* Flow visualization */}
      <div className="flex flex-col items-center gap-8">
        {/* Source */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center">
            <Mic className="w-7 h-7 text-primary mb-1" />
            <span className="font-display text-xs font-bold text-foreground">1 Session</span>
          </div>
        </motion.div>

        {/* Connector line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-px h-10 bg-gradient-to-b from-primary/40 to-border origin-top"
        />

        {/* Arrow spread */}
        <div className="relative w-full max-w-3xl">
          {/* Horizontal connector */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block absolute top-0 left-[10%] right-[10%] h-px bg-border origin-center"
          />

          {/* Output cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-3">
            {outputs.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + item.delay }}
                className="flex flex-col items-center"
              >
                {/* Vertical tick */}
                <div className="hidden md:block w-px h-5 bg-border mb-3" />

                <div className="w-full bg-card border border-border/50 rounded-2xl p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-display text-2xl font-bold text-foreground block leading-none mb-1">
                    {item.count}
                  </span>
                  <span className="text-muted-foreground text-xs leading-tight">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContentMultiplier;
