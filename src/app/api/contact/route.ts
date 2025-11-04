import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

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

export async function POST(req: Request): Promise<NextResponse> {
  console.log("✅ API route reached");

  try {
    console.log("📥 Step 1: Receiving request...");
    const formData: FormData = await req.json();
    console.log("✅ Step 1 complete — Form data received:", formData.fullName);

    console.log("⚙️ Step 2: Creating transporter...");
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });
    console.log("✅ Step 2 complete — Transporter created");

    console.log("🧪 Step 3: Verifying transporter...");
    await transporter.verify()
      .then(() => console.log("✅ Step 3 complete — Transporter verified successfully"))
      .catch((err) => {
        console.error("❌ Transporter verification failed:", err);
        throw new Error("Transporter verification failed: " + err.message);
      });

    console.log("✉️ Step 4: Preparing mail options...");
    const mailOptions = {
      from: `"Waymor Advisory" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${formData.fullName}`,
      html: `
        <h2>New Strategy Call Request</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Organization:</strong> ${formData.organization}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.countryCode} ${formData.phoneNumber}</p>
        <p><strong>Service Type:</strong> ${formData.supportType}</p>
        <p><strong>Preferred Mode:</strong> ${formData.mode}</p>
        <p><strong>Details:</strong> ${formData.details}</p>
        <p><strong>Date:</strong> ${formData.date} at ${formData.time}</p>
        <p><strong>Referral:</strong> ${formData.referral}</p>
      `,
    };
    console.log("✅ Step 4 complete — Mail options created");

    console.log("🚀 Step 5: Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Step 5 complete — Email sent successfully");

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Email error at route:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
