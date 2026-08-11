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
  autoPlayInterval = 5000,
  className = '',
  showControls = true,
  showDots = true,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = items.length;

  // We clone items to allow seamless infinite loop wrap-around
  const extendedItems = total > 0 ? [...items, ...items, ...items] : [];
  const offsetIndex = total + currentIndex;

  const next = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Reset index seamlessly when reaching clone boundaries
  useEffect(() => {
    if (currentIndex >= total) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 450);
      return () => clearTimeout(timer);
    }
    if (currentIndex < -total) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 450);
      return () => clearTimeout(timer);
    }
    setIsTransitioning(true);
  }, [currentIndex, total]);

  // Autoplay handler
  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return;
    const timer = setInterval(() => {
      next();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, next, total]);

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
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) next();
    if (isRightSwipe) prev();

    touchStartX.current = null;
    touchEndX.current = null;
  }

  if (!total) return null;

  const activeDotIndex = ((currentIndex % total) + total) % total;

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Track Window */}
      <div className="w-full overflow-hidden py-4">
        <div
          className={`flex [--carousel-step:100%] md:[--carousel-step:50%] lg:[--carousel-step:33.333333%] ${
            isTransitioning ? 'transition-transform duration-500 ease-out' : 'transition-none'
          }`}
          style={{
            transform: `translateX(calc(-${offsetIndex} * var(--carousel-step)))`,
          }}
        >
          {extendedItems.map((item, idx) => (
            <div
              key={`${idx}-${(item as any)?._id || idx}`}
              className="w-full shrink-0 px-3.5 md:w-1/2 lg:w-1/3"
            >
              {renderItem(item, idx % total)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls & Dots Header/Footer */}
      {(showControls || showDots) && (
        <div className="mt-6 flex items-center justify-between gap-4 px-2">
          {/* Dots Indicator */}
          {showDots && (
            <div className="flex items-center gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeDotIndex === i
                      ? 'bg-accent w-8'
                      : 'bg-border-subtle hover:bg-text-muted/40 w-2.5'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Prev / Next Arrows */}
          {showControls && (
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="border-border-subtle bg-bg-surface text-text-main hover:border-accent hover:text-accent flex h-10 w-10 items-center justify-center rounded-full border transition-colors shadow-xs cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="border-border-subtle bg-bg-surface text-text-main hover:border-accent hover:text-accent flex h-10 w-10 items-center justify-center rounded-full border transition-colors shadow-xs cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
