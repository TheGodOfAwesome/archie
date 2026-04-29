"use client";

import { useState } from "react";
import { CloudDownload, Mail, Sparkles } from "lucide-react";

export default function EmailCaptureModal({ context }: { context: any }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    try {
      // Setup the ZIP download payload
      const res = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sessionId: context.sessionId })
      });
      
      if (!res.ok) throw new Error("Failed to generate blueprint");
      
      // Trigger download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "openclaw_blueprint.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Failed to download blueprint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#121215] border border-white/10 rounded-3xl p-8 shadow-2xl glass-card flex flex-col relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>

        {!submitted ? (
          <>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Claim Your Blueprint</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Your workflow architecture is ready. Enter your email to receive your fully configured <span className="text-primary">OpenClaw boilerplate</span> via a secure .zip package.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="architect@acme.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-600"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:pointer-events-none cursor-pointer active:scale-95 flex justify-center items-center"
              >
                {loading ? "Generating Build..." : "Download Setup.zip"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 border border-green-500/30">
              <CloudDownload className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Blueprint Deployed</h2>
            <p className="text-muted-foreground text-sm">
              Your customized agent package has been downloaded successfully. Run <code className="bg-white/10 px-1 py-0.5 rounded text-white">./setup.sh</code> to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
