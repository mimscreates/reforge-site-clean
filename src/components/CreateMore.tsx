import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Film, Scissors, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STUDIO_IMG =
  "https://framerusercontent.com/images/OJMPwpA9ckHsawcEn6bFf5b0cnU.jpg?width=4672&height=7008";

const benefits = [
  {
    icon: Mic,
    title: "Professional podcast setup",
    description:
      "Studio microphones, lighting, and multi-camera recording.",
  },
  {
    icon: Film,
    title: "Full production support",
    description:
      "Our team helps you from recording to post-production.",
  },
  {
    icon: Scissors,
    title: "Content ready for distribution",
    description:
      "Get edited podcasts, reels, and clips optimized for every platform.",
  },
];

const CreateMore = () => {
  return (
    <section className="py-12 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-10 md:mb-16"
        >
          Everything You Need to Create
          <br className="hidden md:block" />{" "}
          <span className="text-primary">Powerful Content</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={STUDIO_IMG}
              alt="KAUN Studio"
              className="w-full h-[280px] md:h-[420px] object-cover rounded-2xl"
              loading="lazy"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Record professional podcasts, create short-form content, and leave
              with ready-to-publish media.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-foreground mb-0.5">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/build-session">
              <Button
                variant="cta-primary"
                className="font-medium text-sm h-10 px-6 gap-2 rounded-lg"
              >
                Book a Session <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CreateMore;
