"use client";

import Link from "next/link";
import { Bot, CreditCard, LayoutDashboard, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { href: "/architect", label: "Agent Config", icon: <Bot size={18} /> },
    { href: "/dashboard/billing", label: "Subscription", icon: <CreditCard size={18} /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-black text-neutral-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0A0A0C] flex flex-col items-center py-6">
        <div className="w-full px-6 mb-8 flex items-center justify-between">
          <span className="font-bold text-xl text-white tracking-widest">FLOW.</span>
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
        </div>
        
        <nav className="flex-1 w-full px-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive ? "bg-primary/10 text-primary border border-primary/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
                {link.icon}
                {link.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#121215] overflow-y-auto relative">
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="p-8 relative z-10">
           {children}
        </div>
      </main>
    </div>
  );
}
