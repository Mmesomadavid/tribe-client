import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import { Badge } from "../../../components/ui/badge";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";

import type { CarouselApi } from "../../../components/ui/carousel";

import { useEffect, useState } from "react";

const FeaturedJobs = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Backend Engineer",
      company: "CloudScale",
      location: "Remote",
      rate: "$30–$45/hr",
      level: "Intermediate",
      skills: ["Go", "PostgreSQL", "Docker"],
    },
    {
      id: 2,
      title: "Python Backend Developer",
      company: "Nova Systems",
      location: "Remote · Worldwide",
      rate: "$25–$40/hr",
      level: "Professional",
      skills: ["Python", "FastAPI", "AWS"],
    },
    {
      id: 3,
      title: "Platform Engineer",
      company: "Orbit Labs",
      location: "Remote",
      rate: "$35–$55/hr",
      level: "Professional",
      skills: ["Kubernetes", "Terraform", "AWS"],
    },
    {
      id: 4,
      title: "Go Software Engineer",
      company: "Vertex Labs",
      location: "Remote",
      rate: "$40–$60/hr",
      level: "Professional",
      skills: ["Go", "Redis", "gRPC"],
    },
    {
      id: 5,
      title: "Cloud Engineer",
      company: "Nexora",
      location: "Remote · Europe",
      rate: "$35–$50/hr",
      level: "Intermediate",
      skills: ["AWS", "Terraform", "Docker"],
    },
  ];

  useEffect(() => {
    if (!api) return;

    const updateButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateButtons();

    api.on("select", updateButtons);
    api.on("reInit", updateButtons);

    return () => {
      api.off("select", updateButtons);
      api.off("reInit", updateButtons);
    };
  }, [api]);

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <Sparkles className="h-4 w-4 text-gray-700" />
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold text-2xl tracking-tight text-gray-900">
              Featured jobs
            </h2>

            <p className="hidden text-xs text-gray-500 sm:block">
              Opportunities worth taking a closer look at.
            </p>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex shrink-0 items-center gap-1.5">
          {/* Previous */}
          <button
            type="button"
            aria-label="Previous featured jobs"
            disabled={!canScrollPrev}
            onClick={() => api?.scrollPrev()}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Next featured jobs"
            disabled={!canScrollNext}
            onClick={() => api?.scrollNext()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {jobs.map((job) => (
            <CarouselItem
              key={job.id}
              className="basis-full pl-3 md:basis-1/2 xl:basis-1/3"
            >
              <Card className="group h-full cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-none transition-all hover:border-gray-300 hover:shadow-sm">
                <CardContent className="flex h-full flex-col p-4">
                  {/* Job */}
                  <div>
                    <p className="text-[11px] font-medium text-gray-400">
                      Featured opportunity
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-gray-900">
                      {job.title}
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {job.company}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <span className="font-medium text-gray-900">
                      {job.rate}
                    </span>

                    <span className="text-gray-300">
                      •
                    </span>

                    <span className="text-gray-500">
                      {job.level}
                    </span>

                    <span className="text-gray-300">
                      •
                    </span>

                    <span className="text-gray-500">
                      {job.location}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default FeaturedJobs;