import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCategoryStyle(color?: string) {
  const styles: Record<string, string> = {
    blue: "bg-[var(--cat-ai)]",
    purple: "bg-[var(--cat-ai)]",
    green: "bg-[var(--cat-software)]",
    orange: "bg-[var(--cat-startup)]",
    red: "bg-[var(--cat-hardware)]",
    cyan: "bg-[var(--cat-mobile)]",
  };
  return styles[color || "blue"] || styles.blue;
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

function getCoverSrc(article: Article): string | null {
  if (article.coverImage) return article.coverImage;
  if ((article as any).coverImageUrl) return (article as any).coverImageUrl;
  return null;
}

function CoverImage({
  src,
  alt,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  if (src.startsWith("http")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`object-cover img-cinematic ${className}`}
        loading="lazy"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover img-cinematic ${className}`}
      sizes={sizes}
    />
  );
}

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const coverSrc = getCoverSrc(article);

  if (variant === "featured") {
    return (
      <Link href={`/articles/${article.slug.current}`}>
        <article className="card-premium group overflow-hidden">
          <div className="relative h-56 overflow-hidden bg-[var(--bg-tertiary)]">
            {coverSrc ? (
              <div className="img-overlay w-full h-full">
                <CoverImage
                  src={coverSrc}
                  alt={article.title}
                  className="group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <PlaceholderIcon />
            )}
            <div className="absolute top-4 left-4 z-10">
              <span className={`inline-flex items-center rounded-lg px-3 py-1 text-[11px] font-semibold text-white shadow-sm ${getCategoryStyle(article.category?.color)}`}>
                {article.category?.title}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2.5 leading-snug tracking-tight">
              {article.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed tracking-wide">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] tracking-wide">
              <span className="font-medium text-[var(--text-secondary)]">{article.author?.name}</span>
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
        <article className="group flex gap-4 py-4 border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--bg-secondary)] -mx-2 px-2 rounded-xl transition-all">
          <div className="h-[72px] w-[72px] flex-shrink-0 rounded-xl overflow-hidden bg-[var(--bg-tertiary)]">
            {coverSrc ? (
              <CoverImage src={coverSrc} alt={article.title} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug tracking-tight">
              {article.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--text-muted)] tracking-wide">
              <span>{article.author?.name}</span>
              <span>·</span>
              <time>{formatDate(article.publishedAt)}</time>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant — premium card
  return (
    <Link href={`/articles/${article.slug.current}`}>
      <article className="card-premium group overflow-hidden">
        <div className="relative h-48 overflow-hidden bg-[var(--bg-tertiary)]">
          {coverSrc ? (
            <div className="img-overlay w-full h-full">
              <CoverImage
                src={coverSrc}
                alt={article.title}
                className="group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <PlaceholderIcon />
          )}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm ${getCategoryStyle(article.category?.color)}`}>
              {article.category?.title}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-[15px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2 leading-snug tracking-tight">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3.5 leading-relaxed tracking-wide">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] tracking-wide">
            <span className="font-medium text-[var(--text-secondary)]">{article.author?.name}</span>
            <time>{formatDate(article.publishedAt)}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}

function PlaceholderIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--border)]">
      <svg className="w-10 h-10 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </div>
  );
}
