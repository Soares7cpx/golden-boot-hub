import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Opportunities from "@/components/Opportunities";

const OpportunitiesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Opportunities />
      <Footer />
    </div>
  );
};

export default OpportunitiesPage;
