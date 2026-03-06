import { motion } from "framer-motion";
import { Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AgencyPartnership = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-10 md:p-14 text-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Handshake className="w-6 h-6 text-primary" />
        </div>

        <Badge variant="outline" className="mb-4 text-xs font-medium border-primary/30 text-primary">
          B2B
        </Badge>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
          For Agencies & Marketing Teams
        </h2>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
          We collaborate with agencies that need a reliable podcast and content studio for their clients.
        </p>

        <a
          href="https://cal.com/kaun-studios/kaun-partnerships"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="cta" className="font-medium text-sm h-10 px-7 gap-2 rounded-lg">
            Schedule a partnership call <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default AgencyPartnership;
