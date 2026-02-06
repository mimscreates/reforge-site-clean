import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_IMG = "https://framerusercontent.com/images/WSLp4ELvzyPpsqwM7oQSmwbE.jpg";

const faqs = [
  {
    question: "Puis-je venir accompagné ?",
    answer:
      "Bien entendu. Nos portes vous sont ouvertes, ainsi qu'à vos invités, à condition de le préciser au moment de votre réservation. Cette indication nous permet d'adapter au mieux votre expérience et de nous assurer que tout soit prêt pour vous accueillir dans les meilleures conditions. Une fois votre demande validée, vous recevrez une confirmation ainsi que les détails nécessaires à votre session.",
  },
  {
    question: "Êtes-vous ouverts le week-end ?",
    answer:
      "Oui, nous sommes ouverts le week-end sur réservation. Pensez à réserver à l'avance pour garantir votre créneau.",
  },
  {
    question: "Puis-je ajouter un micro ou du matériel supplémentaire ?",
    answer:
      "Absolument. Vous pouvez ajouter des options supplémentaires lors de votre réservation : micro, caméra, technicien vidéaste, etc.",
  },
  {
    question: "Vous déplacez-vous pour enregistrer des podcasts en entreprise ?",
    answer:
      "Oui, nous proposons des services d'enregistrement en extérieur et en entreprise. Contactez-nous pour un devis personnalisé.",
  },
  {
    question: "Que se passe-t-il si je dépasse l'heure que j'ai réservée ?",
    answer:
      "Chaque heure supplémentaire sera facturée selon le tarif de votre pack. Nous vous préviendrons à l'avance si votre session approche de la fin.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          FAQ
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src={FAQ_IMG}
              alt="Studio KAUN FAQ"
              className="w-full h-[400px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>

          {/* Questions */}
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-foreground text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
