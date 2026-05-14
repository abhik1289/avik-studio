"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  siblingCount?: number
}

function range(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  siblingCount = 1,
}: PaginationProps) {
  const pageSizeOptions = [10, 25, 50, 100]

  // Build pagination range
  const dots = "..."
  const showLeftDots = currentPage > siblingCount + 2
  const showRightDots = currentPage < totalPages - siblingCount - 1

  let pages: (number | string)[] = []

  if (totalPages <= 7) {
    pages = range(1, totalPages)
  } else if (showLeftDots && !showRightDots) {
    const leftRange = range(1, siblingCount + 2)
    pages = [...leftRange, dots, totalPages - 1, totalPages]
  } else if (!showLeftDots && showRightDots) {
    const rightRange = range(totalPages - siblingCount - 1, totalPages)
    pages = [1, 2, ...range(totalPages - siblingCount - 1, totalPages)]
  } else {
    const middleRange = range(currentPage - siblingCount, currentPage + siblingCount)
    pages = [1, 2, ...middleRange, dots, totalPages - 1, totalPages]
  }

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-between gap-4 bg-background/95 backdrop-blur-sm border-t px-4 py-3">
      {/* Page size selector */}
      {onPageSizeChange && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page</span>
          <select
            className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 cursor-pointer"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Showing X–Y of Z */}
      <span className="text-sm text-muted-foreground hidden sm:block">
        {totalItems === 0 ? (
          "No results"
        ) : (
          <>
            Showing <span className="font-medium text-foreground">{startItem}–{endItem}</span> of{" "}
            <span className="font-medium text-foreground">{totalItems}</span>
          </>
        )}
      </span>

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        {/* First page */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          aria-label="First page"
        >
          <ChevronsLeft className="size-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {/* Page numbers */}
        {pages.map((page, i) =>
          page === dots ? (
            <span
              key={`dots-${i}`}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground text-sm select-none"
            >
              &#8230;
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => onPageChange(page as number)}
              className={cn(
                "size-8 text-sm font-medium transition-all",
                currentPage === page
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )
        )}

        {/* Next page */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          aria-label="Last page"
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export { Pagination }
export type { PaginationProps }