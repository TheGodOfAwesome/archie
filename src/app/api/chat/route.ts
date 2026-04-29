import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const client = new OpenAI({
  apiKey: "cI92VJiY.HeeqgMY1pvvpsMk9NfMWTABJ4YutGMxt", // Baseten API key as provided
  baseURL: "https://inference.baseten.co/v1",
});

const SYSTEM_PROMPTS = {
  1: `You are the Flow Agent (State 1: Discovery). Your objective is to extract the friction from the user's workflow. Ask targeted questions and get to a consensus quickly. If the user is vague, offer multiple-choice examples. Keep technical details minimal unless asked. Focus on the workflow outcome, not technical architecture. IMPORTANT: Always place any questions you have for the user at the absolute end of your response.`,
  2: `You are the Flow Agent (State 2: Pitch & Synthesis). Propose a specific, tangible multi-agent workflow that solves the user's problem. Frame it as "Agent X does Y". Keep technical jargon to a minimum. IMPORTANT: Always end your pitch with: "Does this sound like the right approach, or should we adjust?" (Or a similar question, but it MUST be at the absolute end of your response).`,
  3: `You are the Flow Agent (State 3: The Aha! Moment). Do not converse. Only output strict JSON containing the extracted workflow architecture.`,
  4: `You are the Flow Agent (State 4: Blueprint Delivery). Briefly summarize the final architecture in two sentences. Congratulate the user. The UI will prompt them for an email to download the code blueprint.`,
};

export async function POST(req: Request) {
  try {
    const { messages, state, sessionId } = await req.json();

    const currentState = state as 1 | 2 | 3 | 4;
    const systemPrompt = SYSTEM_PROMPTS[currentState];

    const modelMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({ role: m.role, content: m.content }))
    ];

    const response = await client.chat.completions.create({
      model: "zai-org/GLM-5",
      messages: modelMessages as any,
      max_tokens: 800,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content || "";
    console.log("AI Reply:", reply.substring(0, 100));
    let newState = currentState;
    let diagram = null;
    let mockupUrl = null;
    
    // Ensure session exists
    if (sessionId) {
      console.log("Syncing session:", sessionId);
      await prisma.session.upsert({
        where: { id: sessionId },
        update: {},
        create: { id: sessionId }
      });
      
      const lastUserMsg = messages[messages.length - 1];
      if (lastUserMsg) {
        await prisma.message.create({
          data: {
            sessionId,
            role: "user",
            content: lastUserMsg.content
          }
        });
      }
    }

    // State Machine Transitions
    if (currentState === 1 && (reply.toLowerCase().includes("does this sound like") || reply.toLowerCase().includes("pitch"))) {
      newState = 2;
    }
    
    const userLastMsg = messages[messages.length - 1].content.toLowerCase();
    console.log("State check:", { currentState, userLastMsg });
    if (currentState === 2 && (userLastMsg.includes("yes") || userLastMsg.includes("looks good") || userLastMsg.includes("perfect") || userLastMsg.includes("agree"))) {
      newState = 3;
      console.log("Triggering State 3 extraction...");
      
      let diagram = null;
      let files: any[] = [];
      const diagramResponse = await client.chat.completions.create({
      model: "zai-org/GLM-5",
         messages: [
           { role: "system", content: "You are an expert software architect representing the OpenClaw AOS v1.1 framework. Convert the user's idea into a strict JSON object with this exact structure: { \"diagram\": \"Mermaid JS code here\", \"files\": [{ \"filename\": \"orchestrator.js\", \"language\": \"javascript\", \"content\": \"// code\" }] }. Output ONLY raw JSON. The generated code MUST adhere to the OpenClaw Blackboard Architecture (using a /shared directory for state, e.g., /shared/build, /shared/logs). Include exactly 3 implementation files representing the core orchestration architecture." },
           { role: "user", content: `Create a full OpenClaw orchestration architecture for this workflow: ${reply}` }
         ],
         max_tokens: 2500,
      });
      let rawJson = diagramResponse.choices[0].message.content || "{}";
      rawJson = rawJson.replace(/```json/gi, "").replace(/```/g, "").trim();
      console.log("Raw JSON Extraction:", rawJson.substring(0, 200));
      
      try {
        const parsed = JSON.parse(rawJson);
        diagram = parsed.diagram || "graph TD\\nA[Error generation] --> B[Retry]";
        files = parsed.files || [];
      } catch (e) {
        console.error("Failed to parse architect JSON", e);
        diagram = "graph TD\\nA[Error generation] --> B[Retry]";
      }
      
      try {
        const mockupPrompt = `Agentic workflow dashboard for: ${reply.substring(0, 100)}. Modern glassmorphism UI, dark mode, high quality UI/UX`;
        mockupUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(mockupPrompt)}?width=800&height=600&nologo=true`;
      } catch(e) {
         console.error("Mockup generation err", e);
         mockupUrl = "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1000";
      }

      console.log("Upserting blueprint...");
      if (sessionId) {
        await prisma.blueprint.upsert({
          where: { sessionId },
          update: { diagram, mockupUrl, files } as any,
          create: { sessionId, diagram, mockupUrl, files } as any
        });
      }

      if (sessionId) {
        await prisma.message.create({
          data: { sessionId, role: "assistant", content: "Architecture locked in. Generating your interactive blueprints now. Please refer to the Canvas on the right." }
        });
      }

      return NextResponse.json({
        reply: "Architecture locked in. Generating your interactive blueprints now. Please refer to the Canvas on the right.",
        newState: 4,
        diagram,
        mockupUrl,
        files
      });
    }

    if (sessionId) {
      await prisma.message.create({
        data: { sessionId, role: "assistant", content: reply }
      });
    }

    return NextResponse.json({
      reply,
      newState,
    });

  } catch (error) {
    console.error("Chat API Error Debug:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
