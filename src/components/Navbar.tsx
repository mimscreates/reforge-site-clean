import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import kaunLogo from "@/assets/kaun-logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Packs", path: "/packs" },
  { label: "Work", path: "/portfolio" },
  { label: "Customize", path: "/build-session" },
  { label: "Rent Our Studios", path: "/rent-your-space" },
  { label: "Contact Us", path: "/devis" },
];

const NavItem = ({ link, isActive }: { link: typeof navLinks[0]; isActive: boolean }) => {
  return (
    <motion.div
      className="relative"
      whileHover="hover"
    >
      <Link
        to={link.path}
        className={`relative text-[13px] xl:text-[15px] font-medium transition-colors px-1 py-1 whitespace-nowrap ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <motion.span
          className="inline-block"
          variants={{
            hover: { y: -2, color: "hsl(20, 91%, 55%)" },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {link.label}
        </motion.span>
        <motion.span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
          variants={{
            hover: { scale: 1, opacity: 1 },
          }}
          initial={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        />
      </Link>
    </motion.div>
  );
};

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

  const pillBg = theme === "dark" ? "rgba(10,10,10,0.6)" : "rgba(255,255,255,0.75)";
  const pillBorder = theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)";

  return (
    <>
      {/* Desktop floating pill navbar */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block rounded-full px-1.5"
        style={{
          background: pillBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: pillBorder,
          boxShadow: theme === "dark"
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-center gap-1 h-11 px-2 whitespace-nowrap">
          {/* Logo in circle */}
          <Link to="/" className="flex-shrink-0 mr-2">
            <div className="w-8 h-8 rounded-full bg-foreground/[0.07] flex items-center justify-center p-1.5">
              <img src={kaunLogo} alt="KAUN Studios" className="h-full w-full object-contain" />
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-2 xl:gap-4">
            {navLinks.map((link) => (
              <NavItem key={link.path} link={link} isActive={location.pathname === link.path} />
            ))}
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-border/50 mx-2" />

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href="tel:+21626934928"
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-colors"
              aria-label="Call Us"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <Link to="/build-session">
              <Button
                variant="cta-primary"
                className="font-medium text-[12px] h-7 px-4 rounded-full"
              >
                Book a Session
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile top bar — unchanged */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 lg:hidden"
        style={{
          background: theme === "dark" ? "rgba(10,10,10,0.55)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-center justify-between h-14 px-5 w-full">
          <Link to="/" className="flex-shrink-0">
            <img src={kaunLogo} alt="KAUN Studios" className="h-4 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
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

      {/* Mobile slide-out menu — unchanged */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[60] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border flex flex-col">
              <div className="flex items-center justify-between px-5 h-14 border-b border-border/50">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex-shrink-0">
                  <img src={kaunLogo} alt="KAUN Studios" className="h-6 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-secondary/50 transition-colors"
                  aria-label="Close menu"
                >
                  <motion.span animate={{ rotate: 45, y: 7 }} className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center" />
                  <motion.span animate={{ opacity: 0 }} className="block w-5 h-[1.5px] bg-foreground rounded-full" />
                  <motion.span animate={{ rotate: -45, y: -7 }} className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center" />
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
