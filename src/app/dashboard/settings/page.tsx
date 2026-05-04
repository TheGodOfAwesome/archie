"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { User, Shield, Brain, Settings, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  const { user } = useDynamicContext();

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Settings</h1>
        <p className="text-neutral-400 text-lg font-medium">Manage your account and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {[
            { label: "Profile", icon: <User size={18} /> },
            { label: "AI Preferences", icon: <Brain size={18} /> },
            { label: "Security", icon: <Shield size={18} /> },
            { label: "App Settings", icon: <Settings size={18} /> },
            { label: "Notifications", icon: <Bell size={18} /> },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-primary/10 text-primary border border-primary/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-8">
          {/* User Profile Section */}
          <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <User size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{user?.email?.split('@')[0]}</h3>
                <p className="text-sm text-neutral-400 font-mono text-xs">{user?.verifiedCredentials?.[0]?.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Email Address</label>
                <div className="px-4 py-3 rounded-xl bg-black/40 border border-white/5 text-sm text-neutral-300">
                  {user?.email || "No email linked"}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Display Name</label>
                <div className="px-4 py-3 rounded-xl bg-black/40 border border-white/5 text-sm text-neutral-300">
                  {user?.firstName || "Anonymous"}
                </div>
              </div>
            </div>
          </section>

          {/* AI Settings Section */}
          <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-white">AI Agent Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                <div>
                  <p className="text-sm font-bold text-white">Default Model</p>
                  <p className="text-xs text-neutral-500">Choose your preferred LLM for architecting.</p>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary">
                  <option>Claude 3.5 Sonnet</option>
                  <option>GPT-4o</option>
                  <option>Mistral Large</option>
                  <option>DeepSeek V3</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                <div>
                  <p className="text-sm font-bold text-white">Autonomous Treasury</p>
                  <p className="text-xs text-neutral-500">Allow agents to execute swaps on your behalf.</p>
                </div>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(138,43,226,0.3)]">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {/* App Settings Section */}
          <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Globe size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-white">App Configuration</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                <div>
                  <p className="text-sm font-bold text-white">Default Network</p>
                  <p className="text-xs text-neutral-500">Chain used for agent deployments.</p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Arc Testnet</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                <div>
                  <p className="text-sm font-bold text-white">Telemetry</p>
                  <p className="text-xs text-neutral-500">Help us improve the platform.</p>
                </div>
                <div className="w-10 h-5 bg-neutral-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-neutral-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
