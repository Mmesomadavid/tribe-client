import type { CertificationEntry } from "../../../types/resumeTypes";

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

interface CertificationsSectionProps {
  data: CertificationEntry[];
  onChange: (
    next: CertificationEntry[]
  ) => void;
}


// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const newId = () =>
  `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;


// ─────────────────────────────────────────────
// Certifications Section
// ─────────────────────────────────────────────

export function CertificationsSection({
  data,
  onChange,
}: CertificationsSectionProps) {
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: newId(),
        name: "",
        issuer: "",
        date: "",
        credentialUrl: "",
      },
    ]);
  };

  const updateEntry = (
    id: string,
    patch: Partial<CertificationEntry>
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
          Certifications
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Add licenses and certifications
          relevant to the roles you want.
        </p>
      </div>

      {/* Certifications */}

      <div className="space-y-4">
        {data.map((entry, index) => (
          <Card
            key={entry.id}
            className="border-border shadow-none"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold">
                {entry.name ||
                  `Certification ${index + 1}`}
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
                {/* Name */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`cert-name-${entry.id}`}
                  >
                    Name
                  </Label>

                  <Input
                    id={`cert-name-${entry.id}`}
                    value={entry.name}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          name: event.target.value,
                        }
                      )
                    }
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                {/* Issuer */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`cert-issuer-${entry.id}`}
                  >
                    Issuer
                  </Label>

                  <Input
                    id={`cert-issuer-${entry.id}`}
                    value={entry.issuer}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          issuer:
                            event.target.value,
                        }
                      )
                    }
                    placeholder="Amazon Web Services"
                  />
                </div>

                {/* Date */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`cert-date-${entry.id}`}
                  >
                    Date
                  </Label>

                  <Input
                    id={`cert-date-${entry.id}`}
                    type="month"
                    value={entry.date}
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          date: event.target.value,
                        }
                      )
                    }
                  />
                </div>

                {/* Credential URL */}

                <div className="space-y-2">
                  <Label
                    htmlFor={`cert-url-${entry.id}`}
                  >
                    Credential URL
                    <span className="ml-1 text-muted-foreground">
                      (optional)
                    </span>
                  </Label>

                  <Input
                    id={`cert-url-${entry.id}`}
                    type="url"
                    value={
                      entry.credentialUrl
                    }
                    onChange={(event) =>
                      updateEntry(
                        entry.id,
                        {
                          credentialUrl:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="https://credential.link/id"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add certification */}

      <Button
        type="button"
        variant="outline"
        onClick={addEntry}
        className="w-full sm:w-auto"
      >
        Add certification
      </Button>
    </div>
  );
}