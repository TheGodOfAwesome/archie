"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { AppContextType } from "./SplitPane";
import { Copy, Download, Code2, Image as ImageIcon, FileCode2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CanvasPane({ context }: { context: AppContextType }) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"diagram" | "mockup" | "files">("diagram");
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        darkMode: true,
        primaryColor: "#818cf8",
        primaryTextColor: "#fff",
        primaryBorderColor: "#6366f1",
        lineColor: "#4f46e5",
        secondaryColor: "#1e1e24",
        tertiaryColor: "#1e1e24",
      },
    });

    if (activeTab === "diagram" && context.diagramData && mermaidRef.current) {
      mermaidRef.current.innerHTML = "";
      mermaid.render("mermaid-canvas", context.diagramData).then((res) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = res.svg;
        }
      }).catch(e => {
        console.error("Mermaid error", e);
        if (mermaidRef.current) mermaidRef.current.innerHTML = "<p class='text-red-400'>Error rendering diagram</p>";
      });
    }
  }, [context.diagramData, activeTab]);

  if (context.state < 3 && !context.diagramData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-12 text-center opacity-50">
        <div className="w-24 h-24 mb-6 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center animate-pulse">
           <Code2 className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Canvas is empty</h3>
        <p className="max-w-xs text-sm">Once the Architect understands your workflow, your agentic diagram, scripts, and UI mockup will securely generate here.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col p-6 overflow-hidden space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-black/20 p-1 rounded-xl w-fit border border-white/5">
        <button onClick={() => setActiveTab("diagram")} className={`px-4 py-2 text-sm rounded-lg transition-all ${activeTab === 'diagram' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>Architecture Diagram</button>
        <button onClick={() => setActiveTab("files")} className={`px-4 py-2 text-sm rounded-lg transition-all ${activeTab === 'files' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>Implementation Scripts</button>
        <button onClick={() => setActiveTab("mockup")} className={`px-4 py-2 text-sm rounded-lg transition-all ${activeTab === 'mockup' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>UI Mockup</button>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 bg-[#121215]/80 glass-card rounded-2xl relative border border-white/5 overflow-hidden flex flex-col">
        
        {/* Diagram Section */}
        {activeTab === "diagram" && (
          <>
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" /> Orchestration Diagram
              </h3>
              <button className="text-xs text-muted-foreground hover:text-white transition-all hover:bg-white/10 active:scale-95 cursor-pointer flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                 <Copy className="w-3 h-3" /> Copy Mermaid
              </button>
            </div>
            <div className="flex-1 w-full p-6 flex flex-col items-center justify-center overflow-auto" ref={mermaidRef}>
              {!context.diagramData && (
                 <p className="text-muted-foreground animate-pulse text-sm">Generating architecture...</p>
              )}
            </div>
          </>
        )}

        {/* Files Section */}
        {activeTab === "files" && (
           <div className="flex w-full h-full overflow-hidden">
             <div className="w-1/3 border-r border-white/5 bg-black/20 p-2 overflow-y-auto">
                <h4 className="text-xs text-muted-foreground mb-4 mt-2 px-2 uppercase tracking-wider font-semibold">Generated Files</h4>
                {context.files?.map((f, i) => (
                   <button key={i} onClick={() => setSelectedFileIndex(i)} className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-all flex items-center truncate ${selectedFileIndex === i ? 'bg-primary/20 text-primary border border-primary/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                     <FileCode2 className="w-4 h-4 mr-2 shrink-0" />
                     <span className="truncate">{f.filename}</span>
                   </button>
                ))}
                {(!context.files || context.files.length === 0) && <p className="text-muted-foreground text-xs px-2 animate-pulse mt-4">Generating scripts...</p>}
             </div>
             <div className="w-2/3 h-full overflow-hidden flex flex-col bg-[#0d0d0f]">
                {context.files && context.files[selectedFileIndex] ? (
                  <SyntaxHighlighter
                    language={context.files[selectedFileIndex].language}
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, padding: '1rem', height: '100%', fontSize: '13px', background: 'transparent' }}
                    showLineNumbers={true}
                  >
                    {context.files[selectedFileIndex].content}
                  </SyntaxHighlighter>
                ) : (
                  <div className="flex-1 flex items-center justify-center"><p className="text-muted-foreground animate-pulse text-sm">Waiting for agent to output code...</p></div>
                )}
             </div>
           </div>
        )}

        {/* Mockup Section */}
        {activeTab === "mockup" && (
          <>
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" /> Generated UI Mockup
              </h3>
               <button className="text-xs text-muted-foreground hover:text-white transition-all hover:bg-white/10 active:scale-95 cursor-pointer flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                 <Download className="w-3 h-3" /> Save Asset
              </button>
            </div>
            <div className="flex-1 w-full p-2 flex items-center justify-center bg-black/30">
              {context.mockupUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={context.mockupUrl} alt="UI Mockup" className="max-h-full max-w-full rounded shadow-xl object-contain" />
              ) : (
                <p className="text-muted-foreground animate-pulse text-sm">Drafting UI interface...</p>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
