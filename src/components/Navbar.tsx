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
  { label: "Request a Quote", path: "/devis" },
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
      <div className="flex items-center justify-between h-14 px-5 md:px-8 w-full">
        <Link to="/" className="flex-shrink-0">
          <img src={LOGO_URL} alt="KAUN Studios" className="h-8 w-8 rounded-md object-cover" />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.path.startsWith("/#") ? (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className="text-[13px] font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+21626934928"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Us
          </a>
          <Link to="/#creator-packs">
            <Button
              onClick={() => {
                if (location.pathname === "/") {
                  const el = document.getElementById("creator-packs");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-[13px] h-8 px-4"
            >
              Book a Session
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50 px-5 py-5 space-y-3">
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
          <Link to="/#creator-packs" onClick={() => setMobileOpen(false)}>
            <Button className="w-full rounded-full bg-primary text-primary-foreground mt-1 h-9 text-sm">
              Book a Session
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
