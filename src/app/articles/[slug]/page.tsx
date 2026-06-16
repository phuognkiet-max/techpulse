import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { ARTICLE_BY_SLUG, RELATED_ARTICLES } from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import type { Article } from "@/types";

export const revalidate = 60;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCategoryColor(color?: string) {
  const colors: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };
  return colors[color || "blue"] || colors.blue;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  if (!client) return { title: "Bai viet khong tim thay" };
  
  const { slug } = await params;
  const article = await client.fetch<Article>(ARTICLE_BY_SLUG, { slug });
  if (!article) return { title: "Bai viet khong tim thay" };

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  if (!client) notFound();
  
  const { slug } = await params;
  const article = await client.fetch<Article>(ARTICLE_BY_SLUG, { slug });

  if (!article) notFound();

  const relatedArticles = await client.fetch<Article[]>(RELATED_ARTICLES, {
    id: article._id,
    categoryId: article.category?._id,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
          Trang chu
        </Link>
        <span>/</span>
        <Link
          href={`/categories/${article.category?.slug?.current}`}
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          {article.category?.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] truncate max-w-[200px]">
          {article.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {/* Category Badge */}
          <div className="mb-4">
            <Link
              href={`/categories/${article.category?.slug?.current}`}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getCategoryColor(
                article.category?.color
              )}`}
            >
              {article.category?.title}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--border)]">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]" />
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {article.author?.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <time>{formatDate(article.publishedAt)}</time>
                {article.readingTime && (
                  <>
                    <span>·</span>
                    <span>{article.readingTime} phut doc</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Cover Image Placeholder */}
          <div className="w-full h-64 md:h-96 rounded-xl bg-gradient-to-br from-[var(--gradient-start)]/20 to-[var(--gradient-end)]/20 mb-8" />

          {/* Body Content */}
          <div className="article-body prose prose-invert max-w-none">
            {article.body?.map((block: any, i: number) => {
              if (block._type === "block") {
                const text = block.children
                  ?.map((child: any) => child.text)
                  .join("");
                if (block.style === "h2") {
                  return <h2 key={i}>{text}</h2>;
                }
                if (block.style === "h3") {
                  return <h3 key={i}>{text}</h3>;
                }
                return <p key={i}>{text}</p>;
              }
              return null;
            })}

            {(!article.body || article.body.length === 0) && (
              <p className="text-[var(--text-secondary)]">
                Noi dung bai viet dang duoc cap nhat. Vui long quay lai sau.
              </p>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[var(--border)]">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--bg-card)] border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {relatedArticles.length > 0 && (
            <div className="sticky top-24">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Bai viet lien quan
              </h3>
              <div className="space-y-0">
                {relatedArticles.map((related) => (
                  <ArticleCard
                    key={related._id}
                    article={related}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
