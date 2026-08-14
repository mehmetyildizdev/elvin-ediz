import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { HomePageData } from '@/sanity/lib/types';
import { defaultHomePage } from '@/sanity/lib/types';
import { getIconComponent } from '@/sanity/lib/iconLibrary';
import { ArrowUpRight, UserCheck } from 'lucide-react';

export function RcicSection({ homeData = defaultHomePage }: { homeData?: HomePageData }) {
  const rawStats = homeData.stats?.length ? homeData.stats : defaultHomePage.stats || [];
  const statsList = rawStats.filter(
    (stat) => stat && (stat.number?.trim() || stat.label?.trim())
  );

  return (
    <section className="bg-bg-primary text-text-on-dark relative overflow-hidden px-6 py-20 md:px-12 md:py-28" id="who-are-we">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 select-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(200, 90, 50, 0.18), transparent 55%)',
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative z-10 lg:col-span-7">
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              {homeData.strategyEyebrow || 'WHO ARE WE?'}
            </p>
            <h2 className="mb-6 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-5xl">
              {homeData.strategyTitle ? (
                <>
                  {homeData.strategyTitle}
                </>
              ) : (
                <>
                  Elvin Ediz <br />
                  <span className="text-accent font-serif font-normal italic">Immigration Services</span>
                </>
              )}
            </h2>

            <div className="text-text-on-dark-muted space-y-4 text-base leading-relaxed">
              <p>
                {homeData.strategyParagraph1}
              </p>
              <p className="text-white font-medium">
                {homeData.strategyParagraph2}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={homeData.whoAreWePrimaryCtaLink || 'https://wa.me/16475681009'} variant="primary" size="md">
                {homeData.whoAreWePrimaryCtaText || 'Free Consultation'} <ArrowUpRight size={16} />
              </Button>
              <a
                href={homeData.whoAreWeSecondaryCtaLink || '#contact'}
                className="border-border-on-dark text-text-on-dark hover:text-accent hover:border-accent inline-flex items-center gap-2 border-b pb-1 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {homeData.whoAreWeSecondaryCtaText || 'Send a Message'}
              </a>
            </div>
          </div>

          {/* RCIC Official Badge Card */}
          <div className="relative z-10 flex justify-center lg:col-span-5">
            <div className="border-border-on-dark/30 bg-bg-surface/10 flex flex-col items-center justify-center rounded-sm border p-8 text-center backdrop-blur-md transition-transform hover:scale-[1.02]">
              <div className="relative h-44 w-full max-w-xs sm:h-52">
                <Image
                  src="/rcic_logo.png"
                  alt="Regulated Canadian Immigration Consultant (RCIC) CICC"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="border-border-on-dark/20 mt-6 border-t pt-4">
                <span className="text-accent text-xs font-bold uppercase tracking-widest">
                  {homeData.ciccBadgeTitle || 'CICC REGISTERED & APPROVED'}
                </span>
                <p className="text-text-on-dark-muted mt-1 text-xs leading-relaxed whitespace-pre-line">
                  {homeData.ciccBadgeSubtitle ||
                    'Regulated Canadian Immigration Consultant (RCIC)\nMember of the College of Immigration and Citizenship Consultants.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RCIC Statistics Counters Bar */}
        <div className="border-border-on-dark/20 bg-bg-surface/10 mt-16 grid grid-cols-2 divide-x divide-y divide-border-on-dark/20 rounded-sm border backdrop-blur-xs md:grid-cols-5 md:divide-y-0">
          {statsList.map((stat, i) => {
            const Icon = getIconComponent(stat.icon) || UserCheck;
            return (
              <div key={stat.label || i} className="flex flex-col items-center justify-center p-6 text-center">
                <Icon size={26} className="text-accent mb-2.5 opacity-90" />
                <span className="text-white font-serif text-3xl font-bold md:text-4xl">
                  {stat.number}
                </span>
                <span className="text-text-on-dark-muted mt-1.5 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

