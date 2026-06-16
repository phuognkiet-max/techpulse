// GROQ Queries for TechPulse

export const ALL_ARTICLES = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featured,
  coverImage,
  coverImageUrl,
  tags,
  readingTime,
  "category": category->{
    _id,
    title,
    slug,
    color
  },
  "author": author->{
    _id,
    name,
    slug,
    image
  }
}`;

export const FEATURED_ARTICLES = `*[_type == "article" && featured == true] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  coverImageUrl,
  "category": category->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  }
}`;

export const ARTICLE_BY_SLUG = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  featured,
  coverImage,
  coverImageUrl,
  tags,
  readingTime,
  "category": category->{
    _id,
    title,
    slug,
    color
  },
  "author": author->{
    _id,
    name,
    slug,
    image,
    bio
  }
}`;

export const ARTICLES_BY_CATEGORY = `*[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  coverImageUrl,
  "category": category->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  }
}`;

export const ALL_CATEGORIES = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color,
  icon
}`;

export const ALL_AUTHORS = `*[_type == "author"] {
  _id,
  name,
  slug,
  image,
  bio
}`;

export const SITE_SETTINGS = `*[_type == "siteSettings"][0] {
  title,
  description,
  logo,
  footerDescription,
  social
}`;

export const RELATED_ARTICLES = `*[_type == "article" && _id != $id && category._ref == $categoryId] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  coverImageUrl,
  "category": category->{ title, slug, color },
  "author": author->{ name }
}`;

export const SEARCH_ARTICLES = `*[_type == "article" && (title match $query || excerpt match $query || tags[] match $query)] | order(publishedAt desc) {
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
