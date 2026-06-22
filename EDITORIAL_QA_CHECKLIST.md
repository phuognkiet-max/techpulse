# EDITORIAL QA CHECKLIST — TechPulse

Mọi bài viết PHẢI pass toàn bộ checklist này trước khi publish. Không có ngoại lệ.

---

## Pre-Publish Checklist

### 1. Nguồn & Fact-Check

- [ ] **Không claim thông số nếu không có nguồn.** Nếu không chắc → ghi "chưa xác nhận" hoặc bỏ claim.
- [ ] **Claim kỹ thuật phải ưu tiên nguồn official** (Apple, Google, OpenAI, Anthropic, v.v.)
- [ ] **Benchmark/pricing phải có nguồn và ngày truy cập.** Ví dụ: "Theo OpenAI pricing (tháng 6/2026)".
- [ ] **Tin đồn phải gắn nhãn rõ.** Dùng "theo tin đồn", "chưa được xác nhận", "dự kiến".
- [ ] **So sánh model/sản phẩm phải rõ đối tượng.** Không nói "mạnh hơn" mà phải nói "mạnh hơn X" hoặc "mạnh hơn thế hệ trước".
- [ ] **Sources array phải có ít nhất 2-3 nguồn.** Mỗi nguồn có title và URL.

### 2. Typography & Format

- [ ] **Không có ký tự lạ/CJK.** Check regex: `[\u4e00-\u9fff]`
- [ ] **Không có markdown raw.** Check: `|---|`, `**text**` (nếu renders thô)
- [ ] **Không có list dính dòng.** Check: text chứa pattern `Bạn cần XBạn cần Y` (không có space/separator)
- [ ] **Markdown table phải render thành HTML table.** Check: không có `| cell | cell |` trong rendered output.
- [ ] **Bullet list phải render thành `<ul><li>`.** Check: không có text dính thành đoạn.

### 3. Content Quality

- [ ] **Title không clickbait quá mức.** Không dùng "phá vỡ mọi giới hạn", "thay đổi tất cả", v.v.
- [ ] **Excerpt rõ giá trị.** Độc giả biết được gì sau khi đọc excerpt.
- [ ] **Body ≥ 1000 từ.** Không viết filler.
- [ ] **Có kết luận thực dụng.** Ai nên quan tâm, khi nào nên dùng/mua/theo dõi.
- [ ] **Không có câu mơ hồ.** Mỗi claim phải rõ ràng, không thể hiểu sai.

### 4. Required Fields

Mỗi bài phải có:

- [ ] **title** — Chuyên nghiệp, ≤ 200 ký tự
- [ ] **slug** — SEO-friendly, lowercase, hyphens
- [ ] **excerpt** — ≤ 300 ký tự, rõ giá trị
- [ ] **body** — Portable Text array, ≥ 1000 từ
- [ ] **category** — Reference到category hợp lệ
- [ ] **author** — Reference到author hợp lệ
- [ ] **publishedAt** — ISO datetime
- [ ] **keyTakeaways** — 3-5 bullet points
- [ ] **sources** — ≥ 2 nguồn với title + URL
- [ ] **factCheckStatus** — "verified" | "unverified" | "disputed"
- [ ] **updatedAt** — ISO datetime, cập nhật khi sửa
- [ ] **seo.metaTitle** — ≤ 60 ký tự
- [ ] **seo.metaDescription** — ≤ 160 ký tự

### 5. Visual Check

- [ ] **Cover image** có URL hợp lệ, hiển thị đúng kích thước.
- [ ] **Category badge** hiển thị đúng màu.
- [ ] **Fact-check badge** hiển thị đúng trạng thái.
- [ ] **TOC** (Table of Contents) có heading links hoạt động.
- [ ] **Related articles** hiển thị bài liên quan.
- [ ] **Author bio** hiển thị đúng thông tin.
- [ ] **Share buttons** hoạt động (Facebook, X, Copy link).
- [ ] **Breadcrumb** hiển thị đúng đường dẫn.

### 6. SEO

- [ ] **JSON-LD Article** có đầy đủ fields.
- [ ] **OG tags** có title, description, image.
- [ ] **Twitter card** có summary_large_image.
- [ ] **Canonical URL** đúng.
- [ ] **Sitemap** include bài mới (kiểm tra /sitemap.ts).

### 7. Accessibility

- [ ] **Alt text** cho tất cả ảnh.
- [ ] **Heading hierarchy** đúng (h1 → h2 → h3, không skip).
- [ ] **Link text** có ý nghĩa (không dùng "click here").
- [ ] **Form labels** đúng (nếu có form).
- [ ] **Color contrast** đủ (text trên background).

---

## Post-Publish Verification

- [ ] **Live URL trả 200.**
- [ ] **Grep error strings** pass (xem production QA grep list).
- [ ] **Mobile responsive** — không horizontal scroll, tap targets ≥ 44px.
- [ ] **Table render** — markdown table → HTML table responsive.
- [ ] **List render** — bullet items riêng biệt.

---

## Error Strings to Grep

Trước khi publish, grep production HTML cho các chuỗi sau. Nếu tìm thấy → DỪNG publish:

```
[\u4e00-\u9fff]    # CJK characters
|---|               # Raw markdown table
Invalid Date        # Date formatting error
Nguon tin cong nghe # Untranslated footer
Cap nhat tin tuc    # Untranslated footer
✓                   # Checkmark character
```

Chuỗi cần check context (có thể đúng hoặc sai tùy bài):
```
$2.5                # Có thể là pricing sai
$10/MTok            # Có thể là pricing sai
2M tokens           # Có thể là context claim sai
nhôm titan          # Có thể là material claim sai
phá vỡ mọi giới hạn # Clickbait title
2nm                 # Có thể là process claim sai
```

---

## Version History

| Date | Change |
|------|--------|
| 2026-06-22 | Initial checklist created after polish round |
