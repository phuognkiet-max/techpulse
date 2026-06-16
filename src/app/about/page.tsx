import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "TechPulse — Nguồn tin công nghệ đáng tin cậy, biên tập chuyên nghiệp.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-12 md:py-20">
      {/* Hero */}
      <div className="mb-14">
        <h1 className="text-4xl md:text-[2.75rem] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
          Về <span className="text-[var(--accent)]">TechPulse</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          TechPulse là nguồn tin công nghệ đáng tin cậy, mang đến những bài
          viết chất lượng cao về AI, Smartphone, Startup, Software và Hardware.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--border)] bg-white p-7">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
              Sứ mệnh
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Democratize tech knowledge — giúp mọi người tiếp cận thông tin
              công nghệ dễ hiểu, chính xác và cập nhật nhất. Chúng tôi tin
              rằng công nghệ là sức mạnh, và kiến thức phải được chia sẻ.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-white p-7">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
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
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
          Giá trị cốt lõi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Chính xác",
              desc: "Mỗi bài viết đều được kiểm chứng thông tin từ nhiều nguồn đáng tin cậy.",
            },
            {
              title: "Nhanh chóng",
              desc: "Cập nhật tin tức nóng hổi, phản ánh sự kiện ngay khi nó xảy ra.",
            },
            {
              title: "Sâu sắc",
              desc: "Không chỉ tin tức bề mặt, mà còn phân tích chuyên sâu và góc nhìn đa chiều.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-xl border border-[var(--border)] bg-white"
            >
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
          Công nghệ sử dụng
        </h2>
        <div className="rounded-xl border border-[var(--border)] bg-white p-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Next.js 15", desc: "Hybrid SSG/SSR" },
              { name: "Sanity CMS", desc: "Headless CMS" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Vercel Edge", desc: "Edge Computing" },
            ].map((tech) => (
              <div key={tech.name}>
                <p className="font-bold text-sm text-[var(--text-primary)]">
                  {tech.name}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-[var(--text-secondary)] mb-5 text-sm">
            Có câu hỏi, góp ý hoặc muốn hợp tác? Đừng ngần ngại liên hệ.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            Liên hệ ngay
          </a>
        </div>
      </section>
    </div>
  );
}
