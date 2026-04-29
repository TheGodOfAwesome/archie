"use client";

import { Copy, Check, Eye, Download, X, Bot, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AdminTable({ sessions, title = "Recent Sessions" }: { sessions: any[], title?: string }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewingSession, setViewingSession] = useState<any | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadData = (data: any, filename: string) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <div className="bg-[#121215] border border-white/5 rounded-2xl overflow-hidden glass-card flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={() => downloadData(sessions, "flow_agent_sessions.json")}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl shadow transition text-sm font-medium cursor-pointer active:scale-95 transition-all"
          >
            Download All (JSON)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-black/20 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold text-white">Date</th>
                <th className="px-6 py-4 font-semibold text-white">Session ID (Short)</th>
                <th className="px-6 py-4 font-semibold text-white">Email</th>
                <th className="px-6 py-4 font-semibold text-white">Messages</th>
                <th className="px-6 py-4 font-semibold text-white">Blueprint</th>
                <th className="px-6 py-4 font-semibold text-white text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">No sessions recorded.</td>
                </tr>
              )}
              {sessions.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">
                    {s.createdAt.replace('T', ' ').split('.')[0]}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <span className="font-mono">{s.id.substring(0, 8)}...</span>
                    <button 
                      className="text-gray-500 hover:text-white transition-colors p-1 cursor-pointer" 
                      onClick={() => copyToClipboard(s.id, s.id)}
                    >
                      {copiedId === s.id ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">{s.email || <span className="text-gray-500 italic">None Provided</span>}</td>
                  <td className="px-6 py-4">{s.messages.length}</td>
                  <td className="px-6 py-4">
                    {s.blueprint ? (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-md border border-green-500/20">Yes</span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-500/10 text-gray-400 rounded-md border border-gray-500/20">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => setViewingSession(s)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white cursor-pointer active:scale-95"
                      title="View Chat"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => downloadData(s, `session_${s.id.substring(0, 8)}.json`)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white cursor-pointer active:scale-95"
                      title="Download JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chat Preview Modal */}
      {viewingSession && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8">
          <div className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden glass-card relative">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div>
                <h3 className="text-lg font-bold text-white">Chat History</h3>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">{viewingSession.id}</p>
              </div>
              <button 
                onClick={() => setViewingSession(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-black/30">
              {viewingSession.messages.length === 0 ? (
                <p className="text-center text-muted-foreground italic py-12">No messages in this session.</p>
              ) : (
                viewingSession.messages.map((m: any, i: number) => (
                  <div key={i} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${m.role === "assistant" ? "bg-primary/20" : "bg-white/10"}`}>
                      {m.role === "assistant" ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm glass-card shadow-sm"
                    }`}>
                      {m.role !== 'user' ? (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                            code: ({node, inline, ...props}: any) => 
                              inline 
                                ? <code className="bg-black/30 px-1 py-0.5 rounded text-xs" {...props} />
                                : <code className="block bg-black/50 p-2 rounded text-xs my-2 overflow-x-auto whitespace-pre-wrap" {...props} />
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      ) : (
                        m.content
                      )}
                      <div className={`text-[10px] mt-2 opacity-50 ${m.role === 'user' ? 'text-right' : ''}`}>
                        {m.createdAt.replace('T', ' ').split('.')[0]}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end">
              <button 
                onClick={() => setViewingSession(null)}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all text-white cursor-pointer active:scale-95"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
