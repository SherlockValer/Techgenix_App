import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import BestSellers from "../components/Bestsellers";
import TrustSection from "../components/TrustSection";

const Home = () => {
  return (
    <main className="container py-3">
      {/* Hero Section */}
      <HeroSection />

      {/* Menu */}
      <CategoriesSection />

      {/* Bestsellers */}
      <BestSellers />

      {/* Trust Section */}
      <TrustSection />
    </main>
  );
};

export default Home;
