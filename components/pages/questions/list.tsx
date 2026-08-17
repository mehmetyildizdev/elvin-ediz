'use client';

import { useState, useMemo } from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import type { FaqPageData, FaqItem, SiteSettingsData } from '@/sanity/lib/types';
import { defaultFaqPage, defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { PortableTextRenderer } from '@/components/ui/portable-text';

interface QuestionsListProps {
  faqPageData?: FaqPageData;
  settings?: SiteSettingsData;
}


export function QuestionsList({
  faqPageData = defaultFaqPage,
  settings = defaultSiteSettings,
}: QuestionsListProps) {
  const items = faqPageData.items && faqPageData.items.length > 0 ? faqPageData.items : defaultFaqPage.items || [];
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Extract unique categories for optional filter pills
  const categories = useMemo(() => {
    const cats = new Set<string>();
    items.forEach((item) => {
      if (item.category && item.category.trim()) {
        cats.add(item.category.trim());
      }
    });
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter((item) => item.category?.trim().toLowerCase() === activeCategory.toLowerCase());
  }, [items, activeCategory]);

  return (
    <section className="bg-bg-app px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto flex max-w-4xl flex-col">
        {/* Optional Category Filter Pills */}
        {categories.length > 1 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                setActiveCategory('All');
                setOpenIndex(0);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                activeCategory === 'All'
                  ? 'bg-accent text-bg-primary shadow-xs'
                  : 'bg-bg-surface text-text-muted hover:text-text-main border border-border-subtle'
              }`}
            >
              All Topics ({items.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                  activeCategory === cat
                    ? 'bg-accent text-bg-primary shadow-xs'
                    : 'bg-bg-surface text-text-muted hover:text-text-main border border-border-subtle'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Accordion List */}
        {filteredItems.length > 0 ? (
          <div className="flex w-full flex-col">
            {filteredItems.map((item: FaqItem, idx: number) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={item._key || idx}
                  className="border-border-subtle group border-t py-6 transition-all duration-300 last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="text-text-main hover:text-accent flex w-full cursor-pointer items-start justify-between gap-4 text-left font-serif text-lg font-semibold transition-colors md:text-xl"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col items-start gap-1.5 pr-4">
                      {item.category && (
                        <span className="bg-accent/10 text-accent rounded-xs border border-accent/20 px-2 py-0.5 text-[10px] font-sans font-bold tracking-wider uppercase">
                          {item.category}
                        </span>
                      )}
                      <span>{item.question}</span>
                    </div>
                    <span
                      className={`text-accent shrink-0 text-2xl leading-none font-light transition-transform duration-250 select-none ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 max-w-3xl pl-1 animate-in fade-in duration-200">
                      <PortableTextRenderer value={item.answer} size="sm" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-12 text-center">
            <HelpCircle size={28} className="text-accent/60 mx-auto mb-3" />
            <h3 className="text-text-main font-serif text-lg font-semibold">
              No questions found for this topic
            </h3>
            <p className="text-text-muted mt-1 text-xs">
              Please choose another topic or contact our team directly.
            </p>
          </div>
        )}

        {/* 03. Editable Consultation / Contact Callout Box */}
        {(faqPageData.ctaTitle || faqPageData.ctaEyebrow) && (
          <div className="border-border-subtle bg-bg-surface mt-16 rounded-sm border p-8 shadow-xs sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="space-y-2">
                {faqPageData.ctaEyebrow && (
                  <span className="text-accent block text-xs font-bold tracking-widest uppercase">
                    {faqPageData.ctaEyebrow}
                  </span>
                )}
                {faqPageData.ctaTitle && (
                  <h3 className="text-text-main font-serif text-xl font-semibold sm:text-2xl">
                    {faqPageData.ctaTitle}
                  </h3>
                )}
                {faqPageData.ctaDescription && (
                  <p className="text-text-muted max-w-xl text-xs leading-relaxed sm:text-sm">
                    {faqPageData.ctaDescription}
                  </p>
                )}
              </div>

              <Button
                href={resolveCtaLink(
                  faqPageData.ctaButtonLink,
                  settings?.whatsappNumber,
                  'Hello, I have a specific question about my Canadian immigration case.'
                )}
                variant="primary"
                size="md"
                className="shrink-0 inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                {faqPageData.ctaButtonText || 'Book Consultation'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
