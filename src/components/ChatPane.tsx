"use client";

import { useState, useRef, useEffect } from "react";
import { AppContextType } from "./SplitPane";
import { SendHorizontal, Bot, User, Loader2, Zap } from "lucide-react";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: true,
});

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function ChatPane({ context }: { context: AppContextType }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I’m the Flow Agent. Tell me what you want to accomplish today do you want \n1. Help figuring out how you can use agents and help designing a workflow\n or \n2. Want help design the you Openclaw orchestration"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory,
          state: context.state,
          sessionId: context.sessionId
        }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      // Handle tool calls / state transitions embedded in response
      if (data.diagram) context.setDiagramData(data.diagram);
      if (data.mockupUrl) context.setMockupUrl(data.mockupUrl);
      if (data.files) context.setFiles(data.files);
      if (data.newState) context.setState(data.newState as any);

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "system", content: "Error communicating with Flow Agent." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d0f] relative overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between glass sticky top-0 z-20">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" /> Flow Agent
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Stage {context.state}: {['Discovery', 'Pitch & Synthesis', 'Aha! Moment', 'Blueprint'][context.state - 1]}</p>
        </div>
      </div>
      <div className="px-6 py-2 bg-orange-500/10 border-b border-orange-500/20 text-[15px] text-orange-400 font-medium flex items-center gap-2 relative z-10">
        <Zap size={22} />
        Experimental feature: For best results, <a href="https://calendly.com/kuzi-synctropic/30min" target="_blank" rel="noreferrer" className="underline hover:text-orange-300">book a call</a> to work with a human expert for free.
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}

            <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed overflow-x-auto ${msg.role === "user"
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : msg.role === "system"
                ? "bg-destructive/20 text-destructive-foreground border border-destructive/50"
                : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm glass-card"
              }`}>
              {msg.role !== 'user' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                    h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2 mt-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-md font-bold mb-2 mt-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-2 mt-3" {...props} />,
                    code: ({ node, inline, ...props }: any) =>
                      inline
                        ? <code className="bg-black/30 px-1 py-0.5 rounded text-xs" {...props} />
                        : <code className="block bg-black/50 p-2 rounded text-xs my-2 overflow-x-auto" {...props} />
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm glass-card flex items-center">
              <Loader2 className="w-4 h-4 animate-spin text-primary mr-2" /> Typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-6 border-t border-white/5 glass">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || context.state === 4}
            placeholder={context.state === 4 ? "Session complete." : "Describe your workflow..."}
            className="w-full bg-[#18181b] border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white placeholder-gray-500 disabled:opacity-50 resize-none overflow-hidden min-h-[56px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="absolute right-3 focus:outline-none bottom-3 p-2 rounded-xl bg-black border border-white/15 hover:border-white/30 transition-all active:scale-95 cursor-pointer disabled:pointer-events-none disabled:opacity-50 text-white shadow-lg"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
