import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
import HiringCompanies from "../components/sections/HiringCompanies";
import HowItWorks from "../components/sections/HowItWorks";
import JobListings from "../components/sections/JobListing";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/Faq";
import CTA from "../components/sections/Cta";
import Footer from "../components/sections/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />
        <HiringCompanies />
        <HowItWorks />
        <JobListings />
        <Testimonials />
        <FAQ />

        {/* CTA + Footer */}
        <section className="bg-black py-20">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-[36px]">
              <CTA />
              <Footer />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;