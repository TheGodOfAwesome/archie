"use client";

import Link from "next/link";
import { Bot, CreditCard, LayoutDashboard, Settings, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, sdkHasLoaded, handleLogOut } = useDynamicContext();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (sdkHasLoaded && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, sdkHasLoaded, router]);

  const links = [
    { href: "/dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/architect", label: "Agent Architect", icon: <Bot size={18} /> },
    { href: "/dashboard/billing", label: "Subscription", icon: <CreditCard size={18} /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  if (!sdkHasLoaded || !isAuthenticated) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    );
  }

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
          <button 
            onClick={() => handleLogOut()}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 w-full mt-4"
          >
            <LogOut size={18} />
            Logout
          </button>
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
