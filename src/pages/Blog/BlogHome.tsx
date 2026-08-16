import { PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BlogFeed from "../../components/talent/blog/BlogFeed";
import BlogSidebar from "../../components/talent/blog/BlogSidebar";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const BlogHome = () => {
  const navigate = useNavigate();

  const tabs = [
    { value: "for-you", label: "For you" },
    { value: "featured", label: "Featured" },
    { value: "following", label: "Following" },
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-8 lg:px-8 xl:px-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Blog
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Discover ideas, insights, and stories from the WorkTribe
            community.
          </p>
        </div>

        {/* Main layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main feed column */}
          <main className="min-w-0">
            {/* Feed navigation */}
            <div className="flex items-center justify-between border-b border-gray-200">
              {/* Tabs */}
              <Tabs defaultValue="for-you">
                <TabsList className="h-auto w-fit justify-start gap-4 overflow-x-auto bg-transparent p-0">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="
                        relative
                        h-11
                        shrink-0
                        rounded-none
                        border-0
                        bg-transparent
                        px-1
                        pb-3
                        pt-2
                        text-sm
                        font-medium
                        text-gray-500
                        shadow-none
                        transition-colors

                        hover:bg-transparent
                        hover:text-gray-900

                        data-[state=active]:bg-transparent
                        data-[state=active]:text-black
                        data-[state=active]:shadow-none

                        after:absolute
                        after:bottom-0
                        after:left-0
                        after:h-1
                        after:w-0
                        after:rounded-t-sm
                        after:bg-black
                        after:transition-all

                        data-[state=active]:after:w-full
                      "
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Write blog */}
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/talent/blog/write")
                }
                className="mb-2 flex shrink-0 items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                <PenLine className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Write a blog
                </span>

                <span className="sm:hidden">
                  Write
                </span>
              </button>
            </div>

            {/* Blog feed */}
            <div className="mt-6">
              <BlogFeed />
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="min-w-0">
            <BlogSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
