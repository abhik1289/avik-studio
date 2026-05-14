"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddOrUpdateTransactionDialog } from "@/components/models/add-or-update-transaction-dialog"
import { TransactionTable } from "@/app/features/transactions/components/transaction-table"
import { useTransactionModalStore } from "@/lib/store/transactio.store."
import { Card, CardContent } from "@/components/ui/card"
import type { TransactionFormValues } from "@/lib/schemas/transaction.schema"

function TransactionsPage() {
  const { isOpen, openModal, closeModal } = useTransactionModalStore()

  const handleAddTransaction = async (values: TransactionFormValues) => {
    // TODO: replace with real API call / store dispatch
    console.log("New transaction:", values)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage your financial transactions
          </p>
        </div>
        <Button onClick={() => openModal({ onSubmit: handleAddTransaction })}>
          <Plus className="size-4" />
          <span>Add Transaction</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <Card className="grid gap-4 md:grid-cols-3 border">
        <Card className="border-r rounded-none">
          <CardContent>
            <div className="title text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Total Income
            </div>
            <div className="text-2xl font-extrabold leading-tight text-emerald-600">
              $6,500.00
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              Up 12% compared with last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-r rounded-none">
          <CardContent>
            <div className="title text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Total Expenses
            </div>
            <div className="text-2xl font-extrabold text-red-600">$597.23</div>
            <p className="text-xs font-medium text-muted-foreground">
              -8% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardContent>
            <div className="title text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Balance
            </div>
            <div className="text-2xl font-extrabold">$5,902.77</div>
            <p className="text-xs font-medium text-muted-foreground">
              Net positive this month
            </p>
          </CardContent>
        </Card>
      </Card>

      <Card>
        <TransactionTable />
      </Card>

      {/* Dialog controlled by Zustand store */}
      <AddOrUpdateTransactionDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeModal()
        }}
        initialValues={{}}
        onSubmit={handleAddTransaction}
      />
    </div>
  )
}

export default TransactionsPage
