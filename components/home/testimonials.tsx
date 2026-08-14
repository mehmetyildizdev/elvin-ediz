'use client';

import { Star, Quote } from 'lucide-react';
import type { TestimonialData, HomePageData } from '@/sanity/lib/types';
import { defaultHomePage } from '@/sanity/lib/types';
import { Carousel } from '@/components/ui/carousel';

export function Testimonials({
  testimonials,
  homeData = defaultHomePage,
}: {
  testimonials: TestimonialData[];
  homeData?: HomePageData;
}) {
  return (
    <section className="bg-bg-app border-border-subtle border-t px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              {homeData.testimonialsEyebrow || 'CLIENT EXPERIENCES'}
            </p>
            <h2 className="text-text-main m-0 font-serif text-4xl leading-tight sm:text-5xl md:text-5xl">
              {homeData.testimonialsTitleMain || 'Trusted by clients'} <br />
              <span className="text-accent font-serif italic">
                {homeData.testimonialsTitleAccent || 'across the globe.'}
              </span>
            </h2>
          </div>
          <a
            href="https://www.google.com/search?q=Elvin+Ediz+Immigration+Services"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent border-border-subtle hover:border-accent inline-flex items-center gap-2 border-b pb-1 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            View Google Reviews ★ 5.0
          </a>
        </div>

        <Carousel
          items={testimonials}
          autoPlay={true}
          autoPlayInterval={5000}
          showControls={true}
          showDots={true}
          renderItem={(item) => (
            <article
              key={item._id}
              className="border-border-subtle bg-bg-surface flex h-full min-h-64 flex-col justify-between rounded-sm border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <Quote size={20} className="text-accent/40" />
                </div>
                <p className="text-text-main mb-6 font-serif text-sm leading-relaxed italic md:text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="border-border-subtle/50 flex items-center justify-between border-t pt-4">
                <div>
                  <h4 className="text-text-main font-serif text-base font-semibold">{item.author}</h4>
                  <span className="text-text-muted text-xs">{item.location}</span>
                </div>
                <span className="bg-accent/10 text-accent rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                  Verified
                </span>
              </div>
            </article>
          )}
        />
      </div>
    </section>
  );
}
