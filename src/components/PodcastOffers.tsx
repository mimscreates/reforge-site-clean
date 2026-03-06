import { Button } from "@/components/ui/button";
const BOOKING_URL = "https://booking.kaunstudios.com/booking";
const CHECK_ICON = "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";
const packs = [{
  name: "Nova",
  price: "140 DT / Heure",
  icon: "https://framerusercontent.com/images/gQWzyee2rCoW54O9t13z7ZE6XP4.png?width=460&height=460",
  features: ["Audio", "Micro (1)", "Éclairage PRO", "Décor au choix", "Traitement Acoustique de la voix", "Assistance Technique", "Livraison en Raw", "3 jours de sauvegarde"]
}, {
  name: "Cosmic",
  price: "390 DT / Heure",
  icon: "https://framerusercontent.com/images/2csXmO7RwyjfEYIYohRsMH3TWw.png?width=453&height=468",
  features: ["Video + Audio", "Micro (2)", "Caméra (2)", "Éclairage PRO", "Décor au choix", "Assistance Technique", "Livraison Raw", "Vidéaste à disposition (1)", "7 jours de sauvegarde"]
}, {
  name: "Interstellar",
  price: "900 DT / Heure",
  icon: "https://framerusercontent.com/images/JF2AMJm138GDn7J5D5r5QYvaug.png?width=461&height=468",
  features: ["Video + Audio", "Micro (2)", "Caméra (2)", "Éclairage PRO", "Décor au choix", "Assistance Technique", "Livraison Raw", "Vidéaste à disposition (1)", "Révisions (2)", "Brief", "Montage", "14 jours de sauvegarde"]
}];
const PodcastOffers = () => {
  return <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-16 md:text-4xl">
          Our podcast Offers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packs.map(pack => <div key={pack.name} className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center">

              <img src={pack.icon} alt={pack.name} className="w-20 h-20 object-contain mb-6" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{pack.name}</h3>
              <p className="font-display text-xl text-primary font-bold mb-8">{pack.price}</p>

              <div className="space-y-3 w-full mb-8">
                {pack.features.map(feature => <div key={feature} className="flex items-center gap-3">
                    <img src={CHECK_ICON} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
                    <span className="text-foreground text-sm text-left">{feature}</span>
                  </div>)}
              </div>

              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                  Réserver ma session
                </Button>
              </a>
            </div>)}
        </div>
      </div>
    </section>;
};
export default PodcastOffers;