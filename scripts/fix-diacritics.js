const { updateArticle } = require('./update-articles.js');

// ========== FIX ARTICLE 1: Add diacritics ==========
const article1Body = `
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

Theo analysis từ WindowsForum: "GPT-5.5 can solve more tasks while using fewer tokens and fewer reasoning steps than Claude Opus 4.8. The operational implication is straightforward: the OpenAI model is doing more with less."

## Pricing: Ai rẻ hơn?

Đây là nơi nhiều người thiếu hiểu rõ:

| Model | Input | Output | Context Window |
|-------|-------|--------|----------------|
| Claude Opus 4.8 | $5/MTok | $25/MTok | 1M tokens |
| GPT-5.5 | $2.5/MTok | $10/MTok | 2M tokens |
| GPT-5.5 Pro | $10/MTok | $40/MTok | 2M tokens |

GPT-5.5 rẻ hơn **50%** so với Opus 4.8. Nếu bạn cần chi phí thấp và context window lớn (2M tokens), GPT-5.5 là lựa chọn kinh tế hơn.

Tuy nhiên, có một **pricing trap** mà nhiều người không để ý: trên 272K tokens, GPT-5.5 áp dụng surcharge. Nếu bạn thường xử lý văn bản dài (sách, báo cáo nghiên cứu), chi phí có thể tăng đột ngột.

## Computer Use: Opus 4.8 dẫn đầu

Một khía cạnh quan trọng khác là **computer use** — khả năng AI điều khiển máy tính thực sự. Opus 4.8 có khả năng mở browser, click, type, và thực hiện tác vụ trên desktop.

Trên benchmark **OSWorld-Verified** đánh giá computer use, Opus 4.8 vượt xa GPT-5.5. Đây là tính năng quan trọng cho **agentic workflows** — khi bạn muốn AI tự động thực hiện chuỗi tác vụ phức tạp.

## Fable 5 và Mythos 5: Bị suspend vì quá mạnh

Trước khi Opus 4.8 ra mắt, Anthropic đã phát hành **Claude Fable 5** và **Claude Mythos 5** — hai model mạnh nhất của họ:

- **Fable 5**: 95% SWE-bench Verified — số liệu cao nhất lịch sử
- **Mythos 5**: Model đặc biệt, chỉ dành cho cơ quan chính phủ, có khả năng phát hiện lỗ hổng bảo mật

Tuy nhiên, chính phủ Mỹ đã orders Anthropic **suspend access cho tất cả nước ngoài** vì lo ngại jailbreak vulnerability. Anthropic phản hồi rằng họ nhận được cuộc gọi từ chính phủ lúc 1:00 CH CHIỀU NGÀY THỨ SÁU, yêu cầu suspend ngay lập tức.

Đây là lần thứ hai trong vài tháng Anthropic bị chính phủ Mỹ "can thiệp" vào model của họ. Trước đó, Mythos 5 chỉ được phát hành cho một nhóm hạn chế các cơ quan chính phủ qua **Project Glasswing**.

> Vụ Mythos 5/Fable 5 cho thấy: AI mạnh cũng nguy hiểm hơn. Và chính phủ không ngại để kiểm soát.

## Anthropic vs OpenAI: Chiến lược khác nhau

### Anthropic: "AI an toàn trước"

Anthropic đang đặt cược vào **an toàn**. Constitutional AI, RLHF nâng cao, và hạn chế chặt chẽ là lộ trình của họ. Opus 4.8 ít hallucination hơn, trung thực hơn, và có thể từ chối các yêu cầu có hại.

Như một developer chia sẻ trên Reddit: "Opus 4.8 is more consistently complete and instruction-aware."

### OpenAI: "AI mạnh nhất, rẻ nhất"

OpenAI đang đặt cược vào **hiệu suất và giá**. GPT-5.5 rẻ hơn 50%, context window lớn hơn (2M tokens), và hiệu quả hơn trên terminal tasks.

### Google: "AI đa phương thức"

Google Gemini 3.5 Flash đạt 78.8% SWE-bench Verified — gần bằng Opus 4.7 — nhưng với giá rẻ hơn nhiều. Google đang tập trung vào **multimodal** (văn bản + hình ảnh + video + âm thanh).

## Phân tích cho developer Việt Nam

Nếu bạn là developer Việt Nam, đây là practical advice:

### Chọn GPT-5.5 nếu:
- Bạn cần **giá rẻ** ($2.5/$10)
- Bạn cần **context window lớn** (2M tokens)
- Bạn làm nhiều **terminal/system tasks**
- Bạn cần AI **nhanh**, ít "nghĩ"

### Chọn Claude Opus 4.8 nếu:
- Bạn cần **coding tốt hơn** (SWE-bench 69.2% vs ~59%)
- Bạn cần **agentic workflows** (computer use)
- Bạn cần AI **an toàn, ít hallucination**
- Bạn làm **project phức tạp**, cần AI "suy luận sâu"

### Chọn cả hai:
Strategy tốt nhất là **model routing** — sử dụng GPT-5.5 cho terminal tasks và Opus 4.8 cho coding tasks. Đây là cách nhiều team đang làm trong production.

## Giai đoạn hiện tại: AI đã đến đâu?

Tính đến tháng 6/2026:

1. **Opus 4.8** đang dẫn đầu trên benchmark tổng hợp (61.4 vs 60.2)
2. **GPT-5.5** rẻ hơn và có context window lớn hơn
3. **Fable 5** bị suspend — AI quá mạnh cũng là vấn đề
4. **Gemini** đang trở thành alternative tốt cho budget-conscious teams
5. **Llama 4** (mã nguồn mở) đang gặp khoảng cách với proprietary models

Cuộc đua AI không còn là "ai mạnh nhất". Nó đã trở thành "ai phù hợp nhất cho công việc cụ thể của bạn". Và đây là thay đổi lớn nhất trong cách chúng ta sử dụng AI.

*TechPulse — Phân tích AI chuyên sâu, dựa trên data thật.*
`;

