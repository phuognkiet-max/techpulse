import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "TechPulse — Nguồn tin công nghệ đáng tin cậy, biên tập chuyên nghiệp.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Về <span className="gradient-text">TechPulse</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          TechPulse là nguồn tin công nghệ đáng tin cậy, mang đến những bài
          viết chất lượng cao về AI, Smartphone, Startup, Software và Hardware.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white text-2xl mb-4">
              🎯
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Sứ mệnh
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Democratize tech knowledge — giúp mọi người tiếp cận thông tin
              công nghệ dễ hiểu, chính xác và cập nhật nhất. Chúng tôi tin
              rằng công nghệ là sức mạnh, và kiến thức phải được chia sẻ.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white text-2xl mb-4">
              🔮
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Tầm nhìn
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Trở thành nền tảng tin tức công nghệ hàng đầu tại Việt Nam,
              với đội ngũ biên tập chuyên nghiệp và công nghệ AI hỗ trợ,
              mang đến trải nghiệm đọc tin tức tối ưu nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
          Giá trị cốt lõi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "📰",
              title: "Chính xác",
              desc: "Mỗi bài viết đều được kiểm chứng thông tin từ nhiều nguồn đáng tin cậy.",
            },
            {
              icon: "⚡",
              title: "Nhanh chóng",
              desc: "Cập nhật tin tức nóng hổi, phản ánh sự kiện ngay khi nó xảy ra.",
            },
            {
              icon: "🧠",
              title: "Sâu sắc",
              desc: "Không chỉ tin tức bề mặt, mà còn phân tích chuyên sâu và góc nhìn đa chiều.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
            >
              <div className="text-3xl mb-3">{value.icon}</div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
          Công nghệ sử dụng
        </h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { name: "Next.js 15", desc: "Hybrid SSG/SSR" },
              { name: "Sanity CMS", desc: "Headless CMS" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Vercel Edge", desc: "Edge Computing" },
            ].map((tech) => (
              <div key={tech.name}>
                <p className="font-bold text-[var(--text-primary)]">
                  {tech.name}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="text-center">
        <div className="rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10 p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Có câu hỏi, góp ý hoặc muốn hợp tác? Đừng ngần ngại liên hệ.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Liên hệ ngay
          </a>
        </div>
      </section>
    </div>
  );
}
