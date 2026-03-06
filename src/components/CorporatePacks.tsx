import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";

const CHECK_ICON =
  "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

export const corporatePacks = [
  { name: "Essential", price: "3200 DT", unit: "/ month", popular: false, features: ["2 recording sessions per month", "2 cameras", "2 microphones", "Podcast editing", "4 social media reels per month", "Ready-to-publish delivery"] },
  { name: "Growth", price: "4200 DT", unit: "/ month", popular: true, features: ["2 sessions per month", "2 cameras + 2 microphones", "Professional editing", "8 social media reels", "YouTube thumbnails", "Optimized for LinkedIn & Instagram"] },
  { name: "Authority", price: "6000 DT", unit: "/ month", popular: false, features: ["2 sessions per month", "3 camera production", "Premium editing", "12 social media reels", "Content strategy support", "Multi-platform delivery"] },
];

const CorporatePacks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("");

  const openBooking = (name: string) => {
    setSelectedPack(`${name} (Corporate)`);
    setModalOpen(true);
  };

  return (
    <section id="corporate-packs" className="py-16 px-4 bg-secondary/20 scroll-mt-16">
      <div className="container mx-auto">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-3">Corporate Content Production</h2>
        <p className="text-muted-foreground text-center mb-12 text-sm md:text-base max-w-xl mx-auto">Monthly podcast production for brands, founders and companies. Each pack includes 2 recording sessions per month.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {corporatePacks.map((pack, i) => (
            <motion.div key={pack.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative bg-card border rounded-2xl p-6 flex flex-col items-center text-center ${pack.popular ? "border-primary shadow-[0_0_30px_-8px_hsl(20_90%_55%_/_0.35)]" : "border-border/50"}`}>
              {pack.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">Best Value</div>
              )}
              <h3 className="font-display text-xl font-bold text-foreground mb-1 mt-1">{pack.name}</h3>
              <p className="font-display text-2xl text-primary font-bold">{pack.price}</p>
              <span className="text-muted-foreground text-xs mb-6">{pack.unit}</span>
              <div className="space-y-2 w-full mb-6">
                {pack.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <img src={CHECK_ICON} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                    <span className="text-foreground text-sm text-left">{feature}</span>
                  </div>
                ))}
              </div>
              <Button variant="cta" onClick={() => openBooking(pack.name)} className="mt-auto w-full font-medium text-sm h-9">
                Start Monthly Production
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      <BookingModal open={modalOpen} onOpenChange={setModalOpen} selectedPack={selectedPack} />
    </section>
  );
};

export default CorporatePacks;
