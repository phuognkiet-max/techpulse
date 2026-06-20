import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <span className="text-[8rem] md:text-[10rem] font-bold text-[var(--bg-tertiary)] leading-none select-none">
            404
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
          Trang không tìm thấy
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm thời không khả dụng.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Về trang chủ
          </Link>
          <Link
            href="/categories/ai-machine-learning"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            Khám phá bài viết
          </Link>
        </div>
      </div>
    </div>
  );
}
