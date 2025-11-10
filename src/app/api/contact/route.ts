import { Resend } from 'resend';
import { NextResponse } from 'next/server';

interface FormData {
  fullName: string;
  organization: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  supportType: string;
  mode: string;
  details: string;
  date: string;
  time: string;
  referral: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log("📥 Receiving form data...");
    const data: FormData = await req.json();
console.log('Received form data:', data);

    console.log("✉️ Sending email via Resend...");
console.log('Resend API Key available:', !!process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Waymor Advisory <info@waymoradvisory.com>',
      to: 'info@waymoradvisory.com',
      subject: `New Contact Form Submission — ${data.fullName}`,
      html: `
        <h2>New Strategy Call Request</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Organization:</strong> ${data.organization}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.countryCode} ${data.phoneNumber}</p>
        <p><strong>Service Type:</strong> ${data.supportType}</p>
        <p><strong>Preferred Mode:</strong> ${data.mode}</p>
        <p><strong>Details:</strong> ${data.details}</p>
        <p><strong>Date:</strong> ${data.date} at ${data.time}</p>
        <p><strong>Referral:</strong> ${data.referral}</p>
      `,
    });

    console.log("✅ Email sent successfully");
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
  console.error("❌ Email sending failed:", err);

  const errorMessage =
    err instanceof Error ? err.message : "Something went wrong";

  return NextResponse.json(
    { success: false, error: errorMessage },
    { status: 500 }
  );
}

}
