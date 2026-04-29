# 🏗️ Blueprint: Autonomous Agentic OS (AOS) v1.1
**A Production-Grade Framework for Orchestrated Multi-Agent Workflows**

---

## 1. Executive Summary
This blueprint defines a standardized architecture for building complex, autonomous agentic workflows using the **OpenClaw** framework. It employs a **Blackboard Architecture** where agents communicate via a shared filesystem (`/shared`), managed by a centralized **Orchestrator** and monitored by a **Sentinel Swarm**.

## 2. Core Architecture: The "Blackboard" Pattern
All agents in this workflow operate on a shared state principle. This ensures persistence, auditability, and decoupling of agent logic from the communication protocol.

### Standard Directory Structure
```text
/shared/
├── roadmap/          # High-level goals and sprint plans (Strategist)
├── spec/             # Technical requirements and contracts (Architect)
├── build/            # Artifacts, code, and service-specific outputs
│   └── status/       # Per-agent health, consensus, and completion signals
├── deploy/           # Final production-ready manifests
├── feedback/         # QA reports and bug logs (Sentry)
├── logs/             # Centralized event stream and agent heartbeats
├── memory/           # Persistent long-term knowledge base
│   └── conventions.md # Global user preferences and auto-captured rules
└── config/           # Service configurations (e.g., neon.env)
```

---

## 3. The Agent Roster (The "Core Swarm")

### 00 — The Orchestrator (The "Brain")
*   **Role:** Monitors `/shared` for file events and triggers the next agent in the pipeline.
*   **Implementation:** Node.js service (`orchestrator.js`) using `chokidar` for file watching.
*   **Key Logic:** 
    *   **Timeout Management:** 20m per builder, 2h total pipeline, 30m for mobile.
    *   **Consensus Gate:** Requires `.consensus.json` from a Reviewer before build aggregation.
    *   **Nudge Detection:** Intercepts user corrections to trigger self-healing.

### 01 — The Strategist (The "Planner")
*   **Role:** Interprets high-level user goals into a JSON roadmap.
*   **Mandate:** Must approve a `sprint_plan.json` before any technical work begins.

### 02 — The Architect (The "Contractor")
*   **Role:** Converts the roadmap into formal technical contracts (`contract.ts`).
*   **Mandate:** **Interview-First.** Must confirm requirements with the user.
*   **Stack Preference:** **Neon.tech** for Database and Auth (defaulting to Neon Auth/OAuth).

### 03 — The Builders (The "Workers")
*   **Role:** Specialized agents (`builder_frontend`, `builder_backend`, etc.) implementing Architect's contracts.
*   **Shadow Mode:** Every builder is paired with a `reviewer_{id}` for automated validation.

### 04 — The Sentinel Swarm (The "Guards")
*   **Sentry (QA):** Verifies all build outputs against the original Architect's plan.
*   **Memory Refiner:** Extracts permanent rules from user corrections and updates `conventions.md`.
*   **Overwatch:** Monitors heartbeats and detects logic "loops" or anomalies.

---

## 4. The Intelligence Layer (Advanced Orchestration)
To minimize human fatigue and maximize autonomous quality, the AOS employs three active logic patterns:

### A. Shadow Work (Consensus Logic) — [IMPLEMENTED]
*   **Logic:** For every implementation agent (Builder), a parallel Reviewer agent is triggered upon `PASS`.
*   **Gate:** The Orchestrator (`handleShadowWork`) waits for a `.consensus.json` signed by the Reviewer.
*   **Failure Recovery:** If validation fails, details are written to `qa_failures.json`, triggering a `RETRY` for the Builder.

### B. Progress Digests (Batch Reporting) — [IMPLEMENTED]
*   **Service:** `digest_service.js` polls `/shared/logs/event_stream.json`.
*   **Action:** Triggers a `summarizer` agent to aggregate events into "Completed," "Blocked," and "Decisions Needed."
*   **Schedule:** Every 2 hours or on-demand via Gemini CLI.

### C. Self-Healing Loops (Correction Capture) — [IMPLEMENTED]
*   **Logic:** Orchestrator (`handleUserNudge`) monitors `user_feedback.json` for trigger words (*actually, change, wrong*).
*   **Action:** Spawns `memory_refiner` to update `/shared/memory/conventions.md`.
*   **Injection:** Rules in `conventions.md` are prepended to all future agent prompts to ensure style alignment.

---

## 5. Gemini CLI & PM2 Integration
The Gemini CLI is the primary management interface, and PM2 ensures high availability.

### Managed Services
| Process Name | Script | Role |
| :--- | :--- | :--- |
| `openclaw-gateway` | `openclaw gateway` | Communication Hub |
| `asf-orchestrator` | `orchestrator.js` | Pipeline Logic |
| `asf-digest` | `digest_service.js` | Reporting |

---

## 6. Operational Mandates (The "Laws")
1.  **Alignment Loop:** No implementation starts without a "100% Confidence" signal from the Architect.
2.  **Shadow Validation:** No builder output is accepted without a Reviewer's consensus signal.
3.  **Sovereign Shared State:** No agent may communicate directly; all handoffs must be filesystem-based.
4.  **Credential Safety:** Neon API keys and secrets must be stored in `/shared/config/neon.env`, never hardcoded.

---

## 7. Deployment Strategy
The AOS is deployed via PM2 using `asf/ecosystem.config.js`. It requires a mounted `/shared` volume and the `OPENCLAW_HOOK_TOKEN` environment variable for secure agent triggering.

---
**End of Blueprint v1.1**
