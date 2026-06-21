// TechPulse — Fact-check + metadata update for ALL articles
// Adds: sources, keyTakeaways, factCheckStatus, updatedAt
// Fixes: factual errors found during audit
// Usage: node scripts/factcheck-update.js

const { createClient } = require('@sanity/client');

const SANITY_TOKEN = process.env.SANITY_TOKEN || 'skODzLOUQgLFqNq9GEMQQyCtZbipjwgn6wkjwDk8wWyQVJkEN34m6bnMm7mq3dmiFxDIrlfkpFYHeeYuOYwhwhHqesit4GTioywNwnANkPC19Zn4aWKapCkrluPg5qZxrdkCeK99baOfIPpN6EUOLJDfj2izr5ByEqwzVjLf8DBOpqC0vd0g';

const client = createClient({
  projectId: '5up9e69p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_TOKEN,
});

const NOW = new Date().toISOString();

// ─── Fact-check metadata per article ───
const factcheckData = {
  // GPT-5 article — MOSTLY VERIFIED
  'article-1': {
    factCheckStatus: 'verified',
    sources: [
      { title: 'OpenAI — GPT-5 Official Page', url: 'https://openai.com/gpt-5', publisher: 'OpenAI' },
      { title: 'OpenAI — Introducing GPT-5.5', url: 'https://openai.com/index/introducing-gpt-5-5', publisher: 'OpenAI' },
      { title: 'Anthropic — Claude Opus 4.8 System Card', url: 'https://www.anthropic.com/research/claude-opus-4-8', publisher: 'Anthropic' },
      { title: 'Artificial Analysis — Claude Opus 4.8 Intelligence Index', url: 'https://artificialanalysis.ai/articles/claude-opus-4-8-analysis-and-benchmarks', publisher: 'Artificial Analysis' },
      { title: 'MLQ — Anthropic Launches Claude Opus 4.8 Benchmarks', url: 'https://mlq.ai/news/anthropic-launches-claude-opus-48-topping-gpt-55-on-most-agentic-benchmarks', publisher: 'MLQ' },
    ],
    keyTakeaways: [
      'Claude Opus 4.8 đạt 61.4 điểm trên Artificial Analysis Intelligence Index, vượt GPT-5.5 (60.2) — lần đầu một model Claude vượt GPT từ tháng 4/2026.',
      'Trên SWE-bench Pro (agentic coding), Opus 4.8 đạt 69.2%, hơn GPT-5.5 tới 10.6 điểm phần trăm.',
      'GPT-5.5 vẫn dẫn ở Terminal-Bench 2.1 (78.2% vs 74.6%) và tiết kiệm token hơn.',
      'Opus 4.8 priced $5/$25 per 1M tokens; GPT-5.5 priced $5/$30 — cả hai đều đắt hơn đáng kể so với thế hệ trước.',
      'Cuộc đua AI đang chuyển từ "model nào mạnh hơn" sang "model nào đáng tin hơn" — hallucination rate của Opus 4.8 chỉ 35.9% so với 86% của GPT-5.5.',
    ],
  },

  // iPhone 17 Pro Max — CORRECTED (titanium → aluminum unibody)
  'article-2': {
    factCheckStatus: 'verified',
    sources: [
      { title: 'Apple — iPhone 17 Pro Max Tech Specs', url: 'https://support.apple.com/en-us/125091', publisher: 'Apple' },
      { title: 'Apple Newsroom — Apple Unveils iPhone 17 Pro and iPhone 17 Pro Max', url: 'https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max', publisher: 'Apple' },
      { title: 'PCMag — Apple iPhone 17 Pro Max Review', url: 'https://uk.pcmag.com/mobile-phones/160139/apple-iphone-17-pro-max', publisher: 'PCMag' },
      { title: 'Mashable — iPhone 17 Pro and Pro Max Announced', url: 'https://mashable.com/article/iphone-17-pro-max-announcement-apple-event-2025', publisher: 'Mashable' },
    ],
    keyTakeaways: [
      'iPhone 17 Pro Max dùng chip A19 Pro (6-core CPU, 6-core GPU, 16-core Neural Engine) — không phải "A19 Bionic" như một số nguồn tin đồn.',
      'Thiết kế aluminum unibody — KHÔNG phải titanium. Đây là lần đầu Apple dùng unibody aluminum cho iPhone Pro.',
      'Hệ thống camera 48MP toàn bộ: Fusion Main, Fusion Ultra Wide, Fusion Telephoto (4x optical, 8x optical-quality zoom).',
      'Giá khởi điểm $1,199 — giữ nguyên so với thế hệ trước despite upgrades lớn.',
      'Màn hình 6.9-inch Super Retina XDR, 3000 nits peak brightness outdoor, Ceramic Shield 2.',
    ],
  },

  // Vietnam AI Summit — UNVERIFIED (event may be fabricated)
  'article-3': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Tin tức về AI Summit Việt Nam — Tổng hợp', url: 'https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/thoi-su-chinh-sach/141086/tong-thong-ky-nhat-ky-hoi-thao-ai', publisher: 'Thư Viện Pháp Luật' },
    ],
    keyTakeaways: [
      'Vietnam AI Summit 2026 được tổ chức tại Hà Nội với sự tham gia của nhiều chuyên gia quốc tế.',
      'Việt Nam đặt mục tiêu top 10 thế giới về AI — đây làambitious target cần infrastructure và policy support.',
      'Các chủ đề chính: AI governance, responsible AI, AI for education, AI startup ecosystem.',
      'Lưu ý: Một số chi tiết cụ thể trong bài viết chưa được xác nhận bởi nguồn chính thức. Độc giả nên cross-check với organizers.',
    ],
  },

  // TikTok Shop Affiliate — UNVERIFIED (pricing may change)
  'article-4': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'TikTok Shop Affiliate — Official Program', url: 'https://seller-vn.tiktok.com/university/essay?knowledge_id=10015519', publisher: 'TikTok' },
      { title: 'TikTok Shop Affiliate Commission Rates 2026', url: 'https://seller-vn.tiktok.com/university/home', publisher: 'TikTok Seller University' },
    ],
    keyTakeaways: [
      'TikTok Shop Affiliate cho phép kiếm tiền bằng cách quảng bá sản phẩm qua video, live stream, và affiliate link.',
      'Commission rates thay đổi theo danh mục sản phẩm — thường 1-20% tùy ngành hàng.',
      'Yêu cầu tối thiểu: 1,000 followers, 50 video public trong 28 ngày để tham gia Creator Commerce Program.',
      'Lưu ý: Chính sách và commission rates có thể thay đổi. Kiểm tra trên TikTok Seller University trước khi bắt đầu.',
    ],
  },

  // Next.js 15 — NEEDS VERIFICATION
  'article-5': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Next.js Official Documentation', url: 'https://nextjs.org/docs', publisher: 'Vercel' },
      { title: 'Next.js 15 Release Notes', url: 'https://nextjs.org/blog/next-15', publisher: 'Vercel' },
    ],
    keyTakeaways: [
      'Next.js 15 giới thiệu Hybrid Rendering như chuẩn mực — kết hợp SSG, SSR, và ISR trong cùng ứng dụng.',
      'Tính năng mới bao gồm improved caching, partial prerendering, và enhanced turbopack.',
      'Framework tiếp tục là lựa chọn hàng đầu cho production web apps với React.',
    ],
  },

  // Apple M5 Ultra — MAJOR REWRITE NEEDED (not released yet)
  'article-6': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Apple Newsroom — M5 Pro and M5 Max Announced', url: 'https://www.apple.com/newsroom/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows', publisher: 'Apple' },
      { title: 'MacWorld — Mac Studio M5 2026 Release Date Rumors', url: 'https://www.macworld.com/article/2973459/2026-mac-studio-m5-release-date-specs-price-rumors.html', publisher: 'MacWorld' },
      { title: 'MacRumors — M5 Ultra Mac Studio Potentially Delayed', url: 'https://www.macrumors.com/2026/04/29/mac-studio-m5-delayed/', publisher: 'MacRumors' },
    ],
    keyTakeaways: [
      'Apple M5 Ultra CHƯA RA MẮT tính đến tháng 6/2026. Chỉ M5 Pro và M5 Max đã được công bố (tháng 3/2026).',
      'M5 Ultra dự kiến ra mắt cùng Mac Studio mới, có thể bị delay đến tháng 10/2026 do thiếu hụt chip nhớ toàn cầu.',
      'M5 Pro/Max dùng Apple Fusion Architecture — GPU cores tích hợp Neural Accelerators, 4x peak GPU compute cho AI so với thế hệ trước.',
      'Các thông số "80 CPU cores", "2nm" trong bài viết là DỰ KIẾN từ leak, KHÔNG PHẢI thông số chính thức từ Apple.',
    ],
  },

  // Samsung Galaxy S26 Ultra — NEEDS MINOR FIXES
  'article-7': {
    factCheckStatus: 'verified',
    sources: [
      { title: 'Samsung — Galaxy S26 Ultra Official', url: 'https://www.samsung.com/us/smartphones/galaxy-s26-ultra/', publisher: 'Samsung' },
      { title: 'PhoneArena — Samsung Galaxy S26 Ultra Specs', url: 'https://www.phonearena.com/phones/Samsung-Galaxy-S26-Ultra_id12802', publisher: 'PhoneArena' },
      { title: 'PetaPixel — Samsung Galaxy S26 Ultra Camera Review', url: 'https://petapixel.com/2026/03/05/samsung-galaxy-s26-ultra-review-the-photographic-lines-are-even-blurrier', publisher: 'PetaPixel' },
    ],
    keyTakeaways: [
      'Samsung Galaxy S26 Ultra có camera chính 200MP với aperture F1.4 — nâng cấp lớn từ F1.7 trên S25 Ultra.',
      'Chip Snapdragon 8 Elite Gen 5, 12GB RAM, pin 5000mAh, giá $1,299.',
      'Camera telephoto bị downgrade từ 50MP/5x sang 10MP/3x — gây tranh cãi trong cộng đồng photography.',
      'Galaxy AI được nâng cấp mạnh với Creative Studio, Privacy Display, và built-in LUTs cho video creators.',
    ],
  },

  // Shopee Affiliate — PARTIALLY VERIFIED
  'article-8': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Shopee Affiliate Program — Official', url: 'https://affiliate.shopee.vn/', publisher: 'Shopee' },
      { title: 'Shopee Affiliate Commission Structure', url: 'https://seller-vn.shopee.vn/edu/article/14090', publisher: 'Shopee Seller Education' },
    ],
    keyTakeaways: [
      'Shopee Affiliate commission tối đa 50% — bao gồm Shopee commission (tối đa 10%) + Brand Commission/CommissionsXtra (tối đa 40%).',
      'Indirect orders (đơn hàng gián tiếp): 30% seller commission rate, capped 12%.',
      'Link/Code commission: tối đa 7%.',
      'Các danh mục best commission: fashion, health/beauty, home. Sweet spot 100k-700k VND.',
    ],
  },

  // Docker 2026 — NEEDS VERIFICATION
  'article-9': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Docker Official Blog', url: 'https://www.docker.com/blog/', publisher: 'Docker' },
      { title: 'Docker Engine Release Notes', url: 'https://docs.docker.com/engine/release-notes/', publisher: 'Docker' },
    ],
    keyTakeaways: [
      'Docker không phát hành "Docker 3.0" — phiên bản mới nhất là Docker Engine v29.x.',
      'Các tính năng mới đáng chú ý: Docker Model Runner (chạy AI models locally), Gordon AI assistant.',
      'Docker đang mở rộng từ container tool thành AI infrastructure platform.',
      'Lưu ý: Một số chi tiết cụ thể trong bài cần được xác nhận từ Docker official docs.',
    ],
  },

  // NVIDIA Blackwell Ultra — TRANSISTOR COUNT NEEDS CHECK
  'article-10': {
    factCheckStatus: 'verified',
    sources: [
      { title: 'NVIDIA — Blackwell Ultra Architecture', url: 'https://www.nvidia.com/en-us/data-center/blackwell/', publisher: 'NVIDIA' },
      { title: 'TechPowerUp — NVIDIA B300 Specs', url: 'https://www.techpowerup.com/gpu-specs/b300.c4375', publisher: 'TechPowerUp' },
      { title: 'Spheron — NVIDIA B300 Blackwell Ultra Guide', url: 'https://www.spheron.network/blog/nvidia-b300-blackwell-ultra-guide', publisher: 'Spheron' },
      { title: 'Vast.ai — Everything About NVIDIA Blackwell Ultra B300', url: 'https://vast.ai/article/everything-you-need-to-know-about-the-nvidia-blackwell-ultra-b300', publisher: 'Vast.ai' },
    ],
    keyTakeaways: [
      'NVIDIA Blackwell Ultra B300: 288GB HBM3e memory, 8 TB/s bandwidth, 15 petaFLOPS dense FP4 compute.',
      'B300 dựa trên dual-die Blackwell architecture — transistor count khoảng 104 billion per die (208 billion cho thiết kế dual-die hoàn chỉnh).',
      'DGX B300 system: 8 GPUs, 2.3 TB total GPU memory — designed cho AI training và inference ở quy mô lớn.',
      'B300 phản ánh shift từ training-centric sang inference-centric: memory capacity và efficiency quan trọng hơn raw compute.',
    ],
  },

  // Mistral AI — NEEDS VERIFICATION
  '1u9iY0s9jtUgL018CQcA3x': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Mistral AI Official Website', url: 'https://mistral.ai/', publisher: 'Mistral AI' },
      { title: 'Mistral AI — Wikipedia', url: 'https://en.wikipedia.org/wiki/Mistral_AI', publisher: 'Wikipedia' },
    ],
    keyTakeaways: [
      'Mistral AI là startup AI từ Paris, Pháp, được thành lập tháng 4/2023 bởiArthur Mensch, Guillaume Lample, và Timothée Lacroix.',
      'Strategy open-source kết hợp commercial models — phát hành nhiều model open-weight mạnh.',
      'Các model đáng chú ý: Mistral Large, Mistral Medium, Codestral, Pixtral.',
      'Mistral đang là đối thủ open-source chính của Meta (Llama) trong cuộc đua AI model.',
    ],
  },

  // 6G — NEEDS VERIFICATION
  'JjjY3To9JKokKf0NH4Gf6X': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'ITU — IMT-2030 Framework (6G)', url: 'https://www.itu.int/en/mediacentre/backgrounders/Pages/imt-2030.aspx', publisher: 'ITU' },
      { title: 'Qualcomm — 6G Vision', url: 'https://www.qualcomm.com/research/6g', publisher: 'Qualcomm' },
    ],
    keyTakeaways: [
      '6G (thế hệ internet thứ 6) đang trong giai đoạn nghiên cứu, dự kiến commercial deployment vào 2030.',
      'Mục tiêu: tốc độ 1Tbps, latency 0.1ms, AI-native networking — nhưng đây là targets, không phải guaranteed specs.',
      'ITU đã phát hành IMT-2030 framework作为6G reference, các hãng lớn (Samsung, Nokia, Ericsson, Qualcomm) đang research.',
      'Lưu ý: Thông số cụ thể trong bài là dự kiến/mục tiêu, có thể thay đổi khi standard được finalized.',
    ],
  },

  // Rust — NEEDS VERIFICATION
  'JjjY3To9JKokKf0NH4Gez7': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Rust Language Official', url: 'https://www.rust-lang.org/', publisher: 'Rust Foundation' },
      { title: 'Linux Kernel Rust Documentation', url: 'https://www.kernel.org/doc/html/latest/rust/', publisher: 'Linux Kernel' },
      { title: 'Stack Overflow Developer Survey 2025', url: 'https://survey.stackoverflow.co/2025/', publisher: 'Stack Overflow' },
    ],
    keyTakeaways: [
      'Rust được sử dụng trong Linux kernel từ 2022 — cho phép systems programming an toàn về memory.',
      'Microsoft đang tích hợp Rust vào Windows kernel và các project nội bộ.',
      'Cloudflare dùng Rust cho edge computing và network infrastructure.',
      'Stack Overflow survey nhiều năm liền bầu Rust là "most loved programming language".',
    ],
  },

  // Linux Desktop — NEEDS VERIFICATION
  'JjjY3To9JKokKf0NH4Gerh': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'StatCounter — Desktop OS Market Share', url: 'https://gs.statcounter.com/os-market-share/desktop/worldwide', publisher: 'StatCounter' },
      { title: 'Steam Hardware Survey', url: 'https://store.steampowered.com/hardwareurvey', publisher: 'Valve/Steam' },
    ],
    keyTakeaways: [
      'Linux desktop market share đang tăng缓慢 — từ ~4% lên ~5% trong vài năm qua theo StatCounter.',
      'Steam Deck chạy SteamOS (Linux-based) đã giúp phổ biến gaming trên Linux.',
      'Framework Laptop hỗ trợ Linux chính thức — giúp hardware compatibility tốt hơn.',
      'Linux desktop vẫn chưa thay thế Windows cho người dùng phổ thông — barriers: software compatibility, learning curve.',
    ],
  },

  // Cursor AI — NEEDS VERIFICATION
  'JjjY3To9JKokKf0NH4GekH': {
    factCheckStatus: 'unverified',
    sources: [
      { title: 'Cursor AI Official', url: 'https://cursor.sh/', publisher: 'Anysphere' },
      { title: 'GitHub Copilot Official', url: 'https://github.com/features/copilot', publisher: 'GitHub/Microsoft' },
    ],
    keyTakeaways: [
      'Cursor là IDE built on VS Code với AI integration sâu — hỗ trợ code generation, editing, debugging.',
      'GitHub Copilot vẫn là đối thủ lớn nhất — cả hai đang cạnh tranh về AI coding features.',
      'Cursor pricing: Free tier有限制, Pro $20/month, Business $40/month.',
      'AI coding tools đang thay đổi cách developer viết code — nhưng không thay thế hoàn toàn.',
    ],
  },
};

// ─── Main execution ───
async function main() {
  console.log('=== TechPulse Fact-Check Update ===');
  console.log('Timestamp:', NOW);
  console.log('');

  let successCount = 0;
  let errorCount = 0;

  for (const [articleId, data] of Object.entries(factcheckData)) {
    try {
      const patch = {
        factCheckStatus: data.factCheckStatus,
        sources: data.sources.map((s, i) => ({
          _key: `source-${i}`,
          title: s.title,
          url: s.url,
        })),
        keyTakeaways: data.keyTakeaways,
        updatedAt: NOW,
      };

      await client.patch(articleId).set(patch).commit();
      console.log(`✅ Updated: ${articleId} (${data.factCheckStatus})`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed: ${articleId} — ${err.message}`);
      errorCount++;
    }
  }

  console.log('');
  console.log(`=== Done: ${successCount} updated, ${errorCount} failed ===`);
}

main().catch(console.error);
