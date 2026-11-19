"use client";
import { useState } from "react";
import Link from "next/link";

const TABS = [
  { k: "Financial Services", h: "CompassAI unifies client and market context to make high-stakes decisions faster", b: ["Surface client, product and market context in one cited view", "Draft decision-ready analyses, research briefs and account summaries", "Put AI to work in regulated workflows with the controls banks require"], q: "The goal is simple: give every banker the full picture before the conversation starts.", a: "Head of Transformation, Meridian Capital (sample)", href: "/solutions/industries/financial-services" },
  { k: "Healthcare", h: "CompassAI gives care and admin teams the protocol they need, instantly", b: ["Find approved procedures without a phone call", "Draft routine documents from existing templates", "Keep access boundaries strict by default"], q: "Staff stopped hunting for forms and started finishing work.", a: "Operations Director, Lakeside Health (sample)", href: "/solutions/industries/healthcare" },
  { k: "Retail", h: "CompassAI keeps every store, supplier and planner aligned", b: ["Answer store procedure questions at the shelf edge", "Recall merchandising results from past seasons", "Keep supplier terms in one searchable place"], q: "Head office calls dropped sharply in the first month.", a: "COO, Harbor & Pine (sample)", href: "/solutions/industries/retail" },
  { k: "Technology", h: "CompassAI turns engineering knowledge into shipping speed", b: ["Onboard engineers in days with cited runbooks", "Recall incident history and fixes", "Draft release notes from merged work"], q: "New hires ship in their first week.", a: "VP Engineering, Northwind Labs (sample)", href: "/solutions/departments/engineering" },
  { k: "Industrials", h: "CompassAI puts plant-floor and engineering knowledge within reach", b: ["Find maintenance procedures instantly", "Cite the exact safety standard", "Trace engineering change decisions"], q: "The manual we needed was always one question away.", a: "Plant Manager (sample)", href: "/solutions/industries/industrials" },
  { k: "Consulting", h: "CompassAI turns every past engagement into a head start", b: ["Start proposals from your best prior work", "Find the expert who has done this before", "Keep delivery method consistent"], q: "Proposals that took days now take hours.", a: "Managing Partner (sample)", href: "/solutions/industries/professional-services" },
];

export function IndustryTabs() {
  const [i, setI] = useState(0);
  const t = TABS[i];
  return (
    <section className="py-24">
      <div className="container-x">
        <h2 className="display text-[32px] sm:text-[44px] max-w-[760px]">Enterprise AI that speaks your industry’s language.</h2>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist">
          {TABS.map((x, n) => (
            <button key={x.k} role="tab" aria-selected={n === i} onClick={() => setI(n)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[15px] transition ${n === i ? "bg-black text-white border-black" : "border-line text-muted hover:text-ink"}`}>{x.k}</button>
          ))}
        </div>
        <div key={i} className="fade-up mt-8 grid lg:grid-cols-2 gap-8">
          <div className="hero-art min-h-[320px] lg:min-h-[480px]" />
          <div className="flex flex-col justify-between py-2">
            <div>
              <h3 className="text-[26px] sm:text-[32px] leading-tight tracking-tight text-ink">{t.h}</h3>
              <ul className="mt-8 space-y-4">
                {t.b.map((x) => (<li key={x} className="flex gap-3 text-[17px]"><span className="mt-2 h-2 w-2 rounded-full bg-brand shrink-0" />{x}</li>))}
              </ul>
              <Link href={t.href} className="btn btn-outline mt-8">Learn more</Link>
            </div>
            <blockquote className="mt-10 border-t border-line pt-6">
              <p className="text-[20px] text-ink">“{t.q}”</p>
              <footer className="mt-2 text-[14px] text-muted">– {t.a}</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
