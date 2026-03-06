import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ArrowRight, Crown, Star, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";

const CHECK_ICON =
  "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

type Tab = "creator" | "business" | "vip";

const tabs: { id: Tab; label: string }[] = [
  { id: "creator", label: "Creator" },
  { id: "business", label: "Business" },
  { id: "vip", label: "VIP Membership" },
];

const creatorPacks = [
  { name: "Nova", price: "800 DT", unit: "/ session", popular: false, features: ["1 Camera", "1 Microphone", "Professional audio recording", "Studio lighting", "RAW footage delivery", "No editing"] },
  { name: "Cosmic", price: "1,300 DT", unit: "/ session", popular: true, features: ["2 Cameras", "2 Microphones", "Podcast editing", "2 Social Media Reels", "Professional lighting", "Ready-to-publish delivery"] },
  { name: "Interstellar", price: "1,800 DT", unit: "/ session", popular: false, features: ["2 Cameras", "2 Microphones", "Professional editing", "4 Social Media Reels", "Social media optimized export", "Ready-to-publish delivery"] },
];

const businessPacks = [
  { name: "Essential", price: "3,200 DT", unit: "/ month", popular: false, features: ["2 recording sessions per month", "2 cameras", "2 microphones", "Podcast editing", "4 social media reels per month", "Ready-to-publish delivery"] },
  { name: "Growth", price: "4,200 DT", unit: "/ month", popular: true, features: ["2 sessions per month", "2 cameras + 2 microphones", "Professional editing", "8 social media reels", "YouTube thumbnails", "Optimized for LinkedIn & Instagram"] },
  { name: "Authority", price: "6,000 DT", unit: "/ month", popular: false, features: ["2 sessions per month", "3 camera production", "Premium editing", "12 social media reels", "Content strategy support", "Multi-platform delivery"] },
];

const vipPlans = [
  {
    name: "Silver Membership",
    price: "$6,000",
    unit: "/ year",
    popular: false,
    features: [
      "2 podcast sessions per month",
      "Priority booking",
      "Access to studio equipment",
      "Production team support",
    ],
  },
  {
    name: "Gold Membership",
    price: "$12,000",
    unit: "/ year",
    popular: true,
    features: [
      "4 podcast sessions per month",
      "Priority booking",
      "Dedicated production support",
      "Content strategy guidance",
      "Access to studio equipment",
    ],
  },
];

/* ── Shared pack card ── */
const PackCard = ({
  pack,
  index,
  cta,
  onCta,
  premium,
}: {
  pack: { name: string; price: string; unit: string; popular: boolean; features: string[] };
  index: number;
  cta: string;
  onCta: () => void;
  premium?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.45, delay: index * 0.1 }}
    className={`relative flex flex-col items-center text-center rounded-2xl p-7 md:p-8 border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
      premium
        ? "bg-gradient-to-b from-card via-card to-primary/[0.04] border-primary/30 shadow-[0_0_40px_-10px_hsl(20_90%_55%_/_0.2)]"
        : pack.popular
        ? "bg-card border-primary shadow-[0_0_30px_-8px_hsl(20_90%_55%_/_0.3)]"
        : "bg-card border-border/50 hover:border-primary/20"
    }`}
  >
    {pack.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge className="bg-primary text-primary-foreground text-[10px] font-bold px-3.5 py-1 uppercase tracking-wider border-0">
          Most Popular
        </Badge>
      </div>
    )}

    {premium && (
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        {pack.name.includes("Gold") ? (
          <Crown className="w-6 h-6 text-primary" />
        ) : (
          <Star className="w-6 h-6 text-primary" />
        )}
      </div>
    )}

    <h3 className="font-display text-xl font-bold text-foreground mb-1 mt-1">{pack.name}</h3>
    <p className="font-display text-3xl text-primary font-bold">{pack.price}</p>
    <span className="text-muted-foreground text-xs mb-6">{pack.unit}</span>

    <div className="space-y-2.5 w-full mb-8">
      {pack.features.map((f) => (
        <div key={f} className="flex items-center gap-2.5">
          <img src={CHECK_ICON} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
          <span className="text-foreground text-sm text-left">{f}</span>
        </div>
      ))}
    </div>

    <Button
      variant="cta"
      onClick={onCta}
      className="mt-auto w-full font-medium text-sm h-10 rounded-lg"
    >
      {cta}
    </Button>

    {premium && (
      <div className="mt-5 flex items-center gap-1.5 opacity-40">
        <span className="font-display text-[10px] tracking-widest uppercase text-muted-foreground">
          KAUN Studios
        </span>
      </div>
    )}
  </motion.div>
);

