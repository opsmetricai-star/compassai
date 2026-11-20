import Link from "next/link";
import { ArrowRight } from "lucide-react";

const OUTCOMES = [
  ["Decisions in seconds", "Questions that took a day of searching return a cited answer in seconds, so leaders act while the window is open."],
  ["Lower cost per answer", "Only the most relevant passages reach the model. Fewer tokens per request means lower spend at every volume."],
  ["Reduced risk", "Every answer shows the exact passages behind it. Teams verify before they commit, and the record is stored."],
];

const ENGINE = [
  ["Analyzes", "Retrieves and ranks passages from your documents for every question, then writes from that evidence alone."],
  ["Recommends", "Research mode returns findings, risks and open questions in a structure built for review and approval."],
  ["Automates", "Agents turn a proven prompt into a workflow any teammate runs on new input, with sources attached."],
];

const TEAMS = [
  ["Engineering", "/solutions/departments/engineering", "Cut onboarding time and repeat incidents."],
  ["Sales", "/solutions/departments/sales", "Enter every account conversation fully briefed."],
  ["Customer service", "/solutions/departments/customer-service", "Resolve more tickets on the first reply."],
  ["Finance", "/solutions/departments/finance", "Find the policy and precedent behind every number."],
  ["Legal", "/solutions/departments/legal", "Review faster with the exact clause at hand."],
  ["People", "/solutions/departments/people", "Answer employee questions without a queue."],
];

export default function Home() {
  return (
    <>
      <section className="pt-16 sm:pt-24 pb-10 text-center">
        <div className="container-x">
          <p className="eyebrow fade-up">The AI engine for company knowledge</p>
          <h1 className="display fade-up mx-auto mt-6 max-w-[1050px] text-[40px] sm:text-[72px] lg:text-[88px]">AI that runs on what your company knows.</h1>
          <p className="mx-auto mt-6 max-w-[720px] text-[18px] sm:text-[21px] text-muted">CompassAI analyzes your internal documents, answers with cited evidence and automates repeatable work. Teams decide faster, spend less and carry less risk.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup" className="btn btn-blue">Sign up</Link>
            <Link href="/login" className="btn btn-outline">Sign in</Link>
          </div>
          <div className="hero-art mt-16 h-[260px] sm:h-[520px]" />
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <h2 className="text-[30px] sm:text-[48px] leading-[1.05] tracking-[-0.04em] text-muted">AI adoption is accelerating.<br /><span className="text-ink">Ungrounded AI is a liability.</span><br />CompassAI answers from evidence.</h2>
          <ul className="space-y-4">
            {[["Context.", "Your documents are indexed at passage level and retrieved per question."], ["Grounding.", "The model writes only from the passages it is given and cites each one."], ["Isolation.", "Row-level security separates every organization's data in the database."], ["Efficiency.", "Targeted retrieval keeps each request small and inexpensive."]].map(([a, b]) => (
              <li key={a} className="border-t border-line pt-4 text-[18px]"><b className="font-medium text-ink">{a}</b> {b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="container-x">
          <h2 className="display text-[30px] sm:text-[52px] max-w-[900px]">Outcomes that show up in the numbers your board reviews.</h2>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {OUTCOMES.map(([a, b], i) => (
              <div key={a} className="card p-8 min-h-[260px] flex flex-col justify-between">
                <span className="eyebrow">0{i + 1}</span>
                <div><p className="text-[26px] leading-tight tracking-tight text-ink">{a}</p><p className="mt-3 text-muted">{b}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <h2 className="display text-[30px] sm:text-[52px] max-w-[900px]">One engine. Three jobs that move the business.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {ENGINE.map(([a, b]) => (
              <div key={a} className="rounded-2xl bg-cream p-8 min-h-[220px]"><p className="text-[28px] tracking-tight text-ink">{a}</p><p className="mt-3 text-muted">{b}</p></div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/platform" className="inline-flex items-center gap-2 text-brand">Platform overview <ArrowRight size={16} /></Link>
            <Link href="/ai-agents" className="inline-flex items-center gap-2 text-brand">Agents <ArrowRight size={16} /></Link>
            <Link href="/platform/security" className="inline-flex items-center gap-2 text-brand">Security <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container-x">
          <p className="eyebrow">Built for every team</p>
          <h2 className="display mt-4 text-[30px] sm:text-[52px] max-w-[860px]">Deployed where hours are lost to searching.</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAMS.map(([n, h, d]) => (
              <Link key={n} href={h} className="group card p-7 min-h-[200px] flex flex-col justify-between hover:border-brand transition">
                <p className="text-[24px] tracking-tight text-ink">{n}</p>
                <div><p className="text-muted">{d}</p><ArrowRight className="mt-4 text-brand transition group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <h2 className="display text-[30px] sm:text-[52px] max-w-[900px]">From documents to decisions in three steps.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[["Ingest", "Add documents, notes and web pages. Each source is indexed within seconds."], ["Analyze", "Ask a question. CompassAI retrieves the evidence and answers with citations."], ["Automate", "Save the prompt as an agent and run it on new input whenever the work repeats."]].map(([a, b], i) => (
              <div key={a} className="card p-7 min-h-[240px] flex flex-col justify-between"><span className="eyebrow">Step {i + 1}</span><div><p className="text-[26px] tracking-tight text-ink">{a}</p><p className="mt-2 text-muted">{b}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="hero-art px-8 py-20 text-center">
            <h2 className="relative z-10 mx-auto max-w-[760px] text-[34px] sm:text-[60px] leading-[1.02] tracking-[-0.045em] text-white">Put your company knowledge to work.</h2>
            <p className="relative z-10 mx-auto mt-4 max-w-[520px] text-white/90">Every account starts with 20 free credits.</p>
            <div className="relative z-10 mt-8 flex justify-center gap-3 flex-wrap">
              <Link href="/signup" className="btn bg-white text-black">Sign up</Link>
              <Link href="/login" className="btn btn-black">Sign in</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
