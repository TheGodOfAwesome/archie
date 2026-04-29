import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminTable from "@/components/AdminTable";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

// Opt-out of instant validation for this dynamic dashboard
export const unstable_instant = false;

async function AdminContent() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== "kmuvezwa@gmail.com") {
    redirect("/"); // Redirect unauthorized users
  }

  const sessions = await prisma.session.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      blueprint: true,
    },
  });

  // Serialize dates for the client component
  const serializedSessions = sessions.map((s: any) => ({
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

  return <AdminTable sessions={serializedSessions} />;
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-gray-200 font-sans p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and export Flow Agent sessions.</p>
          </div>
          <Link href="/" className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
            Back to Flow Agent
          </Link>
        </div>

        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/5">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground italic font-medium">Fetching workflow history...</p>
          </div>
        }>
          <AdminContent />
        </Suspense>
      </div>
    </div>
  );
}
