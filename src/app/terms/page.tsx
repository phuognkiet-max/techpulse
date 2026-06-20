import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản Sử dụng",
  description: "Điều khoản sử dụng trang web TechPulse — quy định khi truy cập và sử dụng nội dung trên TechPulse.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Điều khoản Sử dụng</h1>
      <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
        <p><em>Cập nhật lần cuối: 20/06/2026</em></p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">1. Chấp nhận Điều khoản</h2>
        <p>Bằng việc truy cập và sử dụng TechPulse, bạn chấp nhận các điều khoản sử dụng này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng trang web.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">2. Nội dung</h2>
        <p>Nội dung trên TechPulse được cung cấp cho mục đích thông tin và giáo dục. Chúng tôi không đảm bảo tính chính xác, đầy đủ hoặc cập nhật của mọi thông tin trên trang web.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">3. Bản quyền</h2>
        <p>Mọi nội dung trên TechPulse, bao gồm văn bản, hình ảnh, logo và thiết kế, được bảo vệ bởi luật bản quyền. Bạn không được sao chép, phân phối hoặc sửa đổi nội dung mà không có sự đồng ý bằng văn bản.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">4. Sử dụng Được phép</h2>
        <p>Bạn được phép:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Đọc và tham khảo nội dung cho mục đích cá nhân</li>
          <li>Chia sẻ liên kết đến các bài viết</li>
          <li>Trích dẫn với ghi nguồn đầy đủ</li>
        </ul>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">5. Giới hạn Trách nhiệm</h2>
        <p>TechPulse không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng nội dung trên trang web.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">6. Thay đổi Điều khoản</h2>
        <p>Chúng tôi có quyền thay đổi các điều khoản này bất kỳ lúc nào. Việc tiếp tục sử dụng trang web sau khi thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">7. Liên Hệ</h2>
        <p>Nếu bạn có câu hỏi về điều khoản sử dụng, vui lòng liên hệ qua trang <a href="/contact" className="text-[var(--accent)] underline">Liên hệ</a> của chúng tôi.</p>
      </div>
    </div>
  );
}
