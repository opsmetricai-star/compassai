import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, FREE_CREDITS } from "@/lib/site";

export const metadata = { title: "Pricing | CompassAI" };

const FAQ = [
  ["How do I upgrade?", "Choose a plan, pay through the secure checkout link, and use the same email as your CompassAI account. We confirm the payment and activate your plan, usually within one business day."],
  ["What counts as a credit?", "Each AI answer, research brief or agent run uses one credit. Searching your documents is free."],
  ["What happens when credits run out?", "AI requests pause and you are prompted to upgrade. Your documents and history stay intact."],
  ["Can I try it first?", `Yes. Every new account includes ${FREE_CREDITS} free credits.`],
];

export default function Pricing() {
  return (
    <>
      <section className="pt-20 pb-10 text-center">
        <div className="container-x">
          <p className="eyebrow">Pricing</p>
          <h1 className="display mx-auto mt-5 max-w-[900px] text-[44px] sm:text-[72px]">Simple plans. Clear limits.</h1>
          <p className="mx-auto mt-6 max-w-[560px] text-[20px] text-muted">Start free with {FREE_CREDITS} credits. Upgrade when your team is ready.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px]">
          <div className="card p-8 flex flex-col">
            <p className="text-[22px] text-ink">Free</p>
            <p className="mt-4 text-[48px] tracking-tighter text-ink">$0</p>
            <p className="mt-2 text-muted">Try CompassAI on your own documents.</p>
            <ul className="mt-6 space-y-3 flex-1">{[`${FREE_CREDITS} AI answers`, "1 workspace", "Cited answers"].map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-brand mt-0.5" />{f}</li>)}</ul>
            <Link href="/signup" className="btn btn-outline mt-8 justify-center">Start free</Link>
          </div>
          {PLANS.map((p) => (
            <div key={p.id} className={`card p-8 flex flex-col ${"popular" in p && p.popular ? "border-brand shadow-xl" : ""}`}>
              <div className="flex items-center justify-between"><p className="text-[22px] text-ink">{p.name}</p>{"popular" in p && p.popular && <span className="rounded-full bg-brand-soft px-3 py-1 text-[12px] text-brand">Most popular</span>}</div>
              <p className="mt-4 text-[48px] tracking-tighter text-ink">${p.price}<span className="text-[18px] text-muted"> / month</span></p>
              <p className="mt-2 text-muted">{p.blurb}</p>
              <ul className="mt-6 space-y-3 flex-1">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-brand mt-0.5" />{f}</li>)}</ul>
              <Link href={`/signup?plan=${p.id}`} className="btn btn-blue mt-8 justify-center">Get {p.name}</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="container-x max-w-[820px]">
          <h2 className="display text-[32px] sm:text-[44px]">Questions</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {FAQ.map(([q, a]) => (<details key={q} className="group py-5"><summary className="cursor-pointer list-none text-[19px] text-ink flex justify-between">{q}<span className="text-brand group-open:rotate-45 transition">+</span></summary><p className="mt-3 text-muted">{a}</p></details>))}
          </div>
        </div>
      </section>
    </>
  );
}
