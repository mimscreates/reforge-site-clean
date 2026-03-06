import { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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

      {/* Layer 1: Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.35)" }}
      />

      {/* Layer 2: Cinematic gradient — dark left, subtle orange right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(255,120,0,0.15) 100%)",
        }}
      />

      {/* Bottom fade to background */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />

      {/* Content — left-aligned in dark zone */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 mx-auto">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-primary-foreground mb-5"
          >
            Create Powerful Content.
            <br />
            <span className="text-primary">All In One Studio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg text-primary-foreground/70 max-w-lg leading-relaxed"
          >
            Podcasts, reels, interviews and corporate content produced in one place.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
