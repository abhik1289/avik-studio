"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { financeMenu } from "@/lib/constraint/finance-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ReceiptTextIcon,
  ChartPieIcon,
  ListTreeIcon,
  WalletCardsIcon,
  Settings2Icon,
  ChevronUpIcon,
  UserIcon,
  BellIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Menu config ───────────────────────────────────────────────────────────────

const SIDEBAR_NAV_GROUPS = [
  {
    id: "overview",
    label: "Overview",
    items: financeMenu.filter((i) => ["Dashboard", "Transactions"].includes(i.name)),
  },
  {
    id: "management",
    label: "Management",
    items: financeMenu.filter((i) => ["Reports", "Categories"].includes(i.name)),
  },
  {
    id: "system",
    label: "System",
    items: financeMenu.filter((i) => ["Budget", "Settings"].includes(i.name)),
  },
]

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboardIcon,
  ReceiptTextIcon,
  ChartPieIcon,
  ListTreeIcon,
  WalletCardsIcon,
  Settings2Icon,
}

// ─── Main component ────────────────────────────────────────────────────────────

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/60">
        {/* Brand logo + name */}
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
            </svg>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold tracking-tight">Avik Studio</span>
            <span className="truncate text-xs text-muted-foreground">Finance Workspace</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {SIDEBAR_NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.id} className="mb-4">
            <SidebarGroupLabel className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = ICON_MAP[item.icon.name] ?? ReceiptTextIcon
                const isActive = pathname === item.href

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.name}
                      className={cn(
                        "relative h-10 w-full gap-3 rounded-xl px-3 font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold shadow-sm ring-1 ring-primary/15 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-r-full before:bg-primary"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      )}
                      asChild
                    >
                      <a href={item.href}>
                        {/* Active glow dot */}
                        {isActive && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-primary animate-pulse" />
                        )}
                        <Icon
                          className={cn(
                            "size-[18px] shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover/menu-button:text-foreground"
                          )}
                        />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 p-3">
        {/* Notification button */}
        <div className="mb-2 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BellIcon className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-medium leading-tight">3 new alerts</p>
            <p className="truncate text-[10px] text-muted-foreground">Budget threshold reached</p>
          </div>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/50 px-3 py-2.5 ring-1 ring-sidebar-border/60">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-sm">
            <UserIcon className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">Abhishek Kumar</p>
            <p className="truncate text-[10px] text-muted-foreground">Premium Plan</p>
          </div>
          <button className="flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
            <ChevronUpIcon className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}