import * as React from "react"
import { cn } from "@/lib/utils"

// ─── FieldGroup ───────────────────────────────────────────────────────────────

function FieldGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

// ─── FieldLabel ────────────────────────────────────────────────────────────────

interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      data-slot="field-label"
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  )
}

// ─── FieldDescription ─────────────────────────────────────────────────────────

interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

// ─── FieldError ───────────────────────────────────────────────────────────────

type FieldErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  errors?: ({ message?: string } | undefined)[]
}

function FieldError({ className, errors, ...props }: FieldErrorProps) {
  if (!errors?.length) return null
  return (
    <>
      {errors.map((error, i) =>
        error?.message ? (
          <p
            key={i}
            data-slot="field-error"
            className={cn("text-xs text-destructive", className)}
            {...props}
          >
            {error.message}
          </p>
        ) : null
      )}
    </>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-invalid"?: boolean
}

function Field({ className, "data-invalid": dataInvalid, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-invalid={dataInvalid}
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

// ─── Exported names ───────────────────────────────────────────────────────────

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldError }
export type { FieldProps, FieldLabelProps, FieldDescriptionProps, FieldErrorProps }