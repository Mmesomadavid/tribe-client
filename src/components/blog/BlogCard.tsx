import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import type { BlogPost } from './blog-posts';

export type { BlogPost };

type BlogCardProps = {
  post: BlogPost;
  /** Route prefix the card links into, e.g. "/articles" or the current dashboard discover path. */
  basePath?: string;
};

export default function BlogCard({ post, basePath = '/articles' }: BlogCardProps) {
  const initial = post.author.name.trim()[0]?.toUpperCase() ?? 'U';
  const href = `${basePath}/${post.slug}`;

  return (
    <article className="group flex flex-col">
      <Link
        to={href}
        className="relative mb-3 block aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
      >
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-400">
        {post.category}
      </p>

      <Link to={href}>
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-gray-950 transition-colors group-hover:text-gray-600">
          {post.title}
        </h3>
      </Link>

      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-gray-500">
        {post.excerpt}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={post.author.avatar ?? undefined} alt={post.author.name} />
          <AvatarFallback className="bg-gray-950 text-[10px] font-semibold text-white">
            {initial}
          </AvatarFallback>
        </Avatar>
        <span className="text-[12.5px] font-medium text-gray-700">{post.author.name}</span>
        <span className="text-gray-300">·</span>
        <span className="text-[12.5px] text-gray-400">{post.date}</span>
        <span className="text-gray-300">·</span>
        <span className="text-[12.5px] text-gray-400">{post.readTime}</span>
      </div>
    </article>
  );
}