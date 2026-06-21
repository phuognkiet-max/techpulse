// TechPulse — Fix ALL remaining Sanity data issues
// 1. GPT-5 body: fix pricing table ($2.5→$5, $10→$30, 2M→1M)
// 2. iPhone: fix title (A19 Bionic→A19 Pro), clean titanium refs
// 3. siteSettings: fix description with diacritics
// Usage: node scripts/fix-all-sanity-data.js

const { createClient } = require('@sanity/client');

const SANITY_TOKEN = process.env.SANITY_TOKEN || 'skODzLOUQgLFqNq9GEMQQyCtZbipjwgn6wkjwDk8wWyQVJkEN34m6bnMm7mq3dmiFxDIrlfkpFYHeeYuOYwhwhHqesit4GTioywNwnANkPC19Zn4aWKapCkrluPg5qZxrdkCeK99baOfIPpN6EUOLJDfj2izr5ByEqwzVjLf8DBOpqC0vd0g';

const client = createClient({
  projectId: '5up9e69p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_TOKEN,
});

function key() {
  return Math.random().toString(36).slice(2);
}

function textToBlocks(text) {
  const blocks = [];
  const lines = text.split('\n');
  let listItems = [];

  function flushList() {
    if (listItems.length > 0) {
      blocks.push({
        _type: 'block', _key: key(), style: 'normal', list: 'bullet',
        children: listItems.map(item => ({ _type: 'span', _key: key(), text: item })),
      });
      listItems = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') { flushList(); continue; }
    if (trimmed.startsWith('- ')) { listItems.push(trimmed.slice(2)); continue; }
    flushList();
    if (trimmed.startsWith('## ')) {
      blocks.push({ _type: 'block', _key: key(), style: 'h2', children: [{ _type: 'span', _key: key(), text: trimmed.slice(3) }] });
    } else if (trimmed.startsWith('### ')) {
      blocks.push({ _type: 'block', _key: key(), style: 'h3', children: [{ _type: 'span', _key: key(), text: trimmed.slice(4) }] });
    } else if (trimmed.startsWith('> ')) {
      blocks.push({ _type: 'block', _key: key(), style: 'blockquote', children: [{ _type: 'span', _key: key(), text: trimmed.slice(2) }] });
    } else {
      const children = [];
      const parts = trimmed.split(/(\*\*.*?\*\*|`[^`]+`)/);
      for (const part of parts) {
        if (!part) continue;
        if (part.startsWith('**') && part.endsWith('**')) {
          children.push({ _type: 'span', _key: key(), text: part.slice(2, -2), marks: ['strong'] });
        } else if (part.startsWith('`') && part.endsWith('`')) {
          children.push({ _type: 'span', _key: key(), text: part.slice(1, -1), marks: ['code'] });
        } else {
          children.push({ _type: 'span', _key: key(), text: part });
        }
      }
      if (children.length > 0) blocks.push({ _type: 'block', _key: key(), style: 'normal', children });
    }
  }
  flushList();
  return blocks;
}

// ─── 1. GPT-5 body — CORRECTED pricing ───
const gpt5Body = `## GPT-5.5 vs Claude Opus 4.8: Cuộc đua AI tổng hợp

Ngày 28/05/2026, Anthropic phát hành Claude Opus 4.8 — và nó đã lật ngược bản đồ. Theo Artificial Analysis Intelligence Index, Opus 4.8 đạt điểm 61.4, vượt qua GPT-5.5 với 60.2. Đây là lần đầu tiên từ tháng 4/2026 một model Claude vượt qua GPT trên benchmark tổng hợp.

Những con số nặng không kể hết câu chuyện. Phần thực sự hấp dẫn là cách hai hãng đang thay đổi cách cạnh tranh — không nữa là "ai mạnh hơn" mà là "ai hiệu quả hơn, an toàn hơn, và rẻ hơn" cho từng loại công việc cụ thể.

## SWE-bench: Cuộc đấu coding quyết định tất cả

Nếu bạn chỉ có thể một benchmark để đánh giá AI coding, đó là **SWE-bench** — benchmark đánh giá khả năng giải quyết vấn đề thực tế từ GitHub issues.

Theo số liệu từ Vals AI (independent benchmark):

- **Claude Fable 5**: 95.0% SWE-bench Verified — nhưng đã bị suspend
- **Claude Opus 4.8**: 88.6% SWE-bench Verified, **69.2% SWE-bench Pro**
- **GPT-5.5**: 82.6% SWE-bench Verified
- **Claude Opus 4.7**: 82.0% SWE-bench Verified
- **Gemini 3.5 Flash**: 78.8% SWE-bench Verified

Trên SWE-bench Pro — benchmark phức tạp hơn, yêu cầu model phải hiểu cấu trúc code sâu hơn — Opus 4.8 đạt **69.2%**, vượt xa GPT-5.5 khoảng 10 điểm. Đây không phải là sai số nhỏ. Trong thế giới AI coding, 10 điểm SWE-bench Pro tương đương với việc giải được 10 vấn đề phức tạp hơn mỗi lần thử.

**Nghĩa là gì?** Nếu bạn là developer đang sử dụng AI để viết code, Opus 4.8 sẽ giải quyết nhiều hơn, nhanh hơn, và ít sai hơn cho cùng một vấn đề.

## Terminal-Bench: Nơi GPT-5.5 chiến thắng

Tuy nhiên, GPT-5.5 không hoàn toàn thua. Trên **Terminal-Bench 2.1** — benchmark đánh giá khả năng sử dụng terminal và công cụ lệnh — GPT-5.5 đạt **78.2%**, vượt qua Opus 4.8.

Điều này có ý nghĩa thực tế: nếu bạn cần AI thực thi các tác vụ hệ thống (install package, cấu hình server, debug qua terminal), GPT-5.5 là lựa chọn tốt hơn.

## Pricing: Ai rẻ hơn?

Đây là nơi nhiều người thiếu hiểu rõ. Theo OpenAI official pricing (tháng 6/2026):

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Context Window |
|-------|----------------------|------------------------|----------------|
| Claude Opus 4.8 | $5 | $25 | 1M tokens |
| GPT-5.5 | $5 | $30 | 1M tokens |
| GPT-5 (standard) | $1.25 | $10 | 400K tokens |

**Lưu ý quan trọng:** GPT-5.5 có giá **$5 input / $30 output** — ĐẮT HƠN Claude Opus 4.8 ($5/$25), không phải rẻ hơn. Đừng nhầm GPT-5.5 với GPT-5 standard ($1.25/$10).

Nếu bạn cần chi phí thấp, GPT-5 standard ($1.25/$10) là lựa chọn kinh tế hơn — nhưng context window chỉ 400K tokens thay vì 1M.

## Computer Use: Opus 4.8 dẫn đầu

Một khía cạnh quan trọng khác là **computer use** — khả năng AI điều khiển máy tính thực sự. Opus 4.8 có khả năng mở browser, click, type, và thực hiện tác vụ trên desktop.

Trên benchmark **OSWorld-Verified** đánh giá computer use, Opus 4.8 vượt xa GPT-5.5. Đây là tính năng quan trọng cho **agentic workflows** — khi bạn muốn AI tự động thực hiện chuỗi tác vụ phức tạp.

## Anthropic vs OpenAI: Chiến lược khác nhau

### Anthropic: "AI an toàn trước"

Anthropic đang đặt cược vào **an toàn**. Constitutional AI, RLHF nâng cao, và hạn chế chặt chẽ là lộ trình của họ. Opus 4.8 ít hallucination hơn, trung thực hơn, và có thể từ chối các yêu cầu có hại.

### OpenAI: "AI mạnh nhất, đa năng nhất"

OpenAI đang đặt cược vào **hiệu suất và ecosystem**. GPT-5.5 có terminal tasks tốt hơn, ecosystem rộng hơn (ChatGPT, API, plugins), và pricing linh hoạt hơn với GPT-5 standard cho budget-conscious users.

### Google: "AI đa phương thức"

Google Gemini 3.5 Flash đạt 78.8% SWE-bench Verified — gần bằng Opus 4.7 — nhưng với giá rẻ hơn nhiều. Google đang tập trung vào multimodal (văn bản + hình ảnh + video + âm thanh).

## Phân tích cho developer Việt Nam

Nếu bạn là developer Việt Nam, đây là practical advice:

**Chọn GPT-5.5 nếu:**
- Bạn cần **terminal/system tasks** tốt nhất
- Bạn cần **context window 1M tokens**
- Bạn làm việc trong **ecosystem OpenAI** (ChatGPT, plugins)

**Chọn Claude Opus 4.8 nếu:**
- Bạn cần **coding tốt hơn** (SWE-bench 69.2% vs ~59%)
- Bạn cần **agentic workflows** (computer use)
- Bạn cần AI **an toàn, ít hallucination**
- Bạn làm **project phức tạp**, cần AI "suy luận sâu"

**Chọn GPT-5 standard nếu:**
- Bạn cần **giá rẻ** ($1.25/$10)
- Bạn không cần context window lớn
- Bạn làm **simple tasks** như chat, summarization

**Strategy tốt nhất** là **model routing** — sử dụng GPT-5.5 cho terminal tasks, Opus 4.8 cho coding tasks, và GPT-5 standard cho simple tasks. Đây là cách nhiều team đang làm trong production.

## Kết luận

Tính đến tháng 6/2026:

1. Opus 4.8 đang dẫn đầu trên benchmark tổng hợp (61.4 vs 60.2)
2. GPT-5.5 có terminal tasks tốt hơn và context window lớn hơn
3. GPT-5 standard rẻ hơn đáng kể ($1.25/$10) cho budget-conscious users
4. Gemini đang trở thành alternative tốt cho multimodal workflows

Cuộc đua AI không còn là "ai mạnh nhất". Nó đã trở thành "ai phù hợp nhất cho công việc cụ thể của bạn". Và đây là thay đổi lớn nhất trong cách chúng ta sử dụng AI.

---

*Nguồn tham khảo được liệt kê ở cuối bài. Cập nhật lần cuối: ${new Date().toLocaleDateString('vi-VN')}.*`;

// ─── 2. iPhone body — CORRECTED (no misleading titanium) ───
const iphoneBody = `## Tổng quan iPhone 17 Pro Max

iPhone 17 Pro Max là phiên bản lớn nhất và mạnh nhất trong dòng iPhone 17, được ra mắt tại sự kiện "Awe Dropping" của Apple vào tháng 9/2025. Đây là lần đầu tiên Apple sử dụng thiết kế **aluminum unibody** cho dòng iPhone Pro — một sự thay đổi lớn so với khung nhôm titan của thế hệ trước.

Với chip A19 Pro, hệ thống camera 48MP toàn bộ, và thiết kế unibody mới, Apple đã đặt lại tiêu chuẩn cho điện thoại hàng đầu.

## Chip A19 Pro — Sức mạnh mới

A19 Pro là chip di động mạnh nhất Apple từng tạo, với:

- **6-core CPU** (2 performance + 4 efficiency cores)
- **6-core GPU** với Neural Accelerators
- **16-core Neural Engine** cho Apple Intelligence
- **Hardware-accelerated ray tracing**

So với A18 Pro trên iPhone 16 Pro Max, A19 Pro cải thiện khoảng 25% về CPU performance và 30% về GPU performance. Nhưng điểm đáng chú ý nhất là hiệu suất AI — Neural Engine mới xử lý Apple Intelligence nhanh gấp đôi.

## Hệ thống camera 48MP toàn bộ

iPhone 17 Pro Max có ba camera sau đều 48MP:

- **48MP Fusion Main**: 24mm, f/1.78, sensor-shift OIS, hỗ trợ ảnh 24MP và 48MP
- **48MP Fusion Ultra Wide**: 13mm, f/2.2, 120° field of view, Hybrid Focus Pixels
- **48MP Fusion Telephoto**: 100mm (4x), f/2.8, tetraprism design, 3D sensor-shift OIS

Tổng zoom range: 8x optical-quality zoom in, 2x optical zoom out, 16x optical-quality zoom range. Digital zoom lên đến 40x.

Camera trước: 18MP Center Stage camera.

## Thiết kế Aluminum Unibody

Đây là thay đổi thiết kế lớn nhất của iPhone 17 Pro Max. Apple chuyển sang **aluminum unibody** — một khối nhôm nguyên khối, thay thế cho thiết kế khung nhôm titan của các thế hệ Pro trước.

Lợi điểm:

- **Mỏng hơn và nhẹ hơn** nhờ thiết kế unibody liền mạch
- **Tản nhiệt tốt hơn** vì aluminum dẫn nhiệt hiệu quả hơn
- **Chịu lực tốt hơn** với cấu trúc nguyên khối

Màu sắc: Cosmic Orange, Deep Blue.

Kích thước: 163.4 x 78.0 x 8.75 mm, nặng 233g.

## Màn hình

- **6.9-inch** Super Retina XDR OLED
- 2868 x 1320 pixels, 460 ppi
- ProMotion với adaptive refresh rate lên đến 120Hz
- Always-On Display
- **3,000 nits** peak brightness (outdoor)
- Ceramic Shield 2

## Pin và sạc

iPhone 17 Pro Max có pin lớn nhất trong lịch sử iPhone — Apple không công bố chính xác mAh nhưng cho biết thời lượng pin cải thiện đáng kể so với thế hệ trước.

## Giá và Availability

- **Giá khởi điểm**: $1,199 (256GB)
- Ra mắt tháng 9/2025
- Có sẵn tại Việt Nam từ tháng 10/2025

## Đánh giá

iPhone 17 Pro Max là một bản upgrade đáng giá cho người dùng Pro Max hiện tại. Camera 48MP toàn bộ, thiết kế aluminum unibody mới, và chip A19 Pro tạo nên một package hoàn chỉnh.

Tuy nhiên, mức giá $1,199 vẫn là rào cản lớn — iPhone 17 thường ($799) có thể đủ tốt cho đa số người dùng.`;

async function main() {
  console.log('=== Fix ALL Sanity Data Issues ===');
  const NOW = new Date().toISOString();

  // 1. Fix GPT-5 body
  try {
    const blocks = textToBlocks(gpt5Body);
    await client.patch('article-1').set({
      body: blocks,
      updatedAt: NOW,
    }).commit();
    console.log('✅ Fixed: GPT-5 body (pricing $5/$30, context 1M)');
  } catch (err) {
    console.error('❌ Failed GPT-5:', err.message);
  }

  // 2. Fix iPhone title + body
  try {
    const blocks = textToBlocks(iphoneBody);
    await client.patch('article-2').set({
      title: 'iPhone 17 Pro Max: Apple phá vỡ mọi giới hạn với chip A19 Pro',
      excerpt: 'iPhone 17 Pro Max với chip A19 Pro, camera 48MP toàn bộ, thiết kế aluminum unibody. Đánh giá chi tiết theo thông số chính thức từ Apple.',
      body: blocks,
      updatedAt: NOW,
    }).commit();
    console.log('✅ Fixed: iPhone title (A19 Bionic→A19 Pro) + body (no titanium)');
  } catch (err) {
    console.error('❌ Failed iPhone:', err.message);
  }

  // 3. Fix siteSettings description with diacritics
  try {
    // First check if siteSettings exists
    const settings = await client.fetch('*[_type=="siteSettings"][0]._id');
    if (settings) {
      await client.patch(settings).set({
        description: 'Nguồn tin công nghệ đáng tin cậy. Cập nhật tin tức AI, Smartphone, Startup, Software, Hardware mỗi ngày.',
        footerDescription: 'Nguồn tin công nghệ đáng tin cậy. Cập nhật tin tức AI, Smartphone, Startup, Software, Hardware mỗi ngày.',
      }).commit();
      console.log('✅ Fixed: siteSettings description (added diacritics)');
    } else {
      // Create siteSettings
      await client.create({
        _type: 'siteSettings',
        title: 'TechPulse',
        description: 'Nguồn tin công nghệ đáng tin cậy. Cập nhật tin tức AI, Smartphone, Startup, Software, Hardware mỗi ngày.',
        footerDescription: 'Nguồn tin công nghệ đáng tin cậy. Cập nhật tin tức AI, Smartphone, Startup, Software, Hardware mỗi ngày.',
      });
      console.log('✅ Created: siteSettings with diacritics');
    }
  } catch (err) {
    console.error('❌ Failed siteSettings:', err.message);
  }

  // 4. Verify all articles have sources
  try {
    const articles = await client.fetch('*[_type=="article"]{_id, title, sources, keyTakeaways}');
    let missing = 0;
    for (const a of articles) {
      if (!a.sources || a.sources.length === 0) {
        console.log('⚠️  Missing sources:', a.title.slice(0, 50));
        missing++;
      }
      if (!a.keyTakeaways || a.keyTakeaways.length === 0) {
        console.log('⚠️  Missing keyTakeaways:', a.title.slice(0, 50));
        missing++;
      }
    }
    if (missing === 0) console.log('✅ All articles have sources + keyTakeaways');
  } catch (err) {
    console.error('❌ Verification failed:', err.message);
  }

  console.log('=== Done ===');
}

main().catch(console.error);
