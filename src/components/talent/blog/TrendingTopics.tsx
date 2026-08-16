import { Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

const TrendingTopics = () => {
  const topics = [
    {
      name: "Technology",
      stories: "665K stories",
      writers: "207K writers",
      following: true,
    },
    {
      name: "Writing",
      stories: "428K stories",
      writers: "126K writers",
      following: false,
    },
    {
      name: "Self Improvement",
      stories: "391K stories",
      writers: "118K writers",
      following: false,
    },
    {
      name: "Relationships",
      stories: "312K stories",
      writers: "96K writers",
      following: false,
    },
    {
      name: "Politics",
      stories: "284K stories",
      writers: "91K writers",
      following: false,
    },
    {
      name: "Productivity",
      stories: "246K stories",
      writers: "83K writers",
      following: false,
    },
    {
      name: "Python",
      stories: "198K stories",
      writers: "72K writers",
      following: false,
    },
  ];

  return (
    <Card className="rounded-2xl border-gray-200 bg-white shadow-none">
      <CardHeader className="px-5 pb-3 pt-5">
        <CardTitle className="text-sm font-semibold tracking-tight text-gray-900">
          Trending topics
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <Tabs defaultValue="Technology">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {topics.map((topic) => (
              <div
                key={topic.name}
                className="flex items-center rounded-full border border-gray-400 bg-white"
              >
                <TabsTrigger
                  value={topic.name}
                  className="h-8 rounded-full border-0 bg-transparent px-3 text-xs font-medium text-gray-600 shadow-none transition-colors hover:bg-gray-50 hover:text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                >
                  {topic.name}
                </TabsTrigger>

                <button
                  type="button"
                  aria-label={
                    topic.following
                      ? `Following ${topic.name}`
                      : `Follow ${topic.name}`
                  }
                  className={`mr-1 flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                    topic.following
                      ? "text-gray-900 hover:bg-gray-100"
                      : "text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </TabsList>
        </Tabs>

        {/* Selected topic information */}
        <div className="mt-5 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Technology
              </p>

              <p className="mt-1 text-xs text-gray-500">
                665K stories · 207K writers
              </p>
            </div>

            <span className="text-xs font-medium text-gray-500">
              Following
            </span>
          </div>

          <button
            type="button"
            className="mt-3 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Mute topic
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
