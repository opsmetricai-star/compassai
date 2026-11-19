export type Block = { t: string; d: string };
export type PageDef = {
  path: string;
  kind: "product" | "solution" | "resource" | "company";
  eyebrow: string;
  title: string;
  sub: string;
  blocks: Block[];
  stats?: { n: string; l: string }[];
  steps?: Block[];
};

const P = (
  path: string,
  kind: PageDef["kind"],
  eyebrow: string,
  title: string,
  sub: string,
  blocks: Block[],
  stats?: PageDef["stats"],
  steps?: Block[],
): PageDef => ({ path, kind, eyebrow, title, sub, blocks, stats, steps });

const defaultSteps: Block[] = [
  { t: "Connect", d: "Bring in documents, notes and URLs. Every item keeps the permissions of whoever added it." },
  { t: "Understand", d: "CompassAI indexes the content and builds context around people, projects and topics." },
  { t: "Act", d: "Ask questions, draft work and run agents, with every answer tied back to its sources." },
];

const dept = (slug: string, name: string, line: string, b: Block[]) =>
  P(
    `/solutions/departments/${slug}`,
    "solution",
    `CompassAI for ${name}`,
    line,
    `${name} teams lose hours each week hunting for the right context. CompassAI keeps it one question away.`,
    b,
    [
      { n: "110h", l: "saved per person each year" },
      { n: "93%", l: "adoption inside two years" },
      { n: "275+", l: "sources to connect" },
    ],
  );

const ind = (slug: string, name: string, line: string, b: Block[]) =>
  P(
    `/solutions/industries/${slug}`,
    "solution",
    `CompassAI for ${name}`,
    line,
    `${name} organizations run on specialised knowledge and strict controls. CompassAI delivers both.`,
    b,
    [
      { n: "40+", l: "models supported" },
      { n: "99.9%", l: "uptime target" },
      { n: "100%", l: "answers with citations" },
    ],
  );

