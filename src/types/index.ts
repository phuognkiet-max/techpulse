// ============================================
// TechPulse — Type Definitions
// ============================================

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: string;
  bio?: string;
  role?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
  icon?: string;
}

export interface ArticleSource {
  title: string;
  url: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any[];
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  coverImage?: string;
  coverImageUrl?: string;
  author: Author;
  category: Category;
  tags?: string[];
  readingTime?: number;
  keyTakeaways?: string[];
  sources?: ArticleSource[];
  factCheckStatus?: "verified" | "unverified" | "disputed";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SiteSettings {
  title: string;
  description: string;
  logo?: string;
  footerDescription?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    github?: string;
    youtube?: string;
    tiktok?: string;
  };
}
