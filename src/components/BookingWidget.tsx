const BookingWidget = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-12">
          Personnalise your pack
        </h2>
        <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border bg-card">
          <iframe
            src="https://booking.kaunstudios.com/booking"
            title="Réservation KAUN Studios"
            className="w-full h-[700px] md:h-[800px] border-0"
            allow="payment"
          />
        </div>
      </div>
    </section>
  );
};

export default BookingWidget;
