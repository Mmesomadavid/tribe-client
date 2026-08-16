"use client";

import {
  Code2,
  Palette,
  Megaphone,
  BarChart3,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

interface JobIntent {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface JobIntentCardProps {
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
}

const INTENTS: JobIntent[] = [
  {
    id: "engineering",
    title: "Engineering & Technology",
    description: "Software, infrastructure, data and security",
    icon: <Code2 size={18} />,
  },
  {
    id: "design",
    title: "Design & Product",
    description: "Designers, product managers and researchers",
    icon: <Palette size={18} />,
  },
  {
    id: "marketing",
    title: "Marketing & Sales",
    description: "Growth, marketing, sales and partnerships",
    icon: <Megaphone size={18} />,
  },
  {
    id: "data",
    title: "Data & Analytics",
    description: "Data analysts, scientists and specialists",
    icon: <BarChart3 size={18} />,
  },
  {
    id: "operations",
    title: "Operations & Support",
    description: "Operations, HR, support and administration",
    icon: <Users size={18} />,
  },
  {
    id: "other",
    title: "Something else",
    description: "Another role or a mixed hiring need",
    icon: <BriefcaseBusiness size={18} />,
  },
];

const JobIntentCard = ({
  value,
  onChange,
  multiple = true,
}: JobIntentCardProps) => {
  const toggle = (id: string) => {
    if (multiple) {
      onChange(
        value.includes(id)
          ? value.filter((item) => item !== id)
          : [...value, id]
      );

      return;
    }

    onChange(value.includes(id) ? [] : [id]);
  };

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {INTENTS.map((intent) => {
        const selected = value.includes(intent.id);

        return (
          <button
            key={intent.id}
            type="button"
            onClick={() => toggle(intent.id)}
            className={[
              "group text-left rounded-xl border p-4 transition-all",
              selected
                ? "border-gray-950 bg-gray-950 text-white"
                : "border-gray-200 bg-white hover:border-gray-400",
            ].join(" ")}
          >
            <div
              className={[
                "h-8 w-8 rounded-lg flex items-center justify-center mb-3",
                selected
                  ? "bg-white/10 text-white"
                  : "bg-gray-100 text-gray-600",
              ].join(" ")}
            >
              {intent.icon}
            </div>

            <p className="text-xs font-semibold">
              {intent.title}
            </p>

            <p
              className={[
                "text-[10px] leading-relaxed mt-1",
                selected ? "text-white/50" : "text-gray-400",
              ].join(" ")}
            >
              {intent.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default JobIntentCard;