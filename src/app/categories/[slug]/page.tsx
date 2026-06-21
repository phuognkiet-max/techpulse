import Link from "next/link";
import { client } from "@/lib/sanity";
import { ARTICLES_BY_CATEGORY, ALL_CATEGORIES } from "@/lib/queries";
import { SITE_URL } from "@/lib/constants";
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
  if (!client) return { title: "Chủ đề" };

  const { slug } = await params;
  const categories = await client.fetch<Category[]>(ALL_CATEGORIES);
  const category = categories.find((c) => c.slug.current === slug);

  return {
    title: category?.title || "Chủ đề",
    description: category?.description || `Tin tức về ${category?.title}`,
    alternates: {
      canonical: `${SITE_URL}/categories/${slug}`,
    },
  };
}

function getCategoryBg(color?: string) {
  const styles: Record<string, string> = {
    blue: "bg-[var(--cat-ai)]",
    purple: "bg-[var(--cat-analysis)]",
    green: "bg-[var(--cat-software)]",
    orange: "bg-[var(--cat-startup)]",
    red: "bg-[var(--cat-hardware)]",
    cyan: "bg-[var(--cat-mobile)]",
  };
  return styles[color || "blue"] || styles.blue;
}

export default async function CategoryPage({ params }: PageProps) {
  if (!client) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 text-center">
        <p className="text-[var(--text-secondary)]">Sanity CMS chưa được cấu hình. Vui lòng thêm Project ID vào .env.local</p>
      </div>
    );
  }

  const { slug } = await params;

  const [articles, categories] = await Promise.all([
    client.fetch<Article[]>(ARTICLES_BY_CATEGORY, { slug }),
    client.fetch<Category[]>(ALL_CATEGORIES),
  ]);

  const currentCategory = categories.find((c) => c.slug.current === slug);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
      {/* Category Header */}
      <section className="py-10 md:py-14 border-b border-[var(--border)] mb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">
            {currentCategory?.title || "Chủ đề"}
          </h1>
          {currentCategory?.description && (
            <p className="text-lg text-[var(--text-secondary)]">
              {currentCategory.description}
            </p>
          )}
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            {articles.length} bài viết
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat.slug.current}`}
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              cat.slug.current === slug
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Chưa có bài viết
          </h2>
          <p className="text-[var(--text-secondary)]">
            Hiện tại chưa có bài viết nào trong chủ đề này. Hãy quay lại sau!
          </p>
        </div>
      )}
    </div>
  );
}
