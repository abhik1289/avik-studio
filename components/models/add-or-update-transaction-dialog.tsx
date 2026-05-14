"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  transactionSchema,
  type TransactionFormValues,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from "@/lib/schemas/transaction.schema"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface TransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues?: Partial<TransactionFormValues>
  onSubmit: (values: TransactionFormValues) => void | Promise<void>
}

function AddOrUpdateTransactionDialog({
  open,
  onOpenChange,
  initialValues,
  onSubmit,
}: TransactionDialogProps) {
  const form = useForm<TransactionFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(transactionSchema as any),
    defaultValues: {
      title: "",
      type: undefined,
      category: undefined,
      amount: 0,
      description: "",
    },
  })

  React.useEffect(() => {
    if (open) {
      form.reset(
        initialValues ?? {
          title: "",
          type: undefined,
          category: undefined,
          amount: 0,
          description: "",
        }
      )
    }
  }, [open, initialValues, form])

  const handleFormSubmit = async (data: TransactionFormValues) => {
    try {
      await onSubmit(data)
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
      style={{
        scrollbarWidth: "none",
        // msOverflowStyle: "none",
      }}
      className="w-full sm:max-w-lg flex flex-col h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b">
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-transaction-form"
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4 px-6 py-4 overflow-y-auto flex-1"
        >
          <FieldGroup className="space-y-1.5">
            {/* ── Title ── */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tx-title">Title *</FieldLabel>
                  <Input
                    {...field}
                    id="tx-title"
                    placeholder="e.g., Monthly Salary"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ── Type ── */}
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => {
                const selectedTypeLabel =
                  TRANSACTION_TYPES.find((t) => t.value === field.value)?.label ??
                  "Select Type"
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Type *</FieldLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                            fieldState.invalid && "border-destructive"
                          )}
                        >
                          {selectedTypeLabel}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-full">
                        <DropdownMenuLabel>Transaction Type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {TRANSACTION_TYPES.map((type) => (
                          <DropdownMenuItem
                            key={type.value}
                            onClick={() =>
                              field.onChange(type.value)
                            }
                            className={cn(
                              "cursor-pointer",
                              field.value === type.value && "bg-accent"
                            )}
                          >
                            <span className={cn(type.color, "font-medium")}>
                              {type.label}
                            </span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />

            {/* ── Category ── */}
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => {
                const selectedCategoryLabel =
                  TRANSACTION_CATEGORIES.find(
                    (c) => c.value === field.value
                  )?.label ?? "Select Category"
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category *</FieldLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                            fieldState.invalid && "border-destructive"
                          )}
                        >
                          {selectedCategoryLabel}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-full">
                        <DropdownMenuLabel>Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {TRANSACTION_CATEGORIES.map((category) => (
                          <DropdownMenuItem
                            key={category.value}
                            onClick={() =>
                              field.onChange(category.value)
                            }
                            className={cn(
                              "cursor-pointer",
                              field.value === category.value && "bg-accent"
                            )}
                          >
                            {category.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />

            {/* ── Amount ── */}
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tx-amount">Amount *</FieldLabel>
                  <InputGroup>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
                      $
                    </span>
                    <Input
                      {...field}
                      id="tx-amount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      className={cn(
                        "pl-7",
                        fieldState.invalid && "border-destructive"
                      )}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ── Description ── */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tx-description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="tx-description"
                      placeholder="Add any additional notes..."
                      rows={5}
                      className="resize-none min-h-24"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {String(field.value ?? "").length} characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter className="px-6 pb-6 pt-4 shrink-0 border-t">
          <div className="flex w-full justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="add-transaction-form">
              Save Transaction
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AddOrUpdateTransactionDialog }
