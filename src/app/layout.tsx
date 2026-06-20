import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { client } from "@/lib/sanity";
import { SITE_SETTINGS } from "@/lib/queries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { BackToTop } from "@/components/BackToTop";
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
    title: `${SITE_NAME} — Tin Tức Công Nghệ Mới Nhất`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Tin Tức Công Nghệ Mới Nhất`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-default.png`],
  },
  alternates: {
    canonical: SITE_URL,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description: SITE_DESCRIPTION,
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[var(--text-primary)]">
        <Analytics />
        <Header siteTitle={siteSettings?.title} />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} />
        <BackToTop />
      </body>
    </html>
  );
}
