import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Configuration Error: RESEND_API_KEY is missing on Vercel." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      fulfillmentMethod, 
      address, 
      timeSlot, 
      boxSize, 
      flavors 
    } = body;

    await resend.emails.send({
      from: "Cookiliciousss <onboarding@resend.dev>", 
      to: [customerEmail], 
      subject: "🍪 Cookiliciousss Order Custom Build Reservation Locked In!",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="text-transform: uppercase; letter-spacing: 1px; color: #620f07;">Order Reservation Confirmed!</h2>
          <p>Hi <strong>${customerName}</strong>,</p>
          <p>Your custom box build selection is locked in.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Box Configuration:</strong> Custom ${boxSize}-Pack Bundle</p>
          <p><strong>Flavors Selected:</strong> ${flavors}</p>
          <p><strong>Fulfillment Mode:</strong> ${fulfillmentMethod ? fulfillmentMethod.toUpperCase() : 'N/A'}</p>
          <p><strong>Destination Parameters:</strong> ${address}</p>
          <p><strong>Schedule Window:</strong> ${timeSlot}</p>
          <p><strong>Contact Phone:</strong> ${customerPhone}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Thank you for choosing Cookiliciousss Premium Desserts.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error processing email execution.", details: error.message },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({ message: "The Cookiliciousss API is officially alive and running!" });
}