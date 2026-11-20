"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Logo } from "./Logo";

type Mode = "login" | "signup" | "forgot" | "reset";
const COPY: Record<Mode, { h: string; btn: string }> = {
  login: { h: "Sign in to CompassAI", btn: "Sign in" },
  signup: { h: "Create your CompassAI account", btn: "Create account" },
  forgot: { h: "Reset your password", btn: "Send reset link" },
  reset: { h: "Choose a new password", btn: "Update password" },
};

function Inner({ mode }: { mode: Mode }) {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/app";
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(sp.get("error") === "config" ? "Sign in is temporarily unavailable. Please try again shortly." : "");
  const [info, setInfo] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setInfo(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    try {
      const sb = supabaseBrowser();
      const origin = (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin).replace(/[/]+$/, "");
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace(next.startsWith("/") ? next : "/app"); router.refresh();
      } else if (mode === "signup") {
        if (password.length < 8) throw new Error("Use at least 8 characters.");
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: String(f.get("name") ?? "") }, emailRedirectTo: `${origin}/auth/callback` } });
        if (error) throw error;
        if (data.session) { router.replace("/app"); router.refresh(); }
        else setInfo("Check your email to confirm your account, then sign in.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error;
        setInfo("If an account exists for that email, a reset link is on its way.");
      } else {
        if (password.length < 8) throw new Error("Use at least 8 characters.");
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.replace("/app");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally { setBusy(false); }
  }

  const cls = "w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand";
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 sm:px-16 py-12">
        <Link href="/"><Logo /></Link>
        <h1 className="display mt-14 text-[40px]">{COPY[mode].h}</h1>
        <form onSubmit={submit} className="mt-8 max-w-[420px] space-y-4">
          {mode === "signup" && <input name="name" required placeholder="Full name" className={cls} />}
          {mode !== "reset" && <input name="email" type="email" required placeholder="Work email" className={cls} autoComplete="email" />}
          {mode !== "forgot" && <input name="password" type="password" required minLength={mode === "login" ? 1 : 8} placeholder="Password" className={cls} autoComplete={mode === "login" ? "current-password" : "new-password"} />}
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          {info && <p className="text-sm text-brand">{info}</p>}
          <button disabled={busy} className="btn btn-blue w-full justify-center disabled:opacity-60">{busy ? "Please wait…" : COPY[mode].btn}</button>
        </form>
        <div className="mt-6 text-[15px] text-muted space-x-4">
          {mode === "login" && (<><Link className="text-brand" href="/signup">Create account</Link><Link href="/forgot-password">Forgot password?</Link></>)}
          {mode === "signup" && <span>Have an account? <Link className="text-brand" href="/login">Sign in</Link></span>}
          {mode === "forgot" && <Link className="text-brand" href="/login">Back to sign in</Link>}
        </div>
      </div>
      <div className="hidden lg:block p-6"><div className="hero-art h-full" /></div>
    </div>
  );
}

export function AuthForm({ mode }: { mode: Mode }) {
  return <Suspense><Inner mode={mode} /></Suspense>;
}
