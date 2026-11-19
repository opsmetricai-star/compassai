export const BRAND = "CompassAI";

export const PAYMENT_LINKS = {
  starter: "https://selar.com/47plan?currency=USD",
  pro: "https://selar.com/97plan?currency=USD",
};

export type NavItem = { label: string; desc?: string; href: string };
export type NavGroup = { title?: string; items: NavItem[] };
export type NavMenu = { label: string; groups: NavGroup[] };

export const NAV: NavMenu[] = [
  {
    label: "Product",
    groups: [
      {
        title: "Platform",
        items: [
          { label: "Platform overview", desc: "See how CompassAI works.", href: "/platform" },
          { label: "Enterprise Context", desc: "Ground AI in company context", href: "/platform/enterprise-context" },
          { label: "Connectors & actions", desc: "Plug in the tools you already run", href: "/platform/connectors" },
          { label: "APIs", desc: "Build AI experiences of your own", href: "/platform/api" },
          { label: "CompassAI Shield", desc: "Scale AI safely at work", href: "/platform/security" },
        ],
      },
      {
        title: "Intelligence",
        items: [
          { label: "Model routing", desc: "Send work to the right model", href: "/platform/auto-routing" },
          { label: "Model hub", desc: "Access the latest models", href: "/platform/model-hub" },
          { label: "Usage controls", desc: "Control AI usage and spend", href: "/platform/cost-controls" },
          { label: "AI gateway", desc: "Govern every AI interaction", href: "/platform/ai-gateway" },
        ],
      },
      {
        title: "Assistant",
        items: [
          { label: "CompassAI Assistant", desc: "Your enterprise AI coworker", href: "/ai-assistant" },
          { label: "Proactive AI", desc: "Stay ahead of what matters", href: "/ai-assistant/proactive-ai" },
          { label: "Content creation", desc: "Create grounded, on-brand content", href: "/ai-assistant/content-creation" },
          { label: "Multiplayer", desc: "Create and refine work together", href: "/ai-assistant/multiplayer" },
          { label: "Work execution", desc: "Turn insight into action", href: "/ai-assistant/work-execution" },
          { label: "Research & analysis", desc: "Turn context into insight", href: "/ai-assistant/research-and-analysis" },
          { label: "Enterprise search", desc: "Find answers across your company", href: "/enterprise-search" },
        ],
      },
      {
        title: "Agents",
        items: [
          { label: "CompassAI Agents", desc: "Build and manage agents", href: "/ai-agents" },
          { label: "Agent builder", desc: "Build agents your way", href: "/ai-agents/agent-builder" },
          { label: "Agent orchestration", desc: "Automate work across systems", href: "/ai-agents/agent-orchestration" },
          { label: "Agent governance", desc: "Scale agents with control", href: "/ai-agents/agent-governance" },
          { label: "Agent library", desc: "Discover trusted, reusable agents", href: "/ai-agents/agent-library" },
        ],
      },
    ],
  },
  {
    label: "Customers",
    groups: [
      {
        items: [
          { label: "Harbor & Pine", href: "/resources/customer-stories/harbor-and-pine" },
          { label: "Northwind Labs", href: "/resources/customer-stories/northwind-labs" },
          { label: "Meridian Press", href: "/resources/customer-stories/meridian-press" },
          { label: "Kestrel Telecom", href: "/resources/customer-stories/kestrel-telecom" },
          { label: "See all customer stories", href: "/resources/customer-stories" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    groups: [
      {
        title: "Departments",
        items: [
          { label: "All teams", href: "/solutions/all-teams" },
          { label: "Engineering", href: "/solutions/departments/engineering" },
          { label: "Customer service", href: "/solutions/departments/customer-service" },
          { label: "Sales", href: "/solutions/departments/sales" },
          { label: "IT", href: "/solutions/departments/it-service-management" },
          { label: "Marketing", href: "/solutions/departments/marketing" },
          { label: "People", href: "/solutions/departments/people" },
          { label: "Finance", href: "/solutions/departments/finance" },
          { label: "Legal", href: "/solutions/departments/legal" },
        ],
      },
      {
        title: "Industries",
        items: [
          { label: "Retail", href: "/solutions/industries/retail" },
          { label: "Industrials", href: "/solutions/industries/industrials" },
          { label: "Professional services", href: "/solutions/industries/professional-services" },
          { label: "Financial services", href: "/solutions/industries/financial-services" },
          { label: "Government", href: "/solutions/industries/government" },
          { label: "Healthcare", href: "/solutions/industries/healthcare" },
          { label: "Life sciences", href: "/solutions/industries/life-sciences" },
          { label: "Higher education", href: "/solutions/industries/higher-education" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    groups: [
      {
        items: [
          { label: "Guides", href: "/resources/guides" },
          { label: "Product videos", href: "/resources/product-videos" },
          { label: "Blog", href: "/blog" },
          { label: "Webinars", href: "/webinars" },
          { label: "Events", href: "/events" },
          { label: "Help center", href: "/help" },
          { label: "Developers", href: "/platform/api" },
          { label: "Partners", href: "/partners" },
          { label: "Work AI Institute", href: "/work-ai-institute" },
          { label: "Pricing", href: "/pricing" },
        ],
      },
    ],
  },
  {
    label: "Company",
    groups: [
      {
        items: [
          { label: "About us", href: "/about" },
          { label: "CompassAI on CompassAI", href: "/about/ai-at-compassai" },
          { label: "Story", href: "/about/story" },
          { label: "Culture", href: "/about/culture-and-values" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];

export const FOOTER: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Assistant", href: "/ai-assistant" },
      { label: "Agents", href: "/ai-agents" },
      { label: "Enterprise search", href: "/enterprise-search" },
      { label: "Connectors", href: "/platform/connectors" },
      { label: "Security", href: "/platform/security" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Engineering", href: "/solutions/departments/engineering" },
      { label: "Sales", href: "/solutions/departments/sales" },
      { label: "Customer service", href: "/solutions/departments/customer-service" },
      { label: "Finance", href: "/solutions/departments/finance" },
      { label: "Healthcare", href: "/solutions/industries/healthcare" },
      { label: "Financial services", href: "/solutions/industries/financial-services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Customer stories", href: "/resources/customer-stories" },
      { label: "Webinars", href: "/webinars" },
      { label: "Events", href: "/events" },
      { label: "Help center", href: "/help" },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/press" },
      { label: "Partners", href: "/partners" },
      { label: "Referrals", href: "/refer-friend" },
      { label: "Contact", href: "/contact" },
      { label: "Trust center", href: "/trust" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Website terms", href: "/website-terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 47,
    blurb: "For individuals and small teams getting their knowledge working for them.",
    credits: 500,
    features: [
      "500 AI answers per month",
      "Up to 3 knowledge workspaces",
      "Document, text and URL ingestion",
      "Cited answers with source links",
      "5 saved agents",
      "Email support",
    ],
    href: PAYMENT_LINKS.starter,
  },
  {
    id: "pro",
    name: "Pro",
    price: 97,
    blurb: "For growing teams that need volume, agents and deeper analysis.",
    credits: 3000,
    popular: true,
    features: [
      "3,000 AI answers per month",
      "Unlimited knowledge workspaces",
      "Everything in Starter",
      "Unlimited saved agents",
      "Research & analysis mode",
      "Usage analytics and audit log",
      "Priority support",
    ],
    href: PAYMENT_LINKS.pro,
  },
] as const;

export const FREE_CREDITS = 20;
