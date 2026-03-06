import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STUDIO_IMG = "https://framerusercontent.com/images/OJMPwpA9ckHsawcEn6bFf5b0cnU.jpg?width=4672&height=7008";

const services = [
  { title: "Podcast 🎙", description: "Record your podcast in a fully equipped studio optimized for professional sound. Need help? Our team guides you from concept to distribution." },
  { title: "Additional Services 📷", description: "A flexible space with custom options: extra cameras, microphones, photo packs, thumbnails, and subtitling to elevate your production." },
  { title: "Production 🎬", description: "Beyond studio rental, KAUN offers full production services — recording, editing, and post-production to bring your projects to life." },
];

const CreateMore = () => {
  return (
    <section className="py-10 md:py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-3">Create More, Consume Less</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base leading-relaxed">
          At Kaun Studios, we help creators produce podcasts and media projects — from recording and editing to distribution.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
          <div className="rounded-2xl overflow-hidden">
            <img src={STUDIO_IMG} alt="KAUN Studio" className="w-full h-[250px] md:h-[400px] object-cover rounded-2xl" loading="lazy" />
          </div>
          <div className="space-y-4 md:space-y-6">
            {services.map((service) => (
              <div key={service.title}>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
            <Link to="/creator-packs">
              <Button variant="cta" className="px-6 font-medium text-sm h-9">Book a Session</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateMore;
