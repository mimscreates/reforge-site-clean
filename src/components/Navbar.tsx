import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const LOGO_URL =
  "https://framerusercontent.com/images/u6I7XJU9MR5jMeeqxKPjCdEdn64.jpg?width=891&height=891";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Creator Packs", path: "/creator-packs" },
  { label: "Corporate Packs", path: "/corporate-packs" },
  { label: "Build Your Session", path: "/build-session" },
  { label: "Rent Your Space", path: "/rent-your-space" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Request a Quote", path: "/devis" },
];

const mobileNavGroups = [
  { label: "CREATE", items: [{ label: "Creator Packs", path: "/creator-packs" }] },
  { label: "WORK WITH US", items: [{ label: "Corporate Packs", path: "/corporate-packs" }, { label: "Build Your Session", path: "/build-session" }] },
  { label: "STUDIO", items: [{ label: "Rent Your Space", path: "/rent-your-space" }, { label: "Portfolio", path: "/portfolio" }] },
  { label: "CONTACT", items: [{ label: "Request a Quote", path: "/devis" }, { label: "Call Us", path: "tel:+21626934928", external: true }] },
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

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.path.startsWith("/#") ? (
                <button key={link.path} onClick={() => handleNav(link.path)} className="text-[13px] font-medium transition-colors hover:text-primary text-muted-foreground">{link.label}</button>
              ) : (
                <Link key={link.path} to={link.path} className={`text-[13px] font-medium transition-colors hover:text-primary ${location.pathname === link.path ? "text-foreground" : "text-muted-foreground"}`}>{link.label}</Link>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a href="tel:+21626934928" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" />Call Us
            </a>
            <Link to="/#creator-packs">
              <Button
                variant="cta"
                onClick={() => { if (location.pathname === "/") { const el = document.getElementById("creator-packs"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } }}
                className="font-medium text-[13px] h-8 px-4"
              >
                Book a Session
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button className="text-foreground" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
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
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><X size={18} /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                {mobileNavGroups.map((group, gi) => (
                  <motion.div key={group.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + gi * 0.06, duration: 0.35 }}>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/60 uppercase mb-3">{group.label}</p>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const isHash = item.path.startsWith("/#");
                        const isExternal = "external" in item && item.external;
                        const content = (
                          <span className="flex items-center justify-between w-full group/item">
                            <span className="text-foreground text-[15px] font-medium relative">
                              {item.label}
                              <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-primary transition-all duration-300 group-hover/item:w-full" />
                            </span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover/item:text-primary group-hover/item:translate-x-0.5 transition-all duration-200" />
                          </span>
                        );
                        if (isExternal) return <a key={item.path} href={item.path} className="block py-2.5 px-2 rounded-lg hover:bg-secondary/50 transition-colors">{content}</a>;
                        if (isHash) return <button key={item.path} onClick={() => handleNav(item.path)} className="block w-full text-left py-2.5 px-2 rounded-lg hover:bg-secondary/50 transition-colors">{content}</button>;
                        return <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="block py-2.5 px-2 rounded-lg hover:bg-secondary/50 transition-colors">{content}</Link>;
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.3 }} className="px-5 pb-6 pt-3 border-t border-border/50 space-y-2.5">
                <a href="tel:+21626934928" className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-border bg-secondary/50 text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                  <Phone className="w-4 h-4" />Call Us
                </a>
                <Link to="/#creator-packs" onClick={() => { setMobileOpen(false); if (location.pathname === "/") { setTimeout(() => { const el = document.getElementById("creator-packs"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); } }}>
                  <Button variant="cta" className="w-full font-medium text-sm h-10">Book a Session</Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
