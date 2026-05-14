import type { LucideIcon } from "lucide-react"
import {
  ChartPieIcon,
  LayoutDashboardIcon,
  ListTreeIcon,
  ReceiptTextIcon,
  Settings2Icon,
  WalletCardsIcon,
} from "lucide-react"

const main_finance_url = "app.finance.co"

type FinanceMenuItem = {
  id: number
  name: string
  href: string
  icon: LucideIcon
}

export const financeMenu: FinanceMenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    href: `/dashboard`,
    icon: LayoutDashboardIcon,
  },
  {
    id: 2,
    name: "Transactions",
    href: `/transactions`,
    icon: ReceiptTextIcon,
  },
  {
    id: 3,
    name: "Reports",
    href: `/reports`,
    icon: ChartPieIcon,
  },
  {
    id: 4,
    name: "Categories",
    href: `/categories`,
    icon: ListTreeIcon,
  },
  {
    id: 5,
    name: "Budget",
    href: `/budget`,
    icon: WalletCardsIcon,
  },
  {
    id: 6,
    name: "Settings",
    href: `/settings`,
    icon: Settings2Icon,
  },
]
