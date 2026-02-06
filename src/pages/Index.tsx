import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceMarquee from "@/components/ServiceMarquee";
import BookingWidget from "@/components/BookingWidget";
import StudioCarousel from "@/components/StudioCarousel";
import PodcastOffers from "@/components/PodcastOffers";
import Options from "@/components/Options";
import CreateMore from "@/components/CreateMore";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ServiceMarquee />
        <BookingWidget />
        <StudioCarousel />
        <PodcastOffers />
        <Options />
        <CreateMore />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
