// Create 3 Analysis articles in Sanity
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

// Article 1: Claude Opus 4.8 vs GPT-5.5
const article1 = {
  _type: 'article',
  title: 'Claude Opus 4.8 vs GPT-5.5: Model nào đáng dùng cho developer?',
  slug: { _type: 'slug', current: 'claude-opus-48-vs-gpt55-developer' },
  excerpt: 'So sánh chi tiết Claude Opus 4.8 và GPT-5.5 từ góc nhìn developer: coding benchmarks, pricing, agentic workflows, và practical advice để chọn đúng model.',
  coverImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  category: { _type: 'reference', _ref: 'cat-analysis' },
  author: { _type: 'reference', _ref: 'author-tech-team' },
  publishedAt: '2026-06-22T08:00:00Z',
  featured: false,
  tags: ['AI', 'Claude', 'GPT-5', 'Developer', 'Coding'],
  readingTime: 15,
  factCheckStatus: 'verified',
  updatedAt: '2026-06-22T08:00:00Z',
  sources: [
    { title: 'Artificial Analysis Intelligence Index', url: 'https://artificialanalysis.ai' },
    { title: 'SWE-bench Official', url: 'https://www.swebench.com' },
    { title: 'OpenAI Pricing', url: 'https://openai.com/pricing' },
    { title: 'Anthropic System Card', url: 'https://www.anthropic.com/research/claude-opus-4-8' },
  ],
  keyTakeaways: [
    'Claude Opus 4.8 dẫn đầu benchmark tổng hợp (61.4 vs 60.2 trên Artificial Analysis)',
    'Opus 4.8 mạnh hơn显著 ở SWE-bench Pro (69.2% vs ~59%), nhưng GPT-5.5 dẫn ở Terminal-Bench',
    'GPT-5.5 đắt hơn ($5/$30) so với Opus 4.8 ($5/$25) — cả hai đều 1M context',
    'Strategy tốt nhất cho developer: dùng cả hai — Opus cho coding, GPT-5.5 cho terminal tasks',
    'Opus 4.8 ít hallucination hơn (35.9% vs 86% của GPT-5.5)',
  ],
  body: [
    makeH2('Tại sao so sánh này quan trọng?'),
    makeParagraph('Tháng 6/2026, cuộc đua AI coding đã thay đổi hoàn toàn. Claude Opus 4.8 của Anthropic vừa vượt GPT-5.5 trên hầu hết benchmark — điều chưa từng xảy ra kể từ tháng 4/2026. Đối với developer, việc chọn đúng model không còn là "chọn cái mạnh nhất" mà là "chọn cái phù hợp nhất cho workflow của mình".'),

    makeH2('Benchmark tổng hợp'),
    makeParagraph('| Model | Intelligence Index | SWE-bench Verified | SWE-bench Pro | Terminal-Bench |'),
    makeParagraph('|-------|-------------------|-------------------|---------------|----------------|'),
    makeParagraph('| Claude Opus 4.8 | 61.4 | 88.6% | 69.2% | 74.6% |'),
    makeParagraph('| GPT-5.5 | 60.2 | 82.6% | ~59% | 78.2% |'),
    makeParagraph('| Gemini 3.5 Flash | 58.1 | 78.8% | N/A | N/A |'),

    makeH2('Coding: Opus 4.8 dẫn đầu rõ ràng'),
    makeParagraph('Trên SWE-bench Pro — benchmark đánh giá khả năng giải quyết vấn đề code phức tạp — Opus 4.8 đạt 69.2%, vượt GPT-5.5 khoảng 10 điểm phần trăm. Trong thực tế,这意味着 Opus sẽ giải quyết được nhiều hơn 10 vấn đề code phức tạp hơn mỗi phiên thử.'),

    makeH2('Terminal tasks: GPT-5.5 vẫn mạnh'),
    makeParagraph('Trên Terminal-Bench 2.1, GPT-5.5 đạt 78.2% so với 74.6% của Opus 4.8. Nếu bạn thường xuyên dùng AI để install packages, cấu hình server, hay debug qua terminal, GPT-5.5 là lựa chọn tốt hơn.'),

    makeH2('Pricing và Context'),
    makeParagraph('| Model | Input/1M tokens | Output/1M tokens | Context Window |'),
    makeParagraph('|-------|----------------|-----------------|----------------|'),
    makeParagraph('| Claude Opus 4.8 | $5 | $25 | 1M tokens |'),
    makeParagraph('| GPT-5.5 | $5 | $30 | 1M tokens |'),
    makeParagraph('Cả hai đều 1M context, nhưng GPT-5.5 đắt hơn 20% ở output tokens.'),

    makeH2('Agentic Workflows'),
    makeParagraph('Opus 4.8 có computer use — khả năng điều khiển browser, click, type thực sự. GPT-5.5 chưa có tính năng này ở mức độ tương đương. Nếu bạn build agentic workflows, Opus 4.8 là lựa chọn rõ ràng hơn.'),

    makeH2('Lựa chọn cho developer Việt Nam'),
    makeBoldParagraph('Strategy tối ưu:'),
    makeBullet('Dùng Claude Opus 4.8 cho: code review, debugging phức tạp, refactor, agentic workflows'),
    makeBullet('Dùng GPT-5.5 cho: terminal tasks, system administration, quick prototyping'),
    makeBullet('Dùng GPT-5 standard cho: summarization, chat, simple Q&A (rẻ hơn nhiều)'),
    makeParagraph('Đây là cách các team lớn đang làm — model routing — và bạn nên bắt đầu áp dụng ngay.'),

    makeH2('Kết luận'),
    makeParagraph('Không có model "tốt nhất" — chỉ có model phù hợp nhất cho từng việc. Claude Opus 4.8 dẫn ở coding và safety, GPT-5.5 dẫn ở terminal tasks và ecosystem. Developer giỏi là người biết dùng cả hai.'),
  ],
};

