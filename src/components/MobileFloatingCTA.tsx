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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 right-0 z-50 lg:hidden"
        >
          <Link
            to="/packs?tab=custom"
            className="inline-flex items-center gap-2 justify-center rounded-l-full bg-primary text-white font-medium text-sm h-12 pl-5 pr-4 shadow-[0_4px_24px_-4px_hsl(20_91%_55%_/_0.5)]"
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
