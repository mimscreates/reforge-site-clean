import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import kaunLogoWhite from "@/assets/kaun-logo.png";
import kaunLogoDark from "@/assets/kaun-logo-dark.png";

const Footer = () => {
  const { theme } = useTheme();
  const kaunLogo = theme === "dark" ? kaunLogoWhite : kaunLogoDark;

  return (
    <footer className="py-8 md:py-12 px-4 bg-background border-t border-border/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-3">
              <img src={kaunLogo} alt="KAUN Studios" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong className="text-foreground">KAUN STUDIOS</strong> — Premium podcast studio and audiovisual production based in L'Aouina, Tunis. Turnkey studios for podcasts, recording, photography and more.
            </p>
          </div>
          <div>
            <h4 className="font-display text-foreground font-semibold text-sm mb-3">Navigation</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">Home</Link>
              <Link to="/packs" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">Our Packs</Link>
              <Link to="/packs?tab=custom" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">Customize Session</Link>
              <Link to="/rent-your-space" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">Rent Your Space</Link>
              <Link to="/portfolio" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">Portfolio</Link>
              <Link to="/devis" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">Request a Quote</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-foreground font-semibold text-sm mb-3">Follow Us</h4>
            <div className="space-y-2 mb-5">
              <a href="https://www.instagram.com/kaun_studios/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary text-sm transition-colors">Instagram</a>
              <a href="https://www.facebook.com/Kaunstudiosandproduction" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary text-sm transition-colors">Facebook</a>
            </div>
            <Link to="/packs?tab=custom">
              <Button variant="cta-primary" className="font-medium text-sm h-9 px-5">Book a Session</Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
