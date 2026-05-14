import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// ─── InputGroup ───────────────────────────────────────────────────────────────

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn("relative flex w-full", className)}
      {...props}
    />
  )
}

// ─── InputGroupAddon ─────────────────────────────────────────────────────────

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end" | "block-start" | "block-end"
}

function InputGroupAddon({
  className,
  align = "end",
  ...props
}: InputGroupAddonProps) {
  const alignmentClasses: Record<string, string> = {
    start: "absolute left-0 top-1/2 -translate-y-1/2 pl-3",
    end: "absolute right-0 top-1/2 -translate-y-1/2 pr-3",
    "block-start": "absolute top-0 right-0 pr-3 pt-3",
    "block-end": "absolute bottom-0 right-0 pr-3 pb-3",
  }
  return (
    <div
      data-slot="input-group-addon"
      className={cn(
        "pointer-events-none flex items-center",
        alignmentClasses[align],
        className
      )}
      {...props}
    />
  )
}

// ─── InputGroupText ───────────────────────────────────────────────────────────

interface InputGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "text-sm text-muted-foreground [&_code]:font-mono [&_code]:text-xs",
        className
      )}
      {...props}
    />
  )
}

// ─── InputGroupTextarea ───────────────────────────────────────────────────────

interface InputGroupTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 pr-16 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
})
InputGroupTextarea.displayName = "InputGroupTextarea"

// ─── InputGroupInput (styled to work inside InputGroup) ──────────────────────

interface InputGroupInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 pr-16 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
})
InputGroupInput.displayName = "InputGroupInput"

// ─── Exported names ───────────────────────────────────────────────────────────

export {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
  InputGroupInput,
}
export type {
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupTextProps,
  InputGroupTextareaProps,
  InputGroupInputProps,
}