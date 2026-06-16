export default {
  name: 'siteSettings',
  title: 'Cài đặt trang',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên website',
      type: 'string',
      initialValue: 'TechPulse',
    },
    {
      name: 'description',
      title: 'Mô tả website',
      type: 'text',
      initialValue: 'Nguồn tin công nghệ đáng tin cậy',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'social',
      title: 'Mạng xã hội',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
      ],
    },
  ],
  preview: {
    select: { title: 'title' },
  },
};
