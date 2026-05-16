import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
import Footer from '../components/sections/Footer'
import CTABanner from "../components/sections/Cta";
import HowItWorks from "../components/sections/HowItWorks";
import TalentSection from "../components/sections/TalentSection";
import JobsSection from "../components/sections/JobsSection";

const Home = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <Hero />
      <HowItWorks />
      <JobsSection />
      <TalentSection />
      <CTABanner />
    </main>
    <Footer />
  </div>
);
 
export default Home;