import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, Camera, Mic, Scissors, Check, Minus, Plus, Crown, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";
import MobileStickyBar from "@/components/MobileStickyBar";

// --- GLOBAL PRICE VARIABLES ---
const PRICES = {
  camera: 100,
  microphone: 50,
  technician: 150,
  basicEditing: 300,
  // Monthly discounted prices
  cameraMonthly: 80,
  microphoneMonthly: 40,
};

type RentalTab = "hourly" | "half-day" | "full-day" | "monthly";

interface TabConfig {
  id: RentalTab;
  label: string;
  badge?: string;
  badgeColor?: string;
  basePrice: number;
  priceLabel: string;
  duration: string;
  savings?: string;
  includes: string[];
  cameraPrice: number;
  microphonePrice: number;
  technicianPrice: number;
  editingPrice: number;
}

const TABS: TabConfig[] = [
  {
    id: "hourly",
    label: "Hourly",
    basePrice: 120,
    priceLabel: "120 DT / hour",
    duration: "per hour",
    includes: [
      "Professional lighting",
      "Studio access",
      "Choice of decor",
      "Power access",
      "Basic technical assistance",
    ],
    cameraPrice: PRICES.camera,
    microphonePrice: PRICES.microphone,
    technicianPrice: PRICES.technician,
    editingPrice: PRICES.basicEditing,
  },
  {
    id: "half-day",
    label: "Half Day",
    badge: "Save vs hourly",
    badgeColor: "bg-accent text-accent-foreground",
    basePrice: 300,
    priceLabel: "300 DT",
    duration: "4 hours",
    savings: "Save 180 DT vs hourly",
    includes: [
      "Studio access",
      "Professional lighting",
      "Choice of decor",
      "Power access",
    ],
    cameraPrice: PRICES.camera,
    microphonePrice: PRICES.microphone,
    technicianPrice: PRICES.technician,
    editingPrice: PRICES.basicEditing,
  },
  {
    id: "full-day",
    label: "Full Day",
    badge: "Best value",
    badgeColor: "bg-primary text-primary-foreground",
    basePrice: 600,
    priceLabel: "600 DT",
    duration: "8 hours",
    savings: "Save 360 DT vs hourly",
    includes: [
      "Studio access",
      "Professional lighting",
      "Choice of decor",
      "Power access",
    ],
    cameraPrice: PRICES.camera,
    microphonePrice: PRICES.microphone,
    technicianPrice: PRICES.technician,
    editingPrice: PRICES.basicEditing,
  },
  {
    id: "monthly",
    label: "Monthly",
    badge: "Most Popular",
    badgeColor: "bg-primary text-primary-foreground",
    basePrice: 800,
    priceLabel: "800 DT / month",
    duration: "10 hours / month",
    savings: "Save 400 DT compared to hourly pricing",
    includes: [
      "10 hours of studio access per month",
      "Professional lighting",
      "Choice of decor",
      "Power access",
    ],
    cameraPrice: PRICES.cameraMonthly,
    microphonePrice: PRICES.microphoneMonthly,
    technicianPrice: PRICES.technician,
    editingPrice: PRICES.basicEditing,
  },
];

