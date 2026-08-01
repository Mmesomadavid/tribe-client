import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import BlogCard from './BlogCard';
import FeaturedBlogCard from './FeaturedBlogCard';
import { FEATURED_POST, POSTS } from './blog-posts';

const CATEGORIES = ['All', 'Platform Updates', 'Hiring', 'Careers', 'Freelance', 'AI Insights'];

type ArticlesContentProps = {
  eyebrow?: string;
  /** Route prefix each card links into, e.g. "/articles" or the current dashboard discover path. */
  basePath?: string;
};

export default function ArticlesContent({ eyebrow = 'Discover', basePath = '/articles' }: ArticlesContentProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesQuery = q === '' || post.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <div className="mb-8 sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{eyebrow}</p>
        <h1 className="text-4xl font-semibold text-gray-950">Articles</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-500">
          Explore practical career guides, hiring insights, and thoughtful reads designed for ambitious talent
          and teams.
        </p>
      </div>

      {/* Big feature card: platform updates & trending topics from us */}
      <div className="mb-10 sm:mb-12">
        <FeaturedBlogCard post={FEATURED_POST} basePath={basePath} />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                category === cat
                  ? 'bg-gray-950 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} basePath={basePath} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-500">
            No articles match {query ? `"${query}"` : 'this filter'} in {category}.
          </p>
        </div>
      )}
    </>
  );
}