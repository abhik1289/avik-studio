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
  SidebarRail,
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
      <SidebarHeader className="border-b border-[#E2E8F0]/50">
        {/* Brand logo + name */}
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#0F172A] text-white shadow-sm">
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
            <span className="truncate font-semibold tracking-tight text-[#0F172A]">Avik Studio</span>
            <span className="truncate text-xs text-[#64748B]">Finance Workspace</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {SIDEBAR_NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.id} className="mb-4">
            <SidebarGroupLabel className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">
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
                          ? "bg-[#0F172A] text-white font-semibold shadow-sm before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-r-full before:bg-[#0F172A]"
                          : "text-[#64748B] hover:bg-[#F8F9FC] hover:text-[#0F172A]"
                      )}
                      asChild
                    >
                      <a href={item.href}>
                        {/* Active indicator dot */}
                        {isActive && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-white/60 animate-pulse" />
                        )}
                        <Icon
                          className={cn(
                            "size-[18px] shrink-0 transition-colors",
                            isActive ? "text-white" : "text-[#94A3B8] group-hover/menu-button:text-[#0F172A]"
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

      <SidebarFooter className="border-t border-[#E2E8F0]/50 p-3">
        {/* Notification button */}
        <div className="mb-2 flex items-center gap-2 rounded-xl bg-[#F8F9FC] px-3 py-2 border border-[#E2E8F0]/50 shadow-sm">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0F172A] text-white">
            <BellIcon className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-medium leading-tight text-[#0F172A]">3 new alerts</p>
            <p className="truncate text-[10px] text-[#64748B]">Budget threshold reached</p>
          </div>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 rounded-xl bg-[#F8F9FC] px-3 py-2.5 border border-[#E2E8F0]/50 shadow-sm">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-white shadow-sm">
            <UserIcon className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-[#0F172A]">Abhishek Kumar</p>
            <p className="truncate text-[10px] text-[#64748B]">Premium Plan</p>
          </div>
          <button className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-[#F8F9FC] hover:text-[#0F172A]">
            <ChevronUpIcon className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
