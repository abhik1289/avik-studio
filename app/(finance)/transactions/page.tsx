"use client"

import React from "react"
import { AddOrUpdateTransactionModel } from "@/components/models/add-or-update-transaction-model"
import { TransactionTable } from "@/app/features/transactions/components/transaction-table"
import { type TransactionFormValues } from "@/lib/schemas/transaction.schema"
import { Card, CardContent} from "@/components/ui/card"

function TransactionsPage() {
  const handleAddTransaction = (values: TransactionFormValues) => {
    console.log("New Transaction:", values)
    // TODO: Implement API call to save transaction
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
        <AddOrUpdateTransactionModel onSubmit={handleAddTransaction} />
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
            <div className="text-2xl font-extrabold text-red-600">
              $597.23
            </div>
            <p className="text-xs text-muted-foreground">
              -8% from last month
            </p>
          </CardContent>
        </Card>
        <Card className=" rounded-none">
         
          <CardContent>
             <div className="title text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                       Balance


            </div>
            <div className="text-2xl font-extrabold">
              $5,902.77
            </div>
            <p className="text-xs text-muted-foreground">
              Net positive this month
            </p>
          </CardContent>
        </Card>
      </Card>
      <Card>
          <TransactionTable />
      </Card>
    </div>
  )
}

export default TransactionsPage
