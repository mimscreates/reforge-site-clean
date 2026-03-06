import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPack: string;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00",
];

const BookingModal = ({ open, onOpenChange, selectedPack }: BookingModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setSubmitted(false);
      setDate(undefined);
      setTime("");
    }
    onOpenChange(val);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle2 className="w-16 h-16 text-primary" />
            <DialogTitle className="font-display text-2xl text-foreground">
              Booking Received!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base max-w-sm">
              Your booking request has been received. Our team will contact you
              shortly to confirm your session.
            </DialogDescription>
            <Button
              variant="cta"
              onClick={() => handleClose(false)}
              className="mt-4 rounded-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">
            Book a Session
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your details and we'll confirm your booking.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-foreground">Selected Pack</Label>
            <Input
              value={selectedPack}
              readOnly
              className="bg-secondary border-border text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Full Name *</Label>
              <Input
                required
                placeholder="John Doe"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Email *</Label>
              <Input
                type="email"
                required
                placeholder="john@email.com"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Phone Number *</Label>
              <Input
                type="tel"
                required
                placeholder="+216 XX XXX XXX"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Company Name</Label>
              <Input
                placeholder="Optional"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-secondary border-border",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Preferred Time *</Label>
              <select
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select a time
                </option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Project Notes</Label>
            <Textarea
              placeholder="Tell us about your project..."
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground min-h-[80px]"
            />
          </div>

          <Button
            variant="cta"
            type="submit"
            className="w-full rounded-full font-medium mt-2"
          >
            Submit Booking Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
