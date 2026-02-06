const HERO_BG = "https://framerusercontent.com/images/L9tFNYW2flStmdZ5kuRH7WO26Ck.jpg?width=7008&height=4672";
const PLANET_1 = "https://framerusercontent.com/images/84MFnAe74y4hlrsDHuvFZ1SxieU.png?width=202&height=222";
const PLANET_2 = "https://framerusercontent.com/images/qopnKUTMJBba0h7cOAZJ2my38OM.png?width=238&height=220";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Planets + tagline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex -space-x-3">
            <img src={PLANET_1} alt="" className="w-10 h-10 object-contain" />
            <img src={PLANET_2} alt="" className="w-10 h-10 object-contain" />
          </div>
          <div className="text-left">
            <p className="text-primary font-display text-sm md:text-base">+100 billion</p>
            <p className="text-foreground text-sm md:text-base">Planets but you deserve your own</p>
          </div>
        </div>

        {/* Main title */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
          All the content you need,
          <br />
          all in one place.
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          Podcasts, Reels booster, short films, photography and more..
        </p>
      </div>
    </section>
  );
};

export default Hero;
