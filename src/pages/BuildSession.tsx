import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Mic, Building2, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionConfigurator from "@/components/SessionConfigurator";
import { creatorPacks } from "@/components/CreatorPacks";
import { corporatePacks } from "@/components/CorporatePacks";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";

const CHECK_ICON =
  "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

const tabs = [
  { id: "custom", label: "Custom Session", icon: Sliders },
  { id: "creator", label: "Creator Packs", icon: Mic },
  { id: "business", label: "Business Packs", icon: Building2 },
] as const;

type TabId = (typeof tabs)[number]["id"];

const BuildSession = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as TabId | null;
  const [activeTab, setActiveTab] = useState<TabId>(tabParam && ["custom", "creator", "business"].includes(tabParam) ? tabParam : "creator");

  useEffect(() => {
    if (tabParam && ["custom", "creator", "business"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("");

  const openBooking = (name: string, type: string) => {
    setSelectedPack(`${name} (${type})`);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-12 md:py-20 px-3 md:px-4 bg-background">
          <div className="container mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-3 md:mb-5 max-w-[800px] mx-auto">
                Build Your Session
              </h1>
              <p className="text-muted-foreground text-sm md:text-lg max-w-[600px] mx-auto">
                Choose a ready-made pack or configure a fully custom session.
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex justify-center mb-8 md:mb-12"
            >
              <div className="inline-flex bg-card border border-border rounded-2xl p-1.5 gap-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "custom" && (
                <motion.div
                  key="custom"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <SessionConfigurator onSwitchTab={(tab) => setActiveTab(tab)} />
                </motion.div>
              )}

              {activeTab === "creator" && (
                <motion.div
                  key="creator"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <PacksGrid
                    packs={creatorPacks}
                    type="Creator"
                    ctaLabel="Book This Pack"
                    onBook={(name) => openBooking(name, "Creator")}
                  />
                </motion.div>
              )}

              {activeTab === "business" && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <PacksGrid
                    packs={corporatePacks}
                    type="Business"
                    ctaLabel="Start Monthly Production"
                    onBook={(name) => openBooking(name, "Business")}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nudge to custom when on packs */}
            {activeTab !== "custom" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-10"
              >
                <p className="text-muted-foreground text-sm mb-3">
                  Need something more specific?
                </p>
                <button
                  onClick={() => setActiveTab("custom")}
                  className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1.5"
                >
                  <Sliders className="w-4 h-4" />
                  Build a Custom Session
                </button>
              </motion.div>
            )}
          </div>
        </section>

        <BookingModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          selectedPack={selectedPack}
        />
      </main>
      <Footer />
    </div>
  );
};

// --- Pack Cards Grid ---

interface Pack {
  name: string;
  price: string;
  unit: string;
  popular: boolean;
  features: string[];
}

function PacksGrid({
  packs,
  type,
  ctaLabel,
  onBook,
}: {
  packs: Pack[];
  type: string;
  ctaLabel: string;
  onBook: (name: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {packs.map((pack, i) => (
        <motion.div
          key={pack.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className={`relative bg-card border rounded-2xl p-6 flex flex-col items-center text-center ${
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
          <span className="text-muted-foreground text-xs mb-6">{pack.unit}</span>
          <div className="space-y-2 w-full mb-6">
            {pack.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <img
                  src={CHECK_ICON}
                  alt=""
                  className="w-4 h-4 object-contain flex-shrink-0"
                />
                <span className="text-foreground text-sm text-left">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <Button
            variant="cta"
            onClick={() => onBook(pack.name)}
            className="mt-auto w-full font-medium text-sm h-9"
          >
            {ctaLabel}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export default BuildSession;
