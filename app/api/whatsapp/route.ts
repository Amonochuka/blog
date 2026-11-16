import { NextResponse } from "next/server";

function normalizeKenyanPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const internationalNumber = digits.startsWith("0")
    ? `254${digits.slice(1)}`
    : digits.startsWith("254")
      ? digits
      : `254${digits}`;

  return /^254\d{9}$/.test(internationalNumber) ? internationalNumber : null;
}

export async function GET(request: Request) {
  const phone = process.env.WHATSAPP_PHONE
    ? normalizeKenyanPhone(process.env.WHATSAPP_PHONE)
    : null;

  if (!phone) {
    return NextResponse.redirect(new URL("/contact?subject=WhatsApp%20inquiry", request.url));
  }

  return NextResponse.redirect(`https://wa.me/${phone}`);
}
