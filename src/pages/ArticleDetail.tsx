import { Link, useParams } from 'react-router-dom';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import ArticleDetailContent from '../components/blog/ArticleDetailContent';
import { getPostBySlug } from '../components/blog/blog-posts';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        {post ? (
          <ArticleDetailContent post={post} />
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold text-gray-950">Article not found</p>
            <p className="mt-2 text-sm text-gray-500">This article may have been moved or unpublished.</p>
            <Link
              to="/articles"
              className="mt-6 inline-flex rounded-full bg-gray-950 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Back to articles
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}