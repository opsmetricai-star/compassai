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
          { label: "Platform overview", desc: "The AI engine for company knowledge", href: "/platform" },
          { label: "Knowledge", desc: "Indexed, searchable, grounded", href: "/platform/enterprise-context" },
          { label: "Ingestion", desc: "Paste, upload or pull from the web", href: "/platform/connectors" },
          { label: "Security", desc: "Isolation enforced in the database", href: "/platform/security" },
          { label: "Usage controls", desc: "Predictable AI spend", href: "/platform/cost-controls" },
        ],
      },
      {
        title: "AI",
        items: [
          { label: "Assistant", desc: "Cited answers from your evidence", href: "/ai-assistant" },
          { label: "Research mode", desc: "Structured analysis and briefs", href: "/ai-assistant/research-and-analysis" },
          { label: "Search", desc: "Ranked passages across workspaces", href: "/enterprise-search" },
          { label: "Agents", desc: "Automate repeatable analysis", href: "/ai-agents" },
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
  { label: "Pricing", groups: [{ items: [{ label: "Plans and credits", desc: "Free, Starter and Pro", href: "/pricing" }] }] },
  { label: "Company", groups: [{ items: [{ label: "About", href: "/about" }, { label: "Security", href: "/platform/security" }] }] },
];

export const FOOTER: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Assistant", href: "/ai-assistant" },
      { label: "Agents", href: "/ai-agents" },
      { label: "Search", href: "/enterprise-search" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Engineering", href: "/solutions/departments/engineering" },
      { label: "Sales", href: "/solutions/departments/sales" },
      { label: "Finance", href: "/solutions/departments/finance" },
      { label: "Financial services", href: "/solutions/industries/financial-services" },
      { label: "Healthcare", href: "/solutions/industries/healthcare" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security", href: "/platform/security" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/website-terms" },
    ],
  },
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 47,
    blurb: "For teams putting company knowledge to work.",
    credits: 500,
    features: [
      "500 AI credits per month",
      "Up to 3 workspaces",
      "Text, file and web page ingestion",
      "Cited answers on every response",
      "Up to 5 saved agents",
    ],
    href: PAYMENT_LINKS.starter,
  },
  {
    id: "pro",
    name: "Pro",
    price: 97,
    blurb: "For organizations running analysis and automation at volume.",
    credits: 3000,
    popular: true,
    features: [
      "3,000 AI credits per month",
      "Unlimited workspaces",
      "Unlimited saved agents",
      "Research mode for structured analysis",
      "Everything in Starter",
    ],
    href: PAYMENT_LINKS.pro,
  },
] as const;

export const FREE_CREDITS = 20;
