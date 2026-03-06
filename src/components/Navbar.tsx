import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const LOGO_URL =
  "https://framerusercontent.com/images/u6I7XJU9MR5jMeeqxKPjCdEdn64.jpg?width=891&height=891";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Our Packs", path: "/packs" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Build Your Session", path: "/build-session" },
  { label: "Rent Your Space", path: "/rent-your-space" },
  { label: "Request a Quote", path: "/devis" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

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

  const navBg = theme === "dark" ? "rgba(10,10,10,0.55)" : "rgba(255,255,255,0.7)";
  const navBorder = theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: navBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: navBorder }}>
        <div className="flex items-center justify-between h-14 px-5 md:px-8 w-full">
          <Link to="/" className="flex-shrink-0">
            <img src={LOGO_URL} alt="KAUN Studios" className="h-8 w-8 rounded-md object-cover" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.path.startsWith("/#") ? (
                <button key={link.path} onClick={() => handleNav(link.path)} className="text-[13px] font-medium transition-colors hover:text-primary text-muted-foreground">{link.label}</button>
              ) : (
                <Link key={link.path} to={link.path} className={`text-[13px] font-medium transition-colors hover:text-primary ${location.pathname === link.path ? "text-foreground" : "text-muted-foreground"}`}>{link.label}</Link>
              )
            )}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a href="tel:+21626934928" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" />Call Us
            </a>
            <Link to="/build-session">
              <Button
                variant="cta-primary"
                className="font-medium text-[13px] h-8 px-4"
              >
                Book a Session
              </Button>
            </Link>
          </div>

          {/* Mobile right — theme toggle + CTA + hamburger always visible */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Link to="/build-session">
              <Button variant="cta" className="font-medium text-[11px] h-7 px-3 rounded-md">
                Book
              </Button>
            </Link>
            {/* Modern hamburger icon */}
            <button
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-secondary/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-[1.5px] bg-foreground rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[60] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border flex flex-col">
              <div className="flex items-center justify-between px-5 h-14 border-b border-border/50">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex-shrink-0">
                  <img src={LOGO_URL} alt="KAUN Studios" className="h-7 w-7 rounded-md object-cover" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-secondary/50 transition-colors"
                  aria-label="Close menu"
                >
                  <motion.span
                    animate={{ rotate: 45, y: 7 }}
                    className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center"
                  />
                  <motion.span animate={{ opacity: 0 }} className="block w-5 h-[1.5px] bg-foreground rounded-full" />
                  <motion.span
                    animate={{ rotate: -45, y: -7 }}
                    className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center"
                  />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                {navLinks.map((link, i) => {
                  const isHash = link.path.startsWith("/#");
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div key={link.path} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}>
                      {isHash ? (
                        <button onClick={() => handleNav(link.path)} className="block w-full text-left py-3 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-[15px] font-medium text-muted-foreground">
                          {link.label}
                        </button>
                      ) : (
                        <Link to={link.path} onClick={() => setMobileOpen(false)} className={`block py-3 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-[15px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.3 }} className="px-6 pb-7 pt-5 border-t border-border/50 space-y-4">
                <Link to="/build-session" onClick={() => setMobileOpen(false)}>
                  <Button variant="cta-primary" className="w-full font-medium text-sm h-12 rounded-lg gap-2">
                    Book a Session
                  </Button>
                </Link>
                <a href="tel:+21626934928" className="flex items-center justify-center gap-2 w-full h-12 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors">
                  <Phone className="w-4 h-4" />Call Us
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
