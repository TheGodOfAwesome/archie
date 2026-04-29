import { NextResponse } from "next/server";
import { payram } from "@/lib/payram";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-payram-signature") || "";

    // In production, uncomment to verify webhook origin
    // if (!payram.verifyWebhookSignature(rawBody, signature)) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    const event = JSON.parse(rawBody);

    // Assuming Payram sends event like { type: "payment.succeeded", payment: { id: "...", metadata: { planId: "..." } } }
    if (event.type === "payment.succeeded") {
      const paymentId = event.payment.id;
      
      // Update subscription status in DB
      await prisma.subscription.updateMany({
        where: { payramPaymentId: paymentId },
        data: { status: "active" }
      });
      
      console.log(`Payment successful for webhook. Updated sub attached to ${paymentId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