export const PAGES: PageDef[] = [
  P("/platform", "product", "Platform", "One platform for every AI workflow.", "Context, intelligence, agents and governance in a single foundation your whole company can build on.", [
    { t: "Enterprise context", d: "A living map of your documents, people and projects that keeps every answer grounded in what your business actually knows." },
    { t: "Intelligence layer", d: "Route each request to the right model and reasoning depth so quality stays high and cost stays predictable." },
    { t: "Assistant and agents", d: "A coworker for everyday questions and a builder for automations, both drawing on the same trusted context." },
    { t: "Shield governance", d: "Permission-aware retrieval, audit trails and usage controls built in from the first query." },
  ], [{ n: "40+", l: "LLMs supported" }, { n: "275+", l: "connectors" }, { n: "99.9%", l: "uptime target" }], defaultSteps),
  P("/platform/enterprise-context", "product", "Enterprise Context", "Ground AI in company context.", "Models are only as useful as what they know about you. Context is how CompassAI teaches them.", [
    { t: "Knowledge graph", d: "Documents, people, teams and projects are linked so the assistant understands relationships, not just keywords." },
    { t: "Hybrid retrieval", d: "Full-text and semantic ranking surface the right passage, then pass only that passage to the model." },
    { t: "Freshness", d: "New and edited content is searchable within moments of being added." },
    { t: "Permission awareness", d: "Retrieval respects ownership, so nobody sees an answer built from content they cannot open." },
  ]),
  P("/platform/connectors", "product", "Connectors & actions", "Connect the tools your work lives in.", "Bring knowledge from chat, drives, tickets, code and CRM into one searchable layer, and push actions back out.", [
    { t: "Upload and paste", d: "Add documents, notes and transcripts directly from your workspace today." },
    { t: "URL ingestion", d: "Pull public web pages into a workspace and keep a record of where each passage came from." },
    { t: "App connectors", d: "Slack, Drive, Jira, Confluence, GitHub and Salesforce connectors are on the roadmap and listed in the app." },
    { t: "Actions", d: "Agents can draft messages, summaries and tickets ready for your review." },
  ], [{ n: "275+", l: "planned sources" }, { n: "3", l: "ingestion modes live" }]),
  P("/platform/api", "product", "APIs", "Build AI experiences of your own.", "A clean REST interface to search, ask and run agents against your workspace data.", [
    { t: "Ask endpoint", d: "Send a question and a workspace id. Receive a structured answer with citations." },
    { t: "Search endpoint", d: "Query your indexed knowledge directly and get ranked passages back." },
    { t: "Agent runs", d: "Trigger saved agents from your own product or workflow." },
    { t: "Usage and limits", d: "Every call is metered against your plan so you can see exactly what you use." },
  ]),
  P("/platform/security", "product", "CompassAI Shield", "Safely scale AI at work.", "Row-level security, auditability and clear usage limits protect your data as adoption grows.", [
    { t: "Row Level Security", d: "Every table is protected so users only ever read and write their own organization's records." },
    { t: "Full observability", d: "Every question, answer and agent run is recorded and visible to workspace owners." },
    { t: "Data governance", d: "Delete a document and its passages are removed from search immediately." },
    { t: "Secret handling", d: "Provider keys live on the server only and are never sent to the browser." },
  ]),
  P("/platform/intelligence", "product", "Intelligence", "Get more from every AI request.", "Smarter context in means fewer tokens out.", [
    { t: "Context trimming", d: "Only the most relevant passages reach the model, cutting waste on every call." },
    { t: "Structured outputs", d: "Answers are validated against a schema before they reach you." },
    { t: "Quality signals", d: "Thumbs feedback tunes which sources are trusted." },
  ]),
  P("/platform/auto-routing", "product", "Model routing", "Route work to the right model.", "Quick lookups go to fast models. Deep analysis goes to reasoning models.", [
    { t: "Mode-aware", d: "Ask, research and agent modes each choose a model profile automatically." },
    { t: "Fallbacks", d: "If a provider is unavailable the request retries with a fallback instead of failing." },
    { t: "Transparent", d: "Each answer records which model produced it." },
  ]),
  P("/platform/model-hub", "product", "Model hub", "Access the latest models.", "Switch models without rebuilding anything.", [
    { t: "One interface", d: "A single request format across providers." },
    { t: "Configurable", d: "Admins choose which models are available to which workspaces." },
    { t: "Future ready", d: "New models arrive without changes to your agents." },
  ]),
  P("/platform/cost-controls", "product", "Usage controls", "Control AI usage and spend.", "Every plan has a clear monthly allowance and a live meter.", [
    { t: "Monthly credits", d: "Each AI answer consumes a credit, visible in your dashboard." },
    { t: "Hard limits", d: "When credits run out, requests stop with a clear upgrade prompt." },
    { t: "Usage analytics", d: "Charts show who used what and when." },
  ]),
  P("/platform/ai-gateway", "product", "AI gateway", "Govern every AI interaction.", "One checkpoint for validation, limits and logging.", [
    { t: "Input validation", d: "Requests are schema-checked before any model is called." },
    { t: "Rate and credit checks", d: "Limits are enforced on the server, not the client." },
    { t: "Audit log", d: "Every call is stored with its sources and outcome." },
  ]),
  P("/ai-assistant", "product", "Assistant", "Your enterprise AI coworker.", "Ask in plain language. Get an answer built from your own knowledge, with the sources beside it.", [
    { t: "Grounded answers", d: "Responses are written only from retrieved passages and link back to each one." },
    { t: "Conversation memory", d: "Follow-up questions understand what came before." },
    { t: "Saved history", d: "Every conversation is stored so you can return to it." },
    { t: "Honest uncertainty", d: "When the knowledge isn't there, the assistant says so rather than guessing." },
  ], [{ n: "100%", l: "answers cited" }, { n: "<5s", l: "typical response" }], defaultSteps),
  P("/ai-assistant/proactive-ai", "product", "Proactive AI", "Stay ahead of what matters.", "Daily digests surface what changed in your workspace.", [
    { t: "Digests", d: "A summary of new and updated documents." },
    { t: "Alerts", d: "Notifications when usage or credits need attention." },
    { t: "Suggestions", d: "Follow-up questions based on what you just read." },
  ]),
  P("/ai-assistant/content-creation", "product", "Content creation", "Create grounded, on-brand content.", "Draft emails, briefs and updates from approved company material.", [
    { t: "Draft from sources", d: "Writing starts from your documents, not a blank page." },
    { t: "Tone controls", d: "Set the voice once and reuse it." },
    { t: "Review ready", d: "Citations stay attached so editors can verify claims." },
  ]),
  P("/ai-assistant/multiplayer", "product", "Multiplayer", "Create and refine work together.", "Share workspaces and conversations with teammates.", [
    { t: "Shared workspaces", d: "Invite teammates to the same knowledge base." },
    { t: "Shared threads", d: "Hand a conversation to a colleague with full context." },
    { t: "Roles", d: "Owners, editors and viewers keep access tidy." },
  ]),
  P("/ai-assistant/work-execution", "product", "Work execution", "Turn insight into action.", "Go from an answer to a drafted next step.", [
    { t: "Action drafts", d: "Generate follow-ups, tickets and summaries from an answer." },
    { t: "Human approval", d: "Nothing is sent without your review." },
    { t: "Agent handoff", d: "Promote a good prompt into a reusable agent." },
  ]),
  P("/ai-assistant/research-and-analysis", "product", "Research & analysis", "Turn context into insight.", "Compare sources, find gaps and produce structured briefs.", [
    { t: "Multi-document synthesis", d: "Combine several sources into one coherent brief." },
    { t: "Structured output", d: "Findings, risks and open questions in a fixed format." },
    { t: "Evidence trail", d: "Every claim maps to a source passage." },
  ]),
  P("/enterprise-search", "product", "Enterprise search", "Find answers across your company.", "Search that understands meaning, ranks by relevance and shows you why.", [
    { t: "Full-text ranking", d: "Fast, typo-tolerant search across every workspace document." },
    { t: "Highlighted passages", d: "See the exact lines that matched." },
    { t: "Filters", d: "Narrow by workspace, source type or date." },
  ], [{ n: "3B+", l: "searches powered industry-wide" }]),
  P("/ai-agents", "product", "Agents", "Build and manage agents.", "Turn a repeatable task into an agent anyone on the team can run.", [
    { t: "No-code builder", d: "Describe the job, choose the workspace and save." },
    { t: "Run on demand", d: "Run an agent with fresh input each time and keep the history." },
    { t: "Shared library", d: "Teams reuse what works." },
    { t: "Controlled", d: "Agents inherit workspace permissions and credit limits." },
  ], undefined, defaultSteps),
  P("/ai-agents/agent-builder", "product", "Agent builder", "Build agents your way.", "Instructions, knowledge scope and output format, all in one form.", [
    { t: "Instructions", d: "Write what the agent should do in plain language." },
    { t: "Scope", d: "Limit it to one workspace or let it use them all." },
    { t: "Output format", d: "Choose free text, bullet brief or table." },
  ]),
  P("/ai-agents/agent-orchestration", "product", "Agent orchestration", "Automate work across systems.", "Chain agents so one output feeds the next.", [
    { t: "Chained runs", d: "Send a result into another agent." },
    { t: "Scheduled runs", d: "Planned on the roadmap and not yet enabled." },
    { t: "Run history", d: "Inspect every step." },
  ]),
  P("/ai-agents/agent-governance", "product", "Agent governance", "Scale agents with control.", "See which agents exist, who owns them and what they used.", [
    { t: "Ownership", d: "Every agent belongs to a user and workspace." },
    { t: "Usage per agent", d: "Credits are attributed to the agent that spent them." },
    { t: "Audit trail", d: "Runs are stored with inputs and outputs." },
  ]),
  P("/ai-agents/agent-library", "product", "Agent library", "Discover trusted, reusable agents.", "Start from ready-made templates for common jobs.", [
    { t: "Meeting recap", d: "Turn notes into decisions and owners." },
    { t: "Policy explainer", d: "Answer questions strictly from policy documents." },
    { t: "Customer brief", d: "Summarize an account from everything you know." },
    { t: "Release notes", d: "Draft notes from engineering material." },
  ]),
  P("/transform", "product", "Coming soon", "CompassAI Transform.", "See where AI can make the biggest difference in your business.", [
    { t: "Opportunity mapping", d: "Rank workflows by hours saved." },
    { t: "Readiness view", d: "See which knowledge is ready for AI." },
    { t: "Roadmap", d: "Turn findings into a rollout plan." },
  ]),
  P("/solutions/all-teams", "solution", "All teams", "One platform. Every team.", "From engineering to people operations, every department gets trusted AI.", [
    { t: "Shared foundation", d: "One knowledge layer, many use cases." },
    { t: "Team-specific agents", d: "Each team keeps its own tuned agents." },
    { t: "Company-wide adoption", d: "Familiar chat and search lower the barrier." },
  ], [{ n: "93%", l: "adoption inside two years" }]),
  dept("engineering", "Engineering", "Ship faster with answers from your own docs.", [
    { t: "Onboarding", d: "New engineers find runbooks and design notes in minutes." },
    { t: "Incident recall", d: "Surface the last time something broke and how it was fixed." },
    { t: "Release notes", d: "Draft notes from tickets and merged work." },
  ]),
  dept("customer-service", "Customer service", "Resolve tickets with the right answer first time.", [
    { t: "Answer suggestions", d: "Cited replies drawn from your help content." },
    { t: "Case summaries", d: "Condense long threads." },
    { t: "Gap spotting", d: "See which questions your docs don't answer." },
  ]),
  dept("sales", "Sales", "Walk into every call prepared.", [
    { t: "Account briefs", d: "Everything known about a customer on one page." },
    { t: "Proposal drafts", d: "Start from approved language." },
    { t: "Objection help", d: "Find how similar deals were won." },
  ]),
  dept("it-service-management", "IT", "Deflect repeat requests and fix faster.", [
    { t: "Self-serve answers", d: "Staff get step-by-step help from IT docs." },
    { t: "Runbook search", d: "Find the right procedure under pressure." },
    { t: "Ticket drafts", d: "Capture context automatically." },
  ]),
  dept("marketing", "Marketing", "Create on-message content in less time.", [
    { t: "Brand-safe drafts", d: "Write from approved messaging." },
    { t: "Research briefs", d: "Summarize market material." },
    { t: "Asset recall", d: "Find past campaigns instantly." },
  ]),
  dept("people", "People", "Answer employee questions without the queue.", [
    { t: "Policy answers", d: "Cited responses from handbooks." },
    { t: "Onboarding guides", d: "Personal checklists for new hires." },
    { t: "Survey synthesis", d: "Summarize feedback themes." },
  ]),
  dept("finance", "Finance", "Find the number and the policy behind it.", [
    { t: "Policy lookup", d: "Approval limits and procedures at hand." },
    { t: "Close support", d: "Checklists and prior-period notes." },
    { t: "Variance briefs", d: "Draft explanations from source notes." },
  ]),
  dept("legal", "Legal", "Review with context, not guesswork.", [
    { t: "Clause search", d: "Find language across agreements." },
    { t: "Matter summaries", d: "Condense long documents." },
    { t: "Playbook answers", d: "Apply your standard positions." },
  ]),
  ind("retail", "Retail", "Keep every store and team on the same page.", [
    { t: "Store operations", d: "Procedures answered at the shelf edge." },
    { t: "Merchandising", d: "Recall past seasonal learnings." },
    { t: "Supplier knowledge", d: "Terms and contacts in one place." },
  ]),
  ind("industrials", "Industrials", "Put plant-floor knowledge within reach.", [
    { t: "Maintenance", d: "Find the right procedure fast." },
    { t: "Safety", d: "Cite the exact standard." },
    { t: "Engineering change", d: "Trace decisions." },
  ]),
  ind("professional-services", "Professional services", "Reuse every engagement's hard-won insight.", [
    { t: "Proposal reuse", d: "Start from your best prior work." },
    { t: "Expert finding", d: "See who has done this before." },
    { t: "Delivery playbooks", d: "Consistent method everywhere." },
  ]),
  ind("financial-services", "Financial services", "Decisions grounded in client and market context.", [
    { t: "Client context", d: "One cited view across notes and filings." },
    { t: "Research briefs", d: "Draft analyses from internal material." },
    { t: "Controls", d: "Auditable answers for regulated work." },
  ]),
  ind("government", "Government", "Serve citizens with consistent answers.", [
    { t: "Policy lookup", d: "Cite the regulation." },
    { t: "Case support", d: "Summaries for caseworkers." },
    { t: "Records access", d: "Search with strict boundaries." },
  ]),
  ind("healthcare", "Healthcare", "Reduce admin time and keep care teams informed.", [
    { t: "Protocol search", d: "Find approved procedures." },
    { t: "Admin support", d: "Draft routine documents." },
    { t: "Privacy first", d: "Strict access boundaries." },
  ]),
  ind("life-sciences", "Life sciences", "Connect research, regulatory and quality knowledge.", [
    { t: "Study recall", d: "Find prior results." },
    { t: "Regulatory briefs", d: "Summaries tied to sources." },
    { t: "Quality records", d: "Trace changes." },
  ]),
  ind("higher-education", "Higher education", "Help students and staff find what they need.", [
    { t: "Student support", d: "Answers from official policy." },
    { t: "Research admin", d: "Grant and compliance help." },
    { t: "Faculty knowledge", d: "Share teaching resources." },
  ]),
  P("/about", "company", "About us", "We help companies put what they know to work.", "CompassAI exists so every employee can get a trustworthy answer in seconds.", [
    { t: "Mission", d: "Make company knowledge instantly useful and safely shareable." },
    { t: "Principles", d: "Grounded in sources, honest about limits, secure by default." },
    { t: "Team", d: "Builders from search, security and applied AI." },
  ]),
  P("/about/ai-at-compassai", "company", "CompassAI on CompassAI", "We run on our own product.", "Our own team uses CompassAI every day.", [
    { t: "Support", d: "Replies drafted from our help content." },
    { t: "Product", d: "Specs and feedback searchable in one place." },
    { t: "Sales", d: "Account briefs before every call." },
  ]),
  P("/about/story", "company", "Story", "How CompassAI began.", "A frustration with lost context became a product.", [
    { t: "The problem", d: "Answers existed. Nobody could find them." },
    { t: "The idea", d: "Ground AI in what the company already wrote." },
    { t: "Today", d: "Teams of every size run on it." },
  ]),
  P("/about/culture-and-values", "company", "Culture", "Values we work by.", "How we build, ship and treat each other.", [
    { t: "Be useful", d: "Ship what saves people time." },
    { t: "Be honest", d: "Say what we don't know." },
    { t: "Be careful", d: "Protect customer data first." },
  ]),
  P("/careers", "company", "Careers", "Build the future of work with us.", "We are a small, remote-friendly team.", [
    { t: "Engineering", d: "Full-stack and applied AI." },
    { t: "Customer success", d: "Help teams get value quickly." },
    { t: "Open roles", d: "Send an introduction through the contact page." },
  ]),
  P("/partners", "company", "Partners", "Grow with the CompassAI ecosystem.", "Consultants, integrators and technology partners.", [
    { t: "Solution partners", d: "Deliver rollouts for clients." },
    { t: "Technology partners", d: "Build integrations." },
    { t: "Referral partners", d: "Earn for introductions." },
  ]),
  P("/press", "company", "Newsroom", "CompassAI in the news.", "Announcements and media resources.", [
    { t: "Press kit", d: "Logos and boilerplate on request." },
    { t: "Announcements", d: "Product news appears here." },
    { t: "Media contact", d: "Reach us via the contact page." },
  ]),
  P("/refer-friend", "company", "Referrals", "Refer a friend.", "Know a team drowning in scattered knowledge?", [
    { t: "Share", d: "Send them our way." },
    { t: "They try it", d: "Everyone starts with free credits." },
    { t: "You're thanked", d: "Contact us to arrange a reward." },
  ]),
  P("/trust", "company", "Trust center", "Security you can verify.", "How we protect your data.", [
    { t: "Access control", d: "Row Level Security on every table." },
    { t: "Secrets", d: "Server-side only." },
    { t: "Certifications", d: "No third-party certifications are claimed at this stage." },
  ]),
  P("/work-ai-institute", "resource", "Work AI Institute", "Leading voices in AI at work.", "Research, podcasts and tools to face the future of work.", [
    { t: "Report", d: "The Work AI Index." },
    { t: "Podcast", d: "Intelligence: Real & Imagined." },
    { t: "Quiz", d: "The AI Reality Check." },
  ]),
  P("/help", "resource", "Help center", "Answers when you need them.", "Getting started and troubleshooting.", [
    { t: "Getting started", d: "Create a workspace, add a document, ask a question." },
    { t: "Billing", d: "Plans, credits and upgrades." },
    { t: "Troubleshooting", d: "Common issues and fixes." },
  ]),
  P("/webinars", "resource", "Webinars", "Learn live from our team.", "Sessions on rollout, agents and governance.", [
    { t: "Rollout basics", d: "Plan your first 30 days." },
    { t: "Agents 101", d: "Build your first agent." },
    { t: "Governance", d: "Usage controls in practice." },
  ]),
  P("/events", "resource", "Events", "Meet us in person and online.", "Conferences and community meetups.", [
    { t: "CompassAI Summit", d: "Our annual customer event." },
    { t: "Community", d: "Local meetups." },
    { t: "Replays", d: "Watch what you missed." },
  ]),
  P("/resources/guides", "resource", "Guides", "Practical guides for AI at work.", "Playbooks you can apply this week.", [
    { t: "The token economy", d: "How architecture drives AI cost." },
    { t: "Rollout playbook", d: "From pilot to company-wide." },
    { t: "Agent patterns", d: "Designs that work." },
  ]),
  P("/resources/product-videos", "resource", "Product videos", "See CompassAI in action.", "Short walkthroughs of key workflows.", [
    { t: "Assistant tour", d: "Two minutes with cited answers." },
    { t: "Agent builder", d: "Build an agent." },
    { t: "Admin view", d: "Usage and billing." },
  ]),
  P("/resources/customer-stories", "resource", "Customer stories", "How teams put CompassAI to work.", "Sample stories from our early customers.", [
    { t: "Harbor & Pine", d: "Retail operations across 140 stores: answers in seconds instead of calls to head office." },
    { t: "Northwind Labs", d: "Engineering onboarding cut from weeks to days." },
    { t: "Meridian Press", d: "A decade of archive made searchable for editors." },
    { t: "Kestrel Telecom", d: "Support teams resolving with cited answers." },
  ]),
  P("/compare", "resource", "Compare", "CompassAI versus the alternatives.", "How we differ from general-purpose chat tools.", [
    { t: "Versus generic chat", d: "Answers come from your sources with citations." },
    { t: "Versus suite copilots", d: "Works across all your content, not one vendor." },
    { t: "Versus DIY", d: "Auth, billing, limits and audit are ready." },
  ]),
  P("/contact", "company", "Contact", "Talk to our team.", "Request a demo or ask a question.", [
    { t: "Demo", d: "See the product with your use case." },
    { t: "Support", d: "Help with your account." },
    { t: "Partnerships", d: "Work with us." },
  ]),
  P("/blog", "resource", "Blog", "Latest from CompassAI.", "Product news and thinking on work AI.", [
    { t: "Efficient, governed AI", d: "Why context beats bigger prompts." },
    { t: "The token economy", d: "What cost per answer really depends on." },
    { t: "Building agents safely", d: "Scope, review and audit." },
  ]),
  P("/privacy", "company", "Legal", "Privacy.", "How we handle your information.", [
    { t: "Data we store", d: "Account details, documents and usage records you provide." },
    { t: "Processing", d: "Content is sent to the AI provider only to produce your answers." },
    { t: "Your rights", d: "Request deletion at any time." },
  ]),
  P("/website-terms", "company", "Legal", "Website terms.", "Terms for using this website.", [
    { t: "Use", d: "Use the site lawfully." },
    { t: "Content", d: "Material is provided as-is." },
    { t: "Changes", d: "Terms may be updated." },
  ]),
];

export const pageByPath = (p: string) => PAGES.find((x) => x.path === p);
