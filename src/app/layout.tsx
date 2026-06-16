import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "TechPulse — Tin Tức Công Nghệ Mới Nhất",
    template: "%s | TechPulse",
  },
  description:
    "TechPulse — Nguồn tin công nghệ đáng tin cậy. Cập nhật tin tức AI, Smartphone, Startup, Software, Hardware mỗi ngày.",
  keywords: [
    "tin tức công nghệ",
    "công nghệ AI",
    "smartphone",
    "startup",
    "software",
    "hardware",
    "tech news",
    "Vietnam tech",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "TechPulse",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