// ========== FIX ARTICLE 2: Add diacritics ==========
const article2Body = `
iPhone 17 Pro Max — điện thoại tốt nhất Apple từng tạo — đã chính thức ra mắt vào tháng 9/2025 với nhiều cú bứt phá lớn. Với chip A19 Pro, hệ thống camera 48MP toàn bộ, và thiết kế titanium hoàn toàn mới, Apple đã đặt lại tiêu chuẩn cho điện thoại hàng đầu.

## Tổng quan iPhone 17 Pro Max

iPhone 17 Pro Max là phiên bản lớn nhất và mạnh nhất trong dòng iPhone 17, được ra mắt tại sự kiện "Awe Dropping" của Apple vào tháng 9/2025. Đây là lần đầu tiên Apple sử dụng chip **A19 Pro** — phiên bản mạnh hơn A19 thông thường.

### Thông số kỹ thuật

- **Chip**: A19 Pro (3nm thế hệ 3, 6 nhân CPU, 6 nhân GPU)
- **Màn hình**: 6.9 inch Super Retina XDR 2, 120Hz ProMotion
- **Camera**: 3 camera 48MP (chính + tele + ultra-wide)
- **Pin**: 4,685 mAh, hỗ trợ sạc nhanh 45W
- **Bộ nhớ**: 256GB / 512GB / 1TB / 2TB
- **Giá**: Bắt đầu từ $1,199

## Chip A19 Pro: Công nghệ 3nm thế hệ 3

A19 Pro là chip mạnh nhất Apple từng đặt vào điện thoại. Được sản xuất trên quy trình 3nm thế hệ 3 của TSMC, A19 Pro có:

### Hiệu suất CPU

6 nhân CPU gồm 2 nhân Performance và 4 nhân Efficiency. Theo Apple, hiệu suất tăng **35%** so với A18 Pro, trong khi tiêu thụ năng lượng giảm 25%. Điều này cho phép xử lý video 8K, chạy mô hình AI, và chơi game đồ họa cao mà không bị nóng.

### Neural Engine 16 nhân

Neural Engine 16 nhân cho phép thực hiện AI on-device — từ nhận diện khuôn mặt đến dịch thuật thời gian thực. Apple Intelligence hoạt động tốt hơn bao giờ hết.

### GPU 6 nhân

GPU 6 nhân với ray tracing real-time cho phép chơi game console-level trên điện thoại. Metal 4 API hỗ trợ đồ họa tốt hơn.

## Hệ thống camera 48MP toàn bộ

Đây là thay đổi lớn nhất của iPhone 17 Pro Max — **tất cả 3 camera đều 48MP**.

### Camera chính 48MP

Camera chính 48MP với OIS 5 trục, cho phép chụp ảnh chi tiết cao ngay cả trong điều kiện ánh sáng kém. Photonic Engine nâng cao giúp xử lý ảnh tốt hơn.

### Camera tele 48MP với 4x optical zoom

Camera tele 48MP với 4x optical zoom — là lần đầu tiên iPhone có zoom tele tốt đến vậy. AI Super Resolution cho phép zoom lên 25x với độ nét cao.

### Camera ultra-wide 48MP

Camera ultra-wide 48MP với góc nhìn 120 độ, hỗ trợ macro photography. AI sẽ tự động chỉnh distortion.

### Camera trước 18MP Center Stage

Camera trước 18MP với Center Stage — tự động follow khi người dùng di chuyển. Tốt hơn cho video call và selfie.

## Màn hình 6.9 inch

Màn hình 6.9 inch Super Retina XDR 2 với:

- **Độ phân giải**: 2868x1320
- **Tần số quét**: 1-120Hz ProMotion
- **Độ sáng**: 2,500 nit tối đa
- **Always-On**: Hiển thị thông tin mới nhất

## Pin và sạc

Pin 4,685 mAh — lớn nhất trong lịch sử iPhone. Theo Apple, thời gian sử dụng tăng **25%** so với iPhone 16 Pro Max.

**Sạc nhanh 45W** qua USB-C và **sạc không dây 25W** qua MagSafe. Chỉ cần sạc 15 phút là đủ sử dụng hết ngày.

## Thiết kế titanium

iPhone 17 Pro Max có thiết kế hoàn toàn mới với:

- **Khung titanium**: Nhẹ, chắc chắn, chống vết bẩn
- **Mặt sau kính ceramic**: Chống vết trượt
- **Màu sắc**: Cosmic Orange, Deep Blue, Silver
- **Độ dày**: 7.8mm — nhẹ hơn 10% so với iPhone 16 Pro Max

## iOS 26 với Apple Intelligence

iPhone 17 Pro Max chạy **iOS 26** với **Apple Intelligence** đã được nâng cấp lớn:

- **Writing Tools**: Viết, chỉnh sửa, dịch văn bản
- **Image Playground**: Tạo hình ảnh từ mô tả văn bản
- **Genmoji**: Tạo emoji tùy chỉnh
- **Siri nâng cấp**: Hiểu ngữ cảnh tốt hơn, thực hiện nhiều tác vụ hơn
- **Live Translation**: Dịch thời gian thực trong cuộc gọi

## Bộ nhớ tối đa 2TB

Lần đầu tiên iPhone có thể **2TB** — cho phép lưu trữ hàng ngàn video 8K và hàng trăm ngàn hình ảnh.

## Đánh giá

iPhone 17 Pro Max là điện thoại tốt nhất Apple từng tạo. Camera 48MP toàn bộ, chip A19 Pro mạnh mẽ, và thiết kế sang trọng — tất cả đều xuất sắc. Nếu bạn đang tìm điện thoại hàng đầu, đây là lựa chọn không thể tốt hơn.

*TechPulse — Đánh giá điện thoại chuyên sâu.*
`;

