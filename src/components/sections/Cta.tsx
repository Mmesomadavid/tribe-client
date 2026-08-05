import { Button } from "../../components/ui/button";
import Reveal from "../../components/ui/reveal";

const CTA = () => {
  return (
    <section className="bg-black px-6 py-36 text-white">
      <div className="container">
        <Reveal>
          <h2 className="mx-auto max-w-5xl text-center text-6xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
            Stop searching.
            <br />
            Start getting discovered.
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xl leading-9 text-white/70 md:text-2xl">
            WorkTribe connects you with the right jobs, freelance gigs,
            companies, and opportunities using AI—so your next career move
            finds you before you find it.
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
            <Button
              size="lg"
              className="h-14 px-10 text-base font-medium bg-white text-black hover:bg-white/90"
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 border-white/20 bg-transparent px-10 text-base text-white hover:bg-white/10 hover:text-white"
            >
              Hire Talent
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTA;