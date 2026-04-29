"use client";

import { useState } from "react";
import { CheckCircle2, Server, Activity, Loader2, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const router = useRouter();

  const handleSubscribe = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email: "user@example.com" }) // email mocked for now
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Payram checkout
      } else {
        alert("Failed to initiate checkout");
        setLoadingPlan(null);
      }
    } catch (e) {
      console.error(e);
      alert("Error checking out");
      setLoadingPlan(null);
    }
  };

  const plans = [
    { name: "Free", price: "$0", token: "0M/month", p: "Shared", id: "free" },
    { name: "Pro", price: "$35", sub: "/month", token: "100M/month (1500 RPM limit)", p: "Included VPS", id: "pro" },
    { name: "Scale", price: "$100", sub: "/m + usage", token: "Custom limits based on usage", p: "12+ vCPU VPS", id: "scale" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Subscription & Billing</h1>
        <p className="text-neutral-400">Manage your workspace plan and payment methods.</p>
      </div>

      {/* Active Subscription Banner */}
      <div className="p-6 rounded-2xl glass-card border border-white/5 flex items-center justify-between">
         <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#10B981] mb-1">Active Plan</h3>
            <div className="text-2xl font-bold text-white flex items-center gap-3">
              Free Tier <span className="px-2 py-1 text-xs bg-white/10 rounded font-medium text-neutral-300">Basic</span>
            </div>
         </div>
         <div className="text-right">
            <p className="text-sm text-neutral-400">Next billing cycle</p>
            <p className="font-medium text-white">N/A</p>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 pt-6">
        {plans.map((plan, i) => (
          <div key={i} className={`p-8 rounded-3xl flex flex-col relative overflow-hidden ${plan.id === 'pro' ? 'glass-card glow-border shadow-[0_0_40px_-15px_var(--color-primary)]' : 'bg-white/[0.03] border border-white/[0.05]'}`}>
            {plan.id === 'pro' && <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-xs font-bold rounded-bl-xl tracking-wider">POPULAR</div>}
            
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              {plan.sub && <span className="text-neutral-400">{plan.sub}</span>}
            </div>

            <button
               onClick={() => plan.id !== 'free' && handleSubscribe(plan.id)}
               disabled={plan.id === 'free' || loadingPlan !== null}
               className={`w-full py-3 rounded-xl flex items-center justify-center font-medium transition-colors mb-8 disabled:opacity-50 ${
                plan.id === 'free' ? 'bg-white/5 text-neutral-500' :
                plan.id === 'pro' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20'
               }`}
            >
              {loadingPlan === plan.id ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Preparing Checkout...</> : 
               plan.id === 'free' ? 'Current Plan' : (
                 <>Subscribe with Crypto <LinkIcon className="w-4 h-4 ml-2" /></>
               )}
            </button>

            <div className="space-y-4 text-sm font-medium flex-1">
              {['AI Workflow Inspiration', 'Workflow Design Tools'].map((f, j) => (
                <div key={j} className="flex gap-3 text-neutral-300"><CheckCircle2 size={16} className="text-neutral-500 shrink-0" /> {f}</div>
              ))}
              {plan.id !== 'free' && ['Roles & Permissions', 'Custom Dashboard'].map((f, j) => (
                <div key={j} className="flex gap-3 text-neutral-300"><CheckCircle2 size={16} className="text-primary shrink-0" /> {f}</div>
              ))}
              {plan.p !== "Shared" && <div className="flex gap-3 text-neutral-300 pt-4 border-t border-white/10"><Server size={16} className="text-neutral-500 shrink-0" /> VPS: {plan.p}</div>}
              {plan.token !== "0M/month" && <div className="flex gap-3 text-neutral-300"><Activity size={16} className="text-neutral-500 shrink-0" /> {plan.token}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
