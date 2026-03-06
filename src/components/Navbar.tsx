import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOGO_URL =
  "https://framerusercontent.com/images/u6I7XJU9MR5jMeeqxKPjCdEdn64.jpg?width=891&height=891";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Creator Packs", path: "/#creator-packs" },
  { label: "Corporate Packs", path: "/#corporate-packs" },
  { label: "Build Your Session", path: "/build-session" },
  { label: "Rent Your Space", path: "/rent-your-space" },
  { label: "Demande de devis", path: "/devis" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNav = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = path;
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10,10,10,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between h-16 px-6 md:px-8 w-full">
        <Link to="/" className="flex-shrink-0">
          <img
            src={LOGO_URL}
            alt="KAUN Studios"
            className="h-10 w-10 rounded-lg object-cover"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.path.startsWith("/#") ? (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-foreground border-b-2 border-primary pb-0.5"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+21626934928"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
          <Button
            onClick={() => {
              const el = document.getElementById("creator-packs");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          >
            Book a Session
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-6 space-y-4">
          {navLinks.map((link) =>
            link.path.startsWith("/#") ? (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className="block text-sm font-medium text-foreground hover:text-primary"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="tel:+21626934928"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
          <Button
            onClick={() => {
              setMobileOpen(false);
              const el = document.getElementById("creator-packs");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="w-full rounded-full bg-primary text-primary-foreground mt-2"
          >
            Book a Session
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
