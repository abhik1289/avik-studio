"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  transactionSchema,
  type TransactionFormValues,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from "@/lib/schemas/transaction.schema"
import { cn } from "@/lib/utils"

interface AddOrUpdateTransactionModelProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  initialValues?: Partial<TransactionFormValues>
  onSubmit?: (values: TransactionFormValues) => void
}

function AddOrUpdateTransactionModel({
  open = false,
  onOpenChange,
  initialValues,
  onSubmit,
}: AddOrUpdateTransactionModelProps) {
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: initialValues?.title || "",
      type: initialValues?.type,
      category: initialValues?.category,
      amount: initialValues?.amount,
      description: initialValues?.description || "",
    },
  })

  React.useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const selectedType = watch("type")
  const selectedCategory = watch("category")

  const handleFormSubmit = async (data: TransactionFormValues) => {
    try {
      await onSubmit?.(data)
      reset()
      handleOpenChange(false)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const selectedTypeLabel =
    TRANSACTION_TYPES.find((t) => t.value === selectedType)?.label || "Select Type"
  const selectedCategoryLabel =
    TRANSACTION_CATEGORIES.find((c) => c.value === selectedCategory)?.label ||
    "Select Category"

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="size-4" />
          <span>Add Transaction</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Add New Transaction</SheetTitle>
          <SheetDescription>
            Enter the details for your new transaction. All fields marked with * are
            required.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          {/* Title Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              id="title"
              placeholder="e.g., Monthly Salary"
              {...register("title")}
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Type Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Type <span className="text-destructive">*</span>
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !selectedType && "text-muted-foreground",
                    errors.type && "border-destructive"
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
                    onClick={() => setValue("type", type.value, { shouldValidate: true })}
                    className={cn(
                      "cursor-pointer",
                      selectedType === type.value && "bg-accent"
                    )}
                  >
                    <span className={cn(type.color, "font-medium")}>{type.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {errors.type && (
              <p className="text-xs text-destructive">{errors.type.message}</p>
            )}
          </div>

          {/* Category Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Category <span className="text-destructive">*</span>
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !selectedCategory && "text-muted-foreground",
                    errors.category && "border-destructive"
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
                      setValue("category", category.value, { shouldValidate: true })
                    }
                    className={cn(
                      "cursor-pointer",
                      selectedCategory === category.value && "bg-accent"
                    )}
                  >
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          {/* Amount Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className={cn("pl-7", errors.amount && "border-destructive")}
                {...register("amount", {
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-destructive">{errors.amount.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Add any additional notes..."
              rows={3}
              className={cn(
                "flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
              )}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          <SheetFooter className="pt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Transaction"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export { AddOrUpdateTransactionModel }
export type { AddOrUpdateTransactionModelProps }
