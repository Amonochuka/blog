import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name } = body;

  // Basic validation
  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Valid email address is required" },
      { status: 400 }
    );
  }

  // In a real implementation, you would integrate with:
  // - Mailchimp
  // - ConvertKit
  // - Plausible / Simple Analytics
  // - SendGrid
  // - Or your preferred email service

  // For now, we'll log and respond success
  console.log("Newsletter signup:", { email, name, timestamp: new Date().toISOString() });

  // TODO: Add actual integration here
  // Example: await fetchMailchimpSubscribe(email, name);

  return NextResponse.json({
    success: true,
    message: "Thank you for subscribing! You'll receive our stories and updates occasionally.",
  });
}