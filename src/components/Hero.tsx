import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const FloatingParticle = ({ index }: { index: number }) => {
  const size = 2 + Math.random() * 2;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const duration = 3 + Math.random() * 4;
  const delay = Math.random() * 3;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        background: index % 3 === 0
          ? "rgba(244,106,37,0.4)"
          : "rgba(255,255,255,0.15)",
      }}
      animate={{
        y: [0, -15, 0],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const wordAnimation = {
    hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: 0.15 + i * 0.08, ease: "easeOut" as const },
    }),
  };

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

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: isDark ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.4)" }}
      />


      {/* Cinematic bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[350px] md:h-[400px]"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 30%, hsl(var(--background) / 0.2) 65%, transparent 100%)",
        }}
      />

      {/* Subtle warm glow behind text area */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at 20% 80%, rgba(244,106,37,0.3), transparent 70%)",
        }}
      />

      {/* Cinematic lens flare — top right */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-[300px] h-[300px] pointer-events-none z-[3]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.15, 0.08, 0.15], scale: [0.8, 1, 0.95, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(244,106,37,0.2) 0%, rgba(255,138,61,0.05) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-5 md:px-12 mx-auto pb-28 md:pb-0">
        <div className="max-w-3xl">
          <h1 className="font-display text-[36px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6">
            <span className="block overflow-hidden">
              {["Your", "Vision"].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordAnimation}
                  className="inline-block mr-[0.25em] text-white"
                  style={{ fontWeight: 300 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>

            <span className="block overflow-hidden">
              {["Our", "Studio."].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i + 2}
                  initial="hidden"
                  animate="visible"
                  variants={wordAnimation}
                  className="inline-block mr-[0.25em]"
                  style={{
                    fontWeight: word === "Studio." ? 700 : 600,
                    ...(word === "Studio." ? {} : { color: "white" }),
                  }}
                >
                  {word === "Studio." ? (
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #f46a25 0%, #ff8a3d 30%, #ffb473 50%, #ff8a3d 70%, #f46a25 100%)",
                        backgroundSize: "300% auto",
                        animation: "gradient-shift 8s linear infinite",
                      }}
                    >
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
            className="text-[14px] md:text-[17px] max-w-md leading-[1.7] tracking-wide text-white/50"
            style={{ fontWeight: 300, letterSpacing: "0.02em" }}
          >
            Podcasts. Reels. Interviews. Branded content.
            <br />
            All produced under one roof.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
