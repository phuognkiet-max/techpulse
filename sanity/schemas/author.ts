export default {
  name: 'author',
  title: 'Tác giả',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Họ tên',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Tiểu sử',
      type: 'text',
      rows: 4,
    },
    {
      name: 'social',
      title: 'Mạng xã hội',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'bio' },
  },
};
