"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-[2.75rem] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
          Liên hệ
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
          Có câu hỏi, góp ý hoặc muốn hợp tác? Chúng tôi luôn sẵn sàng lắng nghe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-5">
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Email</h3>
            <p className="text-sm text-[var(--accent)]">contact@techpulse.vn</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Địa chỉ</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Hồ Chí Minh City, Việt Nam
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Giờ làm việc</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              T2 - T6: 9:00 - 18:00
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="rounded-xl border border-[var(--border)] bg-white p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Gửi thành công!
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: "", email: "", subject: "", message: "" });
                }}
                className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors"
              >
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-[var(--border)] bg-white p-6 md:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Chủ đề
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                  placeholder="Hợp tác, góp ý, câu hỏi..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Nội dung
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all resize-none"
                  placeholder="Viết tin nhắn của bạn..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors"
              >
                Gửi tin nhắn
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
