import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-end md:items-center overflow-hidden bg-background">
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

      {/* Single dark overlay — clean, no side gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "rgba(0,0,0,0.6)"
            : "rgba(0,0,0,0.35)",
        }}
      />

      {/* Cinematic bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[300px] md:h-[350px]"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 35%, hsl(var(--background) / 0.2) 65%, transparent 100%)",
        }}
      />

      {/* Content — anchored lower on mobile */}
      <div className="relative z-10 w-full max-w-6xl px-5 md:px-12 mx-auto pb-24 md:pb-0">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-[38px] md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-5 text-white"
            style={{ fontWeight: 700 }}
          >
            Create Powerful Content
            <br />
            <span style={{ fontWeight: 700 }}>
              in{" "}
            </span>
            <span
              className="bg-gradient-to-r from-[#f46a25] via-[#ff8a3d] to-[#f46a25] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-shift_10s_linear_infinite]"
              style={{ fontWeight: 800 }}
            >
              One Studio
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-[15px] md:text-lg max-w-lg leading-relaxed text-white/60"
            style={{ fontWeight: 400 }}
          >
            Podcasts, reels, interviews and branded content
            <br className="hidden md:block" />
            {" "}produced in one place.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
