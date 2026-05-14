import { z } from "zod"

export const transactionSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  type: z.enum(["debit", "credit"], {
    required_error: "Please select a transaction type",
  }),
  category: z.enum(["salary", "food", "transport", "shopping", "entertainment", "bills", "other"], {
    required_error: "Please select a category",
  }),
  amount: z
    .number({
      required_error: "Amount is required",
    })
    .positive("Amount must be a positive number")
    .min(0.01, "Amount must be at least 0.01"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
})

export type TransactionFormValues = z.infer<typeof transactionSchema>

export const TRANSACTION_CATEGORIES = [
  { value: "salary", label: "Salary" },
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "shopping", label: "Shopping" },
  { value: "entertainment", label: "Entertainment" },
  { value: "bills", label: "Bills" },
  { value: "other", label: "Other" },
] as const

export const TRANSACTION_TYPES = [
  { value: "debit", label: "Debit", color: "text-destructive" },
  { value: "credit", label: "Credit", color: "text-emerald-500" },
] as const