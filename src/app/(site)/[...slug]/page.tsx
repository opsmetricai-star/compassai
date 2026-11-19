import Link from "next/link";
import { notFound } from "next/navigation";
import { PAGES, pageByPath } from "@/lib/pages";

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const p = pageByPath("/" + slug.join("/"));
  return p ? { title: `${p.title} | CompassAI`, description: p.sub } : {};
}

export default async function Generic({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const p = pageByPath("/" + slug.join("/"));
  if (!p) notFound();
  const crumbs = p.path.split("/").filter(Boolean);
  return (
    <>
      <section className="pt-20 pb-16">
        <div className="container-x">
          <p className="eyebrow">{p.eyebrow}</p>
          <h1 className="display mt-5 max-w-[960px] text-[42px] sm:text-[72px]">{p.title}</h1>
          <p className="mt-6 max-w-[640px] text-[20px] text-muted">{p.sub}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/signup" className="btn btn-blue">Start free</Link>
            <Link href="/get-a-demo" className="btn btn-outline">Get a demo</Link>
          </div>
          <div className="hero-art mt-14 h-[280px] sm:h-[440px]" />
        </div>
      </section>

      {p.stats && (
        <section className="hairline-grid">
          <div className="container-x grid sm:grid-cols-3 gap-6 py-10">
            {p.stats.map((s) => (<div key={s.l}><div className="text-[44px] tracking-tighter text-ink">{s.n}</div><div className="text-muted">{s.l}</div></div>))}
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="container-x">
          {p.blocks.map((b, i) => (
            <div key={b.t} className={`grid lg:grid-cols-2 gap-10 items-center py-10 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="hero-art h-[260px] sm:h-[340px]" />
              <div>
                <p className="eyebrow">0{i + 1}</p>
                <h2 className="mt-3 text-[30px] sm:text-[40px] leading-tight tracking-[-0.03em] text-ink">{b.t}</h2>
                <p className="mt-4 text-[18px] text-muted max-w-[520px]">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {p.steps && (
        <section className="bg-cream py-24">
          <div className="container-x">
            <h2 className="display text-[32px] sm:text-[48px]">How it works</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {p.steps.map((s, i) => (<div key={s.t} className="card p-8"><span className="eyebrow">Step {i + 1}</span><p className="mt-3 text-[26px] tracking-tight text-ink">{s.t}</p><p className="mt-3 text-muted">{s.d}</p></div>))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="container-x">
          <div className="rounded-2xl bg-black p-10 sm:p-16 text-white">
            <h2 className="text-[32px] sm:text-[52px] leading-[1.05] tracking-[-0.04em] max-w-[720px]">See {crumbs.length > 1 ? "it" : "CompassAI"} on your own knowledge.</h2>
            <div className="mt-8 flex gap-3 flex-wrap"><Link href="/signup" className="btn bg-white text-black">Start free</Link><Link href="/pricing" className="btn border border-white/40 text-white">See pricing</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
