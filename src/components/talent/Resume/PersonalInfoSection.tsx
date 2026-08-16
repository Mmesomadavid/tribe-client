import type { ResumeData } from "../../../types/resumeTypes";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";

export function PersonalInfoSection({
  data,
  onChange,
}: {
  data: ResumeData["personalInfo"];
  onChange: (next: ResumeData["personalInfo"]) => void;
}) {
  const set = <
    K extends keyof ResumeData["personalInfo"]
  >(
    key: K,
    value: ResumeData["personalInfo"][K]
  ) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-950">
          Personal Info
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          How you introduce yourself at the top of the resume.
        </p>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full name
          </Label>

          <Input
            id="fullName"
            value={data.fullName}
            onChange={(event) =>
              set(
                "fullName",
                event.target.value
              )
            }
            placeholder="Ada Lovelace"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Title
          </Label>

          <Input
            id="title"
            value={data.title}
            onChange={(event) =>
              set(
                "title",
                event.target.value
              )
            }
            placeholder="Product Designer"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(event) =>
              set(
                "email",
                event.target.value
              )
            }
            placeholder="ada@example.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone
          </Label>

          <Input
            id="phone"
            value={data.phone}
            onChange={(event) =>
              set(
                "phone",
                event.target.value
              )
            }
            placeholder="+234 800 000 0000"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">
            Location
          </Label>

          <Input
            id="location"
            value={data.location}
            onChange={(event) =>
              set(
                "location",
                event.target.value
              )
            }
            placeholder="Port Harcourt, Nigeria"
          />
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">
            Website
          </Label>

          <Input
            id="website"
            value={data.website}
            onChange={(event) =>
              set(
                "website",
                event.target.value
              )
            }
            placeholder="adalovelace.com"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="linkedin">
            LinkedIn
          </Label>

          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(event) =>
              set(
                "linkedin",
                event.target.value
              )
            }
            placeholder="linkedin.com/in/adalovelace"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">
          Professional Summary
        </Label>

        <Textarea
          id="summary"
          value={data.summary}
          onChange={(event) =>
            set(
              "summary",
              event.target.value
            )
          }
          placeholder="A two- or three-sentence pitch: what you do, your strongest skills, and what you're looking for next."
          rows={5}
        />

        <p className="text-xs text-gray-500">
          Keep this concise and focused on your
          strongest professional qualities.
        </p>
      </div>
    </section>
  );
}