"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import AdminTable from "@/components/AdminTable";
import { CheckCircle2, TrendingUp, Zap, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { getDashboardData } from "@/actions/dashboard";

export default function DashboardOverview() {
  const { user } = useDynamicContext();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (user?.email) {
        try {
          const result = await getDashboardData(user.email);
          setData(result);
        } catch (error) {
          console.error("Failed to load dashboard data", error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground italic font-medium">Loading dashboard insights...</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Workflows", value: data?.workflows?.length || 0, icon: <Zap className="text-blue-400" />, trend: "Optimal" },
    { label: "Active Agents", value: 0, icon: <CheckCircle2 className="text-emerald-400" />, trend: "0% of limit" },
    { label: "Token Usage", value: "0M", icon: <TrendingUp className="text-purple-400" />, trend: "No usage" },
    { label: "Avg. Build Time", value: "0s", icon: <Clock className="text-orange-400" />, trend: "N/A" },
  ];

  return (
    <div className="space-y-10">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            Welcome back, {user?.firstName || user?.email?.split('@')[0]}
          </h1>
          <p className="text-neutral-400 text-lg font-medium">Here's what's happening with your agentic workflows.</p>
        </div>
        
        <Link href="/dashboard/billing" className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 pl-4 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer group">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Account Status</span>
            <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
              {data?.planName || "Free"} Plan
            </span>
          </div>
          <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
            data?.planId === 'free' || !data?.planId ? 'bg-neutral-800 text-neutral-400 group-hover:bg-primary group-hover:text-white' : 
            data?.planId === 'pro' ? 'bg-primary/20 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white' : 
            'bg-purple-500/20 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white'
          }`}>
            {data?.planId === 'free' || !data?.planId ? 'Upgrade' : 'Active'}
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">{stat.trend}</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-neutral-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Workflows Table */}
      <div className="pt-4">
        <AdminTable sessions={data?.workflows || []} title="Your Workflows" />
      </div>
    </div>
  );
}
