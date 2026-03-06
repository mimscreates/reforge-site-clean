import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RentalConfigurator from "@/components/RentalConfigurator";

const RentYourSpace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <RentalConfigurator />
      </main>
      <Footer />
    </div>
  );
};

export default RentYourSpace;
