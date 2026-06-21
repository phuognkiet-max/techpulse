// TechPulse — Fix factual errors in article body content
// Fixes: iPhone 17 Pro Max (titanium → aluminum), Apple M5 Ultra (unreleased → rumored)
// Usage: node scripts/fix-body-errors.js

const { createClient } = require('@sanity/client');

const SANITY_TOKEN = process.env.SANITY_TOKEN || 'skODzLOUQgLFqNq9GEMQQyCtZbipjwgn6wkjwDk8wWyQVJkEN34m6bnMm7mq3dmiFxDIrlfkpFYHeeYuOYwhwhHqesit4GTioywNwnANkPC19Zn4aWKapCkrluPg5qZxrdkCeK99baOfIPpN6EUOLJDfj2izr5ByEqwzVjLf8DBOpqC0vd0g';

const client = createClient({
  projectId: '5up9e69p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_TOKEN,
});

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

function key() {
  return Math.random().toString(36).slice(2);
}

// ─── iPhone 17 Pro Max — corrected body ───
const iphoneBody = `## Tổng quan iPhone 17 Pro Max

iPhone 17 Pro Max là phiên bản lớn nhất và mạnh nhất trong dòng iPhone 17, được ra mắt tại sự kiện "Awe Dropping" của Apple vào tháng 9/2025. Đây là lần đầu tiên Apple sử dụng thiết kế **aluminum unibody** cho dòng iPhone Pro — một sự thay đổi lớn so với khung titanium trên iPhone 16 Pro Max.

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

Đây là thay đổi thiết kế lớn nhất của iPhone 17 Pro Max. Thay vì khung titanium như thế hệ trước, Apple chuyển sang **aluminum unibody** — một khối nhôm nguyên khối.

Lợi điểm:
- **Mỏng hơn và nhẹ hơn** so với titanium unibody
- **Tản nhiệt tốt hơn** nhờ aluminum conducting heat hiệu quả hơn
- **Chịu lực tốt hơn** với thiết kế unibody liền mạch

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

Tuy nhiên, mức giá $1,199 vẫn là rào cản lớn — iPhone 17 thường ($799) có thể đủ tốt cho đa số người dùng.

---

*Lưu ý: Bài viết này đã được cập nhật để sửa lỗi "thiết kế titanium" thành "aluminum unibody" theo thông số chính thức từ Apple (Apple Support, September 2025).*`;

