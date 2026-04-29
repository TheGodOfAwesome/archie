import { NextResponse } from "next/server";
import { payram } from "@/lib/payram";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { planId, email } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    // Map plan to price
    let amount = 0;
    let title = "";
    if (planId === "pro") {
      amount = 35.00;
      title = "Pro Plan Subscription";
    } else if (planId === "scale") {
      amount = 100.00;
      title = "Scale Plan Subscription";
    } else {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Here we'd get the real user from session. For now, find or create.
    let user = await prisma.user.findFirst({ where: { email: email || "demo@example.com" } });
    if (!user) {
      user = await prisma.user.create({ data: { email: email || "demo@example.com", name: "Demo User" }});
    }

    // Call Payram VPS to create payment
    const payment = await payram.createPayment({
      title,
      description: `Monthly subscription for FlowAgent ${title}`,
      amount,
      currency: "USDT", // As it's crypto default
      metadata: { userId: user.id, planId },
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?canceled=true`
    });

    // Create a pending subscription in our database
    await prisma.subscription.create({
      data: {
        userId: user.id,
        planId,
        status: "pending",
        payramPaymentId: payment.id,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 1 month from now
      }
    });

    return NextResponse.json({ url: payment.url });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
