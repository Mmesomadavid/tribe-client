import type { SkillGroup } from "../../../types/resumeTypes";

import { useState } from "react";
import { X } from "lucide-react";

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

interface SkillsSectionProps {
  data: SkillGroup[];
  onChange: (next: SkillGroup[]) => void;
}


// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const newId = () =>
  `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;


// ─────────────────────────────────────────────
// Skills Section
// ─────────────────────────────────────────────

export function SkillsSection({
  data,
  onChange,
}: SkillsSectionProps) {
  const addGroup = () => {
    onChange([
      ...data,
      {
        id: newId(),
        category: "",
        items: [],
      },
    ]);
  };

  const updateGroup = (
    id: string,
    patch: Partial<SkillGroup>
  ) => {
    onChange(
      data.map((group) =>
        group.id === id
          ? {
              ...group,
              ...patch,
            }
          : group
      )
    );
  };

  const removeGroup = (id: string) => {
    onChange(
      data.filter(
        (group) => group.id !== id
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Section heading */}

      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Skills
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Group related skills together, e.g.
          "Design Tools", "Languages", or
          "Backend Technologies".
        </p>
      </div>

      {/* Skill groups */}

      <div className="space-y-4">
        {data.map((group, index) => (
          <Card
            key={group.id}
            className="border-border shadow-none"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold">
                {group.category ||
                  `Skill group ${index + 1}`}
              </CardTitle>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  removeGroup(group.id)
                }
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
              >
                Remove
              </Button>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Category */}

              <div className="space-y-2">
                <Label htmlFor={`category-${group.id}`}>
                  Category
                </Label>

                <Input
                  id={`category-${group.id}`}
                  value={group.category}
                  onChange={(event) =>
                    updateGroup(
                      group.id,
                      {
                        category:
                          event.target.value,
                      }
                    )
                  }
                  placeholder="Design Tools"
                />
              </div>

              {/* Skills */}

              <TagEditor
                items={group.items}
                onChange={(items) =>
                  updateGroup(
                    group.id,
                    { items }
                  )
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add group */}

      <Button
        type="button"
        variant="outline"
        onClick={addGroup}
        className="w-full sm:w-auto"
      >
        Add skill group
      </Button>
    </div>
  );
}


// ─────────────────────────────────────────────
// Tag Editor
// ─────────────────────────────────────────────

interface TagEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
}

function TagEditor({
  items,
  onChange,
}: TagEditorProps) {
  const [draft, setDraft] =
    useState("");

  const commit = () => {
    const value = draft.trim();

    if (
      value &&
      !items.some(
        (item) =>
          item.toLowerCase() ===
          value.toLowerCase()
      )
    ) {
      onChange([
        ...items,
        value,
      ]);
    }

    setDraft("");
  };

  const removeItem = (
    itemToRemove: string
  ) => {
    onChange(
      items.filter(
        (item) =>
          item !== itemToRemove
      )
    );
  };

  return (
    <div className="space-y-2">
      <Label>Skills</Label>

      <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {item}

            <button
              type="button"
              onClick={() =>
                removeItem(item)
              }
              className="rounded-full text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Remove ${item}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        <input
          value={draft}
          onChange={(event) =>
            setDraft(
              event.target.value
            )
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === ","
            ) {
              event.preventDefault();
              commit();
            }
          }}
          onBlur={commit}
          placeholder={
            items.length === 0
              ? "Type a skill, press Enter"
              : "Add another skill..."
          }
          className="min-w-[160px] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Press Enter or comma to add a
        skill.
      </p>
    </div>
  );
}