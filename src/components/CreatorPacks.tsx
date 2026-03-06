import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";

const CHECK_ICON =
  "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

const packs = [
  {
    name: "Nova",
    price: "800 DT",
    unit: "/ session",
    popular: false,
    features: [
      "1 Camera",
      "1 Microphone",
      "Professional audio recording",
      "Studio lighting",
      "RAW footage delivery",
      "No editing",
    ],
  },
  {
    name: "Cosmic",
    price: "1300 DT",
    unit: "/ session",
    popular: true,
    features: [
      "2 Cameras",
      "2 Microphones",
      "Podcast editing",
      "2 Social Media Reels",
      "Professional lighting",
      "Ready-to-publish delivery",
    ],
  },
  {
    name: "Interstellar",
    price: "1800 DT",
    unit: "/ session",
    popular: false,
    features: [
      "2 Cameras",
      "2 Microphones",
      "Professional editing",
      "4 Social Media Reels",
      "Social media optimized export",
      "Ready-to-publish delivery",
    ],
  },
];

const CreatorPacks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("");

  const openBooking = (name: string) => {
    setSelectedPack(`${name} (Creator)`);
    setModalOpen(true);
  };

  return (
    <section id="creator-packs" className="py-16 px-4 bg-background scroll-mt-16">
      <div className="container mx-auto">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-3">
          Podcast Studio Sessions
        </h2>
        <p className="text-muted-foreground text-center mb-12 text-sm md:text-base">
          Professional recording packs for content creators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packs.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative bg-card border rounded-xl p-6 flex flex-col items-center text-center ${
                pack.popular
                  ? "border-primary shadow-[0_0_30px_-8px_hsl(20_90%_55%_/_0.35)]"
                  : "border-border/50"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <h3 className="font-display text-xl font-bold text-foreground mb-1 mt-1">
                {pack.name}
              </h3>
              <p className="font-display text-2xl text-primary font-bold">
                {pack.price}
              </p>
              <span className="text-muted-foreground text-xs mb-6">
                {pack.unit}
              </span>

              <div className="space-y-2 w-full mb-6">
                {pack.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <img src={CHECK_ICON} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                    <span className="text-foreground text-sm text-left">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => openBooking(pack.name)}
                className="mt-auto w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm h-9"
              >
                Book a Session
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal open={modalOpen} onOpenChange={setModalOpen} selectedPack={selectedPack} />
    </section>
  );
};

export default CreatorPacks;
