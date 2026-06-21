import { NextResponse } from "next/server";
import { Resend } from "resend";

// 1. Force Next.js to treat this as a dynamic API route instead of trying to pre-build it statically
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // 2. Move this INSIDE the function so it only runs on actual execution
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined in environment variables");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { customerName, customerEmail, customerPhone, fulfillmentMethod, address, timeSlot, boxSize, flavors } = body;

    await resend.emails.send({
      // ⚠️ CRITICAL: Free testing accounts MUST use this exact 'from' email!
      from: "Cookiliciousss <onboarding@resend.dev>", 
      // ⚠️ CRITICAL: Free sandbox accounts can ONLY send to your personal login email address!
      to: [customerEmail], 
      subject: "🍪 Cookiliciousss Order Custom Build Reservation Locked In!",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="text-transform: uppercase; letter-spacing: 1px; color: #620f07;">Order Reservation Confirmed!</h2>
          <p>Hi <strong>${customerName}</strong>,</p>
          <p>Your custom box build selection is locked in. Here are your logistics coordinates:</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Box Configuration:</strong> Custom ${boxSize}-Pack Bundle</p>
          <p><strong>Flavors Selected:</strong> ${flavors}</p>
          <p><strong>Fulfillment Mode:</strong> ${fulfillmentMethod.toUpperCase()}</p>
          <p><strong>Destination Parameters:</strong> ${address}</p>
          <p><strong>Schedule Window:</strong> ${timeSlot}</p>
          <p><strong>Contact Phone:</strong> ${customerPhone}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Thank you for choosing Cookiliciousss Premium Desserts.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API Route Error:", error);
    return NextResponse.json({ error: "Failed to parse or send email" }, { status: 500 });
  }
}