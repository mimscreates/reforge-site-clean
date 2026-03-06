import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Video, Scissors, Film, Sparkles, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";

// --- PRICING DATA ---

const BASE_SESSION_PRICE = 700;
const BASE_SESSION_INCLUDES = [
  "Studio access",
  "Lighting",
  "Technical setup",
  "Technician",
  "Recording session",
];

const filmingOptions = [
  { id: "audio-1mic", label: "1 Microphone", category: "Audio Podcast", price: 100 },
  { id: "audio-2mic", label: "2 Microphones", category: "Audio Podcast", price: 200 },
  { id: "audio-3mic", label: "3 Microphones", category: "Audio Podcast", price: 350 },
  { id: "video-1c1m", label: "1 Camera + 1 Microphone", category: "Video Podcast", price: 300 },
  { id: "video-2c2m", label: "2 Cameras + 2 Microphones", category: "Video Podcast", price: 600 },
  { id: "video-3c2m", label: "3 Cameras + 2 Microphones", category: "Video Podcast", price: 900 },
];

const sessionTypes = [
  { id: "podcast", label: "Podcast Episode", price: 0 },
  { id: "interview", label: "Interview", price: 0 },
  { id: "social", label: "Social Media Content", price: 0 },
  { id: "corporate", label: "Corporate Podcast", price: 0 },
];

const editingOptions = [
  { id: "no-edit", label: "No Editing (RAW delivery)", price: 0 },
  { id: "basic-edit", label: "Basic Editing", price: 250 },
  { id: "pro-edit", label: "Professional Editing", price: 450 },
];

const clipOptions = [
  { id: "0-clips", label: "0 Clips", price: 0 },
  { id: "2-clips", label: "2 Clips", price: 200 },
  { id: "4-clips", label: "4 Clips", price: 350 },
  { id: "8-clips", label: "8 Clips", price: 600 },
];

const reelStyles = [
  { id: "basic-cut", label: "Basic Cut", price: 0 },
  { id: "captions", label: "Captions + Subtitles", price: 120 },
  { id: "viral", label: "Viral Style Editing", price: 300 },
];

const extras = [
  { id: "thumbnail", label: "Thumbnail Design", price: 80 },
  { id: "social-format", label: "Social Media Formatting", price: 100 },
  { id: "priority", label: "Priority Delivery (48h)", price: 150 },
  { id: "optimization", label: "Content Optimization", price: 120 },
  { id: "multi-platform", label: "Multi-Platform Content Pack", price: 200 },
];

// --- COMPONENT ---

const CHECK_ICON = "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

