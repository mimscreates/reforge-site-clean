import { Button } from "@/components/ui/button";

const BOOKING_URL = "https://booking.kaunstudios.com/booking";
const STUDIO_IMG = "https://framerusercontent.com/images/OJMPwpA9ckHsawcEn6bFf5b0cnU.jpg?width=4672&height=7008";

const services = [
  {
    title: "Podcast 🎙",
    description:
      "Enregistrez votre podcast dans un studio équipé et optimisé pour un son pro. Besoin d'aide ? Notre équipe vous accompagne de l'idée à la diffusion. Nous sommes basés au cœur de Tunis, à \"L'aouina\". Si vous cherchez le meilleur studio de podcast à louer en Tunisie.",
  },
  {
    title: "Services supplémentaires 📷",
    description:
      "Un espace modulable avec des options sur mesure : caméras supplémentaires, micros additionnels, pack de photos thumbnails et sous-titrage pour sublimer votre production.",
  },
  {
    title: "Production 🎬",
    description:
      "Au-delà de la location, KAUN propose des services de production : enregistrement, montage et post-production pour donner vie à vos projets.",
  },
];

const CreateMore = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-6">
          Create more consume less
        </h2>

        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
          Chez Kaun Studios, nous accompagnons les créateurs dans la production de podcasts et de projets médias : de l'enregistrement au montage, jusqu'à la diffusion.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src={STUDIO_IMG}
              alt="Studio KAUN"
              className="w-full h-[500px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>

          {/* Services */}
          <div className="space-y-8">
            {services.map((service) => (
              <div key={service.title}>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}

            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 font-medium">
                Réserver ma session
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateMore;
