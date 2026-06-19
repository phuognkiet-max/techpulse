import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách Bảo mật",
  description: "Chính sách bảo mật thông tin của TechPulse — cam kết bảo vệ dữ liệu cá nhân người dùng.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-[2.5rem] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
        Chính sách Bảo mật
      </h1>
      <p className="text-sm text-[var(--text-muted)] mb-10">
        Cập nhật lần cuối: 19/06/2026
      </p>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">1. Thu thập thông tin</h2>
          <p>
            TechPulse thu thập thông tin cá nhân khi bạn đăng ký nhận bản tin newsletter, bao gồm địa chỉ email.
            Chúng tôi không thu thập thông tin nhạy cảm như số CMND, thông tin tài khoản ngân hàng hay dữ liệu y tế.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">2. Sử dụng thông tin</h2>
          <p>Thông tin được thu thập chỉ được sử dụng cho các mục đích:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Gửi bản tin công nghệ hàng tuần qua email</li>
            <li>Cải thiện trải nghiệm đọc trên TechPulse</li>
            <li>Phân tích lưu lượng truy cập ẩn danh</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">3. Cookie</h2>
          <p>
            TechPulse sử dụng cookie cần thiết để vận hành website và Google Analytics để phân tích lưu lượng truy cập ẩn danh.
            Bạn có thể tắt cookie trong cài đặt trình duyệt.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">4. Chia sẻ thông tin</h2>
          <p>
            Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba.
            Thông tin chỉ được chia sẻ khi có yêu cầu từ cơ quan pháp luật.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">5. Hủy đăng ký</h2>
          <p>
            Bạn có thể hủy đăng ký nhận bản tin bất kỳ lúc nào bằng cách nhấp vào liên kết &quot;Hủy đăng ký&quot; trong mỗi email,
            hoặc liên hệ trực tiếp với chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold text-[var(--text-primary)] mb-3">6. Liên hệ</h2>
          <p>
            Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ qua email:{" "}
            <a href="mailto:contact@techpulse.vn" className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline">
              contact@techpulse.vn
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
