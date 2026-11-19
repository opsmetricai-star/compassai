import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { IndustryTabs } from "@/components/home/IndustryTabs";

const LOGOS = ["Harbor & Pine", "Northwind", "Meridian", "Kestrel", "Vantage", "Lumen", "Orchard", "Tessera"];
const APPS = ["Slack", "Google Drive", "Jira", "Confluence", "SharePoint", "GitHub", "Salesforce"];
const CERTS = ["Row Level Security", "Server-side keys", "Audit log", "Data deletion", "Per-user access", "Encrypted transport"];
const STORIES = [
  { co: "Harbor & Pine scales answers across 140 stores.", s: [["140", "Stores"], ["1st", "AI platform company-wide"], ["60%", "fewer HQ calls"]], p: "Store teams now ask CompassAI instead of calling head office, getting cited procedure answers in seconds." },
  { co: "Northwind Labs builds an AI-forward engineering culture.", s: [["1.5h", "saved weekly per user"], ["80%", "adoption"], ["300+", "agents"]], p: "Engineers onboard faster, search less and build agents that move real work forward." },
  { co: "Meridian Press turns a decade of archive into working knowledge.", s: [["10+", "years centralized"], ["3", "weeks to go-live"], ["2", "newsrooms live"]], p: "Editors and sales teams search the full archive and prep faster for every pitch." },
  { co: "Kestrel Telecom gives support teams trusted context.", s: [["2-3h", "saved weekly per user"], ["90%", "adoption in support"], ["24/7", "answers available"]], p: "A single searchable knowledge layer helps agents resolve with cited answers." },
];
const PRODUCTS = [
  ["Connect knowledge.", "Across every app, system and team.", "/platform/connectors"],
  ["Understand context.", "Turn fragmented information into decisions.", "/platform/enterprise-context"],
  ["Take action.", "Move work forward with automation and agents.", "/ai-agents"],
  ["Work everywhere.", "Bring AI into the tools employees already use.", "/ai-assistant"],
];

