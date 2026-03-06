import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Camera, Mic, Scissors, Film, Sparkles, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";
import MobileStickyBar from "@/components/MobileStickyBar";

// --- PRICING ---
const HOURLY_RATE = 120;
const MIC_PRICE = 100;
const CAMERA_PRICE = 300;

const editingOptions = [
  { id: "no-edit", label: "No Editing (RAW)", price: 0 },
  { id: "basic-edit", label: "Basic Editing", price: 200 },
  { id: "pro-edit", label: "Professional Editing", price: 450 },
];

const clipOptions = [
  { id: "0-clips", label: "0 Clips", price: 0 },
  { id: "2-clips", label: "2 Clips", price: 150 },
  { id: "4-clips", label: "4 Clips", price: 280 },
  { id: "8-clips", label: "8 Clips", price: 500 },
];

const extras = [
  { id: "thumbnail", label: "Thumbnail Design", price: 80 },
  { id: "social-format", label: "Social Media Formatting", price: 100 },
  { id: "priority", label: "Priority Delivery (48h)", price: 150 },
  { id: "optimization", label: "Content Optimization", price: 120 },
];

// --- COMPONENT ---

const RentalConfigurator = () => {
  const [hours, setHours] = useState(1);
  const [cameras, setCameras] = useState(0);
  const [mics, setMics] = useState(0);
  const [editing, setEditing] = useState(editingOptions[0].id);
  const [clips, setClips] = useState(clipOptions[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  // Prices
  const studioPrice = hours * HOURLY_RATE;
  const cameraPrice = cameras * CAMERA_PRICE;
  const micPrice = mics * MIC_PRICE;
  const editingPrice = editingOptions.find((o) => o.id === editing)?.price || 0;
  const clipsPrice = clipOptions.find((o) => o.id === clips)?.price || 0;
  const extrasPrice = extras
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const totalPrice = studioPrice + cameraPrice + micPrice + editingPrice + clipsPrice + extrasPrice;

  // Labels
  const editingLabel = editingOptions.find((o) => o.id === editing)?.label || "";
  const clipsLabel = clipOptions.find((o) => o.id === clips)?.label || "";
  const extrasLabels = extras.filter((e) => selectedExtras.includes(e.id)).map((e) => e.label);

  const configSummary = [
    `Studio ${hours}h`,
    cameras > 0 ? `${cameras} Camera${cameras > 1 ? "s" : ""}` : null,
    mics > 0 ? `${mics} Mic${mics > 1 ? "s" : ""}` : null,
    editingLabel,
    clipsLabel !== "0 Clips" ? clipsLabel : null,
    ...extrasLabels,
  ].filter(Boolean).join(", ");

  const summaryItems = [
    { label: "Studio Rental", value: `${hours} hour${hours > 1 ? "s" : ""} × ${HOURLY_RATE} DT`, price: studioPrice },
    { label: "Cameras", value: cameras > 0 ? `${cameras} × ${CAMERA_PRICE} DT` : "None", price: cameraPrice },
    { label: "Microphones", value: mics > 0 ? `${mics} × ${MIC_PRICE} DT` : "None", price: micPrice },
    { label: "Editing", value: editingLabel, price: editingPrice },
    { label: "Social Clips", value: clipsLabel, price: clipsPrice },
    ...(extrasLabels.length > 0 ? [{ label: "Extras", value: extrasLabels.join(", "), price: extrasPrice }] : []),
  ];

  return (
    <>
      <section className="py-12 md:py-20 pb-24 lg:pb-20 px-3 md:px-4 bg-background">
        <div className="container mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-8"
          >
            <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
              Rent Our Studio
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              Need a professional space to shoot your content? Rent our fully equipped studio by the hour and add only the equipment you need.
            </p>
          </motion.div>

          {/* Included note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8 md:mb-16 p-3 md:p-4 rounded-xl border border-border bg-card/50 max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground text-xs md:text-sm text-center mb-2">
              <span className="text-foreground font-semibold">{HOURLY_RATE} DT / hour</span> — includes:
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-muted-foreground text-xs">
              {["Professional lighting", "Studio access", "Choice of decor", "Power access", "Basic technical assistance"].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-primary" /> {item}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground/60 text-[11px] text-center mt-2">
              Camera and microphones are not included — add them below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-4 md:space-y-10">
              {/* Studio Rental */}
              <ConfigSection icon={<Clock className="w-4 h-4 md:w-5 md:h-5" />} title="Studio Rental" subtitle="Select how many hours you need.">
                <StepperRow label="Hours" value={hours} min={1} max={12} onChange={setHours} price={studioPrice} />
              </ConfigSection>

              {/* Equipment */}
              <ConfigSection icon={<Camera className="w-4 h-4 md:w-5 md:h-5" />} title="Equipment" subtitle="Add cameras and microphones to your session.">
                <div className="space-y-1">
                  <StepperRow label="Cameras" value={cameras} min={0} max={4} onChange={setCameras} price={cameraPrice} />
                  <StepperRow label="Microphones" value={mics} min={0} max={4} onChange={setMics} price={micPrice} />
                </div>
              </ConfigSection>

              {/* Editing */}
              <ConfigSection icon={<Scissors className="w-4 h-4 md:w-5 md:h-5" />} title="Editing" subtitle="Choose editing level.">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                  {editingOptions.map((o) => (
                    <OptionCard key={o.id} selected={editing === o.id} onClick={() => setEditing(o.id)} label={o.label} price={o.price} showFree />
                  ))}
                </div>
              </ConfigSection>

              {/* Social Clips */}
              <ConfigSection icon={<Film className="w-4 h-4 md:w-5 md:h-5" />} title="Social Clips" subtitle="Add social media clips from the session.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                  {clipOptions.map((o) => (
                    <OptionCard key={o.id} selected={clips === o.id} onClick={() => setClips(o.id)} label={o.label} price={o.price} showFree />
                  ))}
                </div>
              </ConfigSection>

              {/* Extras */}
              <ConfigSection icon={<Sparkles className="w-4 h-4 md:w-5 md:h-5" />} title="Extras" subtitle="Add extras to your session.">
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

            {/* RIGHT: Summary (desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card border border-border rounded-2xl p-6 space-y-6"
                >
                  <h3 className="font-display text-xl font-bold text-foreground">Session Summary</h3>

                  {summaryItems.map((item) => (
                    <SummaryRow key={item.label} label={item.label} value={item.value} price={item.price} />
                  ))}

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
          selectedPack={`Studio Rental: ${configSummary} — ${totalPrice} DT`}
        />

        <MobileStickyBar
          totalPrice={totalPrice}
          items={summaryItems}
          onReserve={() => setModalOpen(true)}
        />
      </section>
    </>
  );
};

// --- Sub-components (same patterns as SessionConfigurator) ---

function StepperRow({ label, value, min, max, onChange, price, displayValue }: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  price: number;
  displayValue?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-foreground text-xs md:text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0">
          <button
            onClick={() => value > min && onChange(value - 1)}
            disabled={value <= min}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-l-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="w-10 h-8 md:h-9 flex items-center justify-center border-y border-border bg-background text-foreground text-xs md:text-sm font-semibold">
            {displayValue ?? value}
          </div>
          <button
            onClick={() => value < max && onChange(value + 1)}
            disabled={value >= max}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-r-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
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
      className="bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6"
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
      className={`flex items-center justify-between gap-2 px-3 py-2.5 md:p-4 rounded-[10px] md:rounded-xl border text-left transition-all duration-200 ${
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
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-foreground text-sm">{value}</p>
      </div>
      <span className="text-primary text-sm font-semibold whitespace-nowrap">
        {price > 0 ? `${price} DT` : "—"}
      </span>
    </div>
  );
}

export default RentalConfigurator;
