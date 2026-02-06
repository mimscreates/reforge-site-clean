import { Button } from "@/components/ui/button";

const BOOKING_URL = "https://booking.kaunstudios.com/booking";

const images = [
  "https://framerusercontent.com/images/L9tFNYW2flStmdZ5kuRH7WO26Ck.jpg?width=7008&height=4672",
  "https://framerusercontent.com/images/OOqOxH8Tl6P7WYu0o8ITnflSLk0.jpg?width=3024&height=4032",
  "https://framerusercontent.com/images/UYbPnY8Sfu694K3Z3CAjTgTLS8A.jpg?width=4577&height=3051",
];

const StudioCarousel = () => {
  const allImages = [...images, ...images, ...images];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto text-center mb-12">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Studios podcasts Clé en main
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Découvrez nos <strong className="text-foreground">salles de podcast à exploiter à Tunis</strong>, un espace entièrement équipé pour réaliser vos enregistrements audio de haute qualité.
        </p>
      </div>

      {/* Scrolling carousel */}
      <div className="overflow-hidden mb-12">
        <div className="animate-marquee flex gap-6 w-max">
          {allImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Studio KAUN"
              className="h-64 md:h-80 w-auto rounded-xl object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-medium">
            Réserver ma session
          </Button>
        </a>
      </div>
    </section>
  );
};

export default StudioCarousel;
