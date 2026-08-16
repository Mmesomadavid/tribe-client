// ─────────────────────────────────────────────
// Resume data model
// ─────────────────────────────────────────────

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string; // "2023-01" (month input value)
  endDate: string; // "" when current is true
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  link: string;
  description: string;
  bullets: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export type LanguageProficiency = "Basic" | "Conversational" | "Fluent" | "Native";

export interface LanguageEntry {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export interface ResumeData {
  id?: string;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  updatedAt?: string;
}

// ─────────────────────────────────────────────
// Section registry — drives the sidebar + router-less step switching
// ─────────────────────────────────────────────

export const RESUME_SECTIONS = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
] as const;

export type ResumeSectionId = (typeof RESUME_SECTIONS)[number]["id"];

export const emptyResume: ResumeData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};