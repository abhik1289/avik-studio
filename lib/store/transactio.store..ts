import { create } from "zustand"
import type { TransactionFormValues } from "@/lib/schemas/transaction.schema"

interface TransactionModalState {
  isOpen: boolean
  initialValues: Partial<TransactionFormValues> | null
  onSubmit: ((values: TransactionFormValues) => void) | null

  openModal: (config?: {
    initialValues?: Partial<TransactionFormValues>
    onSubmit?: (values: TransactionFormValues) => void
  }) => void
  closeModal: () => void
}

export const useTransactionModalStore = create<TransactionModalState>((set) => ({
  isOpen: false,
  initialValues: null,
  onSubmit: null,

  openModal: (config) =>
    set({
      isOpen: true,
      initialValues: config?.initialValues ?? null,
      onSubmit: config?.onSubmit ?? null,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      initialValues: null,
      onSubmit: null,
    }),
}))