const RentalConfigurator = () => {
  const [activeTab, setActiveTab] = useState<RentalTab>("hourly");
  const [hours, setHours] = useState(1);
  const [cameras, setCameras] = useState(0);
  const [mics, setMics] = useState(0);
  const [technicians, setTechnicians] = useState(0);
  const [addEditing, setAddEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const tab = TABS.find((t) => t.id === activeTab)!;

  // Reset extras on tab switch
  const handleTabSwitch = (id: RentalTab) => {
    setActiveTab(id);
    setCameras(0);
    setMics(0);
    setTechnicians(0);
    setAddEditing(false);
    setHours(1);
  };

  const basePrice = activeTab === "hourly" ? hours * tab.basePrice : tab.basePrice;
  const cameraTotal = cameras * tab.cameraPrice;
  const micTotal = mics * tab.microphonePrice;
  const techTotal = technicians * tab.technicianPrice;
  const editTotal = addEditing ? tab.editingPrice : 0;
  const totalPrice = basePrice + cameraTotal + micTotal + techTotal + editTotal;

  const summaryItems = useMemo(() => {
    const items = [
      {
        label: activeTab === "monthly" ? "Creator Pass" : "Studio Rental",
        value: activeTab === "hourly"
          ? `${hours} hour${hours > 1 ? "s" : ""} × ${tab.basePrice} DT`
          : tab.priceLabel,
        price: basePrice,
      },
      { label: "Cameras", value: cameras > 0 ? `${cameras} × ${tab.cameraPrice} DT` : "None", price: cameraTotal },
      { label: "Microphones", value: mics > 0 ? `${mics} × ${tab.microphonePrice} DT` : "None", price: micTotal },
      { label: "Technician", value: technicians > 0 ? `${technicians} × ${tab.technicianPrice} DT` : "None", price: techTotal },
      { label: "Basic Editing", value: addEditing ? `${tab.editingPrice} DT` : "None", price: editTotal },
    ];
    return items;
  }, [activeTab, hours, cameras, mics, technicians, addEditing, tab, basePrice, cameraTotal, micTotal, techTotal, editTotal]);

  const configSummary = summaryItems
    .filter((i) => i.price > 0)
    .map((i) => `${i.label}: ${i.value}`)
    .join(", ");

  return (
    <>
      <section className="py-12 md:py-20 pb-24 lg:pb-20 px-3 md:px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
              Rent Our Studio
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              Choose your rental plan, add equipment, and see your price update in real time.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-center mb-8 md:mb-12"
          >
            <div className="inline-flex bg-card border border-border rounded-xl p-1 gap-1 flex-wrap justify-center">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTabSwitch(t.id)}
                  className={`relative px-4 md:px-6 py-2.5 md:py-3 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
                    activeTab === t.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {t.label}
                  {t.badge && (
                    <span className={`absolute -top-2 -right-1 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === t.id ? "bg-background text-foreground" : t.badgeColor
                    }`}>
                      {t.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Included features card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 md:mb-12 p-4 md:p-6 rounded-2xl border border-border bg-card/50 max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <span className="text-foreground font-bold text-lg md:text-2xl">{tab.priceLabel}</span>
                {activeTab !== "hourly" && (
                  <span className="text-muted-foreground text-xs md:text-sm ml-2">({tab.duration})</span>
                )}
              </div>
              {tab.savings && (
                <span className="inline-flex items-center gap-1 text-primary text-xs md:text-sm font-semibold bg-primary/10 px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  {tab.savings}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-xs mb-3">Includes:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-muted-foreground text-xs md:text-sm">
              {tab.includes.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-primary shrink-0" /> {item}
                </span>
              ))}
            </div>
            {activeTab === "monthly" && (
              <p className="text-muted-foreground/60 text-[11px] mt-3 italic">
                Camera and microphone add-ons are discounted for monthly members.
              </p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* LEFT: Configurator */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Hours (only for hourly) */}
              {activeTab === "hourly" && (
                <ConfigSection
                  icon={<Clock className="w-4 h-4 md:w-5 md:h-5" />}
                  title="Studio Hours"
                  subtitle="Select how many hours you need."
                >
                  <StepperRow label="Hours" value={hours} min={1} max={12} onChange={setHours} price={basePrice} unitPrice={tab.basePrice} />
                </ConfigSection>
              )}

              {/* Equipment */}
              <ConfigSection
                icon={<Camera className="w-4 h-4 md:w-5 md:h-5" />}
                title="Equipment"
                subtitle="Add cameras and microphones to your session."
              >
                <div className="space-y-1">
                  <StepperRow label="Camera" value={cameras} min={0} max={4} onChange={setCameras} price={cameraTotal} unitPrice={tab.cameraPrice} />
                  <StepperRow label="Microphone" value={mics} min={0} max={4} onChange={setMics} price={micTotal} unitPrice={tab.microphonePrice} />
                </div>
              </ConfigSection>

              {/* Services */}
              <ConfigSection
                icon={<Scissors className="w-4 h-4 md:w-5 md:h-5" />}
                title="Services"
                subtitle="Add a technician or editing to your session."
              >
                <div className="space-y-1">
                  <StepperRow label="Technician" value={technicians} min={0} max={2} onChange={setTechnicians} price={techTotal} unitPrice={tab.technicianPrice} />
                  <ToggleRow
                    label="Basic Editing"
                    active={addEditing}
                    onToggle={() => setAddEditing(!addEditing)}
                    price={addEditing ? tab.editingPrice : 0}
                    unitPrice={tab.editingPrice}
                  />
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
                  className="bg-card border border-border rounded-2xl p-6 space-y-5"
                >
                  <h3 className="font-display text-xl font-bold text-foreground">Session Summary</h3>

                  <div className="space-y-4">
                    {summaryItems.map((item) => (
                      <SummaryRow key={item.label} label={item.label} value={item.value} price={item.price} />
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-foreground">Estimated Total</span>
                      <span className="font-display text-2xl font-bold text-primary">{totalPrice} DT</span>
                    </div>
                  </div>

                  <Button
                    variant="cta"
                    onClick={() => setModalOpen(true)}
                    className="w-full font-medium text-base py-6"
                  >
                    {activeTab === "monthly" ? "Subscribe Now" : "Reserve This Session"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <BookingModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          selectedPack={`Studio Rental (${tab.label}): ${configSummary} — ${totalPrice} DT`}
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

// --- Sub-components ---

function StepperRow({ label, value, min, max, onChange, price, unitPrice }: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  price: number;
  unitPrice: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="flex flex-col">
        <span className="text-foreground text-xs md:text-sm font-medium">{label}</span>
        <span className="text-muted-foreground text-[10px] md:text-xs">{unitPrice} DT each</span>
      </div>
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
            {value}
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

function ToggleRow({ label, active, onToggle, price, unitPrice }: {
  label: string;
  active: boolean;
  onToggle: () => void;
  price: number;
  unitPrice: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="flex flex-col">
        <span className="text-foreground text-xs md:text-sm font-medium">{label}</span>
        <span className="text-muted-foreground text-[10px] md:text-xs">{unitPrice} DT</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`w-20 h-8 md:h-9 flex items-center justify-center rounded-lg border text-xs md:text-sm font-semibold transition-all duration-200 ${
            active
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-secondary/50 text-muted-foreground hover:border-muted-foreground/40"
          }`}
        >
          {active ? (
            <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Added</span>
          ) : "Add"}
        </button>
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
      className="bg-card border border-border rounded-2xl p-4 md:p-6"
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
