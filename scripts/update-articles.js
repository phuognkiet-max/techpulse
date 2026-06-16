// Script to update article content in Sanity CMS
// Usage: node scripts/update-articles.js

const { createClient } = require('@sanity/client');

const SANITY_TOKEN = process.env.SANITY_TOKEN || 'skODzLOUQgLFqNq9GEMQQyCtZbipjwgn6wkjwDk8wWyQVJkEN34m6bnMm7mq3dmiFxDIrlfkpFYHeeYuOYwhwhHqesit4GTioywNwnANkPC19Zn4aWKapCkrluPg5qZxrdkCeK99baOfIPpN6EUOLJDfj2izr5ByEqwzVjLf8DBOpqC0vd0g';

const client = createClient({
  projectId: '5up9e69p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_TOKEN,
});

/** Convert plain text to Sanity Portable Text blocks */
function textToBlocks(text) {
  const blocks = [];
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  
  for (const para of paragraphs) {
    const trimmed = para.trim();
    
    if (trimmed.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'h2',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: trimmed.slice(3) }],
      });
    } else if (trimmed.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'h3',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: trimmed.slice(4) }],
      });
    } else if (trimmed.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'blockquote',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: trimmed.slice(2) }],
      });
    } else {
      // Handle bold text with marks
      const children = [];
      const parts = trimmed.split(/(\*\*.*?\*\*)/);
      for (const part of parts) {
        if (part.startsWith('**') && part.endsWith('**')) {
          children.push({
            _type: 'span',
            _key: Math.random().toString(36).slice(2),
            text: part.slice(2, -2),
            marks: ['strong'],
          });
        } else if (part) {
          children.push({
            _type: 'span',
            _key: Math.random().toString(36).slice(2),
            text: part,
          });
        }
      }
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'normal',
        children,
      });
    }
  }
  return blocks;
}

async function updateArticle(id, body, excerpt, readingTime) {
  const patch = { body: textToBlocks(body) };
  if (excerpt) patch.excerpt = excerpt;
  if (readingTime) patch.readingTime = readingTime;
  
  try {
    await client.patch(id).set(patch).commit();
    console.log('Updated:', id);
  } catch(e) {
    console.error('Failed:', id, e.message);
  }
}

// Export for use
module.exports = { updateArticle, textToBlocks, client };

// If run directly
if (require.main === module) {
  console.log('Import and use updateArticle(id, body, excerpt, readingTime)');
}
