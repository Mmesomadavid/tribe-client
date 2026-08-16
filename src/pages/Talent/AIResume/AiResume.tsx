import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
} from "lucide-react";

import { ResumeSidebar } from "../../../layouts/Talent/Resume/ResumeSidebar";
import { ResumePreview } from "../../../layouts/Talent/Resume/ResumePreview";

import { PersonalInfoSection } from "../../../components/talent/Resume/PersonalInfoSection";
import { ExperienceSection } from "../../../components/talent/Resume/ExperienceSection";
import { EducationSection } from "../../../components/talent/Resume/EducationSection";
import { SkillsSection } from "../../../components/talent/Resume/SkillsSection";
import { ProjectsSection } from "../../../components/talent/Resume/ProjectsSection";
import { CertificationsSection } from "../../../components/talent/Resume/CertificationsSection";
import { LanguagesSection } from "../../../components/talent/Resume/LanguagesSection";

import { useResumeBuilder } from "../../../hooks/useResumeBuilder";

import {
  RESUME_SECTIONS,
  type ResumeSectionId,
} from "../../../types/resumeTypes";

import { Button } from "../../../components/ui/button";

export default function AIResume() {
  const {
    resume,
    loading,
    saveStatus,
    update,
  } = useResumeBuilder();

  const [activeSection, setActiveSection] =
    useState<ResumeSectionId>("personal");

  const currentIndex =
    RESUME_SECTIONS.findIndex(
      (section) => section.id === activeSection
    );

  const goPrev = () => {
    if (currentIndex > 0) {
      setActiveSection(
        RESUME_SECTIONS[currentIndex - 1].id
      );
    }
  };

  const goNext = () => {
    if (
      currentIndex <
      RESUME_SECTIONS.length - 1
    ) {
      setActiveSection(
        RESUME_SECTIONS[currentIndex + 1].id
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // ─────────────────────────────────────────────
  // Loading state
  // ─────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex min-h-[480px] h-full items-center justify-center bg-white">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* ─────────────────────────────────────────
          Resume section sidebar
      ───────────────────────────────────────── */}

      <div className="print:hidden">
        <ResumeSidebar
          active={activeSection}
          onSelect={setActiveSection}
          saveStatus={saveStatus}
        />
      </div>

      {/* ─────────────────────────────────────────
          Form column
      ───────────────────────────────────────── */}

      <div className="flex w-full max-w-[560px] shrink-0 flex-col border-r border-border bg-white print:hidden">
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {activeSection === "personal" && (
            <PersonalInfoSection
              data={resume.personalInfo}
              onChange={(personalInfo) =>
                update((prev) => ({
                  ...prev,
                  personalInfo,
                }))
              }
            />
          )}

          {activeSection === "experience" && (
            <ExperienceSection
              data={resume.experience}
              onChange={(experience) =>
                update((prev) => ({
                  ...prev,
                  experience,
                }))
              }
            />
          )}

          {activeSection === "education" && (
            <EducationSection
              data={resume.education}
              onChange={(education) =>
                update((prev) => ({
                  ...prev,
                  education,
                }))
              }
            />
          )}

          {activeSection === "skills" && (
            <SkillsSection
              data={resume.skills}
              onChange={(skills) =>
                update((prev) => ({
                  ...prev,
                  skills,
                }))
              }
            />
          )}

          {activeSection === "projects" && (
            <ProjectsSection
              data={resume.projects}
              onChange={(projects) =>
                update((prev) => ({
                  ...prev,
                  projects,
                }))
              }
            />
          )}

          {activeSection === "certifications" && (
            <CertificationsSection
              data={resume.certifications}
              onChange={(certifications) =>
                update((prev) => ({
                  ...prev,
                  certifications,
                }))
              }
            />
          )}

          {activeSection === "languages" && (
            <LanguagesSection
              data={resume.languages}
              onChange={(languages) =>
                update((prev) => ({
                  ...prev,
                  languages,
                }))
              }
            />
          )}
        </div>

        {/* ─────────────────────────────────────────
            Section navigation
        ───────────────────────────────────────── */}

        <div className="flex items-center justify-between border-t border-border bg-white px-8 py-4">
          <Button
            variant="ghost"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>

          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of{" "}
            {RESUME_SECTIONS.length}
          </span>

          <Button
            variant="ghost"
            onClick={goNext}
            disabled={
              currentIndex ===
              RESUME_SECTIONS.length - 1
            }
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          Live resume preview
      ───────────────────────────────────────── */}

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-white px-6 py-8 print:bg-white print:p-0">
        {/* Download button */}

        <div className="mb-4 flex justify-end print:hidden">
          <Button
            onClick={handlePrint}
            className="rounded-lg"
          >
            <Download className="size-4" />
            Download PDF
          </Button>
        </div>

        {/* Resume */}

        <div className="flex justify-center">
          <ResumePreview data={resume} />
        </div>
      </div>
    </div>
  );
}