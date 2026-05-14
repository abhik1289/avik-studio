"use client"

import { useState, useMemo } from "react"
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Columns3, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { TRANSACTION_CATEGORIES, TRANSACTION_TYPES } from "@/lib/schemas/transaction.schema"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ─── Types ───────────────────────────────────────────────────────────────────

type Transaction = {
  id: string
  title: string
  type: "debit" | "credit"
  category: (typeof TRANSACTION_CATEGORIES)[number]["value"]
  amount: number
  description?: string
  createdAt: Date
  important?: boolean // ← new field
}

// ─── Dummy data ───────────────────────────────────────────────────────────────

const dummyTransactions: Transaction[] = [
  {
    id: "1",
    title: "Monthly Salary",
    type: "credit",
    category: "salary",
    amount: 5000.0,
    description: "Monthly salary from Tech Corp",
    createdAt: new Date("2026-05-01"),
    important: true,
  },
  {
    id: "2",
    title: "Grocery Shopping",
    type: "debit",
    category: "food",
    amount: 150.75,
    description: "Weekly groceries from SuperMart",
    createdAt: new Date("2026-05-03"),
  },
  {
    id: "3",
    title: "Uber Ride",
    type: "debit",
    category: "transport",
    amount: 25.5,
    description: "Airport pickup",
    createdAt: new Date("2026-05-05"),
  },
  {
    id: "4",
    title: "Netflix Subscription",
    type: "debit",
    category: "entertainment",
    amount: 15.99,
    description: "Monthly streaming service",
    createdAt: new Date("2026-05-10"),
  },
  {
    id: "5",
    title: "Electricity Bill",
    type: "debit",
    category: "bills",
    amount: 120.0,
    description: "Monthly electricity bill",
    createdAt: new Date("2026-05-12"),
    important: true,
  },
  {
    id: "6",
    title: "Freelance Project",
    type: "credit",
    category: "salary",
    amount: 1500.0,
    description: "Website development project",
    createdAt: new Date("2026-05-14"),
  },
  {
    id: "7",
    title: "Restaurant Dinner",
    type: "debit",
    category: "food",
    amount: 85.0,
    description: "Team dinner at Italian Bistro",
    createdAt: new Date("2026-05-15"),
  },
  {
    id: "8",
    title: "New Headphones",
    type: "debit",
    category: "shopping",
    amount: 199.99,
    description: "Sony WH-1000XM5",
    createdAt: new Date("2026-05-16"),
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

function TransactionTable() {
  const [data, setData] = useState<Transaction[]>(dummyTransactions)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowSelection, setRowSelection] = useState({})

  // Toggle the important flag for a single row
  const toggleImportant = (id: string) => {
    setData((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    )
  }

  const columns: ColumnDef<Transaction>[] = useMemo(
    () => [
      // ── Checkbox ──────────────────────────────────────────────────────────
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },

      // ── Star / Important ──────────────────────────────────────────────────
      {
        id: "important",
        enableSorting: false,
        enableHiding: false,
        header: () => (
          <Star
            className="size-4 text-muted-foreground"
            aria-label="Important"
          />
        ),
        cell: ({ row }) => {
          const isImportant = row.original.important ?? false
          return (
            <button
              onClick={() => toggleImportant(row.original.id)}
              aria-label={isImportant ? "Unmark important" : "Mark as important"}
              className="flex items-center justify-center rounded-sm p-0.5 transition-colors hover:bg-muted"
            >
              <Star
                className={cn(
                  "size-4 transition-colors",
                  isImportant
                    ? "fill-amber-400 text-amber-400"
                    : "fill-transparent text-muted-foreground hover:text-amber-400"
                )}
              />
            </button>
          )
        },
      },

      // ── Title ─────────────────────────────────────────────────────────────
      {
        accessorKey: "title",
        header: () => <span>Title</span>,
        cell: ({ row }) => {
          const isImportant = row.original.important ?? false
          return (
            <div
              className={cn(
                "font-medium",
                isImportant && "text-amber-600 dark:text-amber-400"
              )}
            >
              {row.getValue("title")}
            </div>
          )
        },
      },

      // ── Category ──────────────────────────────────────────────────────────
      {
        accessorKey: "category",
        header: () => <span>Category</span>,
        cell: ({ row }) => {
          const category = row.getValue("category") as Transaction["category"]
          const categoryInfo = TRANSACTION_CATEGORIES.find(
            (c) => c.value === category
          )
          return <span>{categoryInfo?.label || category}</span>
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },

      // ── Type ──────────────────────────────────────────────────────────────
      {
        accessorKey: "type",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const type = row.getValue("type") as "debit" | "credit"
          const typeInfo = TRANSACTION_TYPES.find((t) => t.value === type)
          return (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                type === "credit"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {typeInfo?.label}
            </span>
          )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },

      // ── Amount ────────────────────────────────────────────────────────────
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number
          const type = row.original.type
          return (
            <span
              className={cn(
                "font-mono font-medium",
                type === "credit" ? "text-emerald-600" : "text-red-600"
              )}
            >
              {type === "credit" ? "+" : "-"}${amount.toFixed(2)}
            </span>
          )
        },
      },

      // ── Date ──────────────────────────────────────────────────────────────
      {
        accessorKey: "date",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.createdAt.toLocaleDateString("en-US", {
              timeZone: "UTC",
            })}
          </span>
        ),
      },

      // ── Actions ───────────────────────────────────────────────────────────
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const transaction = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => toggleImportant(transaction.id)}
                >
                  <Star
                    className={cn(
                      "mr-2 size-4",
                      transaction.important
                        ? "fill-amber-400 text-amber-400"
                        : "fill-transparent"
                    )}
                  />
                  {transaction.important ? "Unmark important" : "Mark important"}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() =>
                    setData((prev) => prev.filter((t) => t.id !== transaction.id))
                  }
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data] // re-derive when data changes so toggleImportant closure stays fresh
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
      rowSelection,
    },
  })

  return (
    <div className="w-full space-y-4">
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search transactions..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              <Columns3 className="mr-2 size-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id === "select" ? "Checkbox" : col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <div className="rounded-lg border bg-card">
        <Table className="w-full">
          <TableHeader className="border-b items-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                    // Subtle amber left-border highlight for starred rows
                    row.original.important &&
                      "border-l-2 border-l-amber-400 bg-amber-50/40 dark:bg-amber-900/10"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 p-4 text-center text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </span>
        <span>
          Showing {table.getRowModel().rows?.length} of {data.length} transactions
        </span>
      </div>
    </div>
  )
}

export { TransactionTable }
export type { Transaction }