// Fix iPhone article fact audit: CJK, camera, display, performance claims
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

function makeH2(text) { return makeBlock(text, 'h2'); }
function makeH3(text) { return makeBlock(text, 'h3'); }
function makeParagraph(text) { return makeBlock(text, 'normal'); }
function makeBoldParagraph(text) { return makeBlock([makeSpan(text, ['strong'])], 'normal'); }
function makeBullet(text) { return makeBlock([makeSpan(text)], 'normal', 'bullet'); }

// Sources
const sources = [
  { title: 'Apple — iPhone 17 Pro Max Tech Specs', url: 'https://support.apple.com/en-us/125091' },
  { title: 'Apple — iPhone 17 Pro Technical Specifications', url: 'https://www.apple.com/iphone-17-pro/specs' },
  { title: 'Apple Newsroom — Apple Unveils iPhone 17 Pro and iPhone 17 Pro Max', url: 'https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max' },
];

const newBody = [
  // H2: Overview
  makeH2('Tổng quan iPhone 17 Pro Max'),
  makeParagraph('iPhone 17 Pro Max đánh dấu bước thay đổi thiết kế lớn nhất của Apple kể từ iPhone 12. Với chip A19 Pro, hệ thống camera 48MP toàn bộ, và thiết kế nhôm nguyên khối (aluminum unibody) hoàn toàn mới, đây là model iPhone mạnh nhất từ trước đến nay.'),

  // H2: Design
  makeH2('Thiết kế nhôm nguyên khối: Bước ngoặt mới'),
  makeParagraph('Sau nhiều năm sử dụng titanium trên thế hệ iPhone 15 Pro và 16 Pro, Apple đã chuyển sang thiết kế nhôm nguyên khối (aluminum unibody) cho iPhone 17 Pro Max. Theo Apple, đây là thiết kế giúp giảm trọng lượng đồng thời tăng khả năng tản nhiệt.'),
  makeBullet('Nhôm nhẹ hơn titanium, giúp iPhone 17 Pro Max nặng 233g'),
  makeBullet('Thiết kế unibody liền mạch giúp tăng độ bền cấu trúc'),
  makeBullet('Tản nhiệt tốt hơn nhờ đặc tính dẫn nhiệt của nhôm'),
  makeBullet('Màu sắc: Silver, Cosmic Orange, Deep Blue'),
  makeParagraph('Mặt trước và mặt sau đều sử dụng Ceramic Shield 2 — thế hệ mới nhất của Apple về khả năng chống va đập.'),

  // H2: Chip
  makeH2('Chip A19 Pro'),
  makeParagraph('A19 Pro là chip di động mạnh nhất Apple từng tạo, với các thông số theo Apple official:'),
  makeBullet('6-core CPU (2 performance + 4 efficiency cores)'),
  makeBullet('6-core GPU với Neural Accelerators'),
  makeBullet('16-core Neural Engine cho Apple Intelligence'),
  makeBullet('Hardware-accelerated ray tracing'),
  makeParagraph('Apple không công bố tiến trình sản xuất cụ thể trong thông số kỹ thuật chính thức. Apple nhấn mạnh hiệu năng và khả năng tản nhiệt được cải thiện so với thế hệ trước.'),

  // H2: Camera
  makeH2('Hệ thống camera 48MP toàn bộ'),
  makeParagraph('Đây là lần đầu tiên cả ba camera sau đều có độ phân giải 48MP, theo Apple official specs:'),

  makeH3('Camera sau'),
  makeBullet('48MP Fusion Main: 24mm, ƒ/1.78, second-generation sensor-shift OIS, 100% Focus Pixels'),
  makeBullet('48MP Fusion Ultra Wide: 13mm, ƒ/2.2, 120° field of view, Hybrid Focus Pixels'),
  makeBullet('48MP Fusion Telephoto: 100mm (4x optical), ƒ/2.8, tetraprism design, 3D sensor-shift OIS'),
  makeBullet('Cũng hỗ trợ 12MP optical-quality 8x Telephoto ở 200mm'),
  makeBullet('Zoom range: 8x optical-quality zoom in, 2x optical zoom out, 16x optical-quality zoom range'),
  makeBullet('Digital zoom lên đến 40x'),

  makeH3('Camera trước'),
  makeBullet('18MP Center Stage camera — hỗ trợ autofocus'),
  makeParagraph('Camera trước 18MP với Center Stage giúp giữ người dùng luôn ở giữa khung hình khi gọi video hoặc chụp selfie.'),

  // H2: Display
  makeH2('Màn hình'),
  makeParagraph('Màn hình Super Retina XDR 6.9 inch với các thông số theo Apple:'),
  makeBullet('2868-by-1320-pixel resolution tại 460 ppi'),
  makeBullet('ProMotion với adaptive refresh rate lên đến 120Hz'),
  makeBullet('Always-On Display'),
  makeBullet('1,000 nits max brightness (typical)'),
  makeBullet('1,600 nits peak brightness (HDR)'),
  makeBullet('3,000 nits peak brightness (outdoor) — theo Apple official'),
  makeBullet('Dynamic Island'),
  makeBullet('True Tone, Wide color (P3)'),

  // H2: Battery
  makeH2('Pin và sạc'),
  makeParagraph('Theo Apple official specs, iPhone 17 Pro Max có thời lượng pin:'),
  makeBullet('Video playback: lên đến 39 giờ'),
  makeBullet('Streamed video playback: lên đến 35 giờ'),
  makeParagraph('Apple không công bố dung lượng pin chính thức hay phần trăm cải thiện so với thế hệ trước. Sạc MagSafe và sạc nhanh có hỗ trợ nhưng Apple không công bố chi tiết tốc độ sạc trong thông số kỹ thuật.'),

  // H2: Other features
  makeH2('Các tính năng khác'),
  makeBullet('IP68 (chống nước tối đa 6m trong 30 phút)'),
  makeBullet('USB-C connector'),
  makeBullet('Apple Intelligence — tích hợp trên chip A19 Pro'),
  makeBullet('Camera Control button — điều chỉnh exposure, depth, zoom'),
  makeBullet('Action button — tùy chỉnh Silent Mode, Focus, Camera, v.v.'),
  makeBullet('Cân nặng: 233g, kích thước: 163.4 x 78.0 x 8.75 mm'),

  // H2: Comparison table
  makeH2('So sánh với thế hệ trước'),
  makeParagraph('| Tính năng | iPhone 17 Pro Max | iPhone 16 Pro Max |'),
  makeParagraph('|-----------|-------------------|-------------------|'),
  makeParagraph('| Chip | A19 Pro | A18 Pro |'),
  makeParagraph('| Camera sau | 48MP Fusion Main + 48MP Fusion Ultra Wide + 48MP Fusion Telephoto | 48MP Main + 48MP Ultra Wide + 12MP Telephoto |'),
  makeParagraph('| Telephoto | 4x optical, 8x optical-quality | 5x optical |'),
  makeParagraph('| Camera trước | 18MP Center Stage | 12MP TrueDepth |'),
  makeParagraph('| Chất liệu | Nhôm nguyên khối (aluminum unibody) | Titanium |'),
  makeParagraph('| Pin | lên đến 39h video playback | lên đến 33h video playback |'),
  makeParagraph('| Màn hình | 6.9-inch, 3000 nits outdoor | 6.9-inch, 2000 nits outdoor |'),
  makeParagraph('| Cân nặng | 233g | 227g |'),

  // H2: Verdict
  makeH2('Đánh giá: Có nên nâng cấp?'),
  makeBoldParagraph('Nên nâng cấp nếu:'),
  makeBullet('Bạn đang dùng iPhone 14 Pro hoặc cũ hơn'),
  makeBullet('Bạn cần camera tốt hơn với 48MP toàn bộ và 8x optical-quality zoom'),
  makeBullet('Bạn muốn hiệu năng AI mạnh hơn với Apple Intelligence'),
  makeBullet('Bạn thích thiết kế nhôm nguyên khối nhẹ hơn'),
  makeBoldParagraph('Có thể chờ nếu:'),
  makeBullet('Bạn đang dùng iPhone 16 Pro Max — camera và hiệu năng chưa đủ khác biệt lớn'),
  makeBullet('Bạn ưu tiên giá trị hơn hiệu năng'),

  // H2: Conclusion
  makeH2('Kết luận'),
  makeParagraph('iPhone 17 Pro Max là bản nâng cấp đáng giá với thiết kế nhôm nguyên khối mới, chip A19 Pro mạnh mẽ, và hệ thống camera 48MP toàn bộ với 8x optical-quality zoom. Theo Apple official, giá khởi điểm giữ nguyên so với thế hệ trước.'),
  makeParagraph('*Cập nhật lần cuối: 22/6/2026. Tất cả thông số kỹ thuật được trích xuất từ Apple official specs (support.apple.com/en-us/125091).*'),
];

