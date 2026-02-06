const ICON = "https://framerusercontent.com/images/wdlQa2xtqly8EFNH8rc6dDyno8.png?width=201&height=201";

const services = ["Podcast", "Talks", "Production", "Interviews"];

const ServiceMarquee = () => {
  const items = [...services, ...services, ...services, ...services];

  return (
    <section className="py-6 border-y border-border overflow-hidden bg-background">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap w-max">
        {items.map((service, i) => (
          <div key={i} className="flex items-center gap-3">
            <img src={ICON} alt="" className="w-6 h-6 object-contain" />
            <span className="text-foreground font-display text-lg md:text-xl font-medium">
              {service}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceMarquee;
