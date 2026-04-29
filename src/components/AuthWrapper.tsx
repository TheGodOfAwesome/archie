"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Loader2 } from "lucide-react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, sdkHasLoaded } = useDynamicContext();
  const isAuthenticated = !!user;

  if (!sdkHasLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="z-10 w-full max-w-md p-8 glass-card rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 mb-6 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(138,43,226,0.3)]">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">OC</span>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Architect Sign In</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">
            Access your agentic workflow orchestration platform.
          </p>

          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <DynamicWidget />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      <div className="absolute top-4 right-4 z-50">
        <DynamicWidget />
      </div>
    </>
  );
}
