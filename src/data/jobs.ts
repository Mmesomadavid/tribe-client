import type { Job } from "../types/jobs";

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "Experienced Web Designer Needed for B2B Business Redesign",
    company: {
      id: "company-1",
      name: "Plus AI",
      logo: "/companies/plus-ai.png",
      verified: true,
    },
    description:
      "We are looking for a skilled professional to join our team full-time. Your responsibilities will include building, editing, and managing our website, creating engaging digital experiences, and working closely with our product team.",
    location: "Remote",
    remote: true,
    employmentType: "full-time",
    experienceLevel: "intermediate",
    salary: {
      min: 25,
      max: 50,
      currency: "USD",
      period: "hour",
    },
    skills: [
      "Web Designer",
      "UI/UX Designer",
      "Framer Designer",
      "Webflow Designer",
    ],
    applicants: 120,
    createdAt: "2026-08-08",
    matchScore: 94,
  },

  {
    id: "job-2",
    title: "Senior Product Designer / UI/UX Designer",
    company: {
      id: "company-2",
      name: "Apollo.io",
      logo: "/companies/apollo.png",
      verified: true,
    },
    description:
      "We are seeking a talented and experienced Senior Product Designer / UI/UX Designer to join our team. You will work independently on the design and delivery of high-quality product experiences.",
    location: "Remote",
    remote: true,
    employmentType: "full-time",
    experienceLevel: "expert",
    salary: {
      min: 35,
      max: 65,
      currency: "USD",
      period: "hour",
    },
    skills: [
      "Product Designer",
      "UI/UX Designer",
      "Design Systems",
      "Figma",
      "FigJam",
    ],
    applicants: 24,
    createdAt: "2026-08-07",
    matchScore: 91,
  },

  {
    id: "job-3",
    title: "Backend Engineer — Go & PostgreSQL",
    company: {
      id: "company-3",
      name: "CloudForge",
      logo: "/companies/cloudforge.png",
      verified: true,
    },
    description:
      "Join our engineering team building reliable backend systems and cloud infrastructure. You will design APIs, work with distributed systems, and help improve platform reliability.",
    location: "Remote",
    remote: true,
    employmentType: "full-time",
    experienceLevel: "intermediate",
    salary: {
      min: 45,
      max: 75,
      currency: "USD",
      period: "hour",
    },
    skills: [
      "Go",
      "PostgreSQL",
      "Docker",
      "REST APIs",
      "AWS",
    ],
    applicants: 47,
    createdAt: "2026-08-06",
    matchScore: 97,
  },

  {
    id: "job-4",
    title: "Frontend React Engineer",
    company: {
      id: "company-4",
      name: "Nova Labs",
      logo: "/companies/nova.png",
      verified: true,
    },
    description:
      "We are looking for a React engineer to build modern interfaces for our growing SaaS platform. Experience with TypeScript, React and modern frontend architecture is preferred.",
    location: "United Kingdom",
    remote: true,
    employmentType: "contract",
    experienceLevel: "intermediate",
    salary: {
      min: 35,
      max: 55,
      currency: "USD",
      period: "hour",
    },
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
    ],
    applicants: 62,
    createdAt: "2026-08-05",
    matchScore: 89,
  },

  {
    id: "job-5",
    title: "DevOps / Cloud Infrastructure Engineer",
    company: {
      id: "company-5",
      name: "StackWorks",
      logo: "/companies/stackworks.png",
      verified: true,
    },
    description:
      "Build and maintain cloud infrastructure, CI/CD pipelines and observability systems for a high-growth technology company.",
    location: "Worldwide",
    remote: true,
    employmentType: "full-time",
    experienceLevel: "expert",
    salary: {
      min: 50,
      max: 90,
      currency: "USD",
      period: "hour",
    },
    skills: [
      "AWS",
      "Terraform",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
    applicants: 38,
    createdAt: "2026-08-04",
    matchScore: 95,
  },
];