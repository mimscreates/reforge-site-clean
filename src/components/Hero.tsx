import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
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

      {/* Orange-to-black vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--accent)) / 0.15 0%, transparent 25%, hsl(20 90% 20% / 0.4) 50%, hsl(0 0% 0% / 0.85) 80%, hsl(0 0% 0% / 1) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 mx-auto">
        {/* Main title */}
        <h1 className="font-display text-4xl lg:text-7xl leading-tight mb-6 md:text-5xl font-medium text-primary-foreground">
          All the content you need,
          <br />
          all in one place.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground">
          Podcasts, Reels booster, short films, photography and more..
        </p>
      </div>
    </section>
  );
};

export default Hero;
