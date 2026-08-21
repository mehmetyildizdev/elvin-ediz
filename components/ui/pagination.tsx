'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipses if needed
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-1.5 pt-8 ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="border-border-subtle bg-bg-surface hover:border-accent hover:text-accent text-text-main inline-flex h-9 cursor-pointer items-center gap-1 rounded-sm border px-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Go to previous page"
      >
        <ChevronLeft size={14} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="text-text-muted flex h-9 w-8 items-center justify-center text-xs select-none"
              >
                …
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = currentPage === pageNum;

          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-sm px-2 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-accent text-bg-primary font-bold shadow-xs'
                  : 'border-border-subtle bg-bg-surface text-text-main hover:border-accent hover:text-accent border'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="border-border-subtle bg-bg-surface hover:border-accent hover:text-accent text-text-main inline-flex h-9 cursor-pointer items-center gap-1 rounded-sm border px-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
