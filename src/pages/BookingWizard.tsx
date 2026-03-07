import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  CalendarIcon,
  Clock,
  User,
  Building2,
  Sparkles,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
  Palette,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "@/components/Navbar";
import { creatorPacks } from "@/components/CreatorPacks";
import { corporatePacks } from "@/components/CorporatePacks";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const allPacks = [
  ...creatorPacks.map((p) => ({ ...p, type: "Creator" as const })),
  ...corporatePacks.map((p) => ({ ...p, type: "Business" as const })),
];

const timeSlots = ["10:00", "11:00", "13:00", "14:30", "16:00", "17:30"];

const stepLabels = ["Pack", "Date & Time", "Decor", "Equipment", "Your Details", "Confirmation"];

const decorOptions = [
  { id: "minimalist", label: "Minimalist", description: "Clean lines, neutral tones, modern feel" },
  { id: "industrial", label: "Industrial", description: "Raw textures, exposed elements, edgy look" },
  { id: "warm", label: "Warm & Cozy", description: "Soft lighting, warm colors, inviting atmosphere" },
  { id: "custom", label: "Custom", description: "Tell us your vision and we'll make it happen" },
];

const equipmentItems = [
  { id: "camera", label: "Camera", price: 100, unit: "DT" },
  { id: "microphone", label: "Microphone", price: 50, unit: "DT" },
  { id: "technician", label: "Technician", price: 150, unit: "DT" },
];

type BookerType = "creator" | "company";

