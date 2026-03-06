import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionConfigurator from "@/components/SessionConfigurator";

const BuildSession = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <SessionConfigurator />
      </main>
      <Footer />
    </div>
  );
};

export default BuildSession;
