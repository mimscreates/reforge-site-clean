import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { creatorPacks } from "@/components/CreatorPacks";
import { corporatePacks } from "@/components/CorporatePacks";

const CHECK_ICON =
  "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

interface PackRecommendationProps {
  sessionType: string;
  cameraCount: number;
  micCount: number;
  editing: string;
  clipCount: number;
  onViewPack: (tab: "creator" | "business") => void;
}

const packDescriptions: Record<string, string> = {
  Nova: "Simple recording setup — perfect for solo or audio-only podcasts.",
  Cosmic: "Full production with editing and reels — our most popular choice.",
  Interstellar: "Premium production with pro editing, reels, and multi-platform delivery.",
  Essential: "Monthly podcast production with editing and reels for your brand.",
  Growth: "Comprehensive monthly production with pro editing and social optimization.",
  Authority: "Full-service content production with strategy support and premium editing.",
};

function getRecommendedPack(
  sessionType: string,
  cameraCount: number,
  micCount: number,
  editing: string,
  clipCount: number
) {
  // Corporate session type → suggest corporate packs
  if (sessionType === "corporate") {
    if (editing === "pro-edit" || clipCount >= 4) {
      return { pack: corporatePacks[2], type: "business" as const }; // Authority
    }
    if (editing === "basic-edit" || clipCount >= 2) {
      return { pack: corporatePacks[1], type: "business" as const }; // Growth
    }
    return { pack: corporatePacks[0], type: "business" as const }; // Essential
  }

  // Creator packs
  if (editing === "pro-edit" || clipCount >= 4) {
    return { pack: creatorPacks[2], type: "creator" as const }; // Interstellar
  }
  if (editing === "basic-edit" || clipCount >= 2 || (cameraCount >= 2 && micCount >= 2)) {
    return { pack: creatorPacks[1], type: "creator" as const }; // Cosmic
  }
  return { pack: creatorPacks[0], type: "creator" as const }; // Nova
}

const PackRecommendation = ({
  sessionType,
  cameraCount,
  micCount,
  editing,
  clipCount,
  onViewPack,
}: PackRecommendationProps) => {
  const { pack, type } = useMemo(
    () => getRecommendedPack(sessionType, cameraCount, micCount, editing, clipCount),
    [sessionType, cameraCount, micCount, editing, clipCount]
  );

  const description = packDescriptions[pack.name] || "";
  const topFeatures = pack.features.slice(0, 4);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pack.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-primary/20 rounded-2xl p-5 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">Recommended Pack</p>
          </div>
        </div>

        {/* Pack info */}
        <div>
          <h4 className="font-display text-lg font-bold text-foreground">{pack.name}</h4>
          <p className="font-display text-xl text-primary font-bold">
            {pack.price} <span className="text-muted-foreground text-xs font-normal">{pack.unit}</span>
          </p>
        </div>

        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>

        {/* Features */}
        <div className="space-y-1.5">
          {topFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <img src={CHECK_ICON} alt="" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
              <span className="text-foreground text-xs">{feature}</span>
            </div>
          ))}
          {pack.features.length > 4 && (
            <p className="text-muted-foreground/60 text-[11px] pl-5.5">
              +{pack.features.length - 4} more included
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          variant="cta"
          onClick={() => onViewPack(type)}
          className="w-full font-medium text-sm h-9 gap-1.5"
        >
          View Pack <ArrowRight className="w-3.5 h-3.5" />
        </Button>

        {/* Nudge */}
        <p className="text-muted-foreground/50 text-[11px] text-center leading-snug">
          Most creators start with a studio pack instead of building a custom session.
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default PackRecommendation;
