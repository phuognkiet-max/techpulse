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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Ket qua tim kiem
        </h1>
        {query && (
          <p className="text-[var(--text-secondary)]">
            {loading
              ? "Dang tim kiem..."
              : `${articles.length} ket qua cho "${query}"`}
          </p>
        )}
      </div>

      {/* Search Input */}
      <form className="mb-8" action="/search" method="GET">
        <div className="relative max-w-2xl">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-secondary)]"
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
            placeholder="Tim kiem bai viet..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] py-3 pl-10 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none focus:border-[var(--accent)] transition-colors"
            autoFocus
          />
        </div>
      </form>

      {/* Sanity not configured */}
      {!client && (
        <div className="mb-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 text-center">
          <p className="text-yellow-400 font-medium">⚠️ Sanity CMS chua duoc cau hinh</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Vui long them NEXT_PUBLIC_SANITY_PROJECT_ID vao .env.local
          </p>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin h-8 w-8 border-2 border-[var(--accent)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Dang tim kiem...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Khong tim thay ket qua
          </h2>
          <p className="text-[var(--text-secondary)]">
            Thu tim kiem voi tu khoa khac
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Nhap tu khoa de tim kiem
          </h2>
          <p className="text-[var(--text-secondary)]">
            Tim kiem bai viet ve AI, Smartphone, Startup...
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-[var(--text-secondary)]">Dang tai...</div>}>
      <SearchContent />
    </Suspense>
  );
}
