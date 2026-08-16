import type { ExperienceEntry } from "../../../types/resumeTypes";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
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
  X,
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
// Experience Section
// ─────────────────────────────────────────────

export function ExperienceSection({
  data,
  onChange,
}: {
  data: ExperienceEntry[];
  onChange: (next: ExperienceEntry[]) => void;
}) {
  // ─────────────────────────────────────────────
  // Add experience
  // ─────────────────────────────────────────────

  const addEntry = () => {
    onChange([
      ...data,
      {
        id: newId(),
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        bullets: [""],
      },
    ]);
  };


  // ─────────────────────────────────────────────
  // Update experience
  // ─────────────────────────────────────────────

  const updateEntry = (
    id: string,
    patch: Partial<ExperienceEntry>
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
  // Remove experience
  // ─────────────────────────────────────────────

  const removeEntry = (id: string) => {
    onChange(
      data.filter(
        (entry) => entry.id !== id
      )
    );
  };


  // ─────────────────────────────────────────────
  // Bullet helpers
  // ─────────────────────────────────────────────

  const updateBullet = (
    entryId: string,
    bulletIndex: number,
    value: string
  ) => {
    const entry = data.find(
      (item) => item.id === entryId
    );

    if (!entry) return;

    const bullets = [...entry.bullets];

    bullets[bulletIndex] = value;

    updateEntry(entryId, {
      bullets,
    });
  };


  const addBullet = (entryId: string) => {
    const entry = data.find(
      (item) => item.id === entryId
    );

    if (!entry) return;

    updateEntry(entryId, {
      bullets: [
        ...entry.bullets,
        "",
      ],
    });
  };


  const removeBullet = (
    entryId: string,
    bulletIndex: number
  ) => {
    const entry = data.find(
      (item) => item.id === entryId
    );

    if (!entry) return;

    const bullets = entry.bullets.filter(
      (_, index) =>
        index !== bulletIndex
    );

    updateEntry(entryId, {
      bullets:
        bullets.length > 0
          ? bullets
          : [""],
    });
  };


  return (
    <section className="space-y-6">

      {/* ─────────────────────────────────────── */}
      {/* Section Header */}
      {/* ─────────────────────────────────────── */}

      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-950">
          Experience
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          Your work history, most recent first.
        </p>
      </div>


      {/* ─────────────────────────────────────── */}
      {/* Experience Entries */}
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
                  {entry.role ||
                    entry.company ||
                    `Position ${index + 1}`}
                </CardTitle>

                {entry.company &&
                  entry.role && (
                    <p className="mt-1 text-xs text-gray-500">
                      {entry.company}
                    </p>
                  )}

              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  removeEntry(entry.id)
                }
                aria-label="Remove position"
                className="h-8 w-8 shrink-0 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>

            </CardHeader>


            {/* Card Content */}

            <CardContent className="space-y-6 p-5">

              {/* Basic Information */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Role */}

                <div className="space-y-2">
                  <Label htmlFor={`role-${entry.id}`}>
                    Role
                  </Label>

                  <Input
                    id={`role-${entry.id}`}
                    value={entry.role}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          role:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="Senior Product Designer"
                  />
                </div>


                {/* Company */}

                <div className="space-y-2">
                  <Label htmlFor={`company-${entry.id}`}>
                    Company
                  </Label>

                  <Input
                    id={`company-${entry.id}`}
                    value={entry.company}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          company:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="Acme Inc."
                  />
                </div>


                {/* Location */}

                <div className="space-y-2">
                  <Label htmlFor={`location-${entry.id}`}>
                    Location
                  </Label>

                  <Input
                    id={`location-${entry.id}`}
                    value={entry.location}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          location:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="Remote"
                  />
                </div>


                {/* Dates */}

                <div className="grid grid-cols-2 gap-3">

                  {/* Start Date */}

                  <div className="space-y-2">
                    <Label htmlFor={`start-${entry.id}`}>
                      Start date
                    </Label>

                    <Input
                      id={`start-${entry.id}`}
                      type="month"
                      value={
                        entry.startDate
                      }
                      onChange={(
                        event
                      ) =>
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
                    <Label htmlFor={`end-${entry.id}`}>
                      End date
                    </Label>

                    <Input
                      id={`end-${entry.id}`}
                      type="month"
                      value={
                        entry.endDate
                      }
                      disabled={
                        entry.current
                      }
                      onChange={(
                        event
                      ) =>
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
                      className={
                        entry.current
                          ? "opacity-50"
                          : ""
                      }
                    />
                  </div>

                </div>

              </div>


              {/* Current Position */}

              <label
                htmlFor={`current-${entry.id}`}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
              >

                <input
                  id={`current-${entry.id}`}
                  type="checkbox"
                  checked={
                    entry.current
                  }
                  onChange={(event) =>
                    updateEntry(
                      entry.id,
                      {
                        current:
                          event.target
                            .checked,
                        endDate:
                          event.target
                            .checked
                            ? ""
                            : entry.endDate,
                      }
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                />

                <span>
                  I currently work here
                </span>

              </label>


              {/* Responsibilities */}

              <div className="space-y-3">

                <div>
                  <Label>
                    Responsibilities & achievements
                  </Label>

                  <p className="mt-1 text-xs text-gray-500">
                    Highlight your most important
                    responsibilities, achievements,
                    and measurable results.
                  </p>
                </div>


                <div className="space-y-3">

                  {entry.bullets.map(
                    (
                      bullet,
                      bulletIndex
                    ) => (

                      <div
                        key={`${entry.id}-bullet-${bulletIndex}`}
                        className="flex items-start gap-2"
                      >

                        <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />

                        <Textarea
                          value={bullet}
                          onChange={(
                            event
                          ) =>
                            updateBullet(
                              entry.id,
                              bulletIndex,
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Describe an achievement or responsibility..."
                          rows={2}
                          className="min-h-[72px] resize-y"
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeBullet(
                              entry.id,
                              bulletIndex
                            )
                          }
                          aria-label="Remove bullet"
                          className="mt-1 h-8 w-8 shrink-0 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <X className="h-4 w-4" />
                        </Button>

                      </div>

                    )
                  )}

                </div>


                {/* Add Bullet */}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    addBullet(
                      entry.id
                    )
                  }
                  className="rounded-lg border-gray-200 text-xs"
                >
                  <Plus className="mr-2 h-3.5 w-3.5" />

                  Add achievement
                </Button>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>


      {/* ─────────────────────────────────────── */}
      {/* Add Position */}
      {/* ─────────────────────────────────────── */}

      <Button
        type="button"
        variant="outline"
        onClick={addEntry}
        className="rounded-xl border-gray-200 bg-white"
      >
        <Plus className="mr-2 h-4 w-4" />

        Add position
      </Button>

    </section>
  );
}