"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardData(userEmail: string) {
  if (!userEmail) throw new Error("Email is required");

  // Fetch user and subscription
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      subscriptions: {
        where: { status: "active" },
        orderBy: { createdAt: "desc" },
        take: 1
      }
    }
  });

  // Fetch workflows (sessions) for this user
  const workflows = await prisma.session.findMany({
    where: {
      OR: [
        { email: userEmail },
        { userId: user?.id }
      ]
    },
    orderBy: { createdAt: "desc" },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      blueprint: true
    }
  });

  // Determine current plan
  const activeSub = user?.subscriptions?.[0];
  const planId = activeSub?.planId || "free";
  const planName = planId.charAt(0).toUpperCase() + planId.slice(1);
  
  // Serialize for the Client Component
  const serializedWorkflows = workflows.map((s: any) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    messages: s.messages.map((m: any) => ({
      ...m,
      createdAt: m.createdAt.toISOString()
    })),
    blueprint: s.blueprint ? {
      ...s.blueprint,
      createdAt: s.blueprint.createdAt.toISOString()
    } : null
  }));

  return {
    user,
    workflows: serializedWorkflows,
    planId,
    planName
  };
}
