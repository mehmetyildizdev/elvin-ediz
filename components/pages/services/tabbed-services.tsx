'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ServiceData } from '@/sanity/lib/types';
import { getIconComponent } from '@/sanity/lib/iconLibrary';
import { PortableText, type PortableTextComponents } from '@portabletext/react';

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-text-main font-serif text-2xl font-semibold mt-6 mb-3 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-text-main font-serif text-xl font-semibold mt-6 mb-3 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-text-main font-serif text-lg font-semibold mt-5 mb-2 first:mt-0">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-text-main font-semibold text-base mt-4 mb-2 first:mt-0">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-text-muted text-base leading-relaxed mb-4 last:mb-0">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-4 my-4 italic text-text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 my-4 space-y-2 text-text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 my-4 space-y-2 text-text-muted">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-text-main font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow noreferrer' : undefined}
          className="text-accent underline underline-offset-4 hover:text-accent-hover transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export function TabbedServices({
  services = [],
  initialTab,
}: {
  services: ServiceData[];
  initialTab?: string;
}) {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');

  const validServices = services.filter((s) => s && s.title);

  const [activeSlug, setActiveSlug] = useState<string>(() => {
    if (urlTab && validServices.some((s) => s.slug === urlTab)) return urlTab;
    if (initialTab && validServices.some((s) => s.slug === initialTab)) return initialTab;
    return validServices[0]?.slug || '';
  });

  useEffect(() => {
    if (urlTab && validServices.some((s) => s.slug === urlTab)) {
      setActiveSlug(urlTab);
      const el = document.getElementById('pathways-tabs');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [urlTab, validServices]);

  const handleTabChange = (slug: string) => {
    setActiveSlug(slug);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', slug);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const activeService = validServices.find((s) => s.slug === activeSlug) || validServices[0];
  const activeIndex = validServices.findIndex((s) => s.slug === activeSlug);

  if (!activeService) return null;

  const ActiveIcon = getIconComponent(activeService.iconName) || ShieldCheck;

  return (
    <section className="bg-bg-app scroll-mt-28 px-6 py-12 md:px-12 md:py-20" id="pathways-tabs">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Interactive Vertical Tab List */}
          <nav className="flex flex-row gap-2 overflow-x-auto pb-4 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
            <p className="text-text-muted mb-2 hidden text-xs font-bold tracking-widest uppercase lg:block">
              Select Pathway ({validServices.length})
            </p>
            {validServices.map((service, index) => {
              const isSelected = service.slug === activeSlug;
              const Icon = getIconComponent(service.iconName) || ShieldCheck;

              return (
                <button
                  key={service._id || service.slug}
                  onClick={() => handleTabChange(service.slug)}
                  className={`group relative flex shrink-0 items-center gap-4 rounded-md border p-4 text-left transition-all duration-200 lg:w-full ${
                    isSelected
                      ? 'border-accent bg-bg-surface text-text-main shadow-md ring-1 ring-accent/30'
                      : 'border-border-subtle hover:border-border-on-dark/30 hover:bg-bg-surface/50 text-text-muted hover:text-text-main bg-transparent'
                  }`}
                >
                  <span
                    className={`font-serif text-sm font-semibold transition-colors ${
                      isSelected ? 'text-accent' : 'text-text-muted/60 group-hover:text-accent'
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? 'border-accent/40 bg-accent/10 text-accent'
                        : 'border-border-subtle bg-bg-app text-text-muted group-hover:text-accent'
                    }`}
                  >
                    <Icon size={18} />
                  </span>

                  <div className="flex flex-col min-w-0 pr-2">
                    <span
                      className={`text-sm font-semibold tracking-tight truncate ${
                        isSelected ? 'text-text-main font-bold' : 'text-text-muted group-hover:text-text-main'
                      }`}
                    >
                      {service.title}
                    </span>
                    <span className="text-text-muted/70 text-[11px] truncate hidden sm:block">
                      {service.summary}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="bg-accent absolute -left-1 top-2 bottom-2 hidden w-1 rounded-r lg:block" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Column: Active Tab Content & Pathway Details */}
          <div className="lg:col-span-8">
            <article className="border-border-subtle bg-bg-surface relative flex flex-col rounded-lg border p-6 shadow-sm md:p-10">
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-6">
                <div className="flex items-center gap-3">
                  <span className="border-accent/30 bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-full border">
                    <ActiveIcon size={24} />
                  </span>
                  <div>
                    <span className="text-accent text-xs font-bold tracking-widest uppercase">
                      PATHWAY 0{activeIndex + 1}
                    </span>
                    <h2 className="text-text-main font-serif text-2xl font-semibold sm:text-3xl">
                      {activeService.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                    <Sparkles size={13} /> RCIC Assessed
                  </span>
                </div>
              </div>

              {/* Main Summary */}
              <div className="py-6">
                <h3 className="text-text-main mb-2 text-xs font-bold tracking-widest uppercase">
                  Pathway Summary
                </h3>
                <p className="text-text-muted text-base leading-relaxed sm:text-lg">
                  {activeService.summary}
                </p>
              </div>

              {/* Features Grid */}
              {activeService.features && activeService.features.length > 0 && (
                <div className="border-t border-border-subtle py-6">
                  <h3 className="text-text-main mb-4 text-xs font-bold tracking-widest uppercase">
                    Key Requirements & Inclusions
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeService.features.map((feature, i) => (
                      <div
                        key={i}
                        className="bg-bg-app border-border-subtle flex items-start gap-3 rounded-md border p-3.5"
                      >
                        <CheckCircle2 size={18} className="text-accent mt-0.5 shrink-0" />
                        <span className="text-text-main text-xs font-medium leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Overview / Body (Portable Text from Sanity Studio) */}
              {activeService.body && Array.isArray(activeService.body) && activeService.body.length > 0 && (
                <div className="border-t border-border-subtle py-6">
                  <h3 className="text-text-main mb-4 text-xs font-bold tracking-widest uppercase">
                    Detailed Information
                  </h3>
                  <div className="prose-content">
                    <PortableText value={activeService.body} components={portableTextComponents} />
                  </div>
                </div>
              )}

              {/* Consultation Callout Footer */}
              <div className="bg-bg-primary text-text-on-dark mt-6 flex flex-col justify-between gap-6 rounded-md p-6 sm:flex-row sm:items-center sm:p-8">
                <div>
                  <h4 className="font-serif text-lg font-semibold sm:text-xl text-white">
                    {activeService.ctaTitle || `Apply for ${activeService.title}`}
                  </h4>
                  <p className="text-text-on-dark-muted mt-1 text-xs sm:text-sm">
                    {activeService.ctaSubtitle ||
                      'Direct representation and assessment with Nazly Sunguroglu, RCIC.'}
                  </p>
                </div>

                <Button
                  href={
                    activeService.ctaButtonLink ||
                    `https://wa.me/16475681009?text=Hello%20Nazly,%20I%20would%20like%20guidance%20on%20${encodeURIComponent(
                      activeService.title
                    )}.`
                  }
                  variant="primary"
                  size="md"
                  className="shrink-0"
                >
                  {activeService.ctaButtonText || 'Book Free Consultation'}{' '}
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
