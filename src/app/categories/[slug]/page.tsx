import { client } from "@/lib/sanity";
import { ARTICLES_BY_CATEGORY, ALL_CATEGORIES } from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import type { Article, Category } from "@/types";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!client) return [];
  const categories = await client.fetch<Category[]>(ALL_CATEGORIES);
  return categories.map((cat) => ({ slug: cat.slug.current }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  if (!client) return { title: "Chu de" };
  
  const { slug } = await params;
  const categories = await client.fetch<Category[]>(ALL_CATEGORIES);
  const category = categories.find((c) => c.slug.current === slug);

  return {
    title: category?.title || "Chu de",
    description: category?.description || `Tin tuc ve ${category?.title}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  if (!client) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-[var(--text-secondary)]">Sanity CMS chua duoc cau hinh. Vui long them Project ID vao .env.local</p>
      </div>
    );
  }

  const { slug } = await params;

  const [articles, categories] = await Promise.all([
    client.fetch<Article[]>(ARTICLES_BY_CATEGORY, { slug }),
    client.fetch<Category[]>(ALL_CATEGORIES),
  ]);

  const currentCategory = categories.find((c) => c.slug.current === slug);

  const categoryColors: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/5",
    purple: "from-purple-500/20 to-purple-600/5",
    green: "from-green-500/20 to-green-600/5",
    orange: "from-orange-500/20 to-orange-600/5",
    red: "from-red-500/20 to-red-600/5",
    cyan: "from-cyan-500/20 to-cyan-600/5",
  };

  const bgGradient =
    categoryColors[currentCategory?.color || "blue"] || categoryColors.blue;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <section
        className={`py-12 md:py-16 bg-gradient-to-b ${bgGradient} -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-12`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-4">{currentCategory?.icon || "📱"}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            {currentCategory?.title || "Chu de"}
          </h1>
          {currentCategory?.description && (
            <p className="text-lg text-[var(--text-secondary)]">
              {currentCategory.description}
            </p>
          )}
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            {articles.length} bai viet
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <a
            key={cat._id}
            href={`/categories/${cat.slug.current}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              cat.slug.current === slug
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            }`}
          >
            {cat.title}
          </a>
        ))}
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Chua co bai viet
          </h2>
          <p className="text-[var(--text-secondary)]">
            Hien tai chua co bai viet nao trong chu de nay. Hay quay lai sau!
          </p>
        </div>
      )}
    </div>
  );
}
