import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Headphones, Video, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { creatorPacks } from "@/components/CreatorPacks";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";

const CHECK_ICON =
  "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

const benefits = [
  { icon: Headphones, title: "Superior Audio Quality", description: "Acoustic-treated rooms with professional microphones for crystal-clear sound." },
  { icon: Video, title: "Cinematic Video", description: "Multi-camera setups with professional lighting for broadcast-quality visuals." },
  { icon: Zap, title: "Fast Production", description: "Walk in, record, and receive ready-to-publish content — no equipment hassle." },
  { icon: CheckCircle2, title: "Ready-to-Use Content", description: "We handle editing, formatting, and delivery so you can focus on creating." },
];

const CreatorPacksPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("");

  const openBooking = (name: string) => {
    setSelectedPack(`${name} (Creator)`);
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
                <Mic className="w-3.5 h-3.5" /> For Creators
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
                Professional Studio Sessions
                <br />
                <span className="text-primary">for Content Creators</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Whether you're a podcaster, YouTuber, or personal brand — our turnkey studio makes it easy to produce professional podcast episodes, interviews, and social video content.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Record in a Professional Studio */}
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
                Why Record in a Professional Studio?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
                Stop struggling with DIY setups. Focus on your content while we handle the production.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-card border border-border/50 rounded-2xl p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1">{b.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Creator Packs */}
        <section id="creator-packs" className="py-20 px-4 bg-background scroll-mt-16">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
                Choose Your Pack
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
                All-inclusive studio sessions — just show up and create.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {creatorPacks.map((pack, i) => (
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
                      Most Popular
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
                    variant="cta-primary"
                    onClick={() => openBooking(pack.name)}
                    className="mt-auto w-full font-medium text-sm h-9"
                  >
                    Book a Session
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Need Something More Custom?
              </h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Build your own session from scratch — choose your equipment, editing level, and extras.
              </p>
              <Link to="/build-session">
                <Button variant="cta" className="font-medium text-sm h-10 px-6 gap-2">
                  Build a Custom Session <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <BookingModal open={modalOpen} onOpenChange={setModalOpen} selectedPack={selectedPack} />
      </main>
      <Footer />
    </div>
  );
};

export default CreatorPacksPage;
