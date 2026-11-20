export type Block = { t: string; d: string };
export type PageDef = {
  path: string;
  kind: "product" | "solution" | "company";
  eyebrow: string;
  title: string;
  sub: string;
  blocks: Block[];
  steps?: Block[];
};

const P = (path: string, kind: PageDef["kind"], eyebrow: string, title: string, sub: string, blocks: Block[], steps?: Block[]): PageDef => ({ path, kind, eyebrow, title, sub, blocks, steps });

const steps: Block[] = [
  { t: "Ingest", d: "Add documents, notes and web pages to a workspace. Each source is split into passages and indexed within seconds." },
  { t: "Analyze", d: "Every question retrieves the most relevant passages and passes only those to the model, so answers stay grounded and costs stay low." },
  { t: "Automate", d: "Turn a proven prompt into an agent that your team runs on demand, with every output tied to its sources." },
];

const dept = (slug: string, name: string, title: string, sub: string, b: Block[]) =>
  P(`/solutions/departments/${slug}`, "solution", `${name} teams`, title, sub, b);
const ind = (slug: string, name: string, title: string, sub: string, b: Block[]) =>
  P(`/solutions/industries/${slug}`, "solution", name, title, sub, b);

export const PAGES: PageDef[] = [
  P("/platform", "product", "Platform", "The AI engine behind every decision your teams make.", "CompassAI analyzes your internal knowledge, answers with cited evidence and automates repeatable work. One platform replaces hours of searching, summarizing and cross-checking.", [
    { t: "Analysis grounded in your data", d: "Every answer is built only from passages in your workspace and cites each one, so leaders act on evidence they can verify." },
    { t: "Speed to decision", d: "Questions that took a day of digging return in seconds. Research mode produces structured briefs covering findings, risks and open questions." },
    { t: "Automation that scales", d: "Agents turn your best prompts into repeatable workflows that any team member can run, with credits metered per run." },
    { t: "Control by design", d: "Row-level security isolates every organization's data, provider keys stay on the server, and usage is recorded for every request." },
  ], steps),
  P("/platform/enterprise-context", "product", "Knowledge", "Turn scattered documents into a decision-ready knowledge base.", "CompassAI indexes what your company already wrote, so every answer reflects your policies, contracts and history instead of the open internet.", [
    { t: "Passage-level retrieval", d: "Documents are split into passages and ranked by relevance to each question. The model sees the evidence, not the whole archive." },
    { t: "Workspaces by team or client", d: "Separate knowledge by department, client or project, and search one workspace or all of them." },
    { t: "Immediate removal", d: "Delete a document and its passages leave search at once. Nothing lingers in an index you cannot inspect." },
  ]),
  P("/platform/connectors", "product", "Ingestion", "Bring company knowledge in from the formats you already use.", "Add content in the way your team already works. Each source keeps its title and origin so every citation is traceable.", [
    { t: "Paste and upload", d: "Add notes, policies and transcripts directly, or upload text, Markdown, CSV and JSON files up to 5 MB." },
    { t: "Web page ingestion", d: "Pull a public web page into a workspace. Private network addresses are blocked to protect your infrastructure." },
    { t: "Traceable sources", d: "Each answer links back to the exact document and passage it used." },
  ]),
  P("/platform/security", "product", "Security", "Enterprise data protection built into the foundation.", "Customer data is isolated at the database layer, not just in the application. Controls are enforced where the data lives.", [
    { t: "Row-level security", d: "Every table enforces ownership in PostgreSQL. A user can only read and write their own organization's records." },
    { t: "Server-side secrets", d: "AI provider keys and service credentials never reach the browser." },
    { t: "Auditable usage", d: "Every AI request and agent run is recorded with its type, time and model." },
    { t: "Safe ingestion", d: "Uploads are validated, size-limited and parsed on the server. Requests to private addresses are rejected." },
  ]),
  P("/platform/cost-controls", "product", "Usage controls", "Predictable AI spend, enforced on the server.", "Each plan carries a monthly credit allowance. Limits are checked before any model is called, so spend never runs ahead of your plan.", [
    { t: "Credits per answer", d: "One credit covers one answer, research brief or agent run. Searching your documents is free." },
    { t: "Hard limits", d: "When credits run out, requests stop with a clear upgrade path. Failed AI calls are refunded automatically." },
    { t: "Live visibility", d: "The dashboard charts credit use over time, so owners see consumption as it happens." },
  ]),
  P("/ai-assistant", "product", "Assistant", "An AI analyst that answers from your evidence and shows its work.", "Ask a business question in plain language. CompassAI retrieves the relevant passages, answers precisely and cites every source it used.", [
    { t: "Cited answers", d: "Each response lists the documents and passages behind it, so teams can verify before they act." },
    { t: "Conversation memory", d: "Follow-up questions use the earlier thread, so analysis builds instead of restarting." },
    { t: "Honest limits", d: "When your knowledge does not cover a question, the assistant says so rather than guessing." },
    { t: "Saved history", d: "Every conversation is stored and can be reopened by the person who ran it." },
  ], steps),
  P("/ai-assistant/research-and-analysis", "product", "Research mode", "Structured analysis across every source you hold.", "Research mode synthesizes more passages per question and returns findings, risks and open questions in a fixed structure that leadership can read in a minute.", [
    { t: "Broader retrieval", d: "Research mode draws on more passages per question to cover a topic end to end." },
    { t: "Decision-ready format", d: "Output is organized as findings, risks and open questions, ready for review." },
    { t: "Evidence trail", d: "Each claim maps back to a source passage in your workspace." },
  ]),
  P("/enterprise-search", "product", "Search", "Find the exact passage across every workspace in seconds.", "Full-text search ranks passages by relevance across all your documents. It is free and does not consume credits.", [
    { t: "Relevance ranking", d: "Results are ranked by how closely each passage matches the query." },
    { t: "Across every workspace", d: "Search one workspace or your entire knowledge base from one box." },
    { t: "Zero credit cost", d: "Teams can search as often as they like without drawing down their allowance." },
  ]),
  P("/ai-agents", "product", "Agents", "Automate repeatable analysis with agents your team can trust.", "Define the job once: instructions, scope and output format. Any teammate then runs it on new input and gets a cited result.", [
    { t: "Reusable instructions", d: "Capture a proven prompt as an agent with a fixed role and output format: brief, bullets, table or email." },
    { t: "Scoped knowledge", d: "Limit an agent to one workspace so it only draws on the right material." },
    { t: "Run history", d: "Every run stores its input, output and sources for review." },
    { t: "Ready-made templates", d: "Start from meeting recap, policy explainer, customer brief or release notes." },
  ], steps),
  dept("engineering", "Engineering", "Cut onboarding time and repeat incidents.", "Engineering knowledge lives in runbooks, design notes and postmortems. CompassAI makes it answerable.", [
    { t: "Faster ramp-up", d: "New engineers ask questions of your runbooks and design documents and get cited answers instead of waiting for a colleague." },
    { t: "Incident recall", d: "Surface how a similar failure was resolved, from the postmortem itself." },
    { t: "Release notes on demand", d: "An agent drafts customer-facing notes from engineering material for review." },
  ]),
  dept("customer-service", "Customer service", "Resolve more tickets on the first reply.", "Support quality depends on finding the right answer fast. CompassAI retrieves it with the source attached.", [
    { t: "Cited reply drafts", d: "Agents draft responses from your help content and policies, so replies are consistent and defensible." },
    { t: "Faster handling", d: "Long case histories are condensed into the facts an agent needs." },
    { t: "Documentation gaps", d: "Questions the knowledge base cannot answer become a clear list of content to write." },
  ]),
  dept("sales", "Sales", "Enter every account conversation fully briefed.", "Revenue teams lose deals to preparation gaps. CompassAI assembles the account picture from your own notes.", [
    { t: "Account briefs", d: "An agent summarizes history, open issues and opportunities from everything you have stored on a customer." },
    { t: "Proposal drafts", d: "Draft responses from approved language so every proposal is on message." },
    { t: "Objection handling", d: "Retrieve how similar objections were answered in past deals." },
  ]),
  dept("it-service-management", "IT", "Deflect repeat requests and restore service faster.", "IT teams answer the same questions again and again. CompassAI answers them from your documentation.", [
    { t: "Self-serve answers", d: "Staff get step-by-step guidance drawn from IT documentation, with the source shown." },
    { t: "Runbook search", d: "Find the correct procedure under pressure without scanning folders." },
    { t: "Consistent resolutions", d: "Every answer reflects the current procedure rather than someone's memory." },
  ]),
  dept("marketing", "Marketing", "Produce on-message content from approved material.", "Brand consistency breaks down when writers cannot find source material. CompassAI keeps it within reach.", [
    { t: "Grounded drafts", d: "Draft copy from approved messaging so claims match what the company can support." },
    { t: "Research briefs", d: "Condense market and customer research into a structured summary." },
    { t: "Campaign recall", d: "Find what was said, to whom and when across past campaigns." },
  ]),
  dept("people", "People", "Answer employee questions without a queue.", "HR teams spend hours on policy questions. CompassAI answers them from the handbook and cites the clause.", [
    { t: "Policy answers", d: "Employees get a cited answer drawn from current policy documents." },
    { t: "Onboarding support", d: "Agents turn onboarding material into checklists for each new hire." },
    { t: "Feedback synthesis", d: "Summarize themes from survey comments and exit notes." },
  ]),
  dept("finance", "Finance", "Find the policy and the precedent behind every number.", "Finance decisions depend on rules and history spread across documents. CompassAI brings both forward.", [
    { t: "Policy lookup", d: "Retrieve approval limits and procedures with the exact source." },
    { t: "Close support", d: "Pull checklists and prior-period notes into one view." },
    { t: "Variance narratives", d: "Draft explanations from source notes for analyst review." },
  ]),
  dept("legal", "Legal", "Review faster with evidence at hand.", "Legal teams need the exact clause, not a summary of a summary. CompassAI retrieves the passage.", [
    { t: "Clause retrieval", d: "Find relevant language across agreements and policies in seconds." },
    { t: "Matter summaries", d: "Condense long documents into structured summaries for review." },
    { t: "Playbook alignment", d: "Check positions against your standard terms with citations." },
  ]),
  ind("retail", "Retail", "Keep every store and planner working from the same facts.", "Distributed retail teams need consistent answers on procedure, supplier terms and seasonal learnings.", [
    { t: "Store procedures", d: "Staff retrieve the current procedure instead of calling head office." },
    { t: "Merchandising history", d: "Recall what worked in past seasons from your own planning notes." },
    { t: "Supplier terms", d: "Find contract terms and contacts in one search." },
  ]),
  ind("industrials", "Industrials", "Put engineering and safety knowledge within reach.", "Plants and field teams depend on procedures and standards that are hard to find at the moment of need.", [
    { t: "Maintenance procedures", d: "Retrieve the right procedure for the right asset." },
    { t: "Safety references", d: "Answers cite the exact standard or internal rule." },
    { t: "Change history", d: "Trace the reason behind past engineering decisions." },
  ]),
  ind("professional-services", "Professional services", "Turn every past engagement into a head start.", "Firms sell expertise that is trapped in old proposals and deliverables.", [
    { t: "Proposal reuse", d: "Start new proposals from your strongest prior work." },
    { t: "Method consistency", d: "Delivery teams retrieve the same playbooks every time." },
    { t: "Client briefs", d: "Summarize everything held on a client before each meeting." },
  ]),
  ind("financial-services", "Financial services", "Decisions backed by client and market context.", "Regulated work demands answers that can be traced. CompassAI cites its sources on every response.", [
    { t: "Client context", d: "Bring notes, filings and correspondence together in one cited view." },
    { t: "Research briefs", d: "Draft analyses from internal material in a structured format." },
    { t: "Traceable output", d: "Every answer shows the passages behind it for review." },
  ]),
  ind("government", "Government", "Give staff consistent answers from official policy.", "Agencies manage large bodies of rules. CompassAI retrieves the relevant provision and cites it.", [
    { t: "Policy lookup", d: "Find the regulation or guidance that applies." },
    { t: "Case support", d: "Condense case files into summaries for caseworkers." },
    { t: "Isolated data", d: "Each organization's records are separated at the database layer." },
  ]),
  ind("healthcare", "Healthcare", "Reduce administrative load on clinical and operations teams.", "Health organizations hold protocols and policies that staff need quickly. CompassAI retrieves them with citations.", [
    { t: "Protocol search", d: "Find approved procedures without a phone call." },
    { t: "Admin drafting", d: "Draft routine documents from existing templates." },
    { t: "Strict separation", d: "Row-level security keeps each organization's data isolated." },
  ]),
  ind("life-sciences", "Life sciences", "Connect research, regulatory and quality knowledge.", "Evidence matters most where audits are routine. CompassAI ties each statement to a source.", [
    { t: "Study recall", d: "Find prior results and methods across internal reports." },
    { t: "Regulatory briefs", d: "Draft summaries tied to the supporting documents." },
    { t: "Quality records", d: "Trace changes and decisions through the record." },
  ]),
  ind("higher-education", "Higher education", "Help staff and students reach the right policy first time.", "Institutions publish large volumes of policy and guidance that people struggle to navigate.", [
    { t: "Student services", d: "Answers drawn from official policy, with the source shown." },
    { t: "Research administration", d: "Retrieve grant and compliance requirements quickly." },
    { t: "Shared guidance", d: "Departments search one consistent knowledge base." },
  ]),
  P("/about", "company", "Company", "We build the AI layer that makes company knowledge usable.", "Organizations already hold the answers. They lose time and money because nobody can retrieve them quickly enough to act.", [
    { t: "Mission", d: "Make company knowledge instantly searchable, verifiable and actionable." },
    { t: "Principles", d: "Ground every answer in sources, state the limits of what is known, and protect customer data by default." },
    { t: "Approach", d: "Deterministic limits and validation around every AI call, so behavior is predictable at scale." },
  ]),
  P("/privacy", "company", "Legal", "Privacy policy.", "How CompassAI handles information entered into the platform.", [
    { t: "Information we store", d: "Account details, the documents you add and a record of your usage." },
    { t: "How content is processed", d: "Relevant passages are sent to our AI provider solely to generate your answers." },
    { t: "Deletion", d: "Deleting a document removes its passages from search. Account deletion removes your workspace data." },
  ]),
  P("/website-terms", "company", "Legal", "Terms of use.", "The terms that govern use of this website and platform.", [
    { t: "Acceptable use", d: "Use the platform lawfully and only with content you are entitled to process." },
    { t: "Plans and credits", d: "Plans carry monthly credit allowances. Activation follows confirmed payment." },
    { t: "Changes", d: "We may update these terms, and continued use means you accept the update." },
  ]),
];

export const pageByPath = (p: string) => PAGES.find((x) => x.path === p);