// ─── Apple M5 Ultra — corrected to reflect unreleased status ───
const m5UltraBody = `## Apple M5 Ultra: Tin đồn và dự kiến — CHƯA RA MẮT

**Lưu ý quan trọng tính đến tháng 6/2026**: Apple M5 Ultra **chưa được ra mắt chính thức**. Bài viết này tổng hợp các tin đồn và dự kiến từ leak industry. Thông số cụ thể có thể thay đổi khi Apple công bố chính thức.

## Hiện tại: M5 Pro và M5 Max đã ra mắt

Tháng 3/2026, Apple đã công bố **M5 Pro** và **M5 Max** — hai chip đầu tiên trong dòng M5:

- **Apple Fusion Architecture** mới — lần đầu Apple tự thiết kế GPU architecture
- GPU cores tích hợp **Neural Accelerators** — 4x peak GPU compute cho AI so với M4
- **Ray tracing** cải thiện 35% so với M4 Pro/Max
- Higher unified memory bandwidth cho AI workloads

M5 Pro và M5 Max đang có trên MacBook Pro 2026.

## M5 Ultra: Dự kiến ra mắt cuối 2026

Theo MacWorld, MacRumors, và các nguồn tin industry:

- **Thời gian dự kiến**: Tháng 10/2026 (bị delay từ WWDC do thiếu hụt chip nhớ toàn cầu)
- **Nền tảng**: Mac Studio mới (thay thế M4 Max/M3 Ultra hiện tại)
- **Tính năng kỳ vọng**: Kết hợp hai die M5 Max — similar pattern với M2 Ultra, M3 Ultra, M4 Ultra

## Thông số từ leak (CHƯA XÁC NHẬN)

Các leak industry dự đoán M5 Ultra có thể có:

- **CPU cores**: 24 performance + 8 efficiency cores (32 total) — dự kiến, chưa confirm
- **GPU cores**: 80 cores — dựa trên pattern dual-die (2x 40-core M5 Max GPU)
- **Transistors**: ~240 billion — ước tính từ dual-die design
- **Process**: 3nm enhanced (NOT 2nm như một số nguồn tin đồn — Apple vẫn dùng TSMC N3 family)
- **Unified Memory**: Lên đến 512GB cho workstation configs

**Tất cả các thông số trên đều là DỰ KIẾN từ leak, KHÔNG PHẢI thông số chính thức từ Apple.**

## Tại sao M5 Ultra quan trọng

Nếu các leak là chính xác, M5 Ultra sẽ là:

- **Chip ARM mạnh nhất** cho workstation — thách thức Intel Xeon và AMD Threadripper
- **AI workstation chip** — với Neural Accelerators tích hợp, M5 Ultra có thể chạy LLMs locally với hàng trăm GB unified memory
- **Video editing powerhouse** — 80 GPU cores với ray tracing cho 3D rendering và video production

## So sánh với đối thủ (DỰ KIẾN)

Nếu M5 Ultra ra mắt đúng specs leak:

- **vs Intel Xeon W9-3595X**: M5 Ultra có thể vượt ở power efficiency nhưng thua ở raw multi-threaded workloads
- **vs AMD Threadripper 9000**: Cạnh tranh về core count, M5 Ultra thắng ở power efficiency và AI compute
- **vs M4 Ultra**: Khoảng 40-60% cải thiện dự kiến — nhưng đây là so sánh với chính Apple, không phải đối thủ bên ngoài

## Timeline dự kiến

- **Tháng 3/2026**: M5 Pro/Max ra mắt ✅
- **Tháng 6/2026 (WWDC)**: M5 Ultra kỳ vọng nhưng BỊ DELAY
- **Tháng 10/2026**: Dự kiến M5 Ultra ra mắt cùng Mac Studio mới
- **Tháng 1-3/2027**: Nếu delay thêm, có thể dời sang đầu 2027

## Kết luận

M5 Ultra là chip được kỳ vọng rất lớn trong cộng đồng creative professionals và AI researchers. Tuy nhiên, tính đến tháng 6/2026, đây chỉ là dự kiến — Apple chưa công bố bất kỳ thông số chính thức nào.

Nếu bạn đang cần workstation cho AI hoặc video editing ngay bây giờ, M5 Pro/Max trên MacBook Pro 2026 là lựa chọn thực tế. Nếu có thể chờ, tháng 10/2026 có thể là lúc M5 Ultra ra mắt.

---

*Lưu ý: Bài viết này đã được cập nhật để phản ánh rằng Apple M5 Ultra CHƯA RA MẮT. Các thông số trong bài là dự kiến từ leak industry, không phải thông số chính thức từ Apple. Last updated: ${new Date().toLocaleDateString('vi-VN')}.*`;

async function main() {
  console.log('=== Fix Article Body Errors ===');

  // Fix iPhone 17 Pro Max
  try {
    const blocks = textToBlocks(iphoneBody);
    await client.patch('article-2').set({
      body: blocks,
      updatedAt: new Date().toISOString(),
    }).commit();
    console.log('✅ Fixed: iPhone 17 Pro Max (titanium → aluminum unibody)');
  } catch (err) {
    console.error('❌ Failed iPhone 17 Pro Max:', err.message);
  }

  // Fix Apple M5 Ultra
  try {
    const blocks = textToBlocks(m5UltraBody);
    await client.patch('article-6').set({
      body: blocks,
      excerpt: 'Apple M5 Ultra CHƯA RA MẮT tính đến tháng 6/2026. Bài viết tổng hợp tin đồn và dự kiến từ leak industry — M5 Pro/Max đã ra mắt tháng 3/2026, M5 Ultra dự kiến tháng 10/2026.',
      updatedAt: new Date().toISOString(),
    }).commit();
    console.log('✅ Fixed: Apple M5 Ultra (unreleased → rumored status)');
  } catch (err) {
    console.error('❌ Failed Apple M5 Ultra:', err.message);
  }

  console.log('=== Done ===');
}

main().catch(console.error);
