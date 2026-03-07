import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Video, Scissors, Film, Sparkles, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";
import MobileStickyBar from "@/components/MobileStickyBar";
import PackRecommendation from "@/components/PackRecommendation";

// --- PRICING DATA ---

const BASE_SESSION_PRICE = 700;

const micPricing = [100, 200, 350];
const cameraPricing = [0, 200, 400, 600];
const clipPricing = [0, 200, 350, 600];
const clipValues = [0, 2, 4, 8];

const sessionTypes = [
  { id: "podcast", label: "Podcast Episode", price: 0 },
  { id: "interview", label: "Interview", price: 0 },
  { id: "social", label: "Social Media Content", price: 0 },
  { id: "corporate", label: "Corporate Podcast", price: 0 },
];

const editingOptions = [
  { id: "no-edit", label: "No Editing (RAW)", price: 0 },
  { id: "basic-edit", label: "Basic Editing", price: 250 },
  { id: "pro-edit", label: "Professional Editing", price: 450 },
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

interface SessionConfiguratorProps {
  onSwitchTab?: (tab: "creator" | "business") => void;
}

const SessionConfigurator = ({ onSwitchTab }: SessionConfiguratorProps) => {
  const [micCount, setMicCount] = useState(1);
  const [cameraCount, setCameraCount] = useState(1);
  const [clipIndex, setClipIndex] = useState(0);
  const [sessionType, setSessionType] = useState(sessionTypes[0].id);
  const [editing, setEditing] = useState(editingOptions[0].id);
  const [reelStyle, setReelStyle] = useState(reelStyles[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const micPrice = micPricing[micCount - 1];
  const cameraPrice = cameraPricing[cameraCount];
  const filmingPrice = micPrice + cameraPrice;
  const editingPrice = editingOptions.find((o) => o.id === editing)?.price || 0;
  const clipsPrice = clipPricing[clipIndex];
  const clipCount = clipValues[clipIndex];
  const reelPrice = reelStyles.find((o) => o.id === reelStyle)?.price || 0;
  const extrasPrice = extras
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const totalPrice = BASE_SESSION_PRICE + filmingPrice + editingPrice + clipsPrice + reelPrice + extrasPrice;

  const filmingLabel = `${cameraCount > 0 ? `${cameraCount} Camera${cameraCount > 1 ? "s" : ""}` : "Audio only"} + ${micCount} Mic${micCount > 1 ? "s" : ""}`;
  const sessionTypeLabel = sessionTypes.find((o) => o.id === sessionType)?.label || "";
  const editingLabel = editingOptions.find((o) => o.id === editing)?.label || "";
  const clipsLabel = clipCount === 0 ? "0 Clips" : `${clipCount} Clips`;
  const reelLabel = reelStyles.find((o) => o.id === reelStyle)?.label || "";
  const extrasLabels = extras.filter((e) => selectedExtras.includes(e.id)).map((e) => e.label);

  const configSummary = [
    filmingLabel, sessionTypeLabel, editingLabel,
    clipCount > 0 ? clipsLabel : null,
    reelLabel !== "Basic Cut" ? reelLabel : null,
    ...extrasLabels,
  ].filter(Boolean).join(", ");

  const handleViewPack = (tab: "creator" | "business") => {
    onSwitchTab?.(tab);
  };

  const packRecommendationProps = {
    sessionType,
    cameraCount,
    micCount,
    editing,
    clipCount,
    onViewPack: handleViewPack,
  };

  return (
    <>
      <section className="pb-24 lg:pb-20 px-1 sm:px-3 md:px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8">
            {/* LEFT: Configuration */}
            <div className="lg:col-span-2 space-y-3 md:space-y-10">
              <ConfigSection icon={<Video className="w-4 h-4 md:w-5 md:h-5" />} title="Filming Setup" subtitle="Configure cameras and microphones.">
                <div className="space-y-3">
                  <StepperRow label="Cameras" value={cameraCount} min={0} max={3} onChange={setCameraCount} price={cameraPrice} displayValue={cameraCount === 0 ? "None" : String(cameraCount)} />
                  <StepperRow label="Microphones" value={micCount} min={1} max={3} onChange={setMicCount} price={micPrice} />
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-muted-foreground text-xs">Setup total</span>
                    <span className="text-primary text-xs font-semibold">+{filmingPrice} DT</span>
                  </div>
                </div>
              </ConfigSection>

              <ConfigSection icon={<Mic className="w-4 h-4 md:w-5 md:h-5" />} title="Session Type" subtitle="What are you recording?">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {sessionTypes.map((o) => (
                    <OptionCard key={o.id} selected={sessionType === o.id} onClick={() => setSessionType(o.id)} label={o.label} price={o.price} showFree />
                  ))}
                </div>
              </ConfigSection>

              {/* Mobile recommendation after session type */}
              {onSwitchTab && (
                <div className="lg:hidden">
                  <PackRecommendation {...packRecommendationProps} />
                </div>
              )}

              <ConfigSection icon={<Scissors className="w-4 h-4 md:w-5 md:h-5" />} title="Podcast Editing" subtitle="Choose editing level.">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                  {editingOptions.map((o) => (
                    <OptionCard key={o.id} selected={editing === o.id} onClick={() => setEditing(o.id)} label={o.label} price={o.price} showFree />
                  ))}
                </div>
              </ConfigSection>

              <ConfigSection icon={<Film className="w-4 h-4 md:w-5 md:h-5" />} title="Social Media Clips" subtitle="How many clips from the session?">
                <StepperRow label="Clips" value={clipIndex} min={0} max={clipValues.length - 1} onChange={setClipIndex} price={clipsPrice} displayValue={String(clipCount)} />
              </ConfigSection>

              <ConfigSection icon={<Sparkles className="w-4 h-4 md:w-5 md:h-5" />} title="Reel Editing Style" subtitle="Choose a style for your social clips.">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                  {reelStyles.map((o) => (
                    <OptionCard key={o.id} selected={reelStyle === o.id} onClick={() => setReelStyle(o.id)} label={o.label} price={o.price} showFree />
                  ))}
                </div>
              </ConfigSection>

              <ConfigSection icon={<Sparkles className="w-4 h-4 md:w-5 md:h-5" />} title="Extra Options" subtitle="Add extras to your session.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
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

            {/* RIGHT: Summary + Recommendation (desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card border border-border rounded-2xl p-6 space-y-0"
                >
                  <h3 className="font-display text-xl font-bold text-foreground pb-4 border-b border-border/50">Session Summary</h3>
                  <div className="divide-y divide-border/30">
                    <div className="py-4"><SummaryRow label="Base Session" value="Studio, lighting, setup & technician" price={BASE_SESSION_PRICE} /></div>
                    <div className="py-4"><SummaryRow label="Filming Setup" value={filmingLabel} price={filmingPrice} /></div>
                    <div className="py-4"><SummaryRow label="Session Type" value={sessionTypeLabel} price={0} /></div>
                    <div className="py-4"><SummaryRow label="Editing" value={editingLabel} price={editingPrice} /></div>
                    <div className="py-4"><SummaryRow label="Social Clips" value={clipsLabel} price={clipsPrice} /></div>
                    <div className="py-4"><SummaryRow label="Reel Style" value={reelLabel} price={reelPrice} /></div>
                    {extrasLabels.length > 0 && (
                      <div className="py-4"><SummaryRow label="Extras" value={extrasLabels.join(", ")} price={extrasPrice} /></div>
                    )}
                  </div>
                  <div className="border-t border-border pt-5 mt-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-foreground">Estimated Total</span>
                      <span className="font-display text-2xl font-bold text-primary">{totalPrice} DT</span>
                    </div>
                  </div>
                  <Button variant="cta" onClick={() => setModalOpen(true)} className="w-full font-medium text-base py-6">
                    Reserve This Session
                  </Button>
                </motion.div>

                {/* Pack recommendation (desktop sidebar) */}
                {onSwitchTab && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <PackRecommendation {...packRecommendationProps} />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <BookingModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          selectedPack={`Custom Session: ${configSummary} — ${totalPrice} DT`}
        />

        <MobileStickyBar
          totalPrice={totalPrice}
          items={[
            { label: "Base Session", value: "Studio, lighting, setup & technician", price: BASE_SESSION_PRICE },
            { label: "Filming Setup", value: filmingLabel, price: filmingPrice },
            { label: "Session Type", value: sessionTypeLabel, price: 0 },
            { label: "Editing", value: editingLabel, price: editingPrice },
            { label: "Social Clips", value: clipsLabel, price: clipsPrice },
            { label: "Reel Style", value: reelLabel, price: reelPrice },
            ...(extrasLabels.length > 0 ? [{ label: "Extras", value: extrasLabels.join(", "), price: extrasPrice }] : []),
          ]}
          onReserve={() => setModalOpen(true)}
        />
      </section>
    </>
  );
};

// --- Sub-components ---

function StepperRow({ label, value, min, max, onChange, price, displayValue }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void; price: number; displayValue?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-foreground text-xs md:text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0">
          <button onClick={() => value > min && onChange(value - 1)} disabled={value <= min} className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-l-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="w-10 h-8 md:h-9 flex items-center justify-center border-y border-border bg-background text-foreground text-xs md:text-sm font-semibold">
            {displayValue ?? value}
          </div>
          <button onClick={() => value < max && onChange(value + 1)} disabled={value >= max} className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-r-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="text-primary text-xs font-semibold w-16 text-right whitespace-nowrap">
          {price > 0 ? `+${price} DT` : "—"}
        </span>
      </div>
    </div>
  );
}

function ConfigSection({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-2xl p-3 sm:p-4 md:p-6 overflow-hidden"
    >
      <div className="flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
        <div className="text-primary">{icon}</div>
        <h3 className="font-display text-sm md:text-lg font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-5">{subtitle}</p>
      {children}
    </motion.div>
  );
}

function OptionCard({ selected, onClick, label, price, showFree, multi }: {
  selected: boolean; onClick: () => void; label: string; price: number; showFree?: boolean; multi?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 md:p-4 rounded-[10px] md:rounded-xl border text-left transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/10 shadow-[0_0_20px_-6px_hsl(20_90%_55%_/_0.3)]"
          : "border-border bg-secondary/50 hover:border-muted-foreground/40"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {selected && <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0" />}
        <span className="text-foreground text-xs md:text-sm font-medium truncate">{label}</span>
      </div>
      <span className="text-primary text-xs font-semibold whitespace-nowrap shrink-0">
        {price === 0 && showFree ? "Included" : price === 0 ? "—" : `+${price} DT`}
      </span>
    </button>
  );
}

function SummaryRow({ label, value, price }: { label: string; value: string; price: number }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-foreground text-sm">{value}</p>
      </div>
      <span className="text-primary text-sm font-semibold whitespace-nowrap">
        {price > 0 ? `${price} DT` : "—"}
      </span>
    </div>
  );
}

export default SessionConfigurator;
