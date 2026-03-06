import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileFloatingCTA = () => {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-4 z-50 lg:hidden"
        >
          <Link
            to="/build-session?tab=creator"
            className="inline-flex items-center gap-2 justify-center rounded-full bg-primary text-primary-foreground font-medium text-sm h-12 px-6 shadow-[0_4px_20px_-4px_hsl(20_91%_55%_/_0.5)] hover:shadow-[0_4px_28px_-4px_hsl(20_91%_55%_/_0.6)] transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            Book a Session
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileFloatingCTA;
