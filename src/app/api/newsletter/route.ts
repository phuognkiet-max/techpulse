import { NextRequest, NextResponse } from "next/server";

// Lazy-load Sanity client to avoid build errors when env vars are missing
let sanityClient: any = null;

async function getSanityClient() {
  if (sanityClient) return sanityClient;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
  if (!projectId || projectId === "your_project_id_here") return null;

  try {
    const { createClient } = await import("@sanity/client");
    sanityClient = createClient({
      projectId,
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_TOKEN || "",
    });
    return sanityClient;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email là bắt buộc." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Try Sanity storage
    const client = await getSanityClient();
    if (client) {
      try {
        const existing = await client.fetch(
          `*[_type == "subscriber" && email == $email][0]`,
          { email: normalizedEmail }
        );

        if (existing) {
          return NextResponse.json({
            success: true,
            message: "Email này đã được đăng ký rồi. Cảm ơn bạn!",
          });
        }

        await client.create({
          _type: "subscriber",
          email: normalizedEmail,
          subscribedAt: new Date().toISOString(),
          source: "website",
          confirmed: false,
        });

        console.log(`[Newsletter] Subscriber saved: ${normalizedEmail}`);
        return NextResponse.json({
          success: true,
          message:
            "Đăng ký thành công! Bạn sẽ nhận được bản tin công nghệ hàng tuần từ TechPulse.",
        });
      } catch (err) {
        console.error("[Newsletter] Sanity error:", err);
        // Fall through to success
      }
    }

    // Fallback
    console.log(`[Newsletter] Subscriber: ${normalizedEmail}`);
    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công! Cảm ơn bạn đã quan tâm đến TechPulse.",
    });
  } catch (err) {
    console.error("[Newsletter] Error:", err);
    return NextResponse.json(
      { success: false, message: "Đã có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
