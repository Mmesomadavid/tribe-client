import { ChevronDown, Bookmark, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import Reveal from "../../components/ui/reveal";

const FILTERS = [
  "Job Categories",
  "Countries",
  "Salary Range",
  "Skills",
  "Employment Type",
];


const JOBS = [
  {
    country: "United States",
    title: "Senior AI Engineer",
    pay: "$280–$340k · San Francisco, USA",
    tags: ["Full time", "Senior Level"],
    company: "Google Inc",
    logo: "G",
    bg: "bg-[#F7F1FF]",
  },
  {
    country: "Singapore",
    title: "Mid Level Product Designer",
    pay: "$160–$200k · Woodlands, SG",
    tags: ["Fulltime", "Remote", "Mid Level"],
    company: "Meta Inc",
    logo: "M",
    bg: "bg-[#FFF5E6]",
  },
  {
    country: "United Kingdom",
    title: "Junior Data Scientist",
    pay: "$140–$180k · London, UK",
    tags: ["Hybrid", "Junior Level"],
    company: "Gitlab",
    logo: "G",
    bg: "bg-[#F3FBEA]",
  },
  {
    country: "Singapore",
    title: "Senior IOS Developer",
    pay: "$120–$160k · Jurong East, SG",
    tags: ["Full time", "Senior Level"],
    company: "Microsoft Corp",
    logo: "M",
    bg: "bg-[#FFFBEA]",
  },
  {
    country: "Germany",
    title: "Partime DevOps Engineer",
    pay: "$130–$170k · Berlin, Germany",
    tags: ["Part time", "Mid Level"],
    company: "Twitter (X)",
    logo: "X",
    bg: "bg-[#F1F6FF]",
  },
  {
    country: "United States",
    title: "Entry Level Content Strategist",
    pay: "$90–$120k · Los Angeles, USA",
    tags: ["Remote", "Entry Level"],
    company: "Amazon",
    logo: "A",
    bg: "bg-[#FFF1F3]",
  },
  {
    country: "United States",
    title: "Senior Backend Engineer",
    pay: "$180–$220k · Austin, USA",
    tags: ["Full time", "Senior Level"],
    company: "Github",
    logo: "◉",
    bg: "bg-[#EFFBFC]",
  },
  {
    country: "Netherlands",
    title: "Partime UX Researcher",
    pay: "$100–$140k · Amsterdam, NL",
    tags: ["Hybrid", "Mid Level"],
    company: "Adobe",
    logo: "A",
    bg: "bg-[#FFF1F7]",
  },
];



const JobListings = () => {
  return (
    <section className="overflow-hidden py-36">

      <div
        className="
        mx-auto
        w-full
        max-w-[1440px]
        px-6
        sm:px-10
        lg:px-16
        xl:px-20
        "
      >


        {/* HEADER */}
        <Reveal className="text-center">

          <Badge
            className="
            rounded-full
            px-5
            py-2
            text-xs
            "
          >
           Live Opportunities
          </Badge>


          <h2
            className="
            mx-auto
            mt-10
            max-w-7xl
            text-6xl
            font-semibold
            leading-none
            tracking-[-0.05em]
            sm:text-7xl
            lg:text-[96px]
            "
          >
            Find your next opportunity.
          </h2>


          <p
            className="
            mx-auto
            mt-8
            max-w-3xl
            text-lg
            leading-relaxed
            text-muted
            sm:text-xl
            "
          >
            Browse thousands of roles matched to your profile —
            updated every 60 seconds from top companies worldwide.
          </p>


        </Reveal>




        {/* FILTERS */}
        <Reveal
          delay={0.1}
          className="
          mt-20
          flex
          flex-wrap
          justify-center
          gap-4
          "
        >

          {FILTERS.map((filter) => (

            <button
              key={filter}
              className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-line
              bg-white
              px-6
              py-3.5
              text-sm
              font-medium
              text-ink/70
              transition
              hover:bg-brand-soft
              "
            >

              {filter}

              <ChevronDown size={15}/>

            </button>

          ))}



          <button
            className="
            rounded-xl
            bg-ink
            px-7
            py-3.5
            text-sm
            font-medium
            text-white
            "
          >
            Clear Filter
          </button>


        </Reveal>




        {/* RESULTS */}
        <div className="mt-28">

          <p
            className="
            text-base
            font-medium
            text-ink
            "
          >
            Available Positions

            <span className="text-ink/50">
              {" "} (Search Result: 25,155)
            </span>

          </p>


        </div>



        <div
          className="
          mt-10
          grid
          w-full
          grid-cols-1
          gap-7
          sm:grid-cols-2
          lg:grid-cols-4
          "
        >          {JOBS.map((job, index) => (

            <Reveal
              key={job.title}
              delay={index * 0.05}
              className="
              group
              rounded-3xl
              border
              border-line
              bg-white
              p-8
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              "
            >


              {/* COMPANY ICON + SAVE */}
              <div className="flex items-start justify-between">

                <div
                  className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  text-2xl
                  font-semibold
                  text-ink
                  ${job.bg}
                  `}
                >
                  {job.logo}
                </div>



                <button
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-line
                  text-ink/50
                  transition
                  hover:bg-brand-soft
                  hover:text-ink
                  "
                >
                  <Bookmark size={18}/>
                </button>


              </div>




              {/* JOB DETAILS */}
              <p
                className="
                mt-8
                text-xs
                font-semibold
                uppercase
                tracking-[0.15em]
                text-ink/40
                "
              >
                {job.country}
              </p>



              <h3
                className="
                mt-4
                min-h-[64px]
                text-2xl
                font-semibold
                leading-tight
                tracking-tight
                text-ink
                "
              >
                {job.title}
              </h3>



              <p
                className="
                mt-5
                text-sm
                leading-relaxed
                text-ink/60
                "
              >
                {job.pay}
              </p>




              {/* TAGS */}
              <div
                className="
                mt-6
                flex
                flex-wrap
                gap-2
                "
              >

                {job.tags.map((tag) => (

                  <span
                    key={tag}
                    className="
                    rounded-full
                    bg-brand-soft
                    px-4
                    py-2
                    text-xs
                    font-medium
                    text-ink/70
                    "
                  >
                    {tag}
                  </span>

                ))}


              </div>





              {/* FOOTER */}
              <div
                className="
                mt-10
                flex
                items-center
                justify-between
                border-t
                border-line
                pt-6
                "
              >


                <div>

                  <p
                    className="
                    text-sm
                    font-semibold
                    text-ink
                    "
                  >
                    {job.company}
                  </p>


                  <p
                    className="
                    mt-1
                    text-xs
                    text-ink/40
                    "
                  >
                    Verified Company
                  </p>

                </div>




                <Button
                  size="sm"
                  className="
                  rounded-xl
                  bg-ink
                  px-6
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  transition
                  hover:bg-ink/90
                  "
                >
                  Apply
                </Button>



              </div>



            </Reveal>

          ))}


        </div>





        {/* VIEW ALL BUTTON */}
        <Reveal
          delay={0.2}
          className="
          mt-24
          flex
          justify-center
          "
        >

          <Button
            variant="outline"
            className="
            rounded-xl
            px-12
            py-7
            text-sm
            "
          >
            View All Jobs
            <ChevronRight size={15}/>
          </Button>


        </Reveal>




      </div>

    </section>
  );
};


export default JobListings;