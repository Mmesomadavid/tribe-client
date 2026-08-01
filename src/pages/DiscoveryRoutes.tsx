import { useLocation } from 'react-router-dom';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import ArticlesContent from '../components/blog/ArticlesContent';
import ArticleDetailContent from '../components/blog/ArticleDetailContent';
import { getPostBySlug } from '../components/blog/blog-posts';
import { useAuth } from '../contexts/Authcontext';

const slugLabels: Record<string, string> = {
  jobs: 'Jobs',
  freelance: 'Freelance Projects',
  companies: 'Companies',
  talent: 'Talent',
  article: 'Articles',
  articles: 'Articles',
  'career-guides': 'Career Guides',
  'ai-insights': 'AI Insights',
  events: 'Events',
  browse: 'Browse Communities',
  me: 'My Communities',
  discussions: 'Discussions',
  mentorship: 'Mentorship',
  leaderboards: 'Leaderboards',
};

// First segment values that mean "this is the articles section" (list or detail).
const ARTICLE_SLUGS = new Set(['article', 'articles']);

const toTitleCase = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export default function DiscoveryRoutesPage({ variant = 'public' }: { variant?: 'public' | 'dashboard' }) {
  const location = useLocation();
  const { user } = useAuth();
  const pathname = location.pathname.replace(/^\//, '');
  const parts = pathname.split('/').filter(Boolean);
  const section = parts.includes('communities') ? 'Communities' : 'Discover';
  const discoveryIndex = parts.indexOf(section.toLowerCase());
  const slug = discoveryIndex >= 0 ? parts.slice(discoveryIndex + 1).join('/') : parts.join('/');
  const slugParts = slug.split('/').filter(Boolean);
  const title = slugLabels[slug] ?? toTitleCase(slug || 'Overview');

  // e.g. ".../discover/article" or ".../discover/article/toins-explained"
  if (slugParts.length > 0 && ARTICLE_SLUGS.has(slugParts[0])) {
    // basePath is everything up to and including the "article" segment, so
    // cards and the "back" link stay inside whichever dashboard/public shell we're in.
    const basePath = `/${parts.slice(0, discoveryIndex + 1 + 1).join('/')}`;
    const postSlug = slugParts[1];

    if (postSlug) {
      const post = getPostBySlug(postSlug);
      return (
        <div className="min-h-screen bg-white">
          <Header variant={variant} user={user} />
          <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            {post ? (
              <ArticleDetailContent post={post} basePath={basePath} />
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg font-semibold text-gray-950">Article not found</p>
                <p className="mt-2 text-sm text-gray-500">This article may have been moved or unpublished.</p>
              </div>
            )}
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <Header variant={variant} user={user} />
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <ArticlesContent eyebrow={section} basePath={basePath} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant={variant} user={user} />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{section}</p>
          <h1 className="text-4xl font-semibold text-gray-950">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-500">
            This is the placeholder page for the {title.toLowerCase()} section. You can later replace it with the real details view.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
          <p className="text-sm text-gray-600">
            Current route: <span className="font-medium text-gray-900">{location.pathname}</span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}