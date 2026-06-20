import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: `${SITE_NAME} — Nguồn tin công nghệ đáng tin cậy cho người đọc Việt Nam. Tiêu chuẩn biên tập, quy trình kiểm chứng, và minh bạch nội dung.`,
  alternates: { canonical: "https://techpulse-pink.vercel.app/about" },
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
          TechPulse là nguồn tin công nghệ đáng tin cậy cho người đọc Việt Nam, mang đến
          những bài phân tích chuyên sâu về AI, Smartphone, Startup, Software và Hardware.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-14">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Sứ mệnh</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Democratize tech knowledge — giúp mọi người Việt Nam tiếp cận thông tin công nghệ
            dễ hiểu, chính xác và cập nhật nhất. Chúng tôi tin rằng công nghệ là sức mạnh,
            và kiến thức phải được chia sẻ.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Trong bối cảnh thông tin công nghệ tràn ngập nhưng thiếu chiều sâu,
            TechPulse cam kết mang đến những bài viết được nghiên cứu kỹ lưỡng,
            có nguồn gốc rõ ràng, và giúp bạn đưa ra quyết định công nghệ sáng suốt.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Chính xác",
              desc: "Mỗi bài viết đều được kiểm chứng thông tin từ nhiều nguồn đáng tin cậy. Facts có nguồn, stats có citation.",
              icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Nhanh chóng",
              desc: "Cập nhật tin tức nóng hổi, phản ánh sự kiện ngay khi nó xảy ra. Breaking news với editorial review.",
              icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
            },
            {
              title: "Sâu sắc",
              desc: "Không chỉ tin tức bề mặt, mà còn phân tích chuyên sâu, so sánh đa chiều, và góc nhìn thực tiễn.",
              icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z",
            },
          ].map((value) => (
            <div key={value.title} className="p-6 rounded-xl border border-[var(--border)] bg-white">
              <svg className="w-6 h-6 text-[var(--accent)] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={value.icon} />
              </svg>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{value.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Tiêu chuẩn Biên tập</h2>
        <div className="space-y-6">
          <StandardCard
            title="Quy trình Fact-checking"
            items={[
              "Mọi claim về benchmark, pricing, thông số kỹ thuật đều phải có nguồn (official announcement, embargo doc, hoặc independent test).",
              "Số liệu phải có ngày tham chiếu — không dùng sô stale.",
              "Khi không thể verify, bài viết sẽ được gắn nhãn 'Chưa kiểm chứng' (Unverified).",
            ]}
          />
          <StandardCard
            title="Minh bạch AI"
            items={[
              "TechPulse sử dụng AI hỗ trợ trong quy trình viết — research synthesis, outline generation, fact-checking assistance.",
              "Mọi nội dung đều được biên tập viên con người review, edit, và approve trước khi xuất bản.",
              "Khi bài viết có phần nội dung generated substantially by AI, sẽ có disclosure rõ ràng.",
            ]}
          />
          <StandardCard
            title="Chính sách Sửa lỗi (Corrections)"
            items={[
              "Nếu phát hiện lỗi fact, vui lòng liên hệ qua trang Liên hệ.",
              "Mọi sửa lỗi sẽ được ghi nhận minh bạch trong bài viết với ngày sửa.",
              "Lỗi factual nghiêm trọng sẽ có correction note ở đầu bài.",
            ]}
          />
          <StandardCard
            title="Trách nhiệm Editorial"
            items={[
              "Không giật tít — headline phải phản ánh đúng nội dung bài viết.",
              "Không publish bài viết có conflict of interest mà không disclosure.",
              "Tôn trọng quyền riêng tư — không chia sẻ thông tin cá nhân mà không consent.",
            ]}
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Công nghệ sử dụng</h2>
        <div className="rounded-xl border border-[var(--border)] bg-white p-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Next.js 16", desc: "Hybrid SSG/SSR" },
              { name: "Sanity CMS", desc: "Headless CMS" },
              { name: "Tailwind CSS v4", desc: "Styling" },
              { name: "Vercel Edge", desc: "Edge Computing" },
            ].map((tech) => (
              <div key={tech.name}>
                <p className="font-bold text-sm text-[var(--text-primary)]">{tech.name}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Liên hệ với chúng tôi</h2>
          <p className="text-[var(--text-secondary)] mb-5 text-sm">
            Có câu hỏi, góp ý, phát hiện lỗi, hoặc muốn hợp tác? Đừng ngần ngại.
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

function StandardCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-6">
      <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
            <span className="flex-shrink-0 text-[var(--accent)] mt-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
