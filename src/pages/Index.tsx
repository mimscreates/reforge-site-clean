import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import HowItWorks from "@/components/HowItWorks";
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
        <ClientLogos />
        <WhoWeWorkWith />
        <HowItWorks />
        <StudioCarousel />
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
