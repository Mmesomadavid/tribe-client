import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { postsApi, ApiError } from "../../../lib/api"; // adjust path to match your structure

interface Post {
  _id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  author: {
    _id: string;
    name: string;
    avatar: string | null;
    bio?: string;
  };
  likesCount: number;
  commentsCount: number;
  resharesCount: number;
  bookmarksCount: number;
  publishedAt: string | null;
  createdAt: string;
  likedByMe?: boolean;
  bookmarkedByMe?: boolean;
  resharedByMe?: boolean;
}

const formatRelativeDate = (dateString: string | null) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BlogFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadFeed = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await postsApi.getFeed();

        if (mounted) {
          setPosts(data.posts ?? []);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Unable to load the feed right now."
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadFeed();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Feed controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Latest articles
        </h2>

        <button
          type="button"
          className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          Latest
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div
            className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900"
            aria-label="Loading articles"
            role="status"
          />
          </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && posts.length === 0 && (
        <div className="py-12 text-center text-sm text-gray-400">
          No articles yet. Be the first to publish one.
        </div>
      )}

      {/* Blog cards */}
      {!isLoading && !error && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              blog={{
                id: post._id,
                author: {
                  name: post.author?.name ?? "Unknown",
                  username: post.author?.name
                    ?.toLowerCase()
                    .replace(/\s+/g, "") ?? "unknown",
                  avatar: post.author?.avatar ?? "",
                },
                title: post.title,
                content: post.excerpt,
                image: "", // no cover image field on the Post model yet
                likes: post.likesCount ?? 0,
                comments: post.commentsCount ?? 0,
                reshares: post.resharesCount ?? 0,
                bookmarks: post.bookmarksCount ?? 0,
                date: formatRelativeDate(post.publishedAt ?? post.createdAt),
                likedByMe: post.likedByMe ?? false,
                bookmarkedByMe: post.bookmarkedByMe ?? false,
                resharedByMe: post.resharedByMe ?? false,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogFeed;