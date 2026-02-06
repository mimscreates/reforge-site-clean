const PLANET_1 = "https://framerusercontent.com/images/84MFnAe74y4hlrsDHuvFZ1SxieU.png?width=202&height=222";
const PLANET_2 = "https://framerusercontent.com/images/qopnKUTMJBba0h7cOAZJ2my38OM.png?width=238&height=220";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <iframe src="https://www.youtube.com/embed/OfmC5Q0x65Q?autoplay=1&mute=1&loop=1&playlist=OfmC5Q0x65Q&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1" className="absolute top-1/2 left-1/2 w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
        border: 'none'
      }} allow="autoplay; encrypted-media" title="Background video" />
      </div>
      {/* Orange-to-black vignette overlay */}
      <div className="absolute inset-0" style={{
      background: `
            radial-gradient(ellipse at center, transparent 20%, hsl(20 90% 20% / 0.4) 50%, hsl(0 0% 0% / 0.85) 80%, hsl(0 0% 0% / 1) 100%)
          `
    }} />

      {/* Content */}
      
    </section>;
};
export default Hero;