"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  ArrowRight, Shield, Zap, Lock, Code, Layout, Blocks,
  Terminal, Activity, CheckCircle2, Layers, Coins, Globe,
  Workflow as WorkflowIcon, Cpu, Brain, Database, Server
} from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/landing/AnimatedSection";

export default function LandingPage() {
  const router = useRouter();
  const { user, setShowAuthFlow } = useDynamicContext();
  const isAuthenticated = !!user;

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      setShowAuthFlow(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-primary/30 selection:text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 dot-pattern pointer-events-none opacity-[0.15] z-0"></div>

      {/* Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[150px] opacity-20 pointer-events-none z-0 rounded-full"></div>

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-wide text-white">Workflow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <Link href="#solution" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#models" className="hover:text-white transition-colors">Models</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={handleStart} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </button>
            <button onClick={handleStart} className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-40">

        {/* 1. Hero Section */}
        <section className="flex flex-col items-center text-center mt-12 md:mt-24">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mb-6 leading-tight">
              Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Instance</span> of Your Workflow
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10">
              Extract, automate, and scale your proprietary workflow. <br className="hidden md:block" /> At a price you can actually afford.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <button onClick={handleStart} className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 flex items-center justify-center gap-2 transition-all neon-glow">
                Design With an Agent <ArrowRight size={18} />
              </button>
              <a href="https://calendly.com/kuzi-synctropic/30min" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 flex items-center justify-center transition-all">
                Book a Design Meeting
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-12 flex flex-col md:flex-row justify-center gap-8 text-neutral-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" /> Your data, your ownership, your profit
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" /> Deploy in days, not months
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" /> Costs pennies, not thousands
            </div>
          </AnimatedSection>
        </section>

        {/* 2. Our Solution: Four Pillars */}
        <section id="solution" className="pt-20">
          <AnimatedSection stagger viewportMargin="-100px" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Design",
                img: "/design.jpg",
                status: "Live",
                desc: "Encode your unique process into a replicable agent cluster. We help you architect and set up your workflow."
              },
              {
                title: "Automate",
                img: "/automate.jpg",
                status: "Live",
                desc: "Deploy deterministic and non-deterministic multi-agent workflows that run reliably 24/7 with self-healing capabilities on OpenClaw."
              },
              {
                title: "Control",
                img: "/control.jpg",
                status: "Live",
                desc: "Retain full ownership of your IP. Data stays private. Self-hosted infrastructure, no data scraped."
              },
              {
                title: "Monetize",
                img: "/monetize.jpg",
                status: "Coming Soon",
                comingSoon: true,
                desc: "Earn equity in your own process. Share your workflow, get paid each time it's used. Marketplace coming Q2 2026."
              },
            ].map((col, i) => (
              <AnimatedItem
                key={i}
                className="relative h-[450px] rounded-[32px] overflow-hidden group border border-white/5 bg-neutral-900"
              >
                {/* Background Image Optimized */}
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={col.img}
                    alt={col.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i < 2}
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/40 z-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-2" />

                {/* Content */}
                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between h-full">
                  <div className="flex justify-start">
                    <div className={`px-4 py-1.5 text-xs font-bold rounded-full tracking-wide uppercase ${col.comingSoon ? 'bg-orange-500 text-white' : 'bg-primary text-white'} shadow-xl`}>
                      {col.status === 'Live' ? '✓ Live' : col.status}
                    </div>
                  </div>

                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{col.title}</h3>
                    <p className="text-neutral-300 leading-relaxed text-lg max-w-sm">
                      {col.desc}
                    </p>
                  </div>
                </div>

                {/* Interactive Border Light */}
                <div className="absolute inset-0 z-20 border border-white/0 group-hover:border-white/20 rounded-[32px] transition-colors duration-500 pointer-events-none" />
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </section>

        {/* 4. Models & Open Source */}
        <section id="models" className="glass-card rounded-3xl p-8 md:p-16 glow-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Powered by Open Source, Optimized for Affordability</h2>
              <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                Open-source models are now production-ready. Instead of renting expensive APIs, we self-host cutting-edge LLMs on affordable infrastructure. You get top-tier performance without the enterprise price tag. Need a frontier model for complex reasoning? We route there but only when necessary.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><Database size={20} className="text-neutral-300" /></div>
                  <div><p className="text-white font-medium">90% of workflow</p><p className="text-sm text-neutral-500">Runs on zero-cost open-source models</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><Zap size={20} className="text-green-400" /></div>
                  <div><p className="text-white font-medium">10% fast inference</p><p className="text-sm text-neutral-500">Optimized for speed where it matters</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><Brain size={20} className="text-primary" /></div>
                  <div><p className="text-white font-medium">&lt;5% frontier models</p><p className="text-sm text-neutral-500">Routed only for the hardest problems</p></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col gap-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full items-center justify-items-center">
                {[
                  { name: 'GLM', img: '/glm.jpeg' },
                  { name: 'Gemma 4', img: '/gemma4.png' },
                  { name: 'MiniMax', img: '/minimax.png' },
                  { name: 'Qwen', img: '/qwen.png' },
                  { name: 'Mistral', img: '/mistral-logo-white.png' }
                ].map((m, i) => (
                  <div key={i} className={`group relative flex items-center justify-center p-4 rounded-xl border border-white/10 bg-black hover:bg-white/[0.05] transition-all w-full h-24 ${i === 4 ? 'md:col-span-1' : ''}`}>
                    <Image
                      src={m.img}
                      alt={m.name}
                      width={100}
                      height={48}
                      className="max-h-12 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all opacity-70 group-hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Privacy First */}
        <section className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm mb-6 font-medium">
              <Lock size={16} /> Privacy-First Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Your Data Stays Yours</h2>
            <p className="text-xl text-neutral-400 mb-8 font-medium">We believe your workflow is your intellectual property. Period.</p>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            {[
              { t: "Self-Hosted by Default", d: "Run your agents on your infrastructure or our managed platform." },
              { t: "No Training on Your Data", d: "We don't train models on your workflows, prompts, or outputs." },
              { t: "No Platform Lock-In", d: "Your workflow configuration is portable. Export and move anytime." },
              { t: "Transparent Logging", d: "See exactly what data is processed, where, and when." }
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="mt-1"><CheckCircle2 className="text-primary" size={20} /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">{p.t}</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Pricing */}
        <section id="pricing" className="pt-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Affordable for Prosumers.<br />Scalable to Enterprise.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Free", price: "$0", token: "0M/month", p: "Shared", id: "free" },
              { name: "Pro", price: "$35", sub: "/month", token: "100M/month (1500 RPM limit)", p: "Included VPS", id: "pro" },
              { name: "Scale", price: "$100", sub: "/m + usage", token: "Custom limits based on usage", p: "12+ vCPU VPS", id: "scale" },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl flex flex-col ${plan.id === 'pro' ? 'glass-card glow-border transform md:-translate-y-4 shadow-[0_0_40px_-15px_var(--color-primary)]' : 'bg-white/[0.03] border border-white/[0.05]'}`}>
                {plan.id === 'pro' && <div className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Most Popular</div>}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.sub && <span className="text-neutral-400">{plan.sub}</span>}
                </div>

                <button onClick={handleStart} className={`w-full py-3 rounded-xl flex items-center justify-center font-medium transition-colors mb-8 ${plan.id === 'pro' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  {plan.id === 'free' ? 'Start Free' : 'Upgrade Plan'}
                </button>

                <div className="space-y-4 text-sm font-medium">
                  {['AI Workflow Inspiration', 'Workflow Design Tools', 'OpenClaw Starter Kit'].map((f, j) => (
                    <div key={j} className="flex gap-3 text-neutral-300"><CheckCircle2 size={18} className="text-neutral-500 shrink-0" /> {f}</div>
                  ))}
                  {plan.id !== 'free' && ['Free Managed VPS', '1 Week Free Trial', 'Staging & Rollback', 'Roles & Permissions', 'Custom Dashboard'].map((f, j) => (
                    <div key={j} className="flex gap-3 text-neutral-300"><CheckCircle2 size={18} className="text-primary shrink-0" /> {f}</div>
                  ))}
                  {plan.p !== "Shared" && <div className="flex gap-3 text-neutral-300 pt-4 border-t border-white/10"><Server size={18} className="text-neutral-500 shrink-0" /> Infrastructure: {plan.p}</div>}
                  {plan.token !== "0M/month" && <div className="flex gap-3 text-neutral-300"><Activity size={18} className="text-neutral-500 shrink-0" /> Tokens: {plan.token}</div>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-neutral-500 text-sm mt-8">All plans include API access to your workflow.</p>
        </section>

        {/* 7. Roadmap */}
        <section className="glass-card p-10 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold text-white mb-4">What's Next</h2>
              <p className="text-neutral-400 text-sm">We ship when it's ready, not on a hype schedule. Real users drive our roadmap.</p>
            </div>
            <div className="md:col-span-3 grid sm:grid-cols-3 gap-8">
              <div>
                <div className="text-primary font-bold mb-4 font-mono">Q2 2026</div>
                <ul className="space-y-3 text-neutral-300 text-sm">
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Architect Agent setup</li>
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Workflow Marketplace</li>
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Multi-team collaboration</li>
                </ul>
              </div>
              <div>
                <div className="text-primary font-bold mb-4 font-mono">Q3 2026</div>
                <ul className="space-y-3 text-neutral-300 text-sm">
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Custom model tuning</li>
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Advanced analytics</li>
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Regional deployments</li>
                </ul>
              </div>
              <div>
                <div className="text-primary font-bold mb-4 font-mono">Q4 2026</div>
                <ul className="space-y-3 text-neutral-300 text-sm">
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Mobile companion app</li>
                  <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>Autonomous evolution</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What You Get Now (Moved) */}
        <section id="features">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What's Shipping Today</h2>
            <p className="text-neutral-400">Everything you need to orchestrate complex agentic systems.</p>
          </div>

          <AnimatedSection stagger viewportMargin="0px" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Workflow Setup & Design", desc: "AI-guided configuration of your multi-agent architecture", status: "Live" },
              { name: "OpenClaw Orchestration", desc: "Deterministic, reliable agent coordination with artifact-driven execution", status: "Live" },
              { name: "Staging & Rollback", desc: "Test changes risk-free, instant rollback to previous versions", status: "Live (Pro+)" },
              { name: "Roles & Permissions", desc: "Team collaboration with granular access control", status: "Live (Pro+)" },
              { name: "Custom Dashboard", desc: "Monitor agents, view logs, tune parameters", status: "Live (Pro+)" },
              { name: "Multiple LLM Support", desc: "Use any open-source or API-based model", status: "Live" },
              { name: "Private Infrastructure", desc: "Self-hosted or managed your data never leaves your control", status: "Live" },
              { name: "Priority Support", desc: "24/7 dedicated support for your workflows", status: "Live (Scale)" },
              { name: "Architect Agent", desc: "AI-powered workflow generation from natural language", status: "Coming Soon" },
            ].map((f, i) => (
              <AnimatedItem key={i} className="bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10 transition-colors p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{f.name}</h4>
                  <p className="text-neutral-400 text-sm">{f.desc}</p>
                </div>
                <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                  {f.status.includes('Live') ? <span className="w-2 h-2 rounded-full bg-green-500"></span> : <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
                  {f.status}
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </section>

      </main>

      {/* Footer / Final CTA */}
      <footer className="border-t border-white/10 bg-black pt-24 pb-12 mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Build Your Workflow?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <button onClick={handleStart} className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors">
              Design With an Agent
            </button>
            <a href="https://calendly.com/kuzi-synctropic/30min" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors">
              Book a Design Meeting
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-neutral-500 gap-4">
            <div className="flex items-center gap-2 text-white font-medium">
              Workflow
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div>&copy; 2026 Workflow. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
