import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import BlogCard from './BlogCard';
import { getRelatedPosts, type BlogPost } from './blog-posts';

type ArticleDetailContentProps = {
  post: BlogPost;
  /** Route prefix for "back to articles" and related cards, e.g. "/articles" or the current dashboard discover path. */
  basePath?: string;
};

export default function ArticleDetailContent({ post, basePath = '/articles' }: ArticleDetailContentProps) {
  const initial = post.author.name.trim()[0]?.toUpperCase() ?? 'U';
  const related = getRelatedPosts(post, 3);

  return (
    <article>
      <Link
        to={basePath}
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={14} />
        Back to articles
      </Link>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{post.category}</p>

      <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-gray-950 sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={post.author.avatar ?? undefined} alt={post.author.name} />
          <AvatarFallback className="bg-gray-950 text-xs font-semibold text-white">
            {initial}
          </AvatarFallback>
        </Avatar>
        <span className="text-[13.5px] font-medium text-gray-900">{post.author.name}</span>
        <span className="text-gray-300">·</span>
        <span className="flex items-center gap-1 text-[13px] text-gray-500">
          <Calendar size={13} />
          {post.date}
        </span>
        <span className="text-gray-300">·</span>
        <span className="flex items-center gap-1 text-[13px] text-gray-500">
          <Clock size={13} />
          {post.readTime}
        </span>
      </div>

      <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-gray-100 sm:aspect-[21/9]">
        <img src={post.image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full border-0 bg-gray-100 text-[11px] font-medium text-gray-600">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-8 max-w-2xl space-y-5">
        {post.content.map((paragraph, index) => (
          <p key={index} className="text-[15px] leading-relaxed text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-gray-100 pt-10 sm:mt-20 sm:pt-12">
          <h2 className="mb-6 text-lg font-semibold text-gray-950">More reads</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} basePath={basePath} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}