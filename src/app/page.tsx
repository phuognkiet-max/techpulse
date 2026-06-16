import Link from "next/link";
import { client } from "@/lib/sanity";
import {
  ALL_ARTICLES,
  FEATURED_ARTICLES,
  ALL_CATEGORIES,
} from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import type { Article, Category } from "@/types";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

async function getData() {
  if (!client) {
    return { allArticles: [], featuredArticles: [], categories: [] };
  }
  
  try {
    const [allArticles, featuredArticles, categories] = await Promise.all([
      client.fetch<Article[]>(ALL_ARTICLES),
      client.fetch<Article[]>(FEATURED_ARTICLES),
      client.fetch<Category[]>(ALL_CATEGORIES),
    ]);
    return { allArticles, featuredArticles, categories };
  } catch {
    return { allArticles: [], featuredArticles: [], categories: [] };
  }
}

export default async function HomePage() {
  const { allArticles, featuredArticles, categories } = await getData();

  const latestArticles = allArticles.slice(0, 6);
  const trendingArticles = allArticles.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-1.5 text-sm text-[var(--text-secondary)] mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Cap nhat tin tuc cong nghe moi nhat
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            <span className="gradient-text">TechPulse</span>
            <br />
            <span className="text-[var(--text-primary)]">
              Tin Tuc Cong Nghe
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Nguon tin dang tin cay ve AI, Smartphone, Startup, Software va
            Hardware. Duoc bien tap chuyen nghiep, cap nhat hang ngay.
          </p>
        </div>
      </section>

      {/* Sanity not configured notice */}
      {!client && (
        <div className="mb-12 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 text-center">
          <p className="text-yellow-400 font-medium mb-2">⚠️ Sanity CMS chua duoc cau hinh</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Vui long them <code className="bg-[var(--bg-card)] px-2 py-0.5 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code> vao file <code className="bg-[var(--bg-card)] px-2 py-0.5 rounded">.env.local</code> va khoi dong lai.
          </p>
        </div>
      )}

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Noi bat
            </h2>
            <Link
              href="/categories"
              className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              Xem tat ca →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, i) => (
              <div key={article._id} className={`animate-fade-in-up animate-delay-${(i + 1) * 100}`}>
                <ArticleCard article={article} variant="featured" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categories Quick Access */}
      {categories.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
            Kham pha theo chu de
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/categories/${cat.slug.current}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--accent)] hover:bg-[var(--bg-card)] glow-hover transition-all text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white text-xl">
                  {cat.icon || "📱"}
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Bai viet moi nhat
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Trending Sidebar Style */}
      {trendingArticles.length > 0 && (
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
                Dang xu huong
              </h2>
              <div className="space-y-0">
                {trendingArticles.map((article, i) => (
                  <div key={article._id} className="flex gap-4 py-4 border-b border-[var(--border)]">
                    <span className="text-3xl font-bold text-[var(--accent)]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <Link href={`/articles/${article.slug.current}`}>
                        <h3 className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-1">
                        {article.excerpt}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--accent)]">
                          {article.category?.title}
                        </span>
                        <span>·</span>
                        <time>{new Date(article.publishedAt).toLocaleDateString("vi-VN")}</time>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sticky top-24">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] mb-4">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  Dang ky nhan tin
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Nhung tin tuc cong nghe moi nhat moi tuan qua email.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                  >
                    Dang ky
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