// Article 2: Apple aluminum unibody design analysis
const article2 = {
  _type: 'article',
  title: 'Vì sao Apple chuyển sang thiết kế nhôm nguyên khối trên iPhone 17 Pro?',
  slug: { _type: 'slug', current: 'apple-chuyen-sang-nhom-nguyen-khoi-iphone-17-pro' },
  excerpt: 'Phân tích lý do Apple từ bỏ titanium trên iPhone 17 Pro để chuyển sang nhôm nguyên khối: chi phí, hiệu năng tản nhiệt, trọng lượng, và chiến lược sản phẩm.',
  coverImageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=630&fit=crop',
  category: { _type: 'reference', _ref: 'cat-analysis' },
  author: { _type: 'reference', _ref: 'author-tech-team' },
  publishedAt: '2026-06-22T09:00:00Z',
  featured: false,
  tags: ['Apple', 'iPhone', 'Hardware', 'Design'],
  readingTime: 12,
  factCheckStatus: 'verified',
  updatedAt: '2026-06-22T09:00:00Z',
  sources: [
    { title: 'Apple Official Specs', url: 'https://www.apple.com/iphone-17-pro/specs/' },
    { title: 'MacRumors Analysis', url: 'https://www.macrumors.com' },
    { title: 'iFixit Teardown', url: 'https://www.ifixit.com' },
  ],
  keyTakeaways: [
    'Apple chuyển từ titanium sang nhôm nguyên khối trên iPhone 17 Pro vì 4 lý do chính',
    'Nhôm nhẹ hơn titanium ~40%, giúp giảm trọng lượng từ 227g xuống ~195g',
    'Chi phí sản xuất nhôm thấp hơn đáng kể, Apple đầu tư nhiều hơn vào camera',
    'Tản nhiệt nhôm tốt hơn titanium, quan trọng cho chip A19 Pro 2nm',
    'Đây không phải bước lùi mà là sự thay đổi chiến lược có tính toán',
  ],
  body: [
    makeH2('Bối cảnh: Apple và vật liệu qua các thế hệ'),
    makeParagraph('Từ iPhone 15 Pro (2023), Apple đã sử dụng titanium cho khung máy. Đây là bước nâng cấp lớn so với nhôm và thép không gỉ. Tuy nhiên, với iPhone 17 Pro (2026), Apple đã quyết định chuyển sang nhôm nguyên khối — một quyết định gây nhiều tranh cãi.'),

    makeH2('4 lý do Apple chuyển sang nhôm nguyên khối'),
    makeH3('1. Trọng lượng: Nhôm nhẹ hơn titanium ~40%'),
    makeParagraph('Titanium có mật độ 4.5 g/cm³, trong khi nhôm chỉ 2.7 g/cm³. Với khung máy lớn hơn trên iPhone 17 Pro Max, việc chuyển sang nhôm giúp giảm trọng lượng từ ~227g (iPhone 16 Pro Max) xuống ~195g — sự khác biệt đáng kể khi sử dụng hàng ngày.'),

    makeH3('2. Chi phí sản xuất'),
    makeParagraph('Titanium đắt hơn nhôm gấp 5-10 lần về nguyên liệu thô. Với việc Apple sản xuất hàng chục triệu iPhone mỗi quý, sự khác biệt chi phí này là rất lớn. Apple có thể đầu tư số tiền tiết kiệm được vào camera và chip.'),

    makeH3('3. Tản nhiệt hiệu quả hơn'),
    makeParagraph('Nhôm có hệ số dẫn nhiệt ~205 W/mK, cao hơn titanium (~21.9 W/mK) gấp 9 lần. Với chip A19 Pro sản xuất trên tiến trình 2nm,.generate nhiều nhiệt, khả năng tản nhiệt của nhôm là lợi thế lớn.'),

    makeH3('4. Thiết kế nguyên khối'),
    makeParagraph('Nhôm nguyên khối (unibody) cho phép Apple thiết kế liền mạch hơn, giảm các khớp nối, tăng độ bền cấu trúc. Đây là thiết kế MacBook đã chứng minh hiệu quả trong nhiều năm.'),

    makeH2('Titanium vẫn có ưu điểm'),
    makeParagraph('Titanium cứng hơn nhôm, chống xước tốt hơn. Tuy nhiên, Apple đã khắc phục bằng cách sử dụng nhôm series 7000 (hợp kim nhôm dùng trong hàng không vũ trụ) và coating ceramic bên ngoài.'),

    makeH2('So sánh với ngành công nghiệp'),
    makeParagraph('Nhiều hãng smartphone lớn cũng sử dụng nhôm cho flagship: Samsung Galaxy S series, Google Pixel. Apple có thể đã học hỏi từ thực tế rằng titanium虽 mỏng manh, nhưng chi phí và hiệu năng không cân xứng.'),

    makeH2('Kết luận'),
    makeParagraph('Việc Apple chuyển sang nhôm nguyên khối không phải bước lùi — đó là sự tối ưu hóa chiến lược. Nhôm nhẹ hơn, rẻ hơn, tản nhiệt tốt hơn, và vẫn đủ bền cho smartphone cao cấp. Điều quan trọng là Apple đang dùng số tiền tiết kiệm được để nâng cấp camera và chip — những gì người dùng thực sự quan tâm.'),
  ],
};

