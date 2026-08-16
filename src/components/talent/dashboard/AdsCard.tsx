import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const AdsCard = () => {
  const ads = [
    {
      type: "boost",
      icon: Sparkles,
      label: "Boost your profile",
      title: "Get noticed by more clients.",
      description:
        "Boosting your profile increases your chance of getting hired by up to 2x.",
      action: "Boost profile",
    },
    {
      type: "proposal",
      icon: BriefcaseBusiness,
      label: "Boosted Proposals",
      title: "Put your proposal first.",
      description:
        "Boosted Proposals first place winners see up to 2X increase in hires.",
      action: "Learn more",
    },
    {
      type: "blog",
      icon: BookOpen,
      label: "New feature",
      title: "The WorkTribe Blog is here.",
      description:
        "Explore career tips, industry insights, hiring advice, and stories from the WorkTribe community.",
      action: "Read the blog",
    },
    {
      type: "update",
      icon: Bell,
      label: "New on WorkTribe",
      title: "Get smarter job matches.",
      description:
        "Our latest improvements help you discover opportunities that fit your skills.",
      action: "Explore features",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /*
   * Animate the active story progress.
   */
  useEffect(() => {
    const progressBars = progressRefs.current;

    progressBars.forEach((bar, index) => {
      if (!bar) return;

      gsap.killTweensOf(bar);

      gsap.set(bar, {
        width: index < activeIndex ? "100%" : "0%",
      });
    });

    const activeBar = progressBars[activeIndex];

    if (!activeBar) return;

    timelineRef.current?.kill();

    const timeline = gsap.timeline({
      onComplete: () => {
        setActiveIndex((current) =>
          current === ads.length - 1 ? 0 : current + 1
        );
      },
    });

    timeline.to(activeBar, {
      width: "100%",
      duration: 5,
      ease: "none",
    });

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
    };
  }, [activeIndex, ads.length]);

  /*
   * Cleanup GSAP when component unmounts.
   */
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const handleSelectAd = (index: number) => {
    timelineRef.current?.kill();

    setActiveIndex(index);
  };

  const ad = ads[activeIndex];
  const Icon = ad.icon;

  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-purple-700 text-white shadow-none">
      <CardContent className="p-5">
        {/* Story progress */}
        <div className="flex items-center gap-1">
          {ads.map((item, index) => (
            <button
              key={item.type}
              type="button"
              aria-label={`Show ${item.label}`}
              onClick={() => handleSelectAd(index)}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20"
            >
              <span
                ref={(element) => {
                  progressRefs.current[index] = element;
                }}
                className="absolute inset-y-0 left-0 w-0 rounded-full bg-white"
              />
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <Icon className="h-4 w-4 text-white" />
            </div>

            <span className="text-xs font-medium text-white/60">
              {ad.label}
            </span>
          </div>

          <span className="text-[10px] font-medium text-white/40">
            {activeIndex + 1}/{ads.length}
          </span>
        </div>

        {/* Ad content */}
        <div className="mt-5 min-h-[116px]">
          <h3 className="text-base font-semibold leading-tight tracking-tight text-white">
            {ad.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-white/55">
            {ad.description}
          </p>
        </div>

        {/* Action */}
        <button
          type="button"
          className="group mt-4 flex items-center gap-1.5 text-xs font-semibold text-white transition-colors hover:text-white/70"
        >
          {ad.action}

          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </CardContent>
    </Card>
  );
};

export default AdsCard;