import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, FREE_CREDITS } from "@/lib/site";

export const metadata = { title: "Pricing | CompassAI" };

const FAQ = [
  ["How does activation work?", "Complete checkout with the email address you use for your CompassAI account. We confirm the payment and activate your plan, and you receive a notification in the app. A payment redirect alone does not unlock a plan."],
  ["What counts as a credit?", "One credit covers one answer, research brief or agent run. Searching your documents is free."],
  ["What happens when credits run out?", "AI requests pause and the app prompts you to upgrade. Your documents, agents and history stay intact."],
  ["Is there a free allowance?", `Every new account includes ${FREE_CREDITS} free credits and one workspace.`],
];

export default function Pricing() {
  return (
    <>
      <section className="pt-20 pb-10 text-center">
        <div className="container-x">
          <p className="eyebrow">Pricing</p>
          <h1 className="display mx-auto mt-5 max-w-[900px] text-[40px] sm:text-[72px]">Predictable pricing for AI at work.</h1>
          <p className="mx-auto mt-6 max-w-[600px] text-[20px] text-muted">Each plan includes a monthly credit allowance enforced on the server, so spend never runs ahead of the plan.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px]">
          <div className="card p-8 flex flex-col">
            <p className="text-[22px] text-ink">Free</p>
            <p className="mt-4 text-[48px] tracking-tighter text-ink">$0</p>
            <p className="mt-2 text-muted">Evaluate CompassAI on your own documents.</p>
            <ul className="mt-6 space-y-3 flex-1">{[`${FREE_CREDITS} AI credits`, "1 workspace", "1 saved agent", "Cited answers on every response"].map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-brand mt-0.5 shrink-0" />{f}</li>)}</ul>
            <Link href="/signup" className="btn btn-outline mt-8 justify-center">Sign up</Link>
          </div>
          {PLANS.map((p) => (
            <div key={p.id} className={`card p-8 flex flex-col ${"popular" in p && p.popular ? "border-brand shadow-xl" : ""}`}>
              <div className="flex items-center justify-between"><p className="text-[22px] text-ink">{p.name}</p>{"popular" in p && p.popular && <span className="rounded-full bg-brand-soft px-3 py-1 text-[12px] text-brand">Most popular</span>}</div>
              <p className="mt-4 text-[48px] tracking-tighter text-ink">${p.price}<span className="text-[18px] text-muted"> / month</span></p>
              <p className="mt-2 text-muted">{p.blurb}</p>
              <ul className="mt-6 space-y-3 flex-1">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-brand mt-0.5 shrink-0" />{f}</li>)}</ul>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-blue mt-8 justify-center">Sign up</a>
            </div>
          ))}
        </div>
        <p className="container-x mt-6 max-w-[1100px] text-[14px] text-muted">Paid plans open secure checkout. Use the same email as your CompassAI account, and create the account at <Link href="/signup" className="text-brand">sign up</Link> if you have not already.</p>
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
