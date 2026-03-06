import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_IMG = "https://framerusercontent.com/images/WSLp4ELvzyPpsqwM7oQSmwbE.jpg";

const faqs = [
  {
    question: "Can I bring guests?",
    answer: "Of course. Our doors are open to you and your guests — just let us know when booking so we can prepare everything for a great experience.",
  },
  {
    question: "Are you open on weekends?",
    answer: "Yes, we're open on weekends by appointment. Book in advance to secure your time slot.",
  },
  {
    question: "Can I add extra microphones or equipment?",
    answer: "Absolutely. You can add extra options during booking — microphones, cameras, videographer, and more.",
  },
  {
    question: "Do you offer on-site recording for companies?",
    answer: "Yes, we offer on-location recording for businesses and corporate events. Contact us for a custom quote.",
  },
  {
    question: "What happens if I go over my booked time?",
    answer: "Each additional hour is billed at the rate of your selected pack. We'll give you a heads-up as your session approaches the end.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={FAQ_IMG}
              alt="KAUN Studio FAQ"
              className="w-full h-[350px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>

          <Accordion type="single" collapsible className="space-y-1">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                <AccordionTrigger className="text-foreground text-left text-sm font-medium hover:no-underline py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
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