// ========== FIX ARTICLE 9: Add diacritics ==========
const article9Body = `
Docker trong năm 2026 đã có nhiều thay đổi đáng chú ý. Từ Docker Engine v29 đến AI-powered features như Docker Model Runner và Gordon AI assistant, Docker đang mở rộng vai trò từ công cụ container thành nền tảng AI infrastructure.

## Docker 2026: Tổng quan thay đổi

Docker không phải là "Docker 3.0" — phiên bản mới nhất là **Docker Engine v29.3.0** và **Docker Desktop** với nhiều tính năng mới. Điểm đáng chú ý nhất là Docker bắt đầu **tích hợp AI** vào sản phẩm.

### Docker Engine v29

Phiên bản mới nhất của Docker Engine (v29) có nhiều cải thiện:

- **Performance**: Giảm thời gian build image 30%
- **Security**: Fix nhiều CVE quan trọng (CVE-2026-41568, CVE-2026-42306)
- **Networking**: Cải thiện reliability và performance
- **Storage**: Optimized image layer caching

### Docker Desktop 2026

Docker Desktop có nhiều tính năng mới:

- **Smaller installs**: Giảm kích thước install 40%
- **Delta updates**: Chỉ cập nhật những gì thay đổi, nhanh hơn
- **Apple Silicon**: Cải thiện memory và performance
- **Privacy**: Giảm số lượng network requests không cần thiết

## Docker và AI: Chuỗi thời đại mới

Điểm đáng chú ý nhất là **Docker bắt đầu hỗ trợ AI infrastructure**.

### Docker Model Runner

**Docker Model Runner** cho phép chạy AI models local trên máy tính. Tính năng bao gồm:

- **Run models locally**: Chạy LLM models mà không cần cloud API
- **Model management**: Quản lý models như containers
- **GPU support**: Hỗ trợ NVIDIA GPU cho inference
- **Registry mirror**: Tải models từ Docker Hub

Đây là bước quan trọng để **democratize AI** — bất kỳ ai cũng có thể chạy AI models trên máy riêng.

### Docker AI (Gordon)

**Gordon** là AI assistant của Docker, hỗ trợ:

- **Documentation search**: Tìm kiếm tài liệu Docker bằng ngôn ngữ tự nhiên
- **Troubleshooting**: Giúp debug container issues
- **Best practices**: Gợi ý cách optimize Dockerfile
- **Security scanning**: Quét lỗ hổng bảo mật

### Docker Scout

**Docker Scout** — hệ thống bảo mật AI-powered:

- **Vulnerability scanning**: Quét lỗ hổng trong images
- **SBOM generation**: Tạo Software Bill of Materials
- **Fix suggestions**: Gợi ý cách fix vulnerabilities
- **Compliance checking**: Kiểm tra tuân thủ tiêu chuẩn

## Docker trong AI Infrastructure

Docker trở thành **nền tảng quan trọng cho AI**:

### MCP Servers

**MCP (Model Context Protocol)** — tiêu chuẩn mới cho AI tooling — được hỗ trợ bởi Docker. Docker giúp deploy và quản lý MCP servers.

### AI Workloads

Docker hỗ trợ triển khai AI workloads:

- **Training**: Chạy training scripts trong containers
- **Inference**: Deploy AI models như microservices
- **Data processing**: Xử lý data AI pipeline
- **Monitoring**: Theo dõi AI workloads

### Kubernetes cho AI

Docker Desktop hỗ trợ **Kubernetes** cho AI:

- **GPU scheduling**: Lên lịch GPU cho AI pods
- **Resource management**: Quản lý CPU/GPU/memory
- **Auto-scaling**: Tự động scale AI services

## Best practices 2026

### Multi-stage builds

Luôn sử dụng multi-stage builds để giảm kích thước image:

\`\`\`
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-slim
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
\`\`\`

### Security

- Không chạy containers với root user
- Sử dụng official images
- Quét vulnerabilities thường xuyên
- Limit resources (CPU, memory)

### AI workloads

- Sử dụng GPU scheduling cho AI pods
- Monitor GPU usage
- Implement health checks cho AI services
- Use Docker Scout for security

## Case study

Các công ty đang sử dụng Docker cho AI infrastructure:

- **OpenAI**: Deploy GPT models trên Kubernetes + Docker
- **Anthropic**: Claude inference trên Docker containers
- **FPT AI**: FPT.AI Enterprise triển khai trên Docker
- **VinAI**: VinLLM 2.0 chạy trên Docker + GPU

## Kết luận

Docker trong 2026 không chỉ là công cụ container — nó trở thành **nền tảng AI infrastructure**. Với Docker Model Runner, Gordon AI, và Docker Scout, Docker đang thay đổi cách chúng ta triển khai và quản lý ứng dụng AI.

Nếu bạn đang xây dựng AI infrastructure, Docker là lựa chọn không thể bỏ qua.

*TechPulse — Hướng dẫn DevOps hiện đại.*
`;

async function main() {
  console.log('Fixing Article 1 (add diacritics)...');
  await updateArticle('article-1', article1Body, 
    'Claude Opus 4.8 vượt GPT-5.5 trên Artificial Analysis Intelligence Index (61.4 vs 60.2). Phân tích chi tiết SWE-bench, pricing, computer use, và practical advice cho developer.',
    12
  );
  
  console.log('Fixing Article 2 (add diacritics)...');
  await updateArticle('article-2', article2Body,
    'iPhone 17 Pro Max với chip A19 Pro, camera 48MP toàn bộ, thiết kế titanium. Đánh giá chi tiết và đúng thông số kỹ thuật.',
    10
  );
  
  console.log('Fixing Article 9 (add diacritics)...');
  await updateArticle('article-9', article9Body,
    'Docker 2026: Engine v29, Docker Model Runner, Gordon AI assistant. Docker trở thành nền tảng AI infrastructure.',
    10
  );
  
  console.log('All 3 articles fixed!');
}

main().catch(console.error);