const SessionConfigurator = () => {
  const [filming, setFilming] = useState(filmingOptions[3].id);
  const [sessionType, setSessionType] = useState(sessionTypes[0].id);
  const [editing, setEditing] = useState(editingOptions[0].id);
  const [clips, setClips] = useState(clipOptions[0].id);
  const [reelStyle, setReelStyle] = useState(reelStyles[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  // Compute total
  const filmingPrice = filmingOptions.find((o) => o.id === filming)?.price || 0;
  const sessionTypePrice = 0;
  const editingPrice = editingOptions.find((o) => o.id === editing)?.price || 0;
  const clipsPrice = clipOptions.find((o) => o.id === clips)?.price || 0;
  const reelPrice = reelStyles.find((o) => o.id === reelStyle)?.price || 0;
  const extrasPrice = extras
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const totalPrice = BASE_SESSION_PRICE + filmingPrice + editingPrice + clipsPrice + reelPrice + extrasPrice;

  // Summary labels
  const filmingLabel = filmingOptions.find((o) => o.id === filming)?.label || "";
  const sessionTypeLabel = sessionTypes.find((o) => o.id === sessionType)?.label || "";
  const editingLabel = editingOptions.find((o) => o.id === editing)?.label || "";
  const clipsLabel = clipOptions.find((o) => o.id === clips)?.label || "";
  const reelLabel = reelStyles.find((o) => o.id === reelStyle)?.label || "";
  const extrasLabels = extras.filter((e) => selectedExtras.includes(e.id)).map((e) => e.label);

  const configSummary = [
    filmingLabel,
    sessionTypeLabel,
    editingLabel,
    clipsLabel !== "0 Clips" ? clipsLabel : null,
    reelLabel !== "Basic Cut" ? reelLabel : null,
    ...extrasLabels,
  ].filter(Boolean).join(", ");

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Build Your Session
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Configure your podcast production session and get an instant quote.
          </p>
        </motion.div>

        {/* Pack recommendation note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 p-4 rounded-xl border border-border bg-card/50 max-w-2xl mx-auto"
        >
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            Custom sessions are flexible but usually more expensive than our recommended studio packs.
          </p>
          <a
            href="/nos-packs#creator-packs"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-medium whitespace-nowrap hover:underline"
          >
            View Recommended Packs <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Configuration */}
          <div className="lg:col-span-2 space-y-10">
            {/* SECTION 1 — Filming Setup */}
            <ConfigSection icon={<Video className="w-5 h-5" />} title="Filming Setup" subtitle="Choose the production setup.">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Audio Podcast</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {filmingOptions.filter((o) => o.category === "Audio Podcast").map((o) => (
                    <OptionCard key={o.id} selected={filming === o.id} onClick={() => setFilming(o.id)} label={o.label} price={o.price} />
                  ))}
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold pt-4">Video Podcast</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {filmingOptions.filter((o) => o.category === "Video Podcast").map((o) => (
                    <OptionCard key={o.id} selected={filming === o.id} onClick={() => setFilming(o.id)} label={o.label} price={o.price} />
                  ))}
                </div>
              </div>
            </ConfigSection>

            {/* SECTION 2 — Session Type */}
            <ConfigSection icon={<Mic className="w-5 h-5" />} title="Session Type" subtitle="What are you recording?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sessionTypes.map((o) => (
                  <OptionCard key={o.id} selected={sessionType === o.id} onClick={() => setSessionType(o.id)} label={o.label} price={o.price} showFree />
                ))}
              </div>
            </ConfigSection>

            {/* SECTION 3 — Editing */}
            <ConfigSection icon={<Scissors className="w-5 h-5" />} title="Podcast Editing" subtitle="Choose editing level.">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {editingOptions.map((o) => (
                  <OptionCard key={o.id} selected={editing === o.id} onClick={() => setEditing(o.id)} label={o.label} price={o.price} showFree />
                ))}
              </div>
            </ConfigSection>

            {/* SECTION 4 — Social Media Clips */}
            <ConfigSection icon={<Film className="w-5 h-5" />} title="Social Media Clips" subtitle="How many clips do you want from the session?">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {clipOptions.map((o) => (
                  <OptionCard key={o.id} selected={clips === o.id} onClick={() => setClips(o.id)} label={o.label} price={o.price} showFree />
                ))}
              </div>
            </ConfigSection>

            {/* SECTION 5 — Reel Editing Style */}
            <ConfigSection icon={<Sparkles className="w-5 h-5" />} title="Reel Editing Style" subtitle="Choose a style for your social clips.">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {reelStyles.map((o) => (
                  <OptionCard key={o.id} selected={reelStyle === o.id} onClick={() => setReelStyle(o.id)} label={o.label} price={o.price} showFree />
                ))}
              </div>
            </ConfigSection>

            {/* SECTION 6 — Extras */}
            <ConfigSection icon={<Sparkles className="w-5 h-5" />} title="Extra Options" subtitle="Add extras to your session.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extras.map((o) => (
                  <OptionCard
                    key={o.id}
                    selected={selectedExtras.includes(o.id)}
                    onClick={() => toggleExtra(o.id)}
                    label={o.label}
                    price={o.price}
                    multi
                  />
                ))}
              </div>
            </ConfigSection>
          </div>

          {/* RIGHT: Summary Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-6"
              >
                <h3 className="font-display text-xl font-bold text-foreground">Session Summary</h3>

                <SummaryRow label="Base Session" value="Studio, lighting, setup & technician" price={BASE_SESSION_PRICE} />
                <SummaryRow label="Filming Setup" value={filmingLabel} price={filmingPrice} />
                <SummaryRow label="Session Type" value={sessionTypeLabel} price={0} />
                <SummaryRow label="Editing" value={editingLabel} price={editingPrice} />
                <SummaryRow label="Social Clips" value={clipsLabel} price={clipsPrice} />
                <SummaryRow label="Reel Style" value={reelLabel} price={reelPrice} />
                {extrasLabels.length > 0 && (
                  <SummaryRow label="Extras" value={extrasLabels.join(", ")} price={extrasPrice} />
                )}

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-foreground">Estimated Total</span>
                    <span className="font-display text-2xl font-bold text-primary">{totalPrice} DT</span>
                  </div>
                </div>

                <Button
                  onClick={() => setModalOpen(true)}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base py-6"
                >
                  Reserve This Session
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedPack={`Custom Session: ${configSummary} — ${totalPrice} DT`}
      />
    </section>
  );
};

// --- Sub-components ---

function ConfigSection({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="text-primary">{icon}</div>
        <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-5">{subtitle}</p>
      {children}
    </motion.div>
  );
}

function OptionCard({ selected, onClick, label, price, showFree, multi }: {
  selected: boolean;
  onClick: () => void;
  label: string;
  price: number;
  showFree?: boolean;
  multi?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-start gap-1 p-4 rounded-xl border text-left transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/10 shadow-[0_0_20px_-6px_hsl(20_90%_55%_/_0.3)]"
          : "border-border bg-secondary/50 hover:border-muted-foreground/40"
      }`}
    >
      {selected && (
        <div className="absolute top-2 right-2">
          <Check className="w-4 h-4 text-primary" />
        </div>
      )}
      <span className="text-foreground text-sm font-medium pr-5">{label}</span>
      <span className="text-primary text-xs font-semibold">
        {price === 0 && showFree ? "Included" : price === 0 ? "—" : `+${price} DT`}
      </span>
    </button>
  );
}

function SummaryRow({ label, value, price }: { label: string; value: string; price: number }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-foreground text-sm">{value}</p>
      </div>
      <span className="text-primary text-sm font-semibold whitespace-nowrap">
        {price > 0 ? `${price} DT` : "—"}
      </span>
    </div>
  );
}

export default SessionConfigurator;
