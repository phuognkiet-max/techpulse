export default {
  name: 'category',
  title: 'Chủ đề',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên chủ đề',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      rows: 3,
    },
    {
      name: 'color',
      title: 'Màu sắc',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Green', value: 'green' },
          { title: 'Orange', value: 'orange' },
          { title: 'Red', value: 'red' },
          { title: 'Cyan', value: 'cyan' },
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
    },
    {
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
      description: 'Emoji icon cho chủ đề',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
};
