import { NextResponse } from "next/server";
import JSZip from "jszip";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, sessionId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (sessionId) {
      await prisma.session.updateMany({
        where: { id: sessionId },
        data: { email }
      });
    }

    const zip = new JSZip();

    // 1. project_spec.json
    const projectSpec = {
      project_name: "OpenClaw Agentic Factory",
      user_email: email,
      agent_configuration: {
        orchestrator: { role: "Architect", capabilities: ["planning", "delegation"] },
        worker_node: { role: "Executor", capabilities: ["api_calls", "data_transformation"] },
      }
    };
    zip.file("project_spec.json", JSON.stringify(projectSpec, null, 2));

    // 2. mcp_config.json
    const mcpConfig = {
      mcpServers: {
        github: { command: "npx", args: ["-y", "@modelcontextprotocol/server-github"] },
        postgres: { command: "npx", args: ["-y", "@modelcontextprotocol/server-postgres", "@@DATABASE_URL@@"] }
      }
    };
    zip.file("mcp_config.json", JSON.stringify(mcpConfig, null, 2));

    // 3. /skills directory
    const skillsFolder = zip.folder("skills");
    skillsFolder?.file("data_enrichment.md", "# Data Enrichment SOP\n\n1. Read structured lead data.\n2. Query integration endpoint.\n3. Return merged entity.\n");
    skillsFolder?.file("code_generation.md", "# Code Generator SOP\n\n1. Analyze AST.\n2. Apply diffs via file editing tools.\n");

    // 4. setup.sh
    const setupSh = `#!/bin/bash
echo "Installing OpenClaw Boilerplate..."
echo "Cloning core templates for $1"
export AGENT_ENV="production"
npm install
echo "Injecting MCP configs..."
# Hardcoded safe setup logic
echo "Booting local instance."
`;
    zip.file("setup.sh", setupSh);

    // Generate zip blob
    const blob = await zip.generateAsync({ type: "blob" });

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=openclaw_blueprint.zip",
      },
    });
  } catch (error) {
    console.error("Blueprint Zip Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
