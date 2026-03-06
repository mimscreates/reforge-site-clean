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
    <section id="creator-packs" className="py-20 px-4 bg-background scroll-mt-20">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
          Podcast Studio Sessions
        </h2>
        <p className="text-muted-foreground text-center mb-16 text-lg">
          Professional recording packs for content creators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packs.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative bg-card border rounded-2xl p-8 flex flex-col items-center text-center ${
                pack.popular
                  ? "border-primary shadow-[0_0_40px_-10px_hsl(20_90%_55%_/_0.4)]"
                  : "border-border"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <h3 className="font-display text-2xl font-bold text-foreground mb-2 mt-2">
                {pack.name}
              </h3>
              <p className="font-display text-3xl text-primary font-bold">
                {pack.price}
              </p>
              <span className="text-muted-foreground text-sm mb-8">
                {pack.unit}
              </span>

              <div className="space-y-3 w-full mb-8">
                {pack.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <img
                      src={CHECK_ICON}
                      alt=""
                      className="w-5 h-5 object-contain flex-shrink-0"
                    />
                    <span className="text-foreground text-sm text-left">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => openBooking(pack.name)}
                className="mt-auto w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                Reserve my session
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedPack={selectedPack}
      />
    </section>
  );
};

export default CreatorPacks;
