import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import ArticlesContent from '../components/blog/ArticlesContent';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <ArticlesContent />
      </main>
      <Footer />
    </div>
  );
}