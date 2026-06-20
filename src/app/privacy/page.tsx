import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách Bảo mật",
  description: "Chính sách bảo mật của TechPulse — cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Chính sách Bảo mật</h1>
      <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
        <p><em>Cập nhật lần cuối: 20/06/2026</em></p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">1. Thu thập Thông tin</h2>
        <p>Chúng tôi có thể thu thập thông tin cá nhân khi bạn đăng ký nhận bản tin, bao gồm địa chỉ email. Chúng tôi không thu thập thông tin nhạy cảm như mật mã, số CMND, hoặc thông tin tài chính.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">2. Sử dụng Thông tin</h2>
        <p>Thông tin cá nhân được sử dụng để:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Gửi bản tin tin tức công nghệ hàng tuần</li>
          <li>Cải thiện trải nghiệm người dùng trên trang web</li>
          <li>Phân tích lưu lượng truy cập và hành vi người dùng</li>
        </ul>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">3. Bảo mật Thông tin</h2>
        <p>Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">4. Cookie</h2>
        <p>TechPulse sử dụng cookie để cải thiện trải nghiệm người dùng và phân tích lưu lượng truy cập. Bạn có thể kiểm soát cookie thông qua cài đặt trình duyệt.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">5. Liên kết Bên thứ ba</h2>
        <p>Nội dung của TechPulse có thể chứa liên kết đến các trang web bên thứ ba. Chúng tôi không chịu trách nhiệm về chính sách bảo mật của các trang web đó.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">6. Hủy Đăng ký</h2>
        <p>Bạn có thể hủy đăng ký nhận bản tin bất kỳ lúc nào bằng cách nhấp vào liên kết hủy trong email hoặc liên hệ trực tiếp với chúng tôi.</p>

        <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-8">7. Liên Hệ</h2>
        <p>Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ qua trang <a href="/contact" className="text-[var(--accent)] underline">Liên hệ</a> của chúng tôi.</p>
      </div>
    </div>
  );
}
