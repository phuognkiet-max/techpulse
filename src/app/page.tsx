import Link from "next/link";
import { client } from "@/lib/sanity";
import { ALL_ARTICLES, FEATURED_ARTICLES, ALL_CATEGORIES } from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import type { Article, Category } from "@/types";

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

  const heroArticle = featuredArticles[0] || allArticles[0];
  const sideArticles = (featuredArticles.length > 1 ? featuredArticles.slice(1, 4) : allArticles.slice(1, 4));
  const latestArticles = allArticles.slice(0, 6);
  const trendingArticles = allArticles.slice(0, 5);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
      {/* Sanity not configured notice */}
      {!client && (
        <div className="my-8 rounded-xl border border-amber-200/60 bg-amber-50/80 p-5 text-center">
          <p className="text-amber-700 font-medium mb-1">Sanity CMS chưa được cấu hình</p>
          <p className="text-sm text-amber-600">
            Vui lòng thêm <code className="bg-amber-100 px-1.5 py-0.5 rounded-md text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> vào file <code className="bg-amber-100 px-1.5 py-0.5 rounded-md text-xs">.env.local</code> và khởi động lại.
          </p>
        </div>
      )}

      {/* ─── Hero Section: Magazine Grid ─── */}
      {heroArticle && (
        <section className="py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main hero */}
            <div>
              <Link href={`/articles/${heroArticle.slug.current}`}>
                <article className="card-premium group overflow-hidden">
                  <div className="relative h-72 md:h-[420px] bg-[var(--bg-tertiary)] overflow-hidden">
                    {(heroArticle.coverImageUrl || heroArticle.coverImage) && (
                      <div className="img-overlay w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={heroArticle.coverImageUrl || heroArticle.coverImage}
                          alt={heroArticle.title}
                          className="absolute inset-0 w-full h-full object-cover img-cinematic group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <span className="inline-flex items-center rounded-lg bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white mb-4 shadow-sm">
                      {heroArticle.category?.title}
                    </span>
                    <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--text-primary)] leading-tight tracking-tighter mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {heroArticle.title}
                    </h1>
                    <p className="text-base text-[var(--text-secondary)] line-clamp-2 mb-5 leading-relaxed tracking-wide">
                      {heroArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] tracking-wide">
                      <span className="font-medium text-[var(--text-secondary)]">{heroArticle.author?.name}</span>
                      <span>·</span>
                      <time>{new Date(heroArticle.publishedAt || Date.now()).toLocaleDateString("vi-VN")}</time>
                      {heroArticle.readingTime && (
                        <>
                          <span>·</span>
                          <span>{heroArticle.readingTime} phút đọc</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            </div>

            {/* Side stories */}
            <div className="flex flex-col gap-4">
              {sideArticles.map((article) => (
                <Link key={article._id} href={`/articles/${article.slug.current}`}>
                  <article className="group flex gap-4 p-4 rounded-2xl border border-[var(--border)] bg-white hover:shadow-[var(--shadow-md)] transition-all duration-300 overflow-hidden">
                    <div className="h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--bg-tertiary)]">
                      {(article.coverImageUrl || article.coverImage) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.coverImageUrl || article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover img-cinematic"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${getCategoryTextColor(article.category?.color)}`}>
                        {article.category?.title}
                      </span>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug tracking-tight">
                        {article.title}
                      </h3>
                      <div className="mt-2 text-xs text-[var(--text-muted)] tracking-wide">
                        {new Date(article.publishedAt || Date.now()).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Category Pills ─── */}
      {categories.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest flex-shrink-0">Chủ đề:</span>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/categories/${cat.slug.current}`}
                className="flex-shrink-0 inline-flex items-center rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-light)] transition-all duration-200 tracking-wide"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── Latest Articles ─── */}
      {latestArticles.length > 0 && (
        <section className="mb-16 section-spacing">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
              Bài viết mới nhất
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {latestArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Trending + Newsletter ─── */}
      {trendingArticles.length > 0 && (
        <section className="mb-16 section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                Đang xu hướng
              </h2>
              <div>
                {trendingArticles.map((article, i) => (
                  <div key={article._id} className="flex gap-5 py-4 border-b border-[var(--border-light)] last:border-0">
                    <span className="text-3xl font-bold text-[var(--border)] leading-none pt-0.5" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <Link href={`/articles/${article.slug.current}`}>
                        <h3 className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug tracking-tight">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="mt-1.5 text-sm text-[var(--text-secondary)] line-clamp-1 tracking-wide">
                        {article.excerpt}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-[var(--text-muted)] tracking-wide">
                        <span className={`font-medium ${getCategoryTextColor(article.category?.color)}`}>
                          {article.category?.title}
                        </span>
                        <span>·</span>
                        <time>{new Date(article.publishedAt || Date.now()).toLocaleDateString("vi-VN")}</time>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter sidebar */}
            <div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sticky top-24 shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-sm">
                    <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                    Đăng ký nhận tin
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed tracking-wide">
                  Tin tức công nghệ mới nhất mỗi tuần. Không spam, chỉ nội dung chất lượng.
                </p>
                <NewsletterForm variant="sidebar" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function getCategoryTextColor(color?: string) {
  const styles: Record<string, string> = {
    blue: "text-[var(--cat-ai)]",
    purple: "text-[var(--cat-ai)]",
    green: "text-[var(--cat-software)]",
    orange: "text-[var(--cat-startup)]",
    red: "text-[var(--cat-hardware)]",
    cyan: "text-[var(--cat-mobile)]",
  };
  return styles[color || "blue"] || styles.blue;
}
