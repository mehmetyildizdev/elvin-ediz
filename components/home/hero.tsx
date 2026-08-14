import { ArrowDown, ArrowUpRight, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HomePageData } from '@/sanity/lib/types';
import { defaultHomePage } from '@/sanity/lib/types';

export function Hero({ homeData = defaultHomePage }: { homeData?: HomePageData }) {
  const currentYear = new Date().getFullYear();

  return (
    <section
      className="bg-bg-primary text-text-on-dark relative flex flex-col justify-center overflow-hidden px-6 pt-24 pb-20 md:px-12 md:pt-32 md:pb-28"
      style={{
        backgroundImage: 'var(--hero-glow)',
      }}
      id="top"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-7">
            <p className="text-accent mb-4.5 text-xs font-bold tracking-widest uppercase">
              {homeData.heroEyebrow}
            </p>
            <h1 className="mb-6 font-serif text-5xl leading-tight font-light tracking-tight sm:text-6xl lg:text-7xl">
              {homeData.heroTitle}
            </h1>
            <p className="text-text-on-dark-muted mb-9 max-w-lg text-base leading-relaxed sm:text-lg">
              {homeData.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={homeData.heroPrimaryCtaLink || 'https://wa.me/16475681009'} variant="primary" size="md">
                {homeData.heroPrimaryCtaText || 'Free Consultation'} <ArrowUpRight size={16} />
              </Button>
              <a
                href={homeData.heroSecondaryCtaLink || '#services'}
                className="border-border-on-dark text-text-on-dark hover:text-accent hover:border-accent inline-flex items-center gap-2 border-b pb-1.5 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                {homeData.heroSecondaryCtaText || 'Explore services'} <ArrowDown size={15} />
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-5">
            <div className="border-border-on-dark text-text-on-dark animate-compass-drift relative flex h-75 w-75 items-center justify-center rounded-full border md:h-88 md:w-88">
              <div className="border-border-on-dark animate-compass-spin absolute h-55 w-55 rounded-full border border-dashed md:h-65 md:w-65" />

              <i className="text-text-on-dark-muted absolute top-5.5 font-sans text-xs font-semibold tracking-widest not-italic">
                N
              </i>
              <b className="text-text-on-dark-muted absolute bottom-12 font-sans text-xs font-semibold tracking-widest">
                CANADA
              </b>

              <div className="relative z-10 rotate-135 transform drop-shadow-lg">
                <Plane size={36} strokeWidth={1.1} className="text-accent" />
              </div>

              <span className="border-border-on-dark bg-bg-primary/90 text-text-on-dark absolute top-12 -right-4 rotate-12 rounded-sm border px-2 py-1 text-xs font-medium tracking-widest backdrop-blur-xs select-none">
                {homeData.badgeText || `EST. 2018 - ${currentYear}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
