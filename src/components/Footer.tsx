import Link from "next/link";
import { FOOTER } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-foot border-t border-line">
      <div className="container-x py-16 grid gap-12 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[260px] text-[15px] text-muted">Work AI that understands your company.</p>
          <Link href="/get-a-demo" className="btn btn-black mt-6">Get a demo</Link>
        </div>
        {FOOTER.map((c) => (
          <div key={c.title}>
            <div className="eyebrow uppercase text-[11px] mb-4">{c.title}</div>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-[15px] text-text hover:text-brand">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-x py-6 flex flex-wrap justify-between gap-3 text-[13px] text-muted">
          <span>© 2026 CompassAI. All rights reserved.</span>
          <span className="flex gap-5">
            <Link href="/privacy">Privacy</Link><Link href="/website-terms">Terms</Link><Link href="/trust">Trust center</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
