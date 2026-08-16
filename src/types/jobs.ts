export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship";

export type ExperienceLevel =
  | "entry"
  | "intermediate"
  | "expert";

export interface JobCompany {
  id: string;
  name: string;
  logo?: string;
  verified?: boolean;
}

export interface JobSalary {
  min?: number;
  max?: number;
  currency?: string;
  period?: "hour" | "month" | "year";
}

export interface Job {
  id: string;

  title: string;

  company: JobCompany;

  description: string;

  location: string;

  remote: boolean;

  employmentType: EmploymentType;

  experienceLevel: ExperienceLevel;

  salary?: JobSalary;

  skills: string[];

  applicants?: number;

  createdAt: string;

  saved?: boolean;

  matchScore?: number;
}