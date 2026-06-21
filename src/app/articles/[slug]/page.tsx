import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { ARTICLE_BY_SLUG, RELATED_ARTICLES, RELATED_BY_TAGS, PREV_NEXT_ARTICLES } from "@/lib/queries";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { formatDateVI, formatDateISO, readingTimeLabel } from "@/lib/dates";
import { ArticleCard } from "@/components/ArticleCard";
import { PortableText } from "@/components/PortableText";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { ArticleAuthor } from "@/components/ArticleAuthor";
import { preprocessBlocks } from "@/lib/sanitize";
import type { Article } from "@/types";

export const revalidate = 60;

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
      modifiedTime: article.updatedAt || undefined,
      images: article.coverImageUrl ? [{ url: article.coverImageUrl, width: 1200, height: 630 }] : [],
      authors: [article.author?.name || SITE_NAME],
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image" as const,
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

  // Fetch related articles
  const [relatedArticles, tagRelated, prevNext] = await Promise.all([
    client.fetch<Article[]>(RELATED_ARTICLES, {
      id: article._id,
      categoryId: article.category?._id,
    }),
    article.tags && article.tags.length > 0
      ? client.fetch<Article[]>(RELATED_BY_TAGS, {
          id: article._id,
          tags: article.tags,
        })
      : Promise.resolve([]),
    client.fetch<{ prev: Article | null; next: Article | null }>(PREV_NEXT_ARTICLES, {
      publishedAt: article.publishedAt,
    }),
  ]);

  // Deduplicate tag-related
  const categoryIds = new Set(relatedArticles.map((a) => a._id));
  const tagRelatedArticles = (tagRelated || []).filter((a: Article) => !categoryIds.has(a._id));

  const coverSrc = article.coverImage || (article as any).coverImageUrl || null;
  const articleUrl = `${SITE_URL}/articles/${article.slug.current}`;

  // Extract headings for TOC
  const headings: { id: string; text: string; level: number }[] = [];
  if (article.body) {
    article.body.forEach((block: any, i: number) => {
      if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
        const text = block.children?.map((c: any) => c.text).join("") || "";
        if (text) {
          headings.push({
            id: `heading-${i}`,
            text,
            level: block.style === "h2" ? 2 : 3,
          });
        }
      }
    });
  }

  const factCheckBadge = article.factCheckStatus === "verified"
    ? { label: "Đã kiểm chứng", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
    : article.factCheckStatus === "disputed"
    ? { label: "Đang tranh luận", color: "bg-amber-50 text-amber-700 border-amber-200", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" }
    : null;

  return (
    <>
      <ReadingProgress />

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.excerpt,
            image: coverSrc || "",
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            author: {
              "@type": "Person",
              name: article.author?.name || SITE_NAME,
              url: article.author?.slug ? `${SITE_URL}/authors/${article.author.slug.current}` : undefined,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
            keywords: article.tags?.join(", "),
          }),
        }}
      />

      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: article.category?.title || "", item: `${SITE_URL}/categories/${article.category?.slug?.current}` },
              { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10 tracking-wide" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
          <ChevronIcon />
          <Link href={`/categories/${article.category?.slug?.current}`} className="hover:text-[var(--accent)] transition-colors">
            {article.category?.title}
          </Link>
          <ChevronIcon />
          <span className="text-[var(--text-secondary)] truncate max-w-[200px]">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Category + Fact-check */}
            <div className="flex items-center gap-3 mb-5">
              <Link
                href={`/categories/${article.category?.slug?.current}`}
                className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold text-white shadow-sm ${getCategoryBg(article.category?.color)}`}
              >
                {article.category?.title}
              </Link>
              {factCheckBadge && (
                <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-medium ${factCheckBadge.color}`}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={factCheckBadge.icon} />
                  </svg>
                  {factCheckBadge.label}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-[2.5rem] font-bold text-[var(--text-primary)] mb-5 leading-tight tracking-tighter">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[var(--text-secondary)] mb-7 leading-relaxed tracking-wide">
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-between mb-10 pb-10 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--text-muted)] overflow-hidden">
                  {article.author?.image ? (
                    <Image src={article.author.image} alt={article.author.name || ""} width={44} height={44} className="object-cover" />
                  ) : (
                    article.author?.name?.charAt(0) || "T"
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{article.author?.name}</p>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] tracking-wide">
                    {formatDateVI(article.publishedAt) && <time dateTime={formatDateISO(article.publishedAt)}>{formatDateVI(article.publishedAt)}</time>}
                    {article.readingTime && (
                      <>
                        {formatDateVI(article.publishedAt) && <span>·</span>}
                        <span>{readingTimeLabel(article.readingTime)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <ShareButtons url={articleUrl} title={article.title} />
            </div>

            {/* Cover Image */}
            {coverSrc ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 bg-[var(--bg-tertiary)]">
                <Image
                  src={coverSrc}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
              </div>
            ) : null}

            {/* Key Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="mb-10 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Điểm chính
                </h2>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex gap-3 text-[15px] text-[var(--text-secondary)] leading-relaxed">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body Content */}
            <div className="article-body max-w-[720px]">
              {article.body && article.body.length > 0 ? (
                <PortableText value={preprocessBlocks(article.body)} />
              ) : (
                <p className="text-[var(--text-secondary)]">Nội dung bài viết đang được cập nhật.</p>
              )}
            </div>

            {/* Sources */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-10 pt-8 border-t border-[var(--border)]">
                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-4">Nguồn tham khảo</h3>
                <ul className="space-y-2">
                  {article.sources.map((source, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="flex-shrink-0 text-[var(--text-muted)]">[{i + 1}]</span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline break-all"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Last Updated */}
            {article.updatedAt && (
              <p className="mt-6 text-xs text-[var(--text-muted)]">
                Cập nhật lần cuối: {formatDateVI(article.updatedAt)}
              </p>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] px-3.5 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-light)] transition-all tracking-wide"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {article.author && (
              <div className="mt-10 pt-8 border-t border-[var(--border)]">
                <ArticleAuthor author={article.author} />
              </div>
            )}

            {/* Prev/Next Navigation */}
            {(prevNext.prev || prevNext.next) && (
              <div className="mt-10 pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevNext.prev && (
                  <Link
                    href={`/articles/${prevNext.prev.slug.current}`}
                    className="group flex flex-col p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-all"
                  >
                    <span className="text-xs text-[var(--text-muted)] mb-1">&larr; Bài trước</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] line-clamp-2">
                      {prevNext.prev.title}
                    </span>
                  </Link>
                )}
                {prevNext.next && (
                  <Link
                    href={`/articles/${prevNext.next.slug.current}`}
                    className="group flex flex-col items-end text-right p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-all"
                  >
                    <span className="text-xs text-[var(--text-muted)] mb-1">Bài tiếp &rarr;</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] line-clamp-2">
                      {prevNext.next.title}
                    </span>
                  </Link>
                )}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              {headings.length > 0 && <TableOfContents headings={headings} />}

              {/* Related by category */}
              {relatedArticles.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-4">
                    Liên quan
                  </h3>
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related._id} article={related} variant="compact" />
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related by Tags */}
        {tagRelatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[var(--border)]">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-8 tracking-tight">
              Đọc thêm theo chủ đề
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tagRelatedArticles.slice(0, 4).map((related: Article) => (
                <ArticleCard key={related._id} article={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function ChevronIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
