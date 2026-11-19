"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Bot, CreditCard, Database, LayoutDashboard, LogOut, MessageSquare, Search, Settings, Shield } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";

const ITEMS = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/assistant", label: "Assistant", icon: MessageSquare },
  { href: "/app/search", label: "Search", icon: Search },
  { href: "/app/knowledge", label: "Knowledge", icon: Database },
  { href: "/app/agents", label: "Agents", icon: Bot },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function SideNav({ admin, unread }: { admin: boolean; unread: number }) {
  const path = usePathname();
  const router = useRouter();
  const items = admin ? [...ITEMS, { href: "/app/admin", label: "Admin", icon: Shield }] : ITEMS;
  return (
    <nav className="flex lg:flex-col gap-1 lg:mt-6">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/app" ? path === "/app" : path.startsWith(href);
        return (
          <Link key={href} href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] whitespace-nowrap ${active ? "bg-brand-soft/60 text-brand" : "text-text hover:bg-cream"}`}>
            <Icon size={17} />{label}
            {label === "Notifications" && unread > 0 && <span className="ml-auto rounded-full bg-brand px-1.5 text-[11px] text-white">{unread}</span>}
          </Link>
        );
      })}
      <button onClick={async () => { await supabaseBrowser().auth.signOut(); router.replace("/login"); router.refresh(); }}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] text-muted hover:bg-cream whitespace-nowrap"><LogOut size={17} />Log out</button>
    </nav>
  );
}
