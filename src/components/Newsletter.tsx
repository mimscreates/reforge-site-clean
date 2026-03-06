import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 px-4 bg-card">
      <div className="container mx-auto text-center max-w-xl">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">Need more information?</h2>
        <p className="text-muted-foreground mb-1 text-sm md:text-base">Kaun Studios is here to help you create.</p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mt-10 mb-6">Subscribe for updates</h3>
        <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
          <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background border-border text-foreground placeholder:text-muted-foreground px-5 h-9 text-sm" />
          <Button variant="cta" className="px-6 font-medium whitespace-nowrap h-9 text-sm">Subscribe</Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
