import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import HowItWorks from "@/components/HowItWorks";
import ContentMultiplier from "@/components/ContentMultiplier";
import StudioCarousel from "@/components/StudioCarousel";
import CreateMore from "@/components/CreateMore";
import AgencyPartnership from "@/components/AgencyPartnership";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <WhoWeWorkWith />
        <HowItWorks />
        <ContentMultiplier />
        <StudioCarousel />
        
        <CreateMore />
        <AgencyPartnership />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
