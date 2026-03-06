import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Devis = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-xl">
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-3">
            Request a Quote
          </h1>
          <p className="text-muted-foreground text-center mb-10 text-sm md:text-base">
            Tell us about your project and we'll get back to you shortly.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg h-9 text-sm"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg h-9 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg h-9 text-sm"
              />
              <Input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg h-9 text-sm"
              />
            </div>
            <Textarea
              name="message"
              placeholder="Describe your project..."
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg text-sm"
            />
            <Button
              variant="cta"
              type="submit"
              className="w-full font-medium text-sm h-10"
            >
              Send Request
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Devis;
