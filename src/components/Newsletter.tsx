import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Besoin d'informations complémentaires ?
        </h2>
        <p className="text-muted-foreground mb-2 text-lg">
          Kaun Studios est là pour vous accompagner
        </p>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-8">
          Subscribe for<br />Kaun insights
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background border-border text-foreground placeholder:text-muted-foreground rounded-full px-6"
          />
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-medium whitespace-nowrap">
            S'inscrire
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
