import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AudienceSelector from "@/components/AudienceSelector";
import ServiceMarquee from "@/components/ServiceMarquee";
import CreatorPacks from "@/components/CreatorPacks";
import CorporatePacks from "@/components/CorporatePacks";
import Options from "@/components/Options";
import StudioCarousel from "@/components/StudioCarousel";
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
        <AudienceSelector />
        <ServiceMarquee />
        <CreatorPacks />
        <CorporatePacks />
        <Options />
        <StudioCarousel />
        <CreateMore />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
