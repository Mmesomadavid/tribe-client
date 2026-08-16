import type { ProjectEntry } from "../../../types/resumeTypes";

import { X } from "lucide-react";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";


// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface ProjectsSectionProps {
  data: ProjectEntry[];
  onChange: (next: ProjectEntry[]) => void;
}


// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const newId = () =>
  `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;


// ─────────────────────────────────────────────
// Projects Section
// ─────────────────────────────────────────────

export function ProjectsSection({
  data,
  onChange,
}: ProjectsSectionProps) {
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: newId(),
        name: "",
        link: "",
        description: "",
        bullets: [],
      },
    ]);
  };

  const updateEntry = (
    id: string,
    patch: Partial<ProjectEntry>
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

  const removeEntry = (id: string) => {
    onChange(
      data.filter(
        (entry) => entry.id !== id
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Section heading */}

      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Projects
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Add side projects, open source
          contributions, products, or things
          you built outside of a job.
        </p>
      </div>

      {/* Projects */}

      <div className="space-y-4">
        {data.map((entry, index) => (
          <Card
            key={entry.id}
            className="border-border shadow-none"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold">
                {entry.name ||
                  `Project ${index + 1}`}
              </CardTitle>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  removeEntry(entry.id)
                }
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
              >
                Remove
              </Button>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Name + Link */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor={`project-name-${entry.id}`}
                  >
                    Project name
                  </Label>

                  <Input
                    id={`project-name-${entry.id}`}
                    value={entry.name}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          name: event.target.value,
                        }
                      )
                    }
                    placeholder="Resume Builder"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`project-link-${entry.id}`}
                  >
                    Link
                  </Label>

                  <Input
                    id={`project-link-${entry.id}`}
                    value={entry.link}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          link: event.target.value,
                        }
                      )
                    }
                    placeholder="github.com/you/project"
                  />
                </div>
              </div>

              {/* Description */}

              <div className="space-y-2">
                <Label
                  htmlFor={`project-description-${entry.id}`}
                >
                  Description
                </Label>

                <Textarea
                  id={`project-description-${entry.id}`}
                  value={entry.description}
                  onChange={(event) =>
                    updateEntry(
                      entry.id,
                      {
                        description:
                          event.target.value,
                      }
                    )
                  }
                  placeholder="One or two sentences on what it does and why you built it."
                  rows={3}
                />
              </div>

              {/* Bullet points */}

              <BulletListEditor
                bullets={entry.bullets}
                onChange={(bullets) =>
                  updateEntry(
                    entry.id,
                    { bullets }
                  )
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add project */}

      <Button
        type="button"
        variant="outline"
        onClick={addEntry}
        className="w-full sm:w-auto"
      >
        Add project
      </Button>
    </div>
  );
}


// ─────────────────────────────────────────────
// Bullet List Editor
// ─────────────────────────────────────────────

interface BulletListEditorProps {
  bullets: string[];
  onChange: (bullets: string[]) => void;
}

function BulletListEditor({
  bullets,
  onChange,
}: BulletListEditorProps) {
  const addBullet = () => {
    onChange([
      ...bullets,
      "",
    ]);
  };

  const updateBullet = (
    index: number,
    value: string
  ) => {
    const next = [...bullets];

    next[index] = value;

    onChange(next);
  };

  const removeBullet = (
    index: number
  ) => {
    onChange(
      bullets.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>
          Highlights
        </Label>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addBullet}
          className="h-8 text-xs"
        >
          Add highlight
        </Button>
      </div>

      {bullets.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Add a few measurable
          accomplishments or key things
          you built.
        </p>
      ) : (
        <div className="space-y-2">
          {bullets.map(
            (bullet, index) => (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <span className="mt-2.5 text-sm text-muted-foreground">
                  •
                </span>

                <Input
                  value={bullet}
                  onChange={(event) =>
                    updateBullet(
                      index,
                      event.target.value
                    )
                  }
                  placeholder="Built an automated deployment pipeline that reduced release time by 40%."
                  className="flex-1"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    removeBullet(index)
                  }
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  aria-label="Remove highlight"
                >
                  <X className="size-4" />
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}