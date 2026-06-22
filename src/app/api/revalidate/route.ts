import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/revalidate
 *
 * Revalidates Next.js ISR cache. Designed to be called by Sanity webhooks
 * when content is updated.
 *
 * Auth: Requires `x-revalidate-secret` header matching REVALIDATE_SECRET env var.
 *
 * Body (JSON):
 *   - path: string (e.g. "/articles/my-article-slug")
 *   - tag: string (optional, e.g. "article-slug")
 *   - type: "article" | "category" | "home" | "all" (determines revalidation strategy)
 *   - slug: string (optional, used with type to compute path)
 *
 * Sanity Webhook Setup:
 * 1. Go to https://www.sanity.io/manage/project/YOUR_PROJECT/webhooks
 * 2. Create new webhook:
 *    - URL: https://techpulse-pink.vercel.app/api/revalidate
 *    - Trigger on: "Document created", "Document updated", "Document deleted"
 *    - Filter: _type in ["article", "category", "siteSettings"]
 *    - HTTP method: POST
 *    - Headers: x-revalidate-secret: YOUR_SECRET_HERE
 *    - Body: { "type": "${_type}", "slug": "${slug.current}", "id": "${_id}" }
 * 3. Set REVALIDATE_SECRET in Vercel environment variables (same value as webhook header)
 */

const SECRET = process.env.REVALIDATE_SECRET || "";

export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("x-revalidate-secret");
  if (!SECRET || authHeader !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, slug, path, tag } = body;

    const revalidated: string[] = [];

    if (path) {
      // Direct path revalidation
      revalidatePath(path);
      revalidated.push(path);
    }

    if (type === "article" && slug) {
      // Article updated → revalidate article page + homepage + category
      const articlePath = `/articles/${slug}`;
      revalidatePath(articlePath);
      revalidated.push(articlePath);

      // Also revalidate homepage (shows latest articles)
      revalidatePath("/");
      revalidated.push("/");

      // Revalidate category pages (articles listed by category)
      revalidatePath("/categories");
      revalidated.push("/categories/*");
    }

    if (type === "category") {
      // Category updated → revalidate all category pages + homepage
      revalidatePath("/categories");
      revalidated.push("/categories/*");
      revalidatePath("/");
      revalidated.push("/");
    }

    if (type === "siteSettings") {
      // Site settings updated → revalidate entire site
      revalidatePath("/", "layout");
      revalidated.push("/ (layout)");
    }

    if (tag) {
      // revalidateTag not available in this Next.js version
      // Use path-based revalidation instead
      revalidatePath("/");
      revalidated.push(`tag:${tag} → /`);
    }

    if (type === "all") {
      // Full revalidation
      revalidatePath("/", "layout");
      revalidated.push("/ (full layout)");
    }

    return NextResponse.json({
      revalidated,
      now: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}

// GET endpoint for manual testing
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("x-revalidate-secret");
  if (!SECRET || authHeader !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Revalidation endpoint active",
    usage: "POST with { type, slug } or { path }",
    types: ["article", "category", "siteSettings", "all"],
  });
}
