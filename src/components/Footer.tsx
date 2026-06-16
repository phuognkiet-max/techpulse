import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = {
  main: [
    { href: "/", label: "Trang chủ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ],
  categories: [
    { href: "/categories/ai-machine-learning", label: "AI & Machine Learning" },
    { href: "/categories/mobile", label: "Mobile" },
    { href: "/categories/startup", label: "Startup" },
    { href: "/categories/software", label: "Software" },
    { href: "/categories/hardware", label: "Hardware" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <Logo size="sm" />
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Nguồn tin công nghệ đáng tin cậy. Cập nhật tin tức AI,
              Smartphone, Startup, Software, Hardware mỗi ngày.
            </p>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Khám phá
            </h3>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Chủ đề
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Đăng ký nhận tin
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Tin tức công nghệ mới nhất mỗi tuần qua email.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="email@example.com"
                className="flex-1 min-w-0 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
              />
              <button
                type="submit"
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors flex-shrink-0"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} TechPulse. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
