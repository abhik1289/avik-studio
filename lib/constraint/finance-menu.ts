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
    href: `${main_finance_url}/dashboard`,
    icon: LayoutDashboardIcon,
  },
  {
    id: 2,
    name: "Transactions",
    href: `${main_finance_url}/transactions`,
    icon: ReceiptTextIcon,
  },
  {
    id: 3,
    name: "Reports",
    href: `${main_finance_url}/reports`,
    icon: ChartPieIcon,
  },
  {
    id: 4,
    name: "Categories",
    href: `${main_finance_url}/categories`,
    icon: ListTreeIcon,
  },
  {
    id: 5,
    name: "Budget",
    href: `${main_finance_url}/budget`,
    icon: WalletCardsIcon,
  },
  {
    id: 6,
    name: "Settings",
    href: `${main_finance_url}/settings`,
    icon: Settings2Icon,
  },
]
