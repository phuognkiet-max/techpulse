// Fix iPhone article: remove "nhôm titan", fix headline
const { createClient } = require('@sanity/client');

const SANITY_TOKEN = process.env.SANITY_TOKEN || 'skODzLOUQgLFqNq9GEMQQyCtZbipjwgn6wkjwDk8wWyQVJkEN34m6bnMm7mq3dmiFxDIrlfkpFYHeeYuOYwhwhHqesit4GTioywNwnANkPC19Zn4aWKapCkrluPg5qZxrdkCeK99baOfIPpN6EUOLJDfj2izr5ByEqwzVjLf8DBOpqC0vd0g';

const client = createClient({
  projectId: '5up9e69p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_TOKEN,
});

function makeSpan(text, marks = []) {
  return {
    _type: 'span',
    _key: Math.random().toString(36).slice(2),
    text,
    marks,
  };
}

function makeBlock(children, style = 'normal', listItem = undefined) {
  const block = {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style,
    children: Array.isArray(children) ? children : [makeSpan(children)],
    markDefs: [],
  };
  if (listItem) block.listItem = listItem;
  return block;
}

function makeH2(text) {
  return makeBlock(text, 'h2');
}

function makeH3(text) {
  return makeBlock(text, 'h3');
}

function makeParagraph(text) {
  return makeBlock(text, 'normal');
}

function makeBoldParagraph(text) {
  return makeBlock([makeSpan(text, ['strong'])], 'normal');
}

function makeBullet(text) {
  return makeBlock([makeSpan(text)], 'normal', 'bullet');
}

function makeNumbered(text, num) {
  return makeBlock([makeSpan(`${num}. ${text}`)], 'normal', 'bullet');
}

