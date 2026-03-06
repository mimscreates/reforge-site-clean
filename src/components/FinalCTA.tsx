import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section className="py-14 md:py-32 px-4">
    <div className="container mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-border/50 bg-gradient-to-b from-card via-card to-primary/[0.04] p-7 md:p-16 text-center shadow-[0_0_80px_-20px_hsl(20_90%_55%_/_0.1)]"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Ready to Record Your
          <br />
          <span className="bg-gradient-to-r from-[#f46a25] via-[#ff8a3d] to-[#f46a25] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-shift_10s_linear_infinite]">
            Next Podcast?
          </span>
        </h2>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-10">
          Create podcasts, interviews and branded content in a professional studio with a team that guides you from recording to final delivery.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/devis">
            <Button variant="cta" className="font-medium text-sm h-11 px-8 gap-2 rounded-lg">
              Book a Session <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/packs">
            <Button variant="outline" className="font-medium text-sm h-11 px-8 rounded-lg">
              View Creator Packs
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
