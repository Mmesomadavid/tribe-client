import type { EducationEntry } from "../../../types/resumeTypes";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import {
  Plus,
  Trash2,
} from "lucide-react";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const newId = () => {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};


// ─────────────────────────────────────────────
// Education Section
// ─────────────────────────────────────────────

export function EducationSection({
  data,
  onChange,
}: {
  data: EducationEntry[];
  onChange: (next: EducationEntry[]) => void;
}) {
  // ─────────────────────────────────────────────
  // Add education
  // ─────────────────────────────────────────────

  const addEntry = () => {
    onChange([
      ...data,
      {
        id: newId(),
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };


  // ─────────────────────────────────────────────
  // Update education
  // ─────────────────────────────────────────────

  const updateEntry = (
    id: string,
    patch: Partial<EducationEntry>
  ) => {
    onChange(
      data.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...patch,
            }
          : entry
      )
    );
  };


  // ─────────────────────────────────────────────
  // Remove education
  // ─────────────────────────────────────────────

  const removeEntry = (id: string) => {
    onChange(
      data.filter(
        (entry) => entry.id !== id
      )
    );
  };


  return (
    <section className="space-y-6">

      {/* ─────────────────────────────────────── */}
      {/* Section Header */}
      {/* ─────────────────────────────────────── */}

      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-950">
          Education
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          Degrees, diplomas, and academic
          qualifications from school.
        </p>
      </div>


      {/* ─────────────────────────────────────── */}
      {/* Education Entries */}
      {/* ─────────────────────────────────────── */}

      <div className="space-y-5">

        {data.map((entry, index) => (

          <Card
            key={entry.id}
            className="rounded-2xl border-gray-200 bg-white shadow-none"
          >

            {/* Card Header */}

            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b border-gray-100 px-5 py-4">

              <div className="min-w-0">

                <CardTitle className="truncate text-sm font-semibold text-gray-950">
                  {entry.school ||
                    `Education ${index + 1}`}
                </CardTitle>

                {entry.degree && (
                  <p className="mt-1 text-xs text-gray-500">
                    {entry.degree}
                    {entry.field
                      ? ` · ${entry.field}`
                      : ""}
                  </p>
                )}

              </div>


              {/* Remove */}

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  removeEntry(entry.id)
                }
                aria-label="Remove education"
                className="h-8 w-8 shrink-0 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>

            </CardHeader>


            {/* Card Content */}

            <CardContent className="space-y-5 p-5">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* School */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`school-${entry.id}`}
                  >
                    School
                  </Label>

                  <Input
                    id={`school-${entry.id}`}
                    value={entry.school}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          school:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="University of Lagos"
                  />
                </div>


                {/* Degree */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`degree-${entry.id}`}
                  >
                    Degree
                  </Label>

                  <Input
                    id={`degree-${entry.id}`}
                    value={entry.degree}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          degree:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="B.Sc."
                  />
                </div>


                {/* Field of Study */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`field-${entry.id}`}
                  >
                    Field of study
                  </Label>

                  <Input
                    id={`field-${entry.id}`}
                    value={entry.field}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          field:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="Computer Science"
                  />
                </div>


                {/* GPA */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`gpa-${entry.id}`}
                  >
                    GPA
                    <span className="ml-1 text-xs font-normal text-gray-400">
                      (optional)
                    </span>
                  </Label>

                  <Input
                    id={`gpa-${entry.id}`}
                    value={entry.gpa}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          gpa:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="4.5/5.0"
                  />
                </div>


                {/* Dates */}

                <div className="grid grid-cols-2 gap-3 sm:col-span-2">

                  {/* Start Date */}

                  <div className="space-y-2">
                    <Label
                      htmlFor={`education-start-${entry.id}`}
                    >
                      Start date
                    </Label>

                    <Input
                      id={`education-start-${entry.id}`}
                      type="month"
                      value={
                        entry.startDate
                      }
                      onChange={(event) =>
                        updateEntry(
                          entry.id,
                          {
                            startDate:
                              event
                                .target
                                .value,
                          }
                        )
                      }
                    />
                  </div>


                  {/* End Date */}

                  <div className="space-y-2">
                    <Label
                      htmlFor={`education-end-${entry.id}`}
                    >
                      End date
                    </Label>

                    <Input
                      id={`education-end-${entry.id}`}
                      type="month"
                      value={
                        entry.endDate
                      }
                      onChange={(event) =>
                        updateEntry(
                          entry.id,
                          {
                            endDate:
                              event
                                .target
                                .value,
                          }
                        )
                      }
                    />
                  </div>

                </div>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>


      {/* ─────────────────────────────────────── */}
      {/* Add Education */}
      {/* ─────────────────────────────────────── */}

      <Button
        type="button"
        variant="outline"
        onClick={addEntry}
        className="rounded-xl border-gray-200 bg-white"
      >
        <Plus className="mr-2 h-4 w-4" />

        Add education
      </Button>

    </section>
  );
}