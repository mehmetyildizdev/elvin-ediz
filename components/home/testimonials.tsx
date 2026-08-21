'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Star, Quote, ExternalLink, MessageSquareQuote } from 'lucide-react';
import type {
  TestimonialData,
  GoogleReviewsData,
  GoogleReviewItem,
  HomePageData,
} from '@/sanity/lib/types';
import { defaultHomePage, defaultGoogleReviews } from '@/sanity/lib/types';
import { Carousel } from '@/components/ui/carousel';

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function cleanStega(value?: string): string {
  if (!value || typeof value !== 'string') return '';
  return value
    .replace(/[\u200B-\u200D\uFEFF\uFE00-\uFE0F]/g, '')
    .replace(/[\u{E0000}-\u{E007F}]/gu, '')
    .trim();
}

export function Testimonials({
  testimonials = [],
  googleReviews = defaultGoogleReviews,
  homeData = defaultHomePage,
}: {
  testimonials: TestimonialData[];
  googleReviews?: GoogleReviewsData;
  homeData?: HomePageData;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Lazy load intersection observer
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const rating = googleReviews?.rating || 4.9;
  const totalReviews = googleReviews?.totalReviews || 73;

  const mapsUrl =
    googleReviews?.googleMapsUrl ||
    'https://www.google.com/maps/place/Elvin+Ediz+Immigration+Services/@43.846367,-79.383731,17z/data=!4m6!3m5!1s0x42609be984f53c27:0x8157fbe4a4cd3191!8m2!3d43.846367!4d-79.383731!16s%2Fg%2F11qb5x2mcv';

  const writeReviewUrl =
    googleReviews?.writeReviewUrl ||
    'https://search.google.com/local/writereview?placeid=ChIJNzT1hOmbYEERkTHNpOT7V4E';

  // Deduplicate reviews by clean author name, require review quote, and limit strictly to top 12
  // We preserve original Stega encoded fields so Presentation Tool click-to-edit works seamlessly
  const displayGoogleReviews = useMemo(() => {
    const rawList = googleReviews?.reviews || defaultGoogleReviews.reviews || [];
    const seenAuthors = new Set<string>();
    const unique: GoogleReviewItem[] = [];

    for (const item of rawList) {
      const cleanAuthor = cleanStega(item.author);
      const cleanQuote = cleanStega(item.quote);
      const authorKey = cleanAuthor.toLowerCase();

      if (cleanAuthor && authorKey && !seenAuthors.has(authorKey) && cleanQuote.length > 0) {
        seenAuthors.add(authorKey);
        unique.push(item);
      }
    }

    return unique.slice(0, 12);
  }, [googleReviews]);

  return (
    <section
      ref={sectionRef}
      className="bg-bg-app border-border-subtle overflow-hidden border-t px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        {/* Top Header & Google Trust Badge */}
        <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              {homeData.testimonialsEyebrow || 'CLIENT REPUTATION & REVIEWS'}
            </p>
            <h2 className="text-text-main m-0 font-serif text-4xl leading-tight sm:text-5xl md:text-5xl">
              {homeData.testimonialsTitleMain || 'Trusted by clients'} <br />
              <span className="text-accent font-serif italic">
                {homeData.testimonialsTitleAccent || 'across the globe.'}
              </span>
            </h2>
          </div>

          {/* Official Google Reviews Badge Summary Card */}
          <div className="border-border-subtle bg-bg-surface/80 hover:border-accent/40 flex flex-col gap-3 rounded-lg border p-4 backdrop-blur-xs transition-all sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-bg-app border-border-subtle flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-xs">
                <GoogleIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-text-main font-serif text-2xl font-bold tracking-tight">
                    {rating.toFixed(1)}
                  </span>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                </div>
                <p className="text-text-muted text-xs font-medium">
                  Based on{' '}
                  <strong className="text-text-main font-semibold">{totalReviews}+ reviews</strong>{' '}
                  on Google
                </p>
              </div>
            </div>

            <div className="border-border-subtle flex items-center gap-2 border-t pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-main hover:text-accent border-border-subtle hover:border-accent inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors"
              >
                <span>View on Google</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent/10 text-accent hover:bg-accent/20 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors"
              >
                <span>Review Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lazy Loaded Content Body */}
        {isVisible ? (
          <>
            {/* PRIMARY TIER: Google Reviews Carousel with Strict Fixed Heights */}
            <div className="mb-14">
              <Carousel
                items={displayGoogleReviews}
                autoPlay={true}
                autoPlayInterval={5500}
                showControls={true}
                showDots={true}
                renderItem={(item: GoogleReviewItem) => (
                  <article
                    key={item._key || item.author}
                    className="border-border-subtle bg-bg-surface hover:border-accent/30 flex h-57.5 flex-col justify-between rounded-lg border p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* 1. Fixed Header: Google Icon + Stars + Date (h-5) */}
                    <div className="flex h-5 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GoogleIcon className="h-4 w-4 shrink-0" />
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: item.rating || 5 }).map((_, i) => (
                            <Star key={i} size={13} fill="currentColor" stroke="none" />
                          ))}
                        </div>
                      </div>
                      {item.date && (
                        <span className="text-text-muted/70 text-[11px] font-medium tracking-wide">
                          {item.date}
                        </span>
                      )}
                    </div>

                    {/* 2. Fixed Content Area (h-23.5) with line clamp & Google Read More link */}
                    <div className="my-auto flex h-23.5 flex-col justify-between overflow-hidden">
                      <p className="text-text-main line-clamp-3 font-serif text-sm leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent inline-flex items-center gap-1 self-start pt-1 text-[11px] font-medium transition-colors hover:underline"
                      >
                        <span>Read on Google Maps</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>

                    {/* 3. Fixed Footer: Avatar + Truncated Author Details + 5.0 Badge (h-12) */}
                    <div className="border-border-subtle/60 flex h-12 items-center justify-between border-t pt-3">
                      <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-2">
                        {item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.author}
                            className="h-7 w-7 shrink-0 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="bg-accent/15 text-accent flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                            {item.author.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-text-main truncate font-serif text-xs leading-tight font-semibold">
                            {item.author}
                          </h4>
                          <span className="text-text-muted block truncate text-[10px] leading-tight">
                            Verified Google Review
                          </span>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                        5.0 ★
                      </span>
                    </div>
                  </article>
                )}
              />
            </div>

            {/* SECONDARY TIER: Curated Case Testimonials (Compact Lower Carousel) */}
            {testimonials && testimonials.length > 0 && (
              <div className="border-border-subtle/80 border-t pt-10">
                <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquareQuote size={16} className="text-accent" />
                    <h3 className="text-text-muted font-serif text-xs font-bold tracking-wider uppercase">
                      Additional Client Cases & Feedback
                    </h3>
                  </div>
                  <span className="text-text-muted text-[11px]">Direct client submissions</span>
                </div>

                <Carousel
                  items={testimonials}
                  autoPlay={true}
                  autoPlayInterval={6500}
                  showControls={true}
                  showDots={false}
                  renderItem={(item: TestimonialData) => (
                    <article
                      key={item._id}
                      className="border-border-subtle/60 bg-bg-surface/50 hover:bg-bg-surface flex h-45 flex-col justify-between rounded-md border p-4 transition-all duration-200 hover:shadow-xs"
                    >
                      <div className="flex h-4 items-center justify-between">
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: item.rating || 5 }).map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" stroke="none" />
                          ))}
                        </div>
                        <Quote size={14} className="text-accent/30" />
                      </div>

                      <div className="my-auto flex h-18.5 items-center overflow-hidden">
                        <p className="text-text-main line-clamp-3 font-serif text-xs leading-relaxed italic">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      <div className="border-border-subtle/40 flex h-9.5 items-center justify-between border-t pt-2">
                        <div className="min-w-0 flex-1 pr-2">
                          <h5 className="text-text-main truncate text-xs font-semibold">
                            {item.author}
                          </h5>
                          <span className="text-text-muted block truncate text-[10px]">
                            {item.location || 'Canada'}
                          </span>
                        </div>
                        <span className="text-accent shrink-0 text-[10px] font-bold tracking-wider uppercase">
                          Client Case
                        </span>
                      </div>
                    </article>
                  )}
                />
              </div>
            )}
          </>
        ) : (
          /* Placeholder skeleton during off-screen initial load */
          <div className="bg-bg-surface/30 h-72 w-full animate-pulse rounded-lg" />
        )}
      </div>
    </section>
  );
}
