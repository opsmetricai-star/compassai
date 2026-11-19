"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState(true);
  const [acc, setAcc] = useState<string | null>(null);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_20px_rgba(0,0,0,.05)]">
      {banner && (
        <div className="bg-[#0a0a5c] text-white text-[13px]">
          <div className="container-x flex items-center justify-center gap-3 py-2 relative">
            <span>November Drop 2026: Model routing, usage controls, and agent governance are live.</span>
            <Link href="/platform" className="text-[#e5ff6b] hidden sm:inline">See what’s new →</Link>
            <button aria-label="Dismiss" onClick={() => setBanner(false)} className="absolute right-4"><X size={14} /></button>
          </div>
        </div>
      )}
      <div className="container-x flex h-[68px] items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" aria-label="CompassAI home"><Logo /></Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((m) => (
              <div key={m.label} className="group relative">
                <button className="flex items-center gap-1.5 px-4 py-6 text-[16px] text-muted hover:text-ink">
                  {m.label} <ChevronDown size={14} className="transition group-hover:rotate-180" />
                </button>
                <div className="dd absolute left-0 top-full">
                  <div className="card shadow-xl p-6 flex gap-8 min-w-[260px]">
                    {m.groups.map((g, i) => (
                      <div key={i} className="min-w-[210px]">
                        {g.title && <div className="eyebrow mb-3 uppercase text-[11px]">{g.title}</div>}
                        <ul className="space-y-1">
                          {g.items.map((it) => (
                            <li key={it.href}>
                              <Link href={it.href} className="block rounded-lg px-2 py-1.5 hover:bg-cream">
                                <span className="text-ink text-[15px]">{it.label}</span>
                                {it.desc && <span className="block text-[13px] text-muted">{it.desc}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="hidden sm:block whitespace-nowrap text-muted hover:text-ink">Sign in</Link>
          <Link href="/get-a-demo" className="btn btn-black hidden sm:inline-flex">Get a demo</Link>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-line bg-white max-h-[80vh] overflow-auto">
          <div className="container-x py-4">
            {NAV.map((m) => (
              <div key={m.label} className="border-b border-line">
                <button className="flex w-full items-center justify-between py-4 text-[18px]" onClick={() => setAcc(acc === m.label ? null : m.label)}>
                  {m.label} <ChevronDown size={16} className={acc === m.label ? "rotate-180" : ""} />
                </button>
                {acc === m.label && (
                  <ul className="pb-3 space-y-2">
                    {m.groups.flatMap((g) => g.items).map((it) => (
                      <li key={it.href}><Link onClick={() => setOpen(false)} href={it.href} className="block py-1 text-muted">{it.label}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="flex gap-3 py-5">
              <Link href="/login" className="btn btn-outline">Sign in</Link>
              <Link href="/get-a-demo" className="btn btn-black">Get a demo</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
