import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản Sử dụng",
  description: "Điều khoản sử dụng website TechPulse — quy tắc và điều kiện khi truy cập nội dung.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-[2.5rem] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
        Điều khoản Sử dụng
      </h1>
      <p className="text-sm text-[var(--text-muted)] mb-10">
        Cập nhật lần cuối: 19/06/2026
      </p>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">1. Chấp nhận điều khoản</h2>
          <p>
            Bằng việc truy cập TechPulse, bạn đồng ý với các điều khoản sử dụng được nêu dưới đây.
            Nếu không đồng ý, vui lòng không sử dụng website.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">2. Nội dung</h2>
          <p>
            Mọi nội dung trên TechPulse chỉ mang tính chất tham khảo và giáo dục.
            Chúng tôi không chịu trách nhiệm về quyết định đầu tư, mua sắm hay hành động dựa trên thông tin từ website.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">3. Bản quyền</h2>
          <p>
            Tất cả nội dung trên TechPulse (bài viết, hình ảnh, thiết kế) thuộc bản quyền của TechPulse.
            Bạn được phép chia sẻ liên kết đến bài viết, nhưng không được sao chép nội dung mà không có sự cho phép.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">4. Liên kết bên ngoài</h2>
          <p>
            TechPulse có thể chứa liên kết đến website bên thứ ba. Chúng tôi không kiểm soát và không chịu trách nhiệm
            về nội dung hoặc chính sách bảo mật của các website đó.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">5. Thay đổi điều khoản</h2>
          <p>
            TechPulse có quyền cập nhật điều khoản sử dụng bất kỳ lúc nào.
            Việc tiếp tục sử dụng website sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">6. Liên hệ</h2>
          <p>
            Nếu có câu hỏi về điều khoản sử dụng, vui lòng liên hệ qua email:{" "}
            <a href="mailto:contact@techpulse.vn" className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline">
              contact@techpulse.vn
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
