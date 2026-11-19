import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail, supabaseServer } from "@/lib/supabase/server";
import { activatePlan } from "@/lib/billing";

const Body = z.object({ email: z.string().email(), plan: z.enum(["starter", "pro"]), reference: z.string().max(120).optional() });

export async function POST(req: Request) {
  const { data } = await (await supabaseServer()).auth.getUser();
  if (!isAdminEmail(data.user?.email)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Enter a valid email and plan." }, { status: 400 });
  const r = await activatePlan(p.data.email, p.data.plan, p.data.reference ?? null, data.user!.email!);
  return NextResponse.json(r);
}
