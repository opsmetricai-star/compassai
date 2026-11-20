import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";

export type Passage = { chunk_id: string; document_id: string; title: string; content: string };

const Out = z.object({
  answer: z.string().min(1),
  cited: z.array(z.number().int()).default([]),
  insufficient: z.boolean().default(false),
});
export type AiResult = z.infer<typeof Out> & { model: string };

const FORMATS: Record<string, string> = {
  brief: "Write a concise brief in short paragraphs.",
  bullets: "Write a bulleted list of the key points.",
  table: "Write the answer as a Markdown table where it fits.",
  email: "Write the answer as a short, ready-to-send email draft.",
};

export async function generateGrounded(opts: {
  question: string;
  passages: Passage[];
  history?: { role: string; content: string }[];
  mode?: "ask" | "research";
  format?: keyof typeof FORMATS;
  instructions?: string;
}): Promise<AiResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("The AI service is temporarily unavailable.");
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const ai = new GoogleGenAI({ apiKey: key });

  const context = opts.passages.map((p, i) => `[${i + 1}] (${p.title})\n${p.content}`).join("\n\n");
  const system = [
    "You are CompassAI, a workplace assistant. Answer ONLY from the numbered source passages provided.",
    "If the passages do not contain the answer, set insufficient=true and say what is missing. Never invent facts.",
    "In 'cited', list the numbers of the passages you actually used.",
    opts.mode === "research" ? "Produce a structured analysis with findings, risks and open questions." : "Be direct and concise.",
    FORMATS[opts.format ?? "brief"],
    opts.instructions ? `Standing instructions from the user: ${opts.instructions}` : "",
  ].filter(Boolean).join("\n");

  const history = (opts.history ?? []).slice(-6).map((m) => `${m.role}: ${m.content}`).join("\n");
  const prompt = `SOURCES:\n${context || "(none found)"}\n\n${history ? `RECENT CONVERSATION:\n${history}\n\n` : ""}QUESTION:\n${opts.question}`;

  // Try the configured model, then a fallback; each call has a hard timeout so a hung request cannot stall the app.
  const candidates = [...new Set([model, "gemini-3.1-flash-lite"])];
  let res: Awaited<ReturnType<typeof call>> | undefined;
  let used = model;
  let lastErr: unknown;
  for (const m of candidates) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try { res = await call(m); used = m; break; } catch (e) {
        lastErr = e;
        if (!/503|UNAVAILABLE|429|overload|high demand|abort|timeout/i.test(String(e))) throw e;
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    if (res) break;
  }
  if (!res) throw lastErr ?? new Error("AI unavailable");
  const parsed = Out.safeParse(JSON.parse(res.text ?? "{}"));
  if (!parsed.success) throw new Error("The AI returned an unreadable response. Please try again.");
  return { ...parsed.data, model: used };

  function call(m: string) { return ai.models.generateContent({
    model: m,
    contents: prompt,
    config: {
      systemInstruction: system,
      temperature: 0.2,
      httpOptions: { timeout: 25_000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answer: { type: Type.STRING },
          cited: { type: Type.ARRAY, items: { type: Type.INTEGER } },
          insufficient: { type: Type.BOOLEAN },
        },
        required: ["answer", "cited", "insufficient"],
      },
    },
  }); }
}

export function chunkText(text: string, size = 900, overlap = 120): string[] {
  const clean = text.replace(/\r/g, "").replace(/[ \t]+/g, " ").trim();
  const out: string[] = [];
  let i = 0;
  while (i < clean.length) {
    let end = Math.min(i + size, clean.length);
    if (end < clean.length) {
      const brk = clean.lastIndexOf("\n", end);
      const dot = clean.lastIndexOf(". ", end);
      const cut = Math.max(brk, dot);
      if (cut > i + size * 0.5) end = cut + 1;
    }
    out.push(clean.slice(i, end).trim());
    if (end >= clean.length) break;
    i = Math.max(end - overlap, i + 1);
  }
  return out.filter(Boolean);
}

/** Blocks obvious SSRF targets before fetching a user-supplied URL. */
export function assertPublicUrl(raw: string): URL {
  const u = new URL(raw);
  if (!["http:", "https:"].includes(u.protocol)) throw new Error("Only http(s) URLs are allowed.");
  const h = u.hostname.toLowerCase();
  const bad = /^(localhost|0\.0\.0\.0|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?|.*\.internal|.*\.local)/;
  if (bad.test(h)) throw new Error("That address is not allowed.");
  return u;
}

export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|li|h\d|br|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
}