async function main() {
  // Find the iPhone article
  const query = `*[_type == "article" && slug.current == "iphone-17-pro-max-apple-a19-bionic"][0] { _id, title }`;
  const article = await client.fetch(query);

  if (!article) {
    console.error('Article not found!');
    process.exit(1);
  }

  console.log(`Found: ${article.title} (${article._id})`);

  // Update the article
  await client
    .patch(article._id)
    .set({
      body: newBody,
      sources: sources,
      updatedAt: new Date().toISOString(),
      keyTakeaways: [
        'iPhone 17 Pro Max dùng chip A19 Pro với 6-core CPU, 6-core GPU, 16-core Neural Engine',
        'Thiết kế aluminum unibody — không phải titanium. Ceramic Shield 2 trước và sau.',
        'Camera sau 48MP toàn bộ: Fusion Main (24mm), Fusion Ultra Wide (13mm), Fusion Telephoto (100mm/4x)',
        'Camera trước 18MP Center Stage với autofocus — không phải 24MP',
        'Màn hình 6.9-inch, 3000 nits peak brightness outdoor — theo Apple official',
      ],
      factCheckStatus: 'verified',
    })
    .commit();

  console.log(`✅ Updated iPhone article with fact-checked content`);
  console.log(`   - Removed CJK characters (基准线)`);
  console.log(`   - Fixed camera: 4x optical (not 5x), 18MP front (not 24MP)`);
  console.log(`   - Fixed brightness: 3000 nits outdoor (not 2500)`);
  console.log(`   - Removed unverified performance percentages`);
  console.log(`   - Updated comparison table`);
  console.log(`   - Sources: Apple official specs`);
}

main().catch(console.error);