const BookingWizard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const packName = searchParams.get("pack") || "";
  const packType = searchParams.get("type") || "";
  const selectedPack = allPacks.find(
    (p) => p.name === packName && p.type === packType
  );

  const [step, setStep] = useState(selectedPack ? 1 : 0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [selectedDecor, setSelectedDecor] = useState("");
  const [equipmentCounts, setEquipmentCounts] = useState<Record<string, number>>({ camera: 0, microphone: 0, technician: 0 });
  const [basicEditing, setBasicEditing] = useState(false);
  const [bookerType, setBookerType] = useState<BookerType>("creator");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedPack && step > 0) {
      navigate("/packs");
    }
  }, [selectedPack, step, navigate]);

  const canProceedStep2 = !!date && !!time;
  const canProceedStep5 =
    firstName.trim() && lastName.trim() && email.trim() && phone.trim();

  const equipmentTotal = equipmentItems.reduce((sum, item) => sum + (equipmentCounts[item.id] || 0) * item.price, 0) + (basicEditing ? 300 : 0);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-booking-email", {
        body: {
          request_type: "booking",
          pack_name: selectedPack?.name,
          pack_type: selectedPack?.type,
          selected_date: date ? format(date, "yyyy-MM-dd") : null,
          selected_time: time,
          booker_type: bookerType,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          company: bookerType === "company" ? company : null,
          notes: [
            selectedDecor ? `Decor: ${selectedDecor}` : null,
            equipmentTotal > 0 ? `Equipment: ${equipmentItems.filter(e => equipmentCounts[e.id] > 0).map(e => `${e.label} x${equipmentCounts[e.id]}`).join(", ")}${basicEditing ? ", Basic Editing" : ""}` : null,
            notes || null,
          ].filter(Boolean).join(" | "),
        },
      });
      if (error) throw error;
      setSubmitted(true);
      setStep(5);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (s: number) => {
    if (s === 0) {
      navigate("/packs");
      return;
    }
    if (s <= step || s <= Math.max(step, 1)) {
      setStep(s);
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const updateEquipment = (id: string, delta: number) => {
    setEquipmentCounts(prev => ({
      ...prev,
      [id]: Math.max(0, Math.min(5, (prev[id] || 0) + delta)),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        {/* Cinematic header */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 0%, hsl(20 91% 55% / 0.06), transparent)",
            }}
          />
          <div className="container mx-auto max-w-3xl px-4 pt-10 md:pt-16 pb-6 md:pb-10 text-center relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground text-sm md:text-base mb-2"
            >
              Welcome to KAUN
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2"
            >
              Let's find the perfect moment
              <br />
              <span className="text-primary">for your next creation.</span>
            </motion.h1>
          </div>
        </div>

        {/* Step indicator */}
        <div className="container mx-auto max-w-3xl px-4 mb-8">
          <div className="flex items-center justify-center gap-1 md:gap-2">
            {stepLabels.map((label, i) => {
              const isCompleted = i < step || (i === 5 && submitted);
              const isActive = i === step && !submitted;
              return (
                <button
                  key={label}
                  onClick={() => !submitted && goToStep(i)}
                  className={cn(
                    "flex items-center gap-1 text-[10px] md:text-sm font-medium transition-all duration-200",
                    isCompleted
                      ? "text-primary cursor-pointer"
                      : isActive
                      ? "text-foreground"
                      : "text-muted-foreground/50 cursor-default"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold border transition-all duration-300",
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                        ? "border-foreground text-foreground"
                        : "border-muted-foreground/30 text-muted-foreground/50"
                    )}
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span className="hidden md:inline">{label}</span>
                  {i < 5 && (
                    <div className="w-4 md:w-8 h-px bg-border mx-0.5 md:mx-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <div className="container mx-auto max-w-2xl px-4 pb-20">
          <AnimatePresence mode="wait">
            {/* STEP 1 — Pack summary */}
            {step === 1 && selectedPack && !submitted && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 font-medium mb-1">
                        Selected Pack
                      </p>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                        {selectedPack.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {selectedPack.type} Pack
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-bold text-primary">
                        {selectedPack.price}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {selectedPack.unit}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 pt-5 border-t border-border/50 grid grid-cols-2 gap-2">
                    {selectedPack.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/packs"
                  className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change pack
                </Link>

                <div className="flex justify-end">
                  <Button
                    variant="cta"
                    onClick={() => setStep(2)}
                    className="font-medium text-sm h-11 px-8 gap-2 rounded-lg"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Date & Time */}
            {step === 2 && !submitted && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-muted-foreground text-sm text-center italic">
                  "Choose the moment your story begins."
                </p>

                <div className="rounded-2xl border border-border/50 bg-card p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Select a date</span>
                      </div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return d < today || d.getDay() === 0;
                        }}
                        className="p-0 pointer-events-auto"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Select a time</span>
                      </div>
                      {date ? (
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={cn(
                                "h-10 rounded-lg text-sm font-medium transition-all duration-200 border",
                                time === t
                                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_-4px_hsl(20_91%_55%_/_0.4)]"
                                  : "bg-secondary/50 border-border text-foreground hover:border-primary/30"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          Select a date first to see available times.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <Button
                    variant="cta"
                    disabled={!canProceedStep2}
                    onClick={() => setStep(3)}
                    className="font-medium text-sm h-11 px-8 gap-2 rounded-lg disabled:opacity-40"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Choose Decor */}
            {step === 3 && !submitted && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-primary mb-2">
                    <Palette className="w-5 h-5" />
                    <span className="text-sm font-medium">Choose Decor</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Select a studio decoration style for your session.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {decorOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedDecor(option.id)}
                      className={cn(
                        "rounded-2xl border p-5 text-left transition-all duration-200",
                        selectedDecor === option.id
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_-6px_hsl(20_90%_55%_/_0.3)]"
                          : "border-border bg-card hover:border-primary/30"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {selectedDecor === option.id && <Check className="w-4 h-4 text-primary" />}
                        <h4 className="font-display text-sm font-bold text-foreground">{option.label}</h4>
                      </div>
                      <p className="text-muted-foreground text-xs">{option.description}</p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setSelectedDecor(""); setStep(4); }}
                      className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
                    >
                      Skip
                    </button>
                    <Button
                      variant="cta"
                      onClick={() => setStep(4)}
                      className="font-medium text-sm h-11 px-8 gap-2 rounded-lg"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Add Equipment */}
            {step === 4 && !submitted && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-primary mb-2">
                    <Wrench className="w-5 h-5" />
                    <span className="text-sm font-medium">Add Equipment</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Add optional equipment and extras to your session.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-5 md:p-6 space-y-4">
                  {equipmentItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 py-2">
                      <div>
                        <span className="text-foreground text-sm font-medium">{item.label}</span>
                        <span className="text-primary text-xs ml-2">{item.price} {item.unit} each</span>
                      </div>
                      <div className="flex items-center gap-0">
                        <button
                          onClick={() => updateEquipment(item.id, -1)}
                          disabled={(equipmentCounts[item.id] || 0) <= 0}
                          className="w-9 h-9 flex items-center justify-center rounded-l-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-10 h-9 flex items-center justify-center border-y border-border bg-background text-foreground text-sm font-semibold">
                          {equipmentCounts[item.id] || 0}
                        </div>
                        <button
                          onClick={() => updateEquipment(item.id, 1)}
                          disabled={(equipmentCounts[item.id] || 0) >= 5}
                          className="w-9 h-9 flex items-center justify-center rounded-r-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Basic Editing toggle */}
                  <div className="flex items-center justify-between gap-3 py-2 border-t border-border/50">
                    <div>
                      <span className="text-foreground text-sm font-medium">Basic Editing</span>
                      <span className="text-primary text-xs ml-2">300 DT</span>
                    </div>
                    <button
                      onClick={() => setBasicEditing(!basicEditing)}
                      className={cn(
                        "w-12 h-7 rounded-full transition-all duration-200 relative",
                        basicEditing ? "bg-primary" : "bg-secondary border border-border"
                      )}
                    >
                      <span className={cn(
                        "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-200",
                        basicEditing ? "left-6" : "left-1"
                      )} />
                    </button>
                  </div>

                  {equipmentTotal > 0 && (
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-muted-foreground text-xs">Equipment total</span>
                      <span className="text-primary text-sm font-semibold">+{equipmentTotal} DT</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setEquipmentCounts({ camera: 0, microphone: 0, technician: 0 }); setBasicEditing(false); setStep(5); }}
                      className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
                    >
                      Skip
                    </button>
                    <Button
                      variant="cta"
                      onClick={() => setStep(5)}
                      className="font-medium text-sm h-11 px-8 gap-2 rounded-lg"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5 — Your Details */}
            {step === 5 && !submitted && (
              <motion.div
                key="step5"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Booker type */}
                <div className="flex gap-3 justify-center">
                  {[
                    { id: "creator" as BookerType, icon: User, label: "Creator" },
                    { id: "company" as BookerType, icon: Building2, label: "Company" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBookerType(opt.id)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200",
                        bookerType === opt.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      <opt.icon className="w-4 h-4" />
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-5 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">First Name *</Label>
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">Last Name *</Label>
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Your last name" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">Email *</Label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">Phone *</Label>
                      <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+216 XX XXX XXX" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11" required />
                    </div>
                  </div>

                  {bookerType === "company" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                      <Label className="text-foreground text-sm">Company Name *</Label>
                      <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11" />
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">
                      Project Details <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us about your project…" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground min-h-[80px]" />
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 font-medium">
                    Session summary
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <span className="text-muted-foreground">Pack</span>
                    <span className="text-foreground font-medium text-right">
                      {selectedPack?.name} ({selectedPack?.type})
                    </span>
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground font-medium text-right">
                      {date ? format(date, "MMM d, yyyy") : "—"}
                    </span>
                    <span className="text-muted-foreground">Time</span>
                    <span className="text-foreground font-medium text-right">
                      {time || "—"}
                    </span>
                    {selectedDecor && (
                      <>
                        <span className="text-muted-foreground">Decor</span>
                        <span className="text-foreground font-medium text-right capitalize">
                          {decorOptions.find(d => d.id === selectedDecor)?.label || selectedDecor}
                        </span>
                      </>
                    )}
                    {equipmentTotal > 0 && (
                      <>
                        <span className="text-muted-foreground">Equipment</span>
                        <span className="text-primary font-bold text-right">
                          +{equipmentTotal} DT
                        </span>
                      </>
                    )}
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-primary font-bold text-right">
                      {selectedPack?.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(4)}
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <Button
                    variant="cta"
                    disabled={!canProceedStep5 || loading}
                    onClick={handleSubmit}
                    className="font-medium text-sm h-11 px-8 gap-2 rounded-lg disabled:opacity-40"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {loading ? "Sending…" : "Confirm My Session"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 6 — Success */}
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-10 md:py-16 space-y-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
                </motion.div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Your session request has been received.
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                  Our team will confirm your booking shortly. We can't wait to welcome you at KAUN.
                </p>

                <div className="rounded-2xl border border-border/50 bg-card p-5 max-w-sm mx-auto text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pack</span>
                    <span className="text-foreground font-medium">{selectedPack?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground font-medium">{date ? format(date, "MMM d, yyyy") : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="text-foreground font-medium">{time}</span>
                  </div>
                  {selectedDecor && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Decor</span>
                      <span className="text-foreground font-medium capitalize">{decorOptions.find(d => d.id === selectedDecor)?.label}</span>
                    </div>
                  )}
                  {equipmentTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Equipment</span>
                      <span className="text-primary font-medium">+{equipmentTotal} DT</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="text-foreground font-medium">{firstName} {lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-foreground font-medium">{email}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link to="/">
                    <Button variant="cta" className="font-medium text-sm h-11 px-8 rounded-lg">
                      Back to Home
                    </Button>
                  </Link>
                  <Link to="/packs">
                    <Button variant="outline" className="font-medium text-sm h-11 px-8 rounded-lg">
                      Book Another Session
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default BookingWizard;
