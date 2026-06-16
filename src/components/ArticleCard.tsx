import Link from "next/link";
import type { Article } from "@/types";

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

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

export function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/articles/${article.slug.current}`}>
        <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] glow-hover transition-all duration-300">
          {/* Cover Image Placeholder */}
          <div className="relative h-64 bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(
                  article.category?.color
                )}`}
              >
                {article.category?.title}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-full bg-[var(--bg-secondary)]" />
                <span>{article.author?.name}</span>
              </div>
              <span>·</span>
              <time>{formatDate(article.publishedAt)}</time>
              {article.readingTime && (
                <>
                  <span>·</span>
                  <span>{article.readingTime} phút đọc</span>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/articles/${article.slug.current}`}>
        <article className="group flex gap-4 py-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-card)] -mx-2 px-2 rounded-lg transition-all">
          <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span>{article.author?.name}</span>
              <span>·</span>
              <time>{formatDate(article.publishedAt)}</time>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/articles/${article.slug.current}`}>
      <article className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] glow-hover transition-all duration-300">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-[var(--gradient-start)]/50 to-[var(--gradient-end)]/50">
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getCategoryColor(
                article.category?.color
              )}`}
            >
              {article.category?.title}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full bg-[var(--bg-secondary)]" />
              <span>{article.author?.name}</span>
            </div>
            <time>{formatDate(article.publishedAt)}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
