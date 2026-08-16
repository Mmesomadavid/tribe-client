import type {
  LanguageEntry,
  LanguageProficiency,
} from "../../../types/resumeTypes";

import { Input } from "../../ui/input";
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

interface LanguagesSectionProps {
  data: LanguageEntry[];
  onChange: (
    next: LanguageEntry[]
  ) => void;
}


// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const PROFICIENCIES: LanguageProficiency[] = [
  "Basic",
  "Conversational",
  "Fluent",
  "Native",
];


// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const newId = () =>
  `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;


// ─────────────────────────────────────────────
// Languages Section
// ─────────────────────────────────────────────

export function LanguagesSection({
  data,
  onChange,
}: LanguagesSectionProps) {
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: newId(),
        name: "",
        proficiency: "Conversational",
      },
    ]);
  };

  const updateEntry = (
    id: string,
    patch: Partial<LanguageEntry>
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
          Languages
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Add the languages you speak and
          indicate your proficiency level.
        </p>
      </div>

      {/* Languages */}

      <div className="space-y-4">
        {data.map((entry, index) => (
          <Card
            key={entry.id}
            className="border-border shadow-none"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold">
                {entry.name ||
                  `Language ${index + 1}`}
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

            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Language */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`language-${entry.id}`}
                  >
                    Language
                  </Label>

                  <Input
                    id={`language-${entry.id}`}
                    value={entry.name}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          name: event.target
                            .value,
                        }
                      )
                    }
                    placeholder="French"
                  />
                </div>

                {/* Proficiency */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`proficiency-${entry.id}`}
                  >
                    Proficiency
                  </Label>

                  <select
                    id={`proficiency-${entry.id}`}
                    value={entry.proficiency}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          proficiency:
                            event.target
                              .value as LanguageProficiency,
                        }
                      )
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {PROFICIENCIES.map(
                      (proficiency) => (
                        <option
                          key={proficiency}
                          value={proficiency}
                        >
                          {proficiency}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add language */}

      <Button
        type="button"
        variant="outline"
        onClick={addEntry}
        className="w-full sm:w-auto"
      >
        Add language
      </Button>
    </div>
  );
}