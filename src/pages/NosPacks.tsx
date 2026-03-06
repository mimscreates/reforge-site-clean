import Navbar from "@/components/Navbar";
import CreatorPacks from "@/components/CreatorPacks";
import CorporatePacks from "@/components/CorporatePacks";
import Options from "@/components/Options";
import Footer from "@/components/Footer";

const NosPacks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <CreatorPacks />
        <CorporatePacks />
        <Options />
      </main>
      <Footer />
    </div>
  );
};

export default NosPacks;
