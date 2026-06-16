export default {
  name: 'article',
  title: 'Bài viết',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'body',
      title: 'Nội dung',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'bold' },
              { title: 'Italic', value: 'italic' },
              { title: 'Code', value: 'code' },
              { title: 'Link', value: 'link' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Ảnh bìa (Sanity)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'coverImageUrl',
      title: 'Ảnh bìa (URL)',
      type: 'url',
      description: 'URL ảnh bìa bên ngoài (Unsplash, Pexels...). Ưu tiên hơn Sanity image nếu có.',
    },
    {
      name: 'category',
      title: 'Chủ đề',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Tác giả',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Ngày xuất bản',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Nổi bật',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'readingTime',
      title: 'Thời gian đọc (phút)',
      type: 'number',
      initialValue: 5,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
      ],
    },
  ],
  orderings: [
    { title: 'Ngày xuất bản mới nhất', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Tiêu đề A-Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'excerpt', media: 'coverImage' },
  },
};
