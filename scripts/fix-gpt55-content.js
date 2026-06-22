// Fix GPT-5.5 article: correct context window claim + fix concatenated lists
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

function makeBullet(text, boldPrefix = null) {
  const children = boldPrefix
    ? [makeSpan(boldPrefix, ['strong']), makeSpan(text)]
    : [makeSpan(text)];
  return makeBlock(children, 'normal', 'bullet');
}

function makeNumbered(text, num) {
  return makeBlock([makeSpan(`${num}. ${text}`)], 'normal', 'bullet');
}

async function main() {
  // Find the GPT-5.5 article
  const query = `*[_type == "article" && slug.current == "gpt-5-ai-cuoc-dua-tong-hop"][0] { _id, title, body }`;
  const article = await client.fetch(query);

  if (!article) {
    console.error('Article not found!');
    process.exit(1);
  }

  console.log(`Found: ${article.title} (${article._id})`);
  console.log(`Current body blocks: ${article.body?.length || 0}`);

  // Rebuild the body with fixes
  const newBody = [
    // H2: Intro
    makeH2('GPT-5.5 vs Claude Opus 4.8: Cuộc đua AI tổng hợp'),
    makeParagraph('Ngày 28/05/2026, Anthropic phát hành Claude Opus 4.8 — và nó đã lật ngược bản đồ. Theo Artificial Analysis Intelligence Index, Opus 4.8 đạt điểm 61.4, vượt qua GPT-5.5 với 60.2. Đây là lần đầu tiên từ tháng 4/2026 một model Claude vượt qua GPT trên benchmark tổng hợp.'),
    makeParagraph('Những con số nặng không kể hết câu chuyện. Phần thực sự hấp dẫn là cách hai hãng đang thay đổi cách cạnh tranh — không nữa là "ai mạnh hơn" mà là "ai hiệu quả hơn, an toàn hơn, và rẻ hơn" cho từng loại công việc cụ thể.'),

    // H2: SWE-bench
    makeH2('SWE-bench: Cuộc đấu coding quyết định tất cả'),
    makeParagraph([makeSpan('Nếu bạn chỉ có thể một benchmark để đánh giá AI coding, đó là '), makeSpan('SWE-bench', ['strong']), makeSpan(' — benchmark đánh giá khả năng giải quyết vấn đề thực tế từ GitHub issues.')]),
    makeParagraph('Theo số liệu từ Vals AI (independent benchmark):'),
    makeParagraph([makeSpan('Claude Fable 5', ['strong']), makeSpan(': 95.0% SWE-bench Verified — nhưng đã bị suspend')]),
    makeParagraph([makeSpan('Claude Opus 4.8', ['strong']), makeSpan(': 88.6% SWE-bench Verified, '), makeSpan('69.2% SWE-bench Pro', ['strong'])]),
    makeParagraph([makeSpan('GPT-5.5', ['strong']), makeSpan(': 82.6% SWE-bench Verified')]),
    makeParagraph([makeSpan('Claude Opus 4.7', ['strong']), makeSpan(': 82.0% SWE-bench Verified')]),
    makeParagraph([makeSpan('Gemini 3.5 Flash', ['strong']), makeSpan(': 78.8% SWE-bench Verified')]),
    makeParagraph([makeSpan('Trên SWE-bench Pro — benchmark phức tạp hơn, yêu cầu model phải hiểu cấu trúc code sâu hơn — Opus 4.8 đạt '), makeSpan('69.2%', ['strong']), makeSpan(', vượt xa GPT-5.5 khoảng 10 điểm. Đây không phải là sai số nhỏ. Trong thế giới AI coding, 10 điểm SWE-bench Pro tương đương với việc giải được 10 vấn đề phức tạp hơn mỗi lần thử.')]),
    makeParagraph([makeSpan('Nghĩa là gì?', ['strong']), makeSpan(' Nếu bạn là developer đang sử dụng AI để viết code, Opus 4.8 sẽ giải quyết nhiều hơn, nhanh hơn, và ít sai hơn cho cùng một vấn đề.')]),

    // H2: Terminal-Bench
    makeH2('Terminal-Bench: Nơi GPT-5.5 chiến thắng'),
    makeParagraph([makeSpan('Tuy nhiên, GPT-5.5 không hoàn toàn thua. Trên '), makeSpan('Terminal-Bench 2.1', ['strong']), makeSpan(' — benchmark đánh giá khả năng sử dụng terminal và công cụ lệnh — GPT-5.5 đạt '), makeSpan('78.2%', ['strong']), makeSpan(', vượt qua Opus 4.8.')]),
    makeParagraph('Điều này có ý nghĩa thực tế: nếu bạn cần AI thực thi các tác vụ hệ thống (install package, cấu hình server, debug qua terminal), GPT-5.5 là lựa chọn tốt hơn.'),

    // H2: Pricing — now with proper markdown table for the renderer
    makeH2('Pricing: Ai rẻ hơn?'),
    makeParagraph('Đây là nơi nhiều người thiếu hiểu rõ. Theo OpenAI official pricing (tháng 6/2026):'),
    // Table will be detected by sanitize.ts
    makeParagraph('| Model | Input (per 1M tokens) | Output (per 1M tokens) | Context Window |'),
    makeParagraph('|-------|----------------------|------------------------|----------------|'),
    makeParagraph('| Claude Opus 4.8 | $5 | $25 | 1M tokens |'),
    makeParagraph('| GPT-5.5 | $5 | $30 | 1M tokens |'),
    makeParagraph('| GPT-5 (standard) | $1.25 | $10 | 400K tokens |'),
    makeParagraph([makeSpan('Lưu ý quan trọng: ', ['strong']), makeSpan('GPT-5.5 có giá '), makeSpan('$5 input / $30 output', ['strong']), makeSpan(' — ĐẮT HƠN Claude Opus 4.8 ($5/$25), không phải rẻ hơn. Đừng nhầm GPT-5.5 với GPT-5 standard ($1.25/$10).')]),
    makeParagraph('Nếu bạn cần chi phí thấp, GPT-5 standard ($1.25/$10) là lựa chọn kinh tế hơn — nhưng context window chỉ 400K tokens thay vì 1M.'),

    // H2: Computer Use
    makeH2('Computer Use: Opus 4.8 dẫn đầu'),
    makeParagraph([makeSpan('Một khía cạnh quan trọng khác là '), makeSpan('computer use', ['strong']), makeSpan(' — khả năng AI điều khiển máy tính thực sự. Opus 4.8 có khả năng mở browser, click, type, và thực hiện tác vụ trên desktop.')]),
    makeParagraph([makeSpan('Trên benchmark '), makeSpan('OSWorld-Verified', ['strong']), makeSpan(' đánh giá computer use, Opus 4.8 vượt xa GPT-5.5. Đây là tính năng quan trọng cho '), makeSpan('agentic workflows', ['strong']), makeSpan(' — khi bạn muốn AI tự động thực hiện chuỗi tác vụ phức tạp.')]),

    // H2: Strategies
    makeH2('Anthropic vs OpenAI: Chiến lược khác nhau'),
    makeH3('Anthropic: "AI an toàn trước"'),
    makeParagraph([makeSpan('Anthropic đang đặt cược vào '), makeSpan('an toàn', ['strong']), makeSpan('. Constitutional AI, RLHF nâng cao, và hạn chế chặt chẽ là lộ trình của họ. Opus 4.8 ít hallucination hơn, trung thực hơn, và có thể từ chối các yêu cầu có hại.')]),
    makeH3('OpenAI: "AI mạnh nhất, đa năng nhất"'),
    makeParagraph([makeSpan('OpenAI đang đặt cược vào '), makeSpan('hiệu suất và ecosystem', ['strong']), makeSpan('. GPT-5.5 có terminal tasks tốt hơn, ecosystem rộng hơn (ChatGPT, API, plugins), và pricing linh hoạt hơn với GPT-5 standard cho budget-conscious users.')]),
    makeH3('Google: "AI đa phương thức"'),
    makeParagraph('Google Gemini 3.5 Flash đạt 78.8% SWE-bench Verified — gần bằng Opus 4.7 — nhưng với giá rẻ hơn nhiều. Google đang tập trung vào multimodal (văn bản + hình ảnh + video + âm thanh).'),

    // H2: Practical advice for VN developers — FIXED list items
    makeH2('Phân tích cho developer Việt Nam'),
    makeParagraph('Nếu bạn là developer Việt Nam, đây là practical advice:'),
    makeBoldParagraph('Chọn GPT-5.5 nếu:'),
    makeBullet('Bạn cần terminal/system tasks tốt nhất'),
    makeBullet('Bạn cần context window 1M tokens (cùng mức với Claude Opus 4.8)'),
    makeBullet('Bạn làm việc trong ecosystem OpenAI (ChatGPT, plugins)'),
    makeBoldParagraph('Chọn Claude Opus 4.8 nếu:'),
    makeBullet('Bạn cần coding tốt hơn (SWE-bench 69.2% vs ~59%)'),
    makeBullet('Bạn cần agentic workflows (computer use)'),
    makeBullet('Bạn cần AI an toàn, ít hallucination'),
    makeBullet('Bạn làm project phức tạp, cần AI "suy luận sâu"'),
    makeBoldParagraph('Chọn GPT-5 standard nếu:'),
    makeBullet('Bạn cần giá rẻ ($1.25/$10)'),
    makeBullet('Bạn không cần context window lớn'),
    makeBullet('Bạn làm simple tasks như chat, summarization'),
    makeParagraph([makeSpan('Strategy tốt nhất', ['strong']), makeSpan(' là '), makeSpan('model routing', ['strong']), makeSpan(' — sử dụng GPT-5.5 cho terminal tasks, Opus 4.8 cho coding tasks, và GPT-5 standard cho simple tasks. Đây là cách nhiều team đang làm trong production.')]),

    // H2: Conclusion — FIXED context window claim
    makeH2('Kết luận'),
    makeParagraph('Tính đến tháng 6/2026:'),
    makeNumbered('Opus 4.8 đang dẫn đầu trên benchmark tổng hợp (61.4 vs 60.2)', 1),
    makeNumbered('GPT-5.5 có terminal tasks tốt hơn, nhưng context window bằng nhau (đều 1M tokens)', 2),
    makeNumbered('GPT-5 standard rẻ hơn đáng kể ($1.25/$10) cho budget-conscious users', 3),
    makeNumbered('Gemini đang trở thành alternative tốt cho multimodal workflows', 4),
    makeParagraph('Cuộc đua AI không còn là "ai mạnh nhất". Nó đã trở thành "ai phù hợp nhất cho công việc cụ thể của bạn". Và đây là thay đổi lớn nhất trong cách chúng ta sử dụng AI.'),
    makeParagraph('---'),
    makeParagraph('*Nguồn tham khảo được liệt kê ở cuối bài. Cập nhật lần cuối: 22/6/2026.*'),
  ];

  // Update the article
  await client
    .patch(article._id)
    .set({ body: newBody, updatedAt: new Date().toISOString() })
    .commit();

  console.log(`✅ Updated GPT-5.5 article: ${article._id}`);
  console.log(`   - Fixed context window claim in conclusion`);
  console.log(`   - Fixed concatenated list items`);
  console.log(`   - Maintained markdown table data for renderer`);
}

main().catch(console.error);
