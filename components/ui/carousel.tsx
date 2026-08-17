'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  showControls?: boolean;
  showDots?: boolean;
}

export function Carousel<T>({
  items,
  renderItem,
  autoPlay = true,
  autoPlayInterval = 5500,
  className = '',
  showControls = true,
  showDots = true,
}: CarouselProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = items.length;

  // Responsive page size detection
  useEffect(() => {
    function updatePageSize() {
      const w = window.innerWidth;
      if (w < 768) {
        setPageSize(1);
      } else if (w < 1024) {
        setPageSize(2);
      } else {
        setPageSize(3);
      }
    }
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Reset page if pageSize changes and exceeds totalPages
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  const triggerPageChange = useCallback(
    (newPage: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentPage(newPage);
      setTimeout(() => {
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    if (totalPages <= 1) return;
    triggerPageChange((currentPage + 1) % totalPages);
  }, [currentPage, totalPages, triggerPageChange]);

  const prev = useCallback(() => {
    if (totalPages <= 1) return;
    triggerPageChange((currentPage - 1 + totalPages) % totalPages);
  }, [currentPage, totalPages, triggerPageChange]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || isPaused || totalPages <= 1) return;
    const timer = setInterval(() => {
      next();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, next, totalPages]);

  // Touch Swipe handlers
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) next();
    if (distance < -40) prev();

    touchStartX.current = null;
    touchEndX.current = null;
  }

  if (!total) return null;

  // Windowed visible slice: ONLY the active cards are rendered in the DOM
  // This completely eliminates off-screen DOM overflow that causes Sanity Visual Editing jitter
  const startIndex = currentPage * pageSize;
  const currentItems = items.slice(startIndex, startIndex + pageSize);

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Active Grid Window */}
      <div className="w-full py-3">
        <div
          className={`grid grid-cols-1 gap-4 transition-opacity duration-350 ease-out md:grid-cols-2 lg:grid-cols-3 ${
            isAnimating ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
        >
          {currentItems.map((item, idx) => {
            const actualIndex = startIndex + idx;
            return (
              <div
                key={`${actualIndex}-${(item as any)?._key || (item as any)?._id || actualIndex}`}
                className="w-full max-w-full"
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Dots Header/Footer */}
      {(showControls || showDots) && (
        <div className="mt-4 flex items-center justify-between gap-4 px-1">
          {/* Dots Indicator */}
          {showDots && (
            <div className="flex items-center gap-1.5 py-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => triggerPageChange(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === i
                      ? 'bg-accent w-6'
                      : 'bg-border-subtle hover:bg-text-muted/50 w-2'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Prev / Next Arrows */}
          {showControls && totalPages > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={prev}
                className="border-border-subtle bg-bg-surface text-text-main hover:border-accent hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border transition-colors shadow-xs cursor-pointer active:scale-95"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                className="border-border-subtle bg-bg-surface text-text-main hover:border-accent hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border transition-colors shadow-xs cursor-pointer active:scale-95"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
