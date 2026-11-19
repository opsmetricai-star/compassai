import { supabaseAdmin } from "@/lib/supabase/server";
import { PLANS } from "@/lib/site";

/** Activates a plan for a user by email. Callers MUST have verified payment (admin confirmation or authenticated webhook). */
export async function activatePlan(email: string, plan: "starter" | "pro", reference: string | null, confirmedBy: string) {
  const admin = supabaseAdmin();
  const limit = PLANS.find((p) => p.id === plan)!.credits;
  const { data: prof } = await admin.from("profiles").select("id").ilike("email", email).maybeSingle();
  await admin.from("payments").insert({ email, plan, reference, confirmed_by: confirmedBy, status: prof ? "confirmed" : "pending_signup" });
  if (!prof) return { activated: false, reason: "No account with that email yet. Payment recorded as pending." };
  await admin.from("profiles").update({ plan, credits_limit: limit, credits_used: 0, period_start: new Date().toISOString() }).eq("id", prof.id);
  await admin.from("notifications").insert({ owner_id: prof.id, title: `${plan === "pro" ? "Pro" : "Starter"} plan activated`, body: `You now have ${limit.toLocaleString()} credits per month.` });
  return { activated: true };
}
