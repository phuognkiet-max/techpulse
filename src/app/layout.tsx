import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { client } from "@/lib/sanity";
import { SITE_SETTINGS } from "@/lib/queries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { SiteSettings } from "@/types";

async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null;
  try {
    return await client.fetch<SiteSettings>(SITE_SETTINGS);
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Tin Tức Công Nghệ Mới Nhất`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
    siteName: SITE_NAME,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-white text-[var(--text-primary)]">
        <Header siteTitle={siteSettings?.title} />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
