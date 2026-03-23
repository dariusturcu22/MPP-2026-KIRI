import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { PortfolioSection } from "./PortfolioSection";
import { FeaturesSection } from "./FeaturesSection";
import { Footer } from "./Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
