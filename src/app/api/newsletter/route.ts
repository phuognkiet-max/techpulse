import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email bat buoc." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Email khong hop le." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log("[Newsletter] Subscriber:", normalizedEmail);

    return NextResponse.json({
      success: true,
      message: "Dang ky thanh cong!",
    });
  } catch (err) {
    console.error("[Newsletter] Error:", err);
    return NextResponse.json(
      { success: false, message: "Loi server." },
      { status: 500 }
    );
  }
}
