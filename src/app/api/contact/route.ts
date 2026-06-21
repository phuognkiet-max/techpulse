import { NextRequest, NextResponse } from "next/server";

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
    const { name, email, subject, message } = await request.json();

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    // Store in Sanity
    const client = await getSanityClient();
    if (client) {
      await client.create({
        _type: "contactSubmission",
        name,
        email,
        subject,
        message,
        submittedAt: new Date().toISOString(),
        status: "new",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Gửi thành công! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, message: "Đã có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
