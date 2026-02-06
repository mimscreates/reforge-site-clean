import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const BOOKING_URL = "https://booking.kaunstudios.com/booking";
const LOGO_URL = "https://framerusercontent.com/images/u6I7XJU9MR5jMeeqxKPjCdEdn64.jpg?width=891&height=891";
const navLinks = [{
  label: "Homepage",
  path: "/"
}, {
  label: "Nos packs",
  path: "/nos-packs"
}, {
  label: "Demande de devis",
  path: "/devis"
}];
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 bg-[#1c1c1c]">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={LOGO_URL} alt="KAUN Studios" className="h-10 w-10 rounded-lg object-cover" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? "text-foreground border-b-2 border-primary pb-0.5" : "text-muted-foreground"}`}>
              {link.label}
            </Link>)}
        </div>

        {/* CTA */}
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block">
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Réserver ma session
          </Button>
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && <div className="md:hidden bg-background border-t border-border px-4 py-6 space-y-4">
          {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground hover:text-primary">
              {link.label}
            </Link>)}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button className="w-full rounded-full bg-primary text-primary-foreground mt-2">
              Réserver ma session
            </Button>
          </a>
        </div>}
    </nav>;
};
export default Navbar;