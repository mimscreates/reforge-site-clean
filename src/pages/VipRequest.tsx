import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const VipRequest = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = firstName.trim() && lastName.trim() && email.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <div className="container mx-auto max-w-lg px-4 py-16 md:py-24">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Request VIP Access
                </h1>
                <p className="text-muted-foreground text-sm md:text-base max-w-sm mx-auto">
                  Get priority booking, exclusive rates, and a dedicated
                  production team.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="rounded-2xl border border-border/50 bg-card p-5 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">
                        First Name *
                      </Label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Your first name"
                        className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground text-sm">
                        Last Name *
                      </Label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Your last name"
                        className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">Email *</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">
                      Comment{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us about your needs…"
                      className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground min-h-[80px]"
                    />
                  </div>
                </div>
                <Button
                  variant="cta"
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full font-medium text-sm h-12 rounded-lg gap-2 disabled:opacity-40"
                >
                  <Sparkles className="w-4 h-4" /> Request Access
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-10 space-y-5"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
              </motion.div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Your request has been received.
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-sm mx-auto">
                We will contact you shortly with exclusive details about our VIP
                program.
              </p>
              <Link to="/">
                <Button
                  variant="cta"
                  className="font-medium text-sm h-11 px-8 rounded-lg mt-4"
                >
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VipRequest;