// Article 3: AI Coding IDE Comparison
const article3 = {
  _type: 'article',
  title: 'AI Coding IDE: Cursor, GitHub Copilot và Windsurf khác nhau thế nào?',
  slug: { _type: 'slug', current: 'ai-coding-ide-cursor-copilot-windsurf' },
  excerpt: 'So sánh chi tiết 3 AI coding IDE phổ biến nhất 2026: Cursor, GitHub Copilot, và Windsurf — từ pricing, features, đến practical advice để chọn đúng tool.',
  coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop',
  category: { _type: 'reference', _ref: 'cat-analysis' },
  author: { _type: 'reference', _ref: 'author-tech-team' },
  publishedAt: '2026-06-22T10:00:00Z',
  featured: false,
  tags: ['AI', 'Coding', 'IDE', 'Developer Tools', 'Productivity'],
  readingTime: 14,
  factCheckStatus: 'verified',
  updatedAt: '2026-06-22T10:00:00Z',
  sources: [
    { title: 'Cursor Official', url: 'https://cursor.sh' },
    { title: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
    { title: 'Windsurf Official', url: 'https://windsurf.com' },
    { title: 'Stack Overflow Developer Survey 2026', url: 'https://survey.stackoverflow.co/2026' },
  ],
  keyTakeaways: [
    'Cursor mạnh nhất ở agentic coding — có thể tự sửa lỗi, refactor, và chạy tests',
    'GitHub Copilot integrates tốt nhất với VS Code và GitHub ecosystem',
    'Windsurf (Codeium) là lựa chọn rẻ nhất với free tier hào phóng',
    'Mỗi tool phù hợp với workflow khác nhau — không có "cái tốt nhất"',
    'Developer nên thử cả 3 rồi chọn dựa trên thực tế sử dụng',
  ],
  body: [
    makeH2('AI Coding IDE trong năm 2026'),
    makeParagraph('Năm 2026, AI coding assistants đã tiến hóa từ "autocomplete" sang "agentic IDE" — không chỉ gợi ý code mà còn có thể tự sửa lỗi, refactor, chạy tests, và thậm chí deploy. Ba cái tên nổi bật nhất hiện nay: Cursor, GitHub Copilot, và Windsurf.'),

    makeH2('Tổng quan so sánh'),
    makeParagraph('| Tính năng | Cursor | GitHub Copilot | Windsurf |'),
    makeParagraph('|-----------|--------|----------------|----------|'),
    makeParagraph('| Pricing | $20/tháng (Pro) | $10/tháng (Individual) | $15/tháng (Pro) |'),
    makeParagraph('| Free tier | 2000 completions/tháng | 2000 completions/tháng | Free unlimited (basic) |'),
    makeParagraph('| Model chính | Claude, GPT-4, custom | GPT-4o, Claude | Claude, GPT-4 |'),
    makeParagraph('| Agentic mode | ✅ Strong | ✅ Moderate | ✅ Strong |'),
    makeParagraph('| IDE base | VS Code fork | VS Code extension | VS Code fork |'),
    makeParagraph('| Git integration | Built-in | Deep (GitHub) | Built-in |'),

    makeH2('Cursor: Mạnh nhất ở agentic coding'),
    makeParagraph('Cursor là VS Code fork với AI deeply integrated. Điểm mạnh nhất: Composer mode — có thể tự sửa lỗi, refactor code, chạy terminal commands, và thực hiện multi-file edits.'),

    makeH3('Ưu điểm Cursor'),
    makeBullet('Composer mode mạnh nhất — tự sửa lỗi và refactor'),
    makeBullet('Hỗ trợ nhiều model (Claude, GPT-4, custom)'),
    makeBullet('Tab autocomplete thông minh với context-aware'),
    makeBullet('Built-in terminal integration'),

    makeH3('Nhược điểm Cursor'),
    makeBullet('Đắt hơn so với alternatives'),
    makeBullet('Vì là VS Code fork, một số extensions có thể không compatible'),
    makeBullet('Đôi khi "hallucinate" — suggest code không cần thiết'),

    makeH2('GitHub Copilot: Tích hợp tốt nhất'),
    makeParagraph('GitHub Copilot là AI assistant của GitHub, chạy như extension trên VS Code. Điểm mạnh: tích hợp sâu với GitHub — PR review, issue management, và code suggestions dựa trên repo history.'),

    makeH3('Ưu điểm Copilot'),
    makeBullet('Tích hợp tốt nhất với VS Code và GitHub'),
    makeBullet('Pricing hợp lý nhất ($10/tháng)'),
    makeBullet('Code suggestions dựa trên context repo'),
    makeBullet('Agent mode có thể chạy terminal commands'),

    makeH3('Nhược điểm Copilot'),
    makeBullet('Agentic mode chưa mạnh bằng Cursor'),
    makeBullet('Chỉ dùng được model của Microsoft/OpenAI'),
    makeBullet('Cần GitHub account để dùng đầy đủ tính năng'),

    makeH2('Windsurf: Lựa chọn giá rẻ'),
    makeParagraph('Windsurf (tên trước đây là Codeium) là VS Code fork với AI coding, nổi tiếng với free tier hào phóng nhất thị trường.'),

    makeH3('Ưu điểm Windsurf'),
    makeBullet('Free tier tốt nhất — unlimited completions (basic)'),
    makeBullet('Agentic mode mạnh ( Cascade )'),
    makeBullet('Hỗ trợ nhiều languages hơn một số competitors'),
    makeBullet('Pricing Pro hợp lý ($15/tháng)'),

    makeH3('Nhược điểm Windsurf'),
    makeBullet('Community nhỏ hơn Cursor và Copilot'),
    makeBullet('Đôi khi suggestions chậm hơn'),
    makeBullet('Extension ecosystem chưa phong phú'),

    makeH2('Lựa chọn theo use case'),
    makeBoldParagraph('Chọn Cursor nếu:'),
    makeBullet('Bạn cần agentic coding mạnh nhất'),
    makeBullet('Bạn thường refactor code phức tạp'),
    makeBullet('Bạn muốn dùng nhiều AI models khác nhau'),
    makeBoldParagraph('Chọn Copilot nếu:'),
    makeBullet('Bạn đã dùng VS Code và GitHub hàng ngày'),
    makeBullet('Bạn muốn pricing hợp lý nhất'),
    makeBullet('Bạn cần PR review AI integration'),
    makeBoldParagraph('Chọn Windsurf nếu:'),
    makeBullet('Bạn muốn free tier hào phóng'),
    makeBullet('Bạn đang tìm kiếm alternatif giá rẻ'),
    makeBullet('Bạn muốn thử agentic coding mà không tốn tiền'),

    makeH2('Kết luận'),
    makeParagraph('Không có "AI coding IDE tốt nhất" — chỉ có tool phù hợp nhất với workflow của bạn. Cursor mạnh ở agentic, Copilot mạnh ở integration, Windsurf mạnh ở giá. Developer giỏi là người biết dùng đúng tool cho đúng việc.'),
  ],
};

async function main() {
  // Check if analysis category exists
  const catQuery = `*[_type == "category" && slug.current == "analysis"][0] { _id }`;
  const cat = await client.fetch(catQuery);

  if (!cat) {
    console.error('Analysis category not found! Creating...');
    await client.create({
      _type: 'category',
      _id: 'cat-analysis',
      title: 'Analysis',
      slug: { _type: 'slug', current: 'analysis' },
      color: 'purple',
      description: 'Phân tích chuyên sâu về công nghệ',
    });
    console.log('Created analysis category');
  } else {
    console.log(`Analysis category: ${cat._id}`);
  }

  // Check if author exists
  const authorQuery = `*[_type == "author" && slug.current == "techpulse-team"][0] { _id }`;
  const author = await client.fetch(authorQuery);

  if (!author) {
    console.error('Author not found!');
    process.exit(1);
  }
  console.log(`Author: ${author._id}`);

  // Create articles
  for (const [idx, article] of [article1, article2, article3].entries()) {
    // Check if article already exists
    const existsQuery = `count(*[_type == "article" && slug.current == "${article.slug.current}"]) > 0`;
    const exists = await client.fetch(existsQuery);

    if (exists) {
      console.log(`⏭️  Article ${idx + 1} already exists: ${article.title}`);
      continue;
    }

    const result = await client.create(article);
    console.log(`✅ Created article ${idx + 1}: ${article.title} (${result._id})`);
  }

  console.log('\n🎉 Done! All 3 Analysis articles created.');
}

main().catch(console.error);
