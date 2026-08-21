import Image from 'next/image';
import { ArrowUpRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AboutPageData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultAboutPage, defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { getIconComponent } from '@/sanity/lib/iconLibrary';

export function AboutWhoAreWe({
  aboutData = defaultAboutPage,
  settings = defaultSiteSettings,
}: {
  aboutData?: AboutPageData;
  settings?: SiteSettingsData;
}) {
  const rawStats = aboutData.stats?.length ? aboutData.stats : defaultAboutPage.stats || [];
  const statsList = rawStats.filter((stat) => stat && (stat.number?.trim() || stat.label?.trim()));

  return (
    <section
      className="bg-bg-app text-text-main relative overflow-hidden px-6 py-20 md:px-12 md:py-28"
      id="who-are-we"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative z-10 lg:col-span-7">
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              {aboutData.whoAreWeEyebrow || 'WHO ARE WE?'}
            </p>
            <h2 className="text-text-main mb-6 font-serif text-4xl leading-tight font-light sm:text-5xl md:text-5xl">
              {aboutData.whoAreWeTitle ? (
                <>{aboutData.whoAreWeTitle}</>
              ) : (
                <>
                  Elvin Ediz <br />
                  <span className="text-accent font-serif font-normal italic">
                    Immigration Services
                  </span>
                </>
              )}
            </h2>

            <div className="text-text-muted space-y-4 text-base leading-relaxed">
              <p>{aboutData.whoAreWeParagraph1}</p>
              <p className="text-text-main font-medium">{aboutData.whoAreWeParagraph2}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href={resolveCtaLink(aboutData.whoAreWePrimaryCtaLink, settings?.whatsappNumber)}
                variant="primary"
                size="md"
              >
                {aboutData.whoAreWePrimaryCtaText || 'Free Consultation'} <ArrowUpRight size={16} />
              </Button>
              <a
                href={aboutData.whoAreWeSecondaryCtaLink || '#contact'}
                className="border-border-subtle text-text-main hover:text-accent hover:border-accent inline-flex items-center gap-2 border-b pb-1 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                {aboutData.whoAreWeSecondaryCtaText || 'Send a Message'}
              </a>
            </div>
          </div>

          {/* RCIC Official Badge Card */}
          <div className="relative z-10 flex justify-center lg:col-span-5">
            <div className="border-border-subtle bg-bg-surface flex flex-col items-center justify-center rounded-sm border p-8 text-center shadow-lg transition-transform hover:scale-[1.02]">
              <div className="relative h-44 w-full max-w-xs sm:h-52">
                <Image
                  src={aboutData.ciccBadgeImageUrl || '/rcic_logo.png'}
                  alt={
                    aboutData.ciccBadgeTitle ||
                    'Regulated Canadian Immigration Consultant (RCIC) CICC'
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="border-border-subtle mt-6 border-t pt-4">
                <span className="text-accent text-xs font-bold tracking-widest uppercase">
                  {aboutData.ciccBadgeTitle || 'CICC REGISTERED & APPROVED'}
                </span>
                <p className="text-text-muted mt-1 text-xs leading-relaxed whitespace-pre-line">
                  {aboutData.ciccBadgeSubtitle ||
                    'Regulated Canadian Immigration Consultant (RCIC)\nMember of the College of Immigration and Citizenship Consultants.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RCIC Statistics Counters Bar */}
        <div className="border-border-subtle bg-bg-surface divide-border-subtle mt-16 grid grid-cols-2 divide-x divide-y rounded-sm border shadow-sm md:grid-cols-5 md:divide-y-0">
          {statsList.map((stat, i) => {
            const Icon = getIconComponent(stat.icon) || UserCheck;
            return (
              <div
                key={stat.label || i}
                className="flex flex-col items-center justify-center p-6 text-center"
              >
                <Icon size={26} className="text-accent mb-2.5 opacity-90" />
                <span className="text-text-main font-serif text-3xl font-bold md:text-4xl">
                  {stat.number}
                </span>
                <span className="text-text-muted mt-1.5 text-xs font-semibold tracking-wider uppercase">
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
