import { PenLine } from "lucide-react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

import { useAuth } from "../../../contexts/Authcontext";

const RecommendedSkillsCard = () => {
  const { user } = useAuth();

  const skills =
    user?.skills?.length
      ? user.skills
      : [
          "Go",
          "Python",
          "PostgreSQL",
          "Docker",
          "Kubernetes",
          "AWS",
          "Redis",
          "Terraform",
        ];

  // Show only the first 4 skills and represent the rest with +N more.
  const visibleSkills = skills.slice(0, 4);
  const remainingSkills = Math.max(
    skills.length - visibleSkills.length,
    0
  );

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-gray-900">
            Skills
          </h3>

          <button
            type="button"
            aria-label="Edit skills"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <PenLine className="h-4 w-4" />
          </button>
        </div>

        {/* Skills */}
        <Tabs
          defaultValue={visibleSkills[0]}
          className="mt-4 w-full"
        >
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {visibleSkills.map((skill: string) => (
              <TabsTrigger
                key={skill}
                value={skill}
                className="h-auto rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-none transition-all hover:border-gray-300 hover:bg-gray-50 data-[state=active]:border-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
              >
                {skill}
              </TabsTrigger>
            ))}

            {remainingSkills > 0 && (
              <TabsTrigger
                value="more"
                className="h-auto rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 shadow-none hover:border-gray-300 hover:bg-gray-50"
              >
                +{remainingSkills} more
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RecommendedSkillsCard;