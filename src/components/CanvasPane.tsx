"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { AppContextType } from "./SplitPane";
import { Copy, Download, Code2, Image as ImageIcon, FileCode2, Rocket, CheckCircle2, Loader2, ArrowRightLeft } from "lucide-react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { hashAgentBlueprint, buildENSSetTextTx } from "../lib/ens";
import { buildUniswapSwapTx } from "../lib/uniswap";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CanvasPane({ context }: { context: AppContextType }) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"diagram" | "mockup" | "files" | "deploy">("diagram");
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const { primaryWallet } = useDynamicContext();
  const [ensDeploying, setEnsDeploying] = useState(false);
  const [ensDeployed, setEnsDeployed] = useState(false);
  const [uniDeploying, setUniDeploying] = useState(false);
  const [uniDeployed, setUniDeployed] = useState(false);

  const handleDeployENS = async () => {
    if (!primaryWallet) return alert("Please connect wallet first");
    setEnsDeploying(true);
    try {
      const provider: any = await primaryWallet.connector.getProvider();
      const hash = hashAgentBlueprint(context.diagramData || "", context.files || []);
      const txData = buildENSSetTextTx("orchestrator.archie.eth", "blueprint_hash", hash);
      
      await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: primaryWallet.address,
          to: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          data: txData,
        }]
      });
      setEnsDeployed(true);
    } catch (e) {
      console.error(e);
    } finally {
      setEnsDeploying(false);
    }
  };

  const handleFundTreasury = async () => {
    if (!primaryWallet) return alert("Please connect wallet first");
    setUniDeploying(true);
    try {
      const provider: any = await primaryWallet.connector.getProvider();
      const amountInWei = 1000000000000000n; // 0.001 ETH
      const tokenIn = "0x4200000000000000000000000000000000000006"; // WETH on Base
      const tokenOut = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on Base
      const routerAddress = "0x2626664c2603336E57B271c5C0b26F421741e481"; // SwapRouter02 Base
      
      const txData = buildUniswapSwapTx(
        primaryWallet.address as `0x${string}`,
        amountInWei,
        tokenIn,
        tokenOut,
        3000
      );

      await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: primaryWallet.address,
          to: routerAddress,
          data: txData,
          value: "0x38D7EA4C68000" // 0.001 ETH
        }]
      });
      setUniDeployed(true);
    } catch (e) {
      console.error(e);
    } finally {
      setUniDeploying(false);
    }
  };

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
        {context.state >= 3 && (
          <button onClick={() => setActiveTab("deploy")} className={`px-4 py-2 text-sm rounded-lg transition-all flex items-center gap-2 ${activeTab === 'deploy' ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'text-green-400 hover:text-green-300 hover:bg-white/5'}`}>
            <Rocket className="w-4 h-4" /> Deploy
          </button>
        )}
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

        {/* Deploy Section */}
        {activeTab === "deploy" && (
          <div className="flex-1 w-full p-8 overflow-y-auto bg-[#0a0a0c]">
            <div className="max-w-2xl mx-auto space-y-8">
              
              <div className="text-center mb-8">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-green-500/20 items-center justify-center mb-4 border border-green-500/30">
                  <Rocket className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Deploy Agent On-Chain</h2>
                <p className="text-muted-foreground text-sm">Initialize your agent's identity and treasury autonomously.</p>
              </div>

              {/* ENS Feature */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 glass-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-blue-400" /> ENS Identity Verification
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 max-w-md">Assign a verifiable <span className="text-blue-300 font-mono">.archie.eth</span> subname and securely anchor the cryptograhic hash of the agent's architecture.</p>
                  </div>
                  {!ensDeployed ? (
                    <button onClick={handleDeployENS} disabled={ensDeploying} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50">
                      {ensDeploying ? <><Loader2 className="w-4 h-4 animate-spin" /> Confirming...</> : 'Register ENS'}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-xl border border-green-400/20 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Identity Secured
                    </div>
                  )}
                </div>
                {ensDeployed && (
                  <div className="mt-4 bg-black/60 rounded-xl p-4 border border-white/5 font-mono text-xs text-blue-200">
                    <div>Name: <span className="text-white">orchestrator.archie.eth</span></div>
                    <div className="mt-1 text-muted-foreground truncate">Text Record [blueprint_hash]: {hashAgentBlueprint(context.diagramData || "", context.files || [])}</div>
                  </div>
                )}
              </div>

              {/* Uniswap Feature */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 glass-card relative overflow-hidden mt-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <ArrowRightLeft className="w-5 h-5 text-pink-400" /> Uniswap Autonomous Treasury
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 max-w-md">Instantly swap base currency to USDC via Uniswap to seed the newly created smart contract liquidity pool.</p>
                  </div>
                  {!uniDeployed ? (
                    <button onClick={handleFundTreasury} disabled={uniDeploying} className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 shadow-lg shadow-pink-900/20 disabled:opacity-50">
                      {uniDeploying ? <><Loader2 className="w-4 h-4 animate-spin" /> Swapping...</> : 'Fund Treasury'}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-xl border border-green-400/20 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Treasury Funded
                    </div>
                  )}
                </div>
                {uniDeployed && (
                  <div className="mt-4 bg-black/60 rounded-xl p-4 border border-white/5 font-mono text-xs text-pink-200">
                    <div>Action: <span className="text-white">ExactInputSingle Swap (Uniswap V3)</span></div>
                    <div className="mt-1 text-muted-foreground">0.001 ETH → USDC (Seeded to Pool)</div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
