import { NextResponse } from "next/server";
import { z } from "zod";
import { timingSafeEqual } from "crypto";
import { activatePlan } from "@/lib/billing";

// Generic, secret-authenticated endpoint. It trusts ONLY callers that know PAYMENT_WEBHOOK_SECRET.
// Selar's webhook payload format has not been verified here, so map it to this shape in your own relay.
const Body = z.object({ email: z.string().email(), plan: z.enum(["starter", "pro"]), reference: z.string().max(120).optional() });

export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  const got = req.headers.get("x-webhook-secret") ?? "";
  if (!secret || got.length !== secret.length || !timingSafeEqual(Buffer.from(got), Buffer.from(secret))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Bad payload." }, { status: 400 });
  return NextResponse.json(await activatePlan(p.data.email, p.data.plan, p.data.reference ?? null, "webhook"));
}
