import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPost } from './blog-posts';

export type { BlogPost };

type BlogCardProps = {
  post: BlogPost;
  /** Route prefix the card links into, e.g. "/articles" or the current dashboard discover path. */
  basePath?: string;
};

export default function BlogCard({ post, basePath = '/articles' }: BlogCardProps) {
  const href = `${basePath}/${post.slug}`;

  return (
    <article className="group flex flex-col">
      <Link
        to={href}
        className="relative mb-4 block aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
      >
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* folded-corner accent, top right */}
        <span className="pointer-events-none bg-black absolute right-0 top-0 h-0 w-0 border-t-[26px] border-l-[26px] border-t-white border-l-transparent drop-shadow-sm" />

        {/* gradient for legibility of overlaid text */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <div className="text-white">
            <p className="text-[13px] font-medium leading-tight">{post.author.name}</p>
            <p className="text-[11px] text-white/75">{post.date}</p>
          </div>
          <span className="rounded-md bg-black/25 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </Link>

      <Link to={href}>
        <h3 className="text-[17px] font-semibold text-gray-950 underline decoration-transparent decoration-2 underline-offset-4 transition-all duration-200 group-hover:decoration-gray-950">
          {post.title}
        </h3>
      </Link>

      <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-gray-500">
        {post.excerpt}
      </p>

      <Link
        to={href}
        className="mt-3 inline-flex w-fit items-center gap-1 text-[13.5px] font-medium text-gray-950 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-950"
      >
        Read post
        <ArrowUpRight size={14} />
      </Link>
    </article>
  );
}