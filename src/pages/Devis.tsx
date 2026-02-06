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
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
            Demande de devis
          </h1>
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Décrivez votre projet et nous vous recontactons rapidement.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Nom complet"
                value={form.name}
                onChange={handleChange}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="phone"
                placeholder="Téléphone"
                value={form.phone}
                onChange={handleChange}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl"
              />
              <Input
                name="subject"
                placeholder="Sujet"
                value={form.subject}
                onChange={handleChange}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl"
              />
            </div>
            <Textarea
              name="message"
              placeholder="Décrivez votre projet..."
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl"
            />
            <Button
              type="submit"
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium text-base"
            >
              Envoyer ma demande
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Devis;
