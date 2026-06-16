import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { ALL_ARTICLES, ALL_CATEGORIES } from '@/lib/queries';
import type { Article, Category } from '@/types';

const BASE_URL = 'https://techpulse-pink.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  if (!client) return staticPages;

  try {
    const [articles, categories] = await Promise.all([
      client.fetch<Article[]>(ALL_ARTICLES),
      client.fetch<Category[]>(ALL_CATEGORIES),
    ]);

    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${BASE_URL}/articles/${article.slug.current}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${BASE_URL}/categories/${cat.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...articlePages, ...categoryPages];
  } catch {
    return staticPages;
  }
}
