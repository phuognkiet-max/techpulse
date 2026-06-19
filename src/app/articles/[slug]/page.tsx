import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { ARTICLE_BY_SLUG, RELATED_ARTICLES } from "@/lib/queries";
import { SITE_URL } from "@/lib/constants";
import { ArticleCard } from "@/components/ArticleCard";
import { PortableText } from "@/components/PortableText";
import { ReadingProgress } from "@/components/ReadingProgress";
import type { Article } from "@/types";

export const revalidate = 60;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

function getCategoryBg(color?: string) {
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  if (!client) return { title: "Bài viết không tìm thấy" };

  const { slug } = await params;
  const article = await client.fetch<Article>(ARTICLE_BY_SLUG, { slug });
  if (!article) return { title: "Bài viết không tìm thấy" };

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    alternates: {
      canonical: `${SITE_URL}/articles/${article.slug.current}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.coverImageUrl ? [{ url: article.coverImageUrl, width: 1200, height: 630 }] : [],
      authors: [article.author?.name || "TechPulse"],
      siteName: "TechPulse",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.coverImageUrl ? [article.coverImageUrl] : [],
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

  const coverSrc = article.coverImage || (article as any).coverImageUrl || null;

  return (
    <>
      <ReadingProgress />
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            description: article.excerpt,
            image: article.coverImageUrl || article.coverImage || '',
            datePublished: article.publishedAt,
            author: {
              '@type': 'Person',
              name: article.author?.name || 'TechPulse',
            },
            publisher: {
              '@type': 'Organization',
              name: 'TechPulse',
              logo: {
                '@type': 'ImageObject',
                url: 'https://techpulse-pink.vercel.app/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://techpulse-pink.vercel.app/articles/${article.slug.current}`,
            },
          }),
        }}
      />
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)] transition-colors">
          Trang chủ
        </Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link
          href={`/categories/${article.category?.slug?.current}`}
          className="hover:text-[var(--accent)] transition-colors"
        >
          {article.category?.title}
        </Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[var(--text-secondary)] truncate max-w-[200px]">
          {article.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {/* Category Badge */}
          <div className="mb-4">
            <Link
              href={`/categories/${article.category?.slug?.current}`}
              className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold text-white ${getCategoryBg(article.category?.color)}`}
            >
              {article.category?.title}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-[2.5rem] font-bold text-[var(--text-primary)] mb-4 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[var(--border)]">
            <div className="h-10 w-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--text-muted)]">
              {article.author?.name?.charAt(0) || "T"}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {article.author?.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <time>{formatDate(article.publishedAt)}</time>
                {article.readingTime && (
                  <>
                    <span>·</span>
                    <span>{article.readingTime} phút đọc</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {coverSrc ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-[var(--bg-tertiary)]">
              {coverSrc.startsWith('http') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverSrc}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <Image
                  src={coverSrc}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
              )}
            </div>
          ) : (
            <div className="w-full h-64 md:h-80 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-8">
              <svg className="w-16 h-16 text-[var(--border)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}

          {/* Body Content */}
          <div className="article-body max-w-none">
            {article.body && article.body.length > 0 ? (
              <PortableText value={article.body} />
            ) : (
              <p className="text-[var(--text-secondary)]">
                Nội dung bài viết đang được cập nhật. Vui lòng quay lại sau.
              </p>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]"
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
            <div className="sticky top-20">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">
                Bài viết liên quan
              </h3>
              <div>
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
    </>
  );
}
