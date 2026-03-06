import { motion } from "framer-motion";
import { Video, Film, Scissors, Linkedin, Mic } from "lucide-react";

const outputs = [
  { icon: Mic, label: "Podcast Episode", count: "1", delay: 0 },
  { icon: Film, label: "Reels", count: "3", delay: 0.08 },
  { icon: Scissors, label: "Short Clips", count: "5", delay: 0.16 },
  { icon: Linkedin, label: "LinkedIn Posts", count: "∞", delay: 0.24 },
];

const ContentMultiplier = () => (
  <section className="py-12 md:py-24 px-4">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 md:mb-20"
      >
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
          Turn One Session into Weeks of Content
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          A single recording session produces everything you need to stay visible across every platform.
        </p>
      </motion.div>

      {/* Flow visualization */}
      <div className="flex flex-col items-center gap-6 md:gap-10">
        {/* Source — larger, more prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/40 flex flex-col items-center justify-center shadow-[0_0_40px_-10px_hsl(20_91%_55%_/_0.2)]">
            <Video className="w-8 h-8 md:w-9 md:h-9 text-primary mb-1.5" />
            <span className="font-display text-sm md:text-base font-bold text-foreground">1 Filming</span>
            <span className="text-[10px] text-muted-foreground/70">Session</span>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full border border-primary/10 animate-[pulse_3s_ease-in-out_infinite]" />
        </motion.div>

        {/* Connector line with gradient */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-px h-12 md:h-16 bg-gradient-to-b from-primary/50 via-primary/20 to-border origin-top"
        />

        {/* Arrow spread */}
        <div className="relative w-full max-w-3xl">
          {/* Horizontal connector */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center"
          />

          {/* Output cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                <div className="hidden md:block w-px h-6 bg-gradient-to-b from-border to-transparent mb-3" />

                <div className="w-full bg-card border border-border/50 rounded-2xl p-5 md:p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 group">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-display text-3xl md:text-4xl font-bold text-foreground block leading-none mb-1.5">
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
