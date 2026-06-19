import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

// Newsletter subscriber API
// POST /api/newsletter { email: string }
// Stores subscribers in Sanity CMS as a "subscriber" document type
// Falls back to logging if Sanity is not configured

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
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

    // Check if Sanity is configured
    if (!client) {
      // Fallback: just log and return success (for development)
      console.log(`[Newsletter] New subscriber: ${normalizedEmail}`);
      return NextResponse.json({
        success: true,
        message: "Đăng ký thành công! Cảm ơn bạn đã quan tâm đến TechPulse.",
      });
    }

    // Check for duplicate subscriber
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

    // Create subscriber in Sanity
    await client.create({
      _type: "subscriber",
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      source: "website",
      confirmed: false,
    });

    console.log(`[Newsletter] New subscriber saved: ${normalizedEmail}`);

    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công! Bạn sẽ nhận được bản tin công nghệ hàng tuần từ TechPulse.",
    });
  } catch (error) {
    console.error("[Newsletter] Error:", error);
    return NextResponse.json(
      { success: false, message: "Đã có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
