import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  const darkOverlay = "rgba(0,0,0,0.55)";
  const lightOverlay = "rgba(0,0,0,0.25)";

  const darkGradient =
    "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(244,106,37,0.12) 100%)";
  const lightGradient =
    "linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 40%, rgba(244,106,37,0.08) 100%)";

  const isDark = theme === "dark";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 md:w-[180%] md:h-[180%]">
          <iframe
            src="https://www.youtube.com/embed/OfmC5Q0x65Q?autoplay=1&mute=1&loop=1&playlist=OfmC5Q0x65Q&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&color=white&cc_load_policy=0"
            className="w-full h-full pointer-events-none"
            style={{ border: "none" }}
            allow="autoplay; encrypted-media; accelerometer; gyroscope"
            allowFullScreen={false}
            title="Background video"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>

      {/* Layer 1: overlay */}
      <div
        className="absolute inset-0"
        style={{ background: isDark ? darkOverlay : lightOverlay }}
      />

      {/* Layer 2: gradient */}
      <div
        className="absolute inset-0"
        style={{ background: isDark ? darkGradient : lightGradient }}
      />

      {/* Bottom fade to background */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-12 mx-auto">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`font-display text-3xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-4 ${
              isDark ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            Create Powerful Content.
            <br />
            <span className="bg-gradient-to-r from-[#f46a25] via-[#ff8a3d] to-[#f46a25] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-shift_10s_linear_infinite]">All In One Studio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className={`text-base md:text-lg max-w-lg leading-relaxed ${
              isDark ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            Podcasts, reels, interviews and corporate content produced in one place.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
