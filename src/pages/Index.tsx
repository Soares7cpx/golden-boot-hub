import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Opportunities from "@/components/Opportunities";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { PhotoGallery } from "@/components/PhotoGallery";
import { TrustBadges } from "@/components/TrustBadges";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Opportunities />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <TrustBadges />
      <PhotoGallery />
      <Footer />
    </div>
  );
};

export default Index;
