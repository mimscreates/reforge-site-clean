import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type BuildTag = "Gaming Setup" | "Streaming Setup" | "Office Setup";

interface ClientBuild {
  videoId: string;
  clientName: string;
  description: string;
  tag: BuildTag;
}

const builds: ClientBuild[] = [
  { videoId: "dQw4w9WgXcQ", clientName: "Alex M.", description: "Full RGB gaming battlestation with dual monitors and custom lighting.", tag: "Gaming Setup" },
  { videoId: "jNQXAC9IVRw", clientName: "Sarah K.", description: "Professional streaming corner optimized for Twitch and YouTube content.", tag: "Streaming Setup" },
  { videoId: "9bZkp7q19f0", clientName: "Omar B.", description: "Minimalist home office with standing desk and acoustic panels.", tag: "Office Setup" },
  { videoId: "kJQP7kiw5Fk", clientName: "Lina T.", description: "Cozy streaming nook with warm lighting and a compact podcast setup.", tag: "Streaming Setup" },
  { videoId: "RgKAFK5djSk", clientName: "Youssef D.", description: "High-end gaming rig with triple monitor and sim-racing cockpit.", tag: "Gaming Setup" },
  { videoId: "JGwWNGJdvx8", clientName: "Amira H.", description: "Clean workspace with ultrawide monitor and natural wood accents.", tag: "Office Setup" },
];

const tagColors: Record<BuildTag, string> = {
  "Gaming Setup": "bg-primary/15 text-primary border-primary/20",
  "Streaming Setup": "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "Office Setup": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

const BuildCard = ({ build, index }: { build: ClientBuild; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
  >
    <Card className="group overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-video overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${build.videoId}`}
          title={`${build.clientName} – ${build.tag}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-0.5" />
          </div>
        </div>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-foreground font-semibold text-sm">{build.clientName}</h3>
          <Badge variant="outline" className={`text-[10px] font-semibold ${tagColors[build.tag]}`}>
            {build.tag}
          </Badge>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">{build.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 text-xs font-medium border-primary/30 text-primary">
              Portfolio
            </Badge>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Client Builds & Results
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
              See how our community builds their dream setups with Reforge.
            </p>
          </motion.div>
        </section>

        {/* Video Grid */}
        <section className="pb-20 px-4">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {builds.map((build, i) => (
              <BuildCard key={build.videoId} build={build} index={i} />
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 px-4 border-t border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-2xl text-center"
          >
            <div className="flex justify-center mb-5">
              <Avatar className="w-14 h-14 border-2 border-primary/30">
                <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Client" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </div>
            <blockquote className="text-foreground text-lg md:text-xl font-medium italic leading-relaxed mb-4">
              "KAUN Studios transformed our vision into reality. The quality of the production exceeded all our expectations — truly world-class."
            </blockquote>
            <p className="text-muted-foreground text-sm font-semibold">Ahmed K.</p>
            <p className="text-muted-foreground/60 text-xs">Founder, StreamLab TN</p>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 border-t border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-lg text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Built something amazing?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Share your setup with the community and get featured on our portfolio.
            </p>
            <Link to="/devis">
              <Button variant="cta" className="rounded-full font-medium text-sm h-10 px-6 gap-2">
                Submit Your Build <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