export default function Home() {
  return (
    <>
      {/* 1 hero */}
      <section className="pt-16 sm:pt-24 pb-10 text-center">
        <div className="container-x">
          <p className="eyebrow fade-up">Enterprise AI that understands your company</p>
          <h1 className="display fade-up mx-auto mt-6 max-w-[1050px] text-[44px] sm:text-[72px] lg:text-[88px]">Complete context that makes AI work at enterprise scale.</h1>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-a-demo" className="btn btn-blue">Get a demo</Link>
            <Link href="/ai-assistant" className="btn btn-ghost"><span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white"><Play size={10} fill="white" /></span>See how it works</Link>
          </div>
          <div className="hero-art mt-16 h-[320px] sm:h-[520px]" />
        </div>
      </section>

      {/* 2 logos + event banner */}
      <section className="py-16">
        <div className="hairline-grid">
          <div className="container-x flex flex-col sm:flex-row sm:items-center gap-6 py-8">
            <p className="max-w-[260px] text-[20px] leading-tight text-ink">The world’s leading teams put AI to work with CompassAI.</p>
            <div className="overflow-hidden flex-1">
              <div className="marquee text-[22px] font-semibold text-muted/70">
                {[...LOGOS, ...LOGOS].map((l, i) => <span key={i} className="whitespace-nowrap">{l}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="container-x mt-12">
          <div className="rounded-2xl p-8 sm:p-14 text-white grid lg:grid-cols-2 gap-8 items-center" style={{ background: "linear-gradient(120deg,#d9534a,#b24b7a 55%,#6a4fd0)" }}>
            <div className="text-[56px] sm:text-[88px] leading-[0.9] font-semibold tracking-tighter">compass<br />SUMMIT<br />2026</div>
            <div>
              <h2 className="text-[28px] sm:text-[36px] tracking-tight">Elevate your AI expertise</h2>
              <p className="mt-3 text-white/85 max-w-[460px]">See how teams are deploying agents and building AI-native workflows to run real work.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/events" className="btn bg-brand text-white">Register for replays <ArrowRight size={16} /></Link>
                <Link href="/blog" className="btn border border-white/60 text-white">Read the announcement</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 why now */}
      <section className="py-20">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <h2 className="text-[32px] sm:text-[48px] leading-[1.05] tracking-[-0.04em] text-muted">AI adoption is accelerating.<br /><span className="text-ink">AI costs are accelerating faster.</span><br />CompassAI is built for scale.</h2>
          <div>
            <p className="eyebrow">Average token savings, year to date</p>
            <p className="mt-3 text-[56px] sm:text-[88px] tracking-tighter text-ink tabular-nums">4,812,309,774</p>
            <ul className="mt-8 space-y-4">
              {[["Context.", "Integrated across the tools your business runs on."], ["Intelligence.", "The right model and reasoning level for every task."], ["Permissions.", "Secure, permission-aware access from day one."], ["Efficiency.", "Pre-connected context reduces token waste."]].map(([a, b]) => (
                <li key={a} className="border-t border-line pt-4 text-[18px]"><b className="font-medium text-ink">{a}</b> {b}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-x mt-14">
          <div className="flex gap-6 overflow-x-auto">{APPS.map((a) => <span key={a} className="card shrink-0 px-6 py-3 text-muted">{a}</span>)}</div>
        </div>
      </section>

      {/* 4 why it matters (cream) */}
      <section className="bg-cream py-24">
        <div className="container-x">
          <h2 className="display text-[32px] sm:text-[52px] max-w-[900px]">CompassAI turns company knowledge into action without runaway model spend.</h2>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[["01", "Better answers.", "Built on what your business knows."], ["02", "Fewer tokens.", "Less sent to the model."], ["03", "Lower cost to serve.", "More value from every query."]].map(([n, a, b]) => (
              <div key={n} className="card p-8 min-h-[260px] flex flex-col justify-between">
                <span className="eyebrow">{n}</span>
                <p className="text-[28px] leading-tight tracking-tight text-ink">{a}<br /><span className="text-muted">{b}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 built for enterprise */}
      <section className="py-24">
        <div className="container-x">
          <h2 className="display text-[32px] sm:text-[52px] max-w-[900px]">Built for enterprise from day one.</h2>
          <p className="mt-4 max-w-[640px] text-[19px] text-muted">AI only works in the enterprise when answers are secure, explainable and permission-aware.</p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[["Enterprise-grade security.", "Users only see what they’re allowed to see."], ["Full observability.", "Track every query, answer and action."], ["Strong data governance.", "Delete a source and it leaves search instantly."]].map(([a, b]) => (
              <div key={a} className="rounded-2xl bg-cream p-8 min-h-[220px]"><p className="text-[24px] tracking-tight text-ink">{a}</p><p className="mt-3 text-muted">{b}</p></div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">{CERTS.map((c) => <span key={c} className="rounded-full border border-line px-4 py-2 text-[14px] text-muted">{c}</span>)}</div>
          <Link href="/platform/security" className="btn btn-black mt-8">Explore CompassAI Shield</Link>
        </div>
      </section>

      {/* 6 stats */}
      <section className="py-24 bg-cream">
        <div className="container-x">
          <h2 className="display text-[32px] sm:text-[52px] max-w-[860px]">Enterprise AI people actually use.</h2>
          <p className="mt-4 text-muted text-[19px]">Flexible across models, trusted across the enterprise.</p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {[["40+", "Unique LLMs supported"], ["110 hours", "Saved per user each year"], ["93%", "Adoption in under 2 years"], ["275+", "Planned connectors"], ["3+ billion", "Searches across knowledge objects"], ["99.9%+", "Uptime target for core services"]].map(([n, l]) => (
              <div key={l} className="bg-white p-8"><div className="text-[44px] tracking-tighter text-ink">{n}</div><div className="mt-1 text-muted">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 industries */}
      <IndustryTabs />

      {/* 8 customers */}
      <section className="py-24 bg-cream">
        <div className="container-x">
          <p className="eyebrow">One platform. Every team.</p>
          <h2 className="display mt-4 text-[32px] sm:text-[52px] max-w-[860px]">Transforming every department with enterprise AI.</h2>
          <p className="mt-4 max-w-[600px] text-[19px] text-muted">From engineering to sales to support to HR, CompassAI helps every department move faster with trusted AI.</p>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {STORIES.map((s) => (
              <article key={s.co} className="card p-8 flex flex-col">
                <h3 className="text-[24px] tracking-tight text-ink leading-tight">{s.co}</h3>
                <div className="mt-8 flex gap-8">{s.s.map(([n, l]) => <div key={l}><div className="text-[34px] tracking-tighter text-ink">{n}</div><div className="text-[13px] text-muted max-w-[110px]">{l}</div></div>)}</div>
                <p className="mt-8 text-[17px] flex-1">{s.p}</p>
                <Link href="/resources/customer-stories" className="mt-6 text-brand">See customer story →</Link>
              </article>
            ))}
          </div>
          <Link href="/resources/customer-stories" className="btn btn-black mt-10">See customer stories</Link>
        </div>
      </section>

      {/* 9 products */}
      <section className="py-24">
        <div className="container-x">
          <h2 className="display text-[32px] sm:text-[52px] max-w-[900px]">From knowledge to action. One platform for enterprise AI.</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map(([a, b, h], i) => (
              <Link key={a} href={h} className="group card p-7 min-h-[300px] flex flex-col justify-between hover:border-brand transition">
                <span className="eyebrow">0{i + 1}</span>
                <div><p className="text-[26px] tracking-tight text-ink">{a}</p><p className="mt-2 text-muted">{b}</p><ArrowRight className="mt-6 text-brand transition group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10 work AI (black) */}
      <section className="bg-black py-24 text-white">
        <div className="container-x">
          <p className="eyebrow !text-white/60">Leading voices in AI</p>
          <h2 className="mt-4 text-[32px] sm:text-[52px] leading-[1.05] tracking-[-0.04em] max-w-[760px]">We help you face the future of work.</h2>
          <Link href="/work-ai-institute" className="btn mt-8 bg-white text-black">Discover Work AI Institute</Link>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[["Report", "The Work AI Index", "View full report"], ["Podcast", "Intelligence: Real & Imagined", "Listen to episode"], ["Quiz", "The AI Reality Check", "Take the quiz"]].map(([k, t, c]) => (
              <Link key={t} href="/work-ai-institute" className="rounded-2xl border border-white/15 p-7 min-h-[240px] flex flex-col justify-between hover:bg-white/5">
                <span className="eyebrow !text-white/60">{k}</span><div><p className="text-[24px] tracking-tight">{t}</p><p className="mt-3 text-[#e5ff6b]">{c} →</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11 support (cream) */}
      <section className="bg-cream py-20">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[["Learn from the CompassAI community", "/help"], ["Expert help, from strategy to rollout", "/partners"], ["Answers when you need them", "/help"]].map(([t, h]) => (
            <Link key={t} href={h} className="card p-8 min-h-[200px] flex flex-col justify-between hover:border-brand"><p className="text-[24px] leading-tight tracking-tight text-ink">{t}</p><ArrowRight className="text-brand" /></Link>
          ))}
        </div>
      </section>

      {/* 12 resources */}
      <section className="py-24">
        <div className="container-x">
          <h2 className="display text-[32px] sm:text-[52px]">Latest and greatest from CompassAI</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[["Blog", "The intelligence era is here: efficient, governed and proactive AI powered by enterprise context", "/blog"], ["Whitepaper", "The token economy: how enterprise AI architecture drives cost and utility at scale", "/resources/guides"], ["Featured guide", "Choosing between no-code agent builders: a practical buyer’s guide", "/resources/guides"]].map(([k, t, h]) => (
              <Link key={t} href={h} className="group">
                <div className="hero-art h-[240px] group-hover:opacity-95" />
                <p className="eyebrow mt-5">{k}</p><p className="mt-2 text-[22px] leading-tight tracking-tight text-ink">{t}</p><p className="mt-3 text-brand">Read more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 13 CTA */}
      <section className="pb-24">
        <div className="container-x">
          <div className="hero-art px-8 py-20 text-center">
            <h2 className="relative z-10 mx-auto max-w-[760px] text-[36px] sm:text-[60px] leading-[1.02] tracking-[-0.045em] text-white">Put your company’s knowledge to work.</h2>
            <div className="relative z-10 mt-8 flex justify-center gap-3 flex-wrap">
              <Link href="/signup" className="btn bg-white text-black">Start free</Link>
              <Link href="/get-a-demo" className="btn btn-black">Get a demo</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
