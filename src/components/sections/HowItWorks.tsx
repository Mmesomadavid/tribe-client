import {
  UserCheck,
  Radar,
  MousePointerClick,
  Landmark,
  Sparkle,
} from "lucide-react";

import { Badge } from "../../components/ui/badge";
import Reveal from "../../components/ui/reveal";


const STEPS = [
  {
    step: "Step 1",
    title: "Build Your Profile",
    body:
      "Tell WorkTribe your skills, experience, target salary, and work style. Takes under 5 minutes — and our AI starts working immediately.",
    icon: UserCheck,
  },
  {
    step: "Step 2",
    title: "AI Finds Your Matches",
    body:
      "Forget scrolling. Our AI scans thousands of listings and surfaces only the highest-fit opportunities — updated in real time.",
    icon: Radar,
  },
  {
    step: "Step 3",
    title: "Apply In One Click",
    body:
      "See a match you like? Apply instantly with your profile and let companies discover your potential.",
    icon: MousePointerClick,
  },
  {
    step: "Step 4",
    title: "Get Paid, Guaranteed",
    body:
      "Every payment is protected until the work is approved. Secure payouts, milestone protection, and peace of mind.",
    icon: Landmark,
  },
];


const HowItWorks = () => {
  return (
    <section className="mx-4 my-8 sm:mx-8">

      <div
        className="
        rounded-[48px]
        bg-neutral-900
        px-8
        py-24
        text-white
        sm:px-12
        lg:px-16
        xl:px-20
        "
      >

        <div className="container mx-auto">


          {/* Header */}

          <Reveal className="text-center">


            <Badge
              className="
              rounded-full
              border-white/10
              bg-white/10
              px-4
              py-2
              text-white/80
              "
            >
              <Sparkle size={12} />
              How It Works
            </Badge>



            <h2
              className="
              mx-auto
              mt-8
              max-w-6xl
              text-5xl
              font-semibold
              leading-[0.95]
              tracking-[-0.06em]
              sm:text-6xl
              lg:text-8xl
              "
            >
              Work normally,
              <br />
              WorkTribe does the rest.
            </h2>


          </Reveal>





          {/* Steps */}


          <div
            className="
            mt-20
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            "
          >


            {STEPS.map((item, index) => (

              <Reveal
                key={item.title}
                delay={index * 0.12}
              >

                <div
                  className="
                  group
                  h-full
                  border-white/10
                  px-6
                  py-6
                  lg:border-r
                  last:border-r-0
                  "
                >



                  {/* Step */}

                  <span
                    className="
                    inline-flex
                    rounded-md
                    border
                    border-white/15
                    bg-white/5
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-white/70
                    "
                  >
                    {item.step}
                  </span>





                  <h3
                    className="
                    mt-8
                    text-xl
                    font-semibold
                    tracking-tight
                    "
                  >
                    {item.title}
                  </h3>




                  <p
                    className="
                    mt-4
                    max-w-xs
                    text-sm
                    leading-7
                    text-white/55
                    "
                  >
                    {item.body}
                  </p>





                  {/* Icon Area */}

                  <div
                    className="
                    mt-10
                    flex
                    h-32
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    transition
                    duration-500
                    group-hover:bg-white/[0.08]
                    "
                  >

                    <item.icon
                      size={42}
                      strokeWidth={1.4}
                      className="
                      text-white/80
                      "
                    />

                  </div>


                </div>


              </Reveal>

            ))}


          </div>


        </div>


      </div>

    </section>
  );
};


export default HowItWorks;