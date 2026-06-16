"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/sanity";
import { ArticleCard } from "@/components/ArticleCard";
import type { Article } from "@/types";

const SEARCH_ARTICLES = `*[_type == "article" && (title match $searchQuery || excerpt match $searchQuery || tags[] match $searchQuery)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  coverImageUrl,
  "category": category->{ title, slug, color },
  "author": author->{ name }
}`;

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || !client) {
      setArticles([]);
      return;
    }

    setLoading(true);
    client
      .fetch(SEARCH_ARTICLES, { searchQuery: `*${query}*` })
      .then((results) => {
        setArticles(results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 md:py-12">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Kết quả tìm kiếm
        </h1>
        {query && (
          <p className="text-[var(--text-secondary)]">
            {loading
              ? "Đang tìm kiếm..."
              : `${articles.length} kết quả cho "${query}"`}
          </p>
        )}
      </div>

      {/* Search Input */}
      <form className="mb-8" action="/search" method="GET">
        <div className="relative max-w-2xl">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Tìm kiếm bài viết..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
            autoFocus
          />
        </div>
      </form>

      {/* Sanity not configured */}
      {!client && (
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-center">
          <p className="text-amber-700 font-medium">Sanity CMS chưa được cấu hình</p>
          <p className="text-sm text-amber-600 mt-1">
            Vui lòng thêm NEXT_PUBLIC_SANITY_PROJECT_ID vào .env.local
          </p>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin h-8 w-8 border-2 border-[var(--accent)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Đang tìm kiếm...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Không tìm thấy kết quả
          </h2>
          <p className="text-[var(--text-secondary)]">
            Thử tìm kiếm với từ khóa khác
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Nhập từ khóa để tìm kiếm
          </h2>
          <p className="text-[var(--text-secondary)]">
            Tìm kiếm bài viết về AI, Smartphone, Startup...
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-[var(--text-secondary)]">Đang tải...</div>}>
      <SearchContent />
    </Suspense>
  );
}
