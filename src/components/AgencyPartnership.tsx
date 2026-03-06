import { motion } from "framer-motion";
import { Handshake, ArrowRight, Users, Globe, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const highlights = [
  { icon: Users, text: "White-label production for your clients" },
  { icon: Globe, text: "Multi-platform content delivery" },
  { icon: CalendarCheck, text: "Flexible scheduling & priority booking" },
];

const AgencyPartnership = () => (
  <section className="py-12 md:py-28 px-4 border-t border-border/40">
    <div className="container mx-auto max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 text-xs font-medium border-primary/30 text-primary">
            B2B
          </Badge>

          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            For Agencies &<br />Marketing Teams
          </h2>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5 md:mb-8 max-w-md">
            We collaborate with agencies that need a reliable podcast and content studio for their clients. Become a partner and scale your content offering without the overhead.
          </p>

          <div className="space-y-3">
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">{h.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.06] p-8 md:p-10 text-center shadow-[0_0_60px_-15px_hsl(20_90%_55%_/_0.15)] transition-all duration-500 hover:shadow-[0_0_80px_-15px_hsl(20_90%_55%_/_0.25)] hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-7 h-7 text-primary" />
            </div>

            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Let's Work Together
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs mx-auto">
              Book a call to explore how we can become your studio partner. No commitment required.
            </p>

            <a
              href="https://cal.com/kaun-studios/kaun-partnerships"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="cta" className="font-medium text-sm h-11 px-8 gap-2 rounded-lg w-full sm:w-auto">
                Schedule a partnership call <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AgencyPartnership;
