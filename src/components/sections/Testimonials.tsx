import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Megaphone,
  Quote,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";

import type { CarouselApi } from "../../components/ui/carousel";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import Reveal from "../../components/ui/reveal";

import Marcus from "../../assets/testimonials/avatar1.png";
import Priya from "../../assets/testimonials/avatar2.png";
import James from "../../assets/testimonials/avatar3.png";
import Alicia from "../../assets/testimonials/avatar4.png";


const TESTIMONIALS = [
  {
    name: "Marcus R.",
    role: "Senior Software Engineer",
    company: "Microsoft",
    quote:
      "WorkTribe matched me with my dream company in minutes. I never had to spend hours searching job boards again.",
    image: Marcus,
  },
  {
    name: "Priya L.",
    role: "Senior UX Designer",
    company: "Spotify",
    quote:
      "The AI signal was spot-on. My first project was exactly what I asked for, and I landed it within days.",
    image: Priya,
  },
  {
    name: "James W.",
    role: "Financial Advisor",
    company: "Deloitte",
    quote:
      "I stopped refreshing job boards every day. WorkTribe consistently surfaced opportunities that actually fit me.",
    image: James,
  },
  {
    name: "Alicia C.",
    role: "Freelance Illustrator",
    company: "Adobe",
    quote:
      "I got hired at a much higher rate than my previous role. The AI understood my value better than I did.",
    image: Alicia,
  },
];


const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(TESTIMONIALS.length);


  return (
    <section className="relative overflow-hidden px-6 py-28 lg:px-10 xl:px-16">

      <div className="container mx-auto">


        {/* Header */}

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">


          <Reveal>

            <Badge className="inline-flex items-center gap-2 rounded-full">
              <Megaphone size={12}/>
              Testimonials
            </Badge>


            <h2 className="mt-6 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] lg:text-7xl">
              Trusted by
              <br />
              15,000+ professionals
            </h2>

          </Reveal>



          <Reveal delay={0.2}>

            <div className="flex flex-col gap-6">

              <p className="max-w-sm leading-8 text-muted-foreground">
                From graduates landing their first opportunity to senior
                executives making career-defining moves—WorkTribe helps people
                discover work that truly fits.
              </p>



              <div className="flex items-center justify-between">


                <div className="flex gap-3">

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full"
                    onClick={() => api?.scrollPrev()}
                  >
                    <ArrowLeft size={18}/>
                  </Button>



                  <Button
                    size="icon"
                    className="h-14 w-14 rounded-full"
                    onClick={() => api?.scrollNext()}
                  >
                    <ArrowRight size={18}/>
                  </Button>

                </div>



                <span className="text-sm font-medium text-muted-foreground">
                  {current.toString().padStart(2,"0")} /{" "}
                  {count.toString().padStart(2,"0")}
                </span>


              </div>


            </div>

          </Reveal>


        </div>





        {/* Carousel */}


        <Carousel

          setApi={(carouselApi)=>{

            setApi(carouselApi);

            if(carouselApi){

              setCount(carouselApi.scrollSnapList().length);

              carouselApi.on("select",()=>{
                setCurrent(carouselApi.selectedScrollSnap()+1);
              });

            }

          }}

          opts={{
            align:"start",
            loop:true,
          }}

          className="mt-16 w-full"

        >


          <CarouselContent>


            {TESTIMONIALS.map((testimonial,index)=>(


              <CarouselItem
                key={testimonial.name}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >


                <motion.div

                  initial={{
                    opacity:0,
                    y:50
                  }}

                  whileInView={{
                    opacity:1,
                    y:0
                  }}

                  viewport={{
                    once:true,
                    amount:0.2
                  }}

                  transition={{
                    duration:0.7,
                    delay:index * 0.12,
                    ease:[0.22,1,0.36,1]
                  }}


                  className="
                  group 
                  relative 
                  h-[460px]
                  overflow-hidden
                  rounded-[32px]
                  bg-neutral-900
                  shadow-2xl
                  ring-1
                  ring-white/10
                  "

                >



                  <img

                    src={testimonial.image}

                    alt={testimonial.name}

                    className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                    "

                  />



                  {/* Overlay */}

                  <div className="
                    absolute 
                    inset-0 
                    bg-gradient-to-t 
                    from-black/85 
                    via-black/35 
                    to-black/10
                  "/>



                  {/* Quote */}

                  <div className="
                    absolute 
                    left-7 
                    top-7
                    flex 
                    h-12 
                    w-12 
                    items-center 
                    justify-center
                    rounded-full
                    bg-white/15
                    backdrop-blur-md
                  ">

                    <Quote
                      size={20}
                      className="text-white"
                    />

                  </div>




                  {/* Content */}

                  <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-8
                    text-white
                  ">


                    <p className="
                      text-base
                      leading-7
                      text-white
                    ">

                      "{testimonial.quote}"

                    </p>




                    <div className="
                      mt-8
                      flex
                      items-center
                      gap-4
                    ">


                      <img

                        src={testimonial.image}

                        alt={testimonial.name}

                        className="
                        h-14
                        w-14
                        rounded-full
                        border-2
                        border-white/20
                        object-cover
                        "

                      />



                      <div>

                        <h4 className="font-semibold">
                          {testimonial.name}
                        </h4>


                        <p className="text-sm text-white/80">
                          {testimonial.role}
                        </p>


                        <p className="
                          text-xs
                          uppercase
                          tracking-wider
                          text-white/60
                        ">
                          {testimonial.company}
                        </p>


                      </div>


                    </div>


                  </div>



                </motion.div>


              </CarouselItem>


            ))}


          </CarouselContent>


        </Carousel>



      </div>


    </section>
  );
};


export default Testimonials;