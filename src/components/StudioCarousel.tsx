import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const images = [
  "https://framerusercontent.com/images/L9tFNYW2flStmdZ5kuRH7WO26Ck.jpg?width=7008&height=4672",
  "https://framerusercontent.com/images/OOqOxH8Tl6P7WYu0o8ITnflSLk0.jpg?width=3024&height=4032",
  "https://framerusercontent.com/images/UYbPnY8Sfu694K3Z3CAjTgTLS8A.jpg?width=4577&height=3051",
];

const StudioCarousel = () => {
  const allImages = [...images, ...images, ...images];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto text-center mb-10">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">Turnkey Podcast Studios</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Discover our <strong className="text-foreground">podcast studios in Tunis</strong> — fully equipped spaces for high-quality audio and video recording.
        </p>
      </div>
      <div className="overflow-hidden mb-10">
        <div className="animate-marquee flex gap-4 w-max">
          {allImages.map((src, i) => (
            <img key={i} src={src} alt="KAUN Studio" className="h-52 md:h-72 w-auto rounded-lg object-cover" loading="lazy" />
          ))}
        </div>
      </div>
      <div className="text-center">
        <Link to="/#creator-packs">
          <Button variant="cta" className="px-6 text-sm font-medium h-9">Book a Session</Button>
        </Link>
      </div>
    </section>
  );
};

export default StudioCarousel;