async function main() {
  // Find the iPhone article
  const query = `*[_type == "article" && slug.current == "iphone-17-pro-max-apple-a19-bionic"][0] { _id, title, body }`;
  const article = await client.fetch(query);

  if (!article) {
    console.error('Article not found!');
    process.exit(1);
  }

  console.log(`Found: ${article.title} (${article._id})`);

  // New title
  const newTitle = 'iPhone 17 Pro Max: A19 Pro, camera 48MP toàn bộ và thiết kế nhôm nguyên khối có gì đáng nâng cấp?';

  // Rebuild body with fixes
  const newBody = [
    makeH2('Tổng quan iPhone 17 Pro Max'),
    makeParagraph('iPhone 17 Pro Max đánh dấu bước thay đổi thiết kế lớn nhất của Apple kể từ iPhone 12. Với chip A19 Pro, hệ thống camera 48MP toàn bộ, và thiết kế nhôm nguyên khối (aluminum unibody) hoàn toàn mới, đây là model iPhone đáng chú ý nhất trong nhiều năm.'),

    makeH2('Thiết kế nhôm nguyên khối: Bước ngoặt mới'),
    makeParagraph('Sau nhiều năm sử dụng titanium trên thế hệ iPhone 15 Pro và 16 Pro, Apple đã chuyển sang thiết kế nhôm nguyên khối (aluminum unibody) cho iPhone 17 Pro Max. Đây không phải là bước lùi mà là sự thay đổi có tính toán:'),
    makeBullet('Nhôm nhẹ hơn titanium ~40%, giúp giảm trọng lượng tổng thể'),
    makeBullet('Chi phí sản xuất thấp hơn, Apple có thể đầu tư nhiều hơn vào camera và chip'),
    makeBullet('Khả năng tản nhiệt tốt hơn nhờ dẫn nhiệt hiệu quả hơn'),
    makeBullet('Thiết kế nguyên khối giúp tăng độ bền cấu trúc'),

    makeH2('Chip A19 Pro: Hiệu năng đột phá'),
    makeParagraph('A19 Pro được sản xuất trên tiến trình 2nm của TSMC, mang lại:'),
    makeBullet('CPU nhanh hơn 25% so với A18 Pro'),
    makeBullet('GPU nhanh hơn 30%, hỗ trợ ray tracing nâng cao'),
    makeBullet('Neural Engine 16 lõi, tốc độ xử lý AI tăng gấp đôi'),
    makeBullet('Hiệu suất năng lượng cải thiện 35%, thời lượng pin tốt hơn'),

    makeH2('Hệ thống camera 48MP toàn bộ'),
    makeParagraph('Đây là lần đầu tiên cả ba camera sau đều có độ phân giải 48MP:'),
    makeBullet('Camera chính 48MP, khẩu độ f/1.78, sensor mới lớn hơn 25%'),
    makeBullet('Camera ultra-wide 48MP, cải thiện đáng kể trong điều kiện ánh sáng yếu'),
    makeBullet('Camera telephoto 48MP, zoom quang học 5x'),
    makeBullet('Camera trước 24MP với autofocus'),

    makeH2('Màn hình và các tính năng khác'),
    makeParagraph('Màn hình Super Retina XDR 6.9 inch với công nghệ ProMotion 120Hz, Always-On Display, và độ sáng tối đa 2.500 nits. Pin lớn hơn 15% so với thế hệ trước, sạc MagSafe nhanh hơn 50%.'),

    makeH2('So sánh với thế hệ trước'),
    makeParagraph('| Tính năng | iPhone 17 Pro Max | iPhone 16 Pro Max |'),
    makeParagraph('|-----------|-------------------|-------------------|'),
    makeParagraph('| Chip | A19 Pro (2nm) | A18 Pro (3nm) |'),
    makeParagraph('| Camera sau | 48MP x 3 | 48MP + 12MP + 12MP |'),
    makeParagraph('| Camera trước | 24MP | 12MP |'),
    makeParagraph('| Chất liệu | Nhôm nguyên khối | Titanium |'),
    makeParagraph('| Pin | Lớn hơn 15% |基准 |'),

    makeH2('Đánh giá: Có nên nâng cấp?'),
    makeParagraph([makeSpan('Nên nâng cấp nếu:', ['strong'])]),
    makeBullet('Bạn đang dùng iPhone 14 Pro hoặc cũ hơn'),
    makeBullet('Bạn cần camera tốt hơn cho công việc chụp ảnh/quay video'),
    makeBullet('Bạn muốn hiệu năng AI mạnh hơn (Neural Engine)'),
    makeBullet('Bạn thích thiết kế nhẹ hơn'),
    makeParagraph([makeSpan('Có thể chờ nếu:', ['strong'])]),
    makeBullet('Bạn đang dùng iPhone 16 Pro Max — khác biệt không quá lớn'),
    makeBullet('Bạn ưu tiên giá trị hơn hiệu năng'),

    makeH2('Kết luận'),
    makeParagraph('iPhone 17 Pro Max là bản nâng cấp đáng giá với thiết kế nhôm nguyên khối mới lạ, chip A19 Pro mạnh mẽ, và hệ thống camera 48MP toàn bộ. Tuy nhiên, giá bán dự kiến cao hơn 10-15% so với thế hệ trước. Nếu bạn đang dùng iPhone 14 Pro trở về trước, đây là thời điểm nâng cấp lý tưởng.'),
    makeParagraph('*Cập nhật lần cuối: 22/6/2026.*'),
  ];

  // Update the article
  await client
    .patch(article._id)
    .set({
      title: newTitle,
      body: newBody,
      seo: {
        metaTitle: newTitle,
        metaDescription: 'Phân tích chi tiết iPhone 17 Pro Max với chip A19 Pro, camera 48MP toàn bộ và thiết kế nhôm nguyên khối. Có nên nâng cấp từ thế hệ trước?',
      },
      updatedAt: new Date().toISOString(),
    })
    .commit();

  console.log(`✅ Updated iPhone article: ${article._id}`);
  console.log(`   - New title: ${newTitle}`);
  console.log(`   - Removed "nhôm titan" references`);
  console.log(`   - Fixed headline to be professional, not clickbait`);
}

main().catch(console.error);
