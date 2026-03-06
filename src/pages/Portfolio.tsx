import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import reelThumb1 from "@/assets/reels/reel-thumb-1.jpg";
import reelThumb2 from "@/assets/reels/reel-thumb-2.jpg";
import reelThumb3 from "@/assets/reels/reel-thumb-3.jpg";

type Category = "All" | "Podcast" | "Reels" | "Music Video";

interface VideoProject {
  id: string;
  embedUrl: string;
  thumbnail: string;
  category: Exclude<Category, "All">;
  externalUrl?: string;
}

const projects: VideoProject[] = [
  // Podcasts
  { id: "4by3nnpYsxQ", embedUrl: "https://www.youtube.com/embed/4by3nnpYsxQ", thumbnail: "https://img.youtube.com/vi/4by3nnpYsxQ/maxresdefault.jpg", category: "Podcast" },
  { id: "SRcgz0ZQsKA", embedUrl: "https://www.youtube.com/embed/SRcgz0ZQsKA", thumbnail: "https://img.youtube.com/vi/SRcgz0ZQsKA/maxresdefault.jpg", category: "Podcast" },
  { id: "YqhfvBv-j50", embedUrl: "https://www.youtube.com/embed/YqhfvBv-j50", thumbnail: "https://img.youtube.com/vi/YqhfvBv-j50/maxresdefault.jpg", category: "Podcast" },
  { id: "NDyL3wMlpDo", embedUrl: "https://www.youtube.com/embed/NDyL3wMlpDo", thumbnail: "https://img.youtube.com/vi/NDyL3wMlpDo/maxresdefault.jpg", category: "Podcast" },
  { id: "9p0sQWvUudk", embedUrl: "https://www.youtube.com/embed/9p0sQWvUudk", thumbnail: "https://img.youtube.com/vi/9p0sQWvUudk/maxresdefault.jpg", category: "Podcast" },
  { id: "48utRXZHkGo", embedUrl: "https://www.youtube.com/embed/48utRXZHkGo", thumbnail: "https://img.youtube.com/vi/48utRXZHkGo/maxresdefault.jpg", category: "Podcast" },
  // Reels — open Instagram externally
  { id: "reel-1", embedUrl: "", thumbnail: reelThumb1, category: "Reels", externalUrl: "https://www.instagram.com/reel/DUGrwcdCDVn/" },
  { id: "reel-2", embedUrl: "", thumbnail: reelThumb2, category: "Reels", externalUrl: "https://www.instagram.com/reel/DUYrAJ4iLnG/" },
  { id: "reel-3", embedUrl: "", thumbnail: reelThumb3, category: "Reels", externalUrl: "https://www.instagram.com/reel/DMnEOzDsgV_/" },
  // Music Video
  { id: "DEORkgTglFE", embedUrl: "https://www.youtube.com/embed/DEORkgTglFE", thumbnail: "https://img.youtube.com/vi/DEORkgTglFE/maxresdefault.jpg", category: "Music Video" },
];

const categories: Category[] = ["All", "Podcast", "Reels", "Music Video"];
  const [active, setActive] = useState<Category>("All");
  const [modalVideo, setModalVideo] = useState<VideoProject | null>(null);
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const isReel = (p: VideoProject) => p.category === "Reels";

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
                {cat === "Music Video" ? "Music Videos" : cat === "All" ? "All" : cat}
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
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    {isReel(project) ? (
                      /* Reel card — inline embed (Instagram doesn't support modal well) */
                      <div className="overflow-hidden rounded-[24px] border border-border/40 bg-card/80 backdrop-blur-sm">
                        <div className="relative aspect-[9/16] max-h-[480px] overflow-hidden">
                          <iframe
                            src={project.embedUrl}
                            title="Instagram Reel"
                            className="absolute inset-0 w-full h-full border-0"
                            loading="lazy"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-4">
                          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                            Reel
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      /* YouTube card — clickable thumbnail */
                      <button
                        onClick={() => setModalVideo(project)}
                        className="group w-full text-left overflow-hidden rounded-[24px] border border-border/40 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/5 hover:scale-[1.03] focus:outline-none"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Play overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-primary/30">
                              <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                            {project.category === "Music Video" ? "Clip" : project.category}
                          </Badge>
                        </div>
                      </button>
                    )}
                  </motion.div>
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
              Ready to create something like this?
            </h2>
            <Link to="/build-session">
              <Button variant="cta" className="font-medium text-sm h-11 px-7 gap-2">
                Book a Session <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={() => setModalVideo(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${modalVideo.embedUrl}?autoplay=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
              <button
                onClick={() => setModalVideo(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
