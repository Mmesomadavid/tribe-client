import TrendingTopics from "./TrendingTopics";
import SuggestedUsers from "./SuggestedUsers";

const BlogSidebar = () => {
  return (
    <div className="space-y-4">
      <TrendingTopics />
      <SuggestedUsers />
    </div>
  );
};

export default BlogSidebar;