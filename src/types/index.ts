// ============================================
// TechNews — Type Definitions
// ============================================

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: string;
  bio?: string;
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

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any[]; // Sanity portable text
  publishedAt: string;
  featured?: boolean;
  coverImage?: string;
  author: Author;
  category: Category;
  tags?: string[];
  readingTime?: number;
  coverImageUrl?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SiteSettings {
  title: string;
  description: string;
  logo?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    github?: string;
  };
}
