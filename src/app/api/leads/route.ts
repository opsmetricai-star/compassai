import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";

const Body = z.object({
  kind: z.enum(["demo", "contact"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
});

export async function POST(req: Request) {
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Please check your name and email." }, { status: 400 });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Form storage is not configured yet." }, { status: 503 });
  const { error } = await supabaseAdmin().from("leads").insert(p.data);
  if (error) return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
