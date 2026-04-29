"use client";

import { useState } from "react";
import ChatPane from "./ChatPane";
import CanvasPane from "./CanvasPane";
import EmailCaptureModal from "./EmailCaptureModal";

export type SessionState = 1 | 2 | 3 | 4;

export type AppContextType = {
  state: SessionState;
  setState: React.Dispatch<React.SetStateAction<SessionState>>;
  diagramData: string | null;
  setDiagramData: React.Dispatch<React.SetStateAction<string | null>>;
  mockupUrl: string | null;
  setMockupUrl: React.Dispatch<React.SetStateAction<string | null>>;
  files: Array<{ filename: string, language: string, content: string }> | null;
  setFiles: React.Dispatch<React.SetStateAction<Array<{ filename: string, language: string, content: string }> | null>>;
  sessionId: string;
};

export default function SplitPane() {
  const [state, setState] = useState<SessionState>(1);
  const [diagramData, setDiagramData] = useState<string | null>(null);
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<Array<{ filename: string, language: string, content: string }> | null>(null);
  const [sessionId] = useState(() => crypto.randomUUID());

  const context: AppContextType = {
    state,
    setState,
    diagramData,
    setDiagramData,
    mockupUrl,
    setMockupUrl,
    files,
    setFiles,
    sessionId,
  };

  return (
    <div className="flex h-full w-full bg-background text-foreground overflow-hidden">
      {/* Left Pane - Chat Engine */}
      <div className="w-1/2 border-r border-border/50 h-full bg-[#0a0a0c] z-10 shadow-2xl relative flex flex-col">
        <ChatPane context={context} />
      </div>

      {/* Right Pane - Dynamic Canvas */}
      <div className="w-1/2 h-full relative overflow-hidden bg-gradient-to-br from-[#121215] to-[#0c0c0e]">
        <CanvasPane context={context} />
      </div>

      {/* State 4 Lead Capture */}
      {state === 4 && <EmailCaptureModal context={context} />}
    </div>
  );
}
