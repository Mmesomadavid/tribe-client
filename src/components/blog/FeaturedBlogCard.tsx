import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import type { BlogPost } from './blog-posts';

type FeaturedBlogCardProps = {
  post: BlogPost;
  eyebrow?: string;
  /** Route prefix the card links into, e.g. "/articles" or the current dashboard discover path. */
  basePath?: string;
};

export default function FeaturedBlogCard({
  post,
  eyebrow = 'From the team',
  basePath = '/articles',
}: FeaturedBlogCardProps) {
  const initial = post.author.name.trim()[0]?.toUpperCase() ?? 'U';

  return (
    <Link
      to={`${basePath}/${post.slug}`}
      className="group relative block overflow-hidden rounded-3xl bg-gray-950 shadow-sm"
    >
      <div className="aspect-[4/3] w-full sm:aspect-[21/9]">
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/0" />

      {/* open affordance */}
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-950 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 sm:right-5 sm:top-5">
        <ArrowUpRight size={18} />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
          {eyebrow}
        </p>

        <h2 className="max-w-2xl text-xl font-semibold leading-tight text-white sm:text-3xl">
          {post.title}
        </h2>

        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/70 sm:text-sm">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5">
          <Avatar className="h-8 w-8 ring-2 ring-white/20">
            <AvatarImage src={post.author.avatar ?? undefined} alt={post.author.name} />
            <AvatarFallback className="bg-white text-[11px] font-semibold text-gray-950">
              {initial}
            </AvatarFallback>
          </Avatar>
          <span className="text-[13px] font-medium text-white">{post.author.name}</span>
          <span className="flex items-center gap-1 text-[13px] text-white/60">
            <Calendar size={12} />
            {post.date}
          </span>

          <div className="ml-auto flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full border-0 bg-white/15 text-[11px] font-medium text-white backdrop-blur-sm hover:bg-white/15"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}