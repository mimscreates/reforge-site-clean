import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type Category = "All" | "Podcast" | "Reels" | "Brand Content";

interface VideoProject {
  videoId: string;
  title: string;
  creator: string;
  category: Exclude<Category, "All">;
}

const projects: VideoProject[] = [
  { videoId: "dQw4w9WgXcQ", title: "The Entrepreneur Mindset", creator: "Ahmed K.", category: "Podcast" },
  { videoId: "jNQXAC9IVRw", title: "Behind the Brand", creator: "Lina T.", category: "Podcast" },
  { videoId: "9bZkp7q19f0", title: "Product Launch Reel", creator: "StreamLab TN", category: "Reels" },
  { videoId: "kJQP7kiw5Fk", title: "Day in the Studio", creator: "Sarah K.", category: "Reels" },
  { videoId: "RgKAFK5djSk", title: "Corporate Identity Film", creator: "Nova Agency", category: "Brand Content" },
  { videoId: "JGwWNGJdvx8", title: "Startup Story Series", creator: "Omar B.", category: "Brand Content" },
  { videoId: "CevxZvSJLk8", title: "Weekly Tech Talk", creator: "Youssef D.", category: "Podcast" },
  { videoId: "fJ9rUzIMcZQ", title: "Brand Awareness Campaign", creator: "Amira H.", category: "Brand Content" },
  { videoId: "OPf0YbXqDm0", title: "Studio Session Highlights", creator: "KAUN Studios", category: "Reels" },
];

const categories: Category[] = ["All", "Podcast", "Reels", "Brand Content"];

const VideoCard = ({ project, index }: { project: VideoProject; index: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
  >
    <Card className="group overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${project.videoId}`}
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      <CardContent className="p-5 space-y-1.5">
        <h3 className="font-display text-foreground font-semibold text-sm leading-snug">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-xs">{project.creator}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-12 px-4 text-center">
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
              Our Work
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
              Real content produced for creators and brands in our studio.
            </p>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="px-4 pb-8">
          <div className="container mx-auto flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  active === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Video Grid */}
        <section className="pb-20 px-4">
          <div className="container mx-auto">
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((project, i) => (
                  <VideoCard key={project.videoId} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 border-t border-border/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-lg text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to create your own content?
            </h2>
            <Link to="/devis">
              <Button variant="cta" className="font-medium text-sm h-11 px-7 gap-2">
                Book a session <ArrowRight className="w-4 h-4" />
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