/* ── Tab content ── */
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

const CreatorContent = ({ openBooking }: { openBooking: (n: string) => void }) => (
  <motion.div key="creator" variants={contentVariants} initial="initial" animate="animate" exit="exit">
    <div className="text-center mb-12">
      <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
        Studio Sessions for Creators
      </h2>
      <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
        All-inclusive recording packs — just show up and create.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {creatorPacks.map((p, i) => (
        <PackCard key={p.name} pack={p} index={i} cta="Book this pack" onCta={() => openBooking(`${p.name} (Creator)`)} />
      ))}
    </div>
  </motion.div>
);

const BusinessContent = ({ openBooking }: { openBooking: (n: string) => void }) => (
  <motion.div key="business" variants={contentVariants} initial="initial" animate="animate" exit="exit">
    <div className="text-center mb-12">
      <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
        Monthly Production for Businesses
      </h2>
      <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
        Each pack includes 2 recording sessions per month with full production support.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {businessPacks.map((p, i) => (
        <PackCard key={p.name} pack={p} index={i} cta="Book this pack" onCta={() => openBooking(`${p.name} (Business)`)} />
      ))}
    </div>

    {/* Agency CTA */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-16 rounded-2xl border border-border/50 bg-secondary/30 backdrop-blur-sm p-8 md:p-10 text-center"
    >
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
        <Handshake className="w-3.5 h-3.5" /> For Agencies
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
        Agency or marketing team?
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6 leading-relaxed">
        We partner with agencies and marketing teams to produce professional podcast and video content for their clients. Flexible scheduling, white-label options, and volume pricing.
      </p>
      <a
        href="https://cal.com/kaun-studios-csvvzi/40min"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="cta" className="font-medium text-sm h-10 px-7 gap-2 rounded-lg">
          Schedule a partnership call <ArrowRight className="w-4 h-4" />
        </Button>
      </a>
    </motion.div>
  </motion.div>
);

const VIPContent = ({ openBooking }: { openBooking: (n: string) => void }) => (
  <motion.div key="vip" variants={contentVariants} initial="initial" animate="animate" exit="exit">
    <div className="text-center mb-12">
      <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
        VIP Membership
      </h2>
      <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
        Exclusive annual memberships for serious creators and brands.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {vipPlans.map((p, i) => (
        <PackCard
          key={p.name}
          pack={p}
          index={i}
          cta="Apply for membership"
          onCta={() => openBooking(`${p.name} (VIP)`)}
          premium
        />
      ))}
    </div>
  </motion.div>
);

/* ── Main page ── */
const PacksPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("creator");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("");
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash === "business" || hash === "creator" || hash === "vip") {
      setActiveTab(hash as Tab);
    }
  }, [location.hash]);

  const openBooking = (name: string) => {
    setSelectedPack(name);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 md:py-24 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="outline" className="mb-4 text-xs font-medium border-primary/30 text-primary">
                Our Packs
              </Badge>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Find the Perfect Plan
                <br />
                <span className="text-primary">for Your Content</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                Whether you're an independent creator, a growing brand, or looking for a long-term partnership — we have a pack for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab Toggle */}
        <section className="px-4 pb-4">
          <div className="container mx-auto flex justify-center">
            <div className="inline-flex rounded-full border border-border/60 bg-secondary/40 backdrop-blur-sm p-1 gap-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              {activeTab === "creator" && <CreatorContent openBooking={openBooking} />}
              {activeTab === "business" && <BusinessContent openBooking={openBooking} />}
              {activeTab === "vip" && <VIPContent openBooking={openBooking} />}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 border-t border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-lg text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Need something more custom?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Build your own session from scratch — choose your equipment, editing level, and extras.
            </p>
            <Link to="/build-session">
              <Button variant="cta" className="font-medium text-sm h-10 px-7 gap-2 rounded-lg">
                Build a Custom Session <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <BookingModal open={modalOpen} onOpenChange={setModalOpen} selectedPack={selectedPack} />
      </main>
      <Footer />
    </div>
  );
};

export default PacksPage;
