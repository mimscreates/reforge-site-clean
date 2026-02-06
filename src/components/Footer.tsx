import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LOGO_URL = "https://framerusercontent.com/images/u6I7XJU9MR5jMeeqxKPjCdEdn64.jpg";
const BOOKING_URL = "https://booking.kaunstudios.com/booking";

const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-background border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="KAUN Studios" className="h-12 w-12 rounded-lg object-cover" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong className="text-foreground">KAUN STUDIOS</strong> – Studio de podcast et production audiovisuelle premium situé à L'Aouina, Tunis. Des studios clé en main à louer pour podcast ainsi que des services de production, enregistrement, photos et autre.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-foreground font-bold mb-4">Navigation</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Homepage
              </Link>
              <Link to="/nos-packs" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Nos packs
              </Link>
              <Link to="/devis" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Demande de devis
              </Link>
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="font-display text-foreground font-bold mb-4">Suivez-nous</h4>
            <div className="space-y-3 mb-6">
              <a
                href="https://www.instagram.com/kaun_studios/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/Kaunstudiosandproduction"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Facebook
              </a>
            </div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                Réserver ma session
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
