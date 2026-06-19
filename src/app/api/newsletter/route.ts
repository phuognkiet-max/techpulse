import { NextRequest, NextResponse } from "next/server";

// Newsletter subscriber API
// POST /api/newsletter { email: string }

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

    // Try to use Sanity if configured
    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
      const isValidProjectId =
        projectId &&
        projectId !== "your_project_id_here" &&
        /^[a-z0-9-]+$/.test(projectId);

      if (isValidProjectId) {
        const { createClient } = await import("@sanity/client");
        const token = process.env.SANITY_TOKEN || "";
        const client = createClient({
          projectId,
          dataset: "production",
          apiVersion: "2024-01-01",
          useCdn: false,
          token,
        });

        // Check for duplicate
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

        // Create subscriber
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
      }
    } catch (sanityError) {
      console.error("[Newsletter] Sanity error:", sanityError);
      // Fall through to success response — don't block user
    }

    // Fallback: log and return success
    console.log(`[Newsletter] New subscriber: ${normalizedEmail}`);
    return NextResponse.json({
      success: true,
      message:
        "Đăng ký thành công! Cảm ơn bạn đã quan tâm đến TechPulse.",
    });
  } catch (error) {
    console.error("[Newsletter] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}
