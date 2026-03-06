import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Globe, Handshake, ArrowRight, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { corporatePacks } from "@/components/CorporatePacks";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";

const CHECK_ICON =
  "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

const reasons = [
  { icon: TrendingUp, title: "Build Authority", description: "Position your brand as a thought leader through regular podcast and video content." },
  { icon: Users, title: "Attract Clients", description: "Content marketing generates leads and builds trust with your target audience." },
  { icon: Globe, title: "Multi-Platform Presence", description: "One recording session produces content for LinkedIn, YouTube, Instagram, and more." },
  { icon: Calendar, title: "Recurring Production", description: "Monthly packages ensure consistent content output without the operational burden." },
];

const partnerBenefits = [
  "Professional recording environment for client productions",
  "Reliable, scalable production partner",
  "White-label content production capabilities",
  "Dedicated support for agency clients",
  "Flexible scheduling and priority booking",
  "Volume-based partnership pricing",
];

const CorporatePacksPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#partnership") {
      setTimeout(() => {
        const el = document.getElementById("partnership");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location.hash]);

  const openBooking = (name: string) => {
    setSelectedPack(`${name} (Corporate)`);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Introduction */}
        <section className="py-20 md:py-28 px-4 bg-background">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Building2 className="w-3.5 h-3.5" /> For Companies
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
                Content Production
                <br />
                <span className="text-primary">for Growing Businesses</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Build authority, attract clients, and communicate your expertise through professional podcast and video content. Monthly production packages designed for businesses that are serious about content.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Content Marketing */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
                Why Invest in Content Production?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
                Companies that produce consistent content grow faster and build stronger client relationships.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-card border border-border/50 rounded-2xl p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <r.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1">{r.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Packs */}
        <section id="corporate-packs" className="py-20 px-4 bg-background scroll-mt-16">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
                Monthly Production Packages
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
                Each pack includes 2 recording sessions per month with full production support.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {corporatePacks.map((pack, i) => (
                <motion.div
                  key={pack.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`relative bg-card border rounded-2xl p-6 flex flex-col items-center text-center ${
                    pack.popular
                      ? "border-primary shadow-[0_0_30px_-8px_hsl(20_90%_55%_/_0.35)]"
                      : "border-border/50"
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                      Best Value
                    </div>
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
                  <Button
                    variant="cta"
                    onClick={() => openBooking(pack.name)}
                    className="mt-auto w-full font-medium text-sm h-9"
                  >
                    Start Monthly Production
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agency Partnership */}
        <section id="partnership" className="py-20 px-4 bg-secondary/20 scroll-mt-16">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                  <Handshake className="w-3.5 h-3.5" /> For Agencies
                </div>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
                  Partner With Us
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  Marketing agencies, content agencies, and consultants — collaborate with KAUN Studios to produce professional podcast and video content for your clients. We become your reliable production partner so you can focus on strategy and client relationships.
                </p>

                <div className="space-y-3 mb-8">
                  {partnerBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <img src={CHECK_ICON} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm italic">
                  Whether you need a one-time production or an ongoing partnership, we adapt to your agency's workflow.
                </p>
              </motion.div>

              {/* Right: Calendly embed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  Schedule a Partnership Call
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Book a 30-minute discovery call to discuss how we can work together.
                </p>

                <div className="rounded-xl overflow-hidden border border-border bg-background" style={{ minHeight: 500 }}>
                  <iframe
                    src="https://cal.com/kaun-studios-csvvzi/40min?embed=true&theme=dark"
                    title="Schedule a partnership call"
                    className="w-full border-0"
                    style={{ height: 500 }}
                    loading="lazy"
                  />
                </div>

                <p className="text-muted-foreground/50 text-[11px] text-center mt-3">
                  No commitment required — let's explore how we can collaborate.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <BookingModal open={modalOpen} onOpenChange={setModalOpen} selectedPack={selectedPack} />
      </main>
      <Footer />
    </div>
  );
};

export default CorporatePacksPage;
