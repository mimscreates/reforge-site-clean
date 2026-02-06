import Navbar from "@/components/Navbar";
import PodcastOffers from "@/components/PodcastOffers";
import Options from "@/components/Options";
import Footer from "@/components/Footer";

const NosPacks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <PodcastOffers />
        <Options />
      </main>
      <Footer />
    </div>
  );
};

export default NosPacks;
