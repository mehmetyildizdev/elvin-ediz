import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AboutPageData, StaffData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultAboutPage, defaultStaff, defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';

export function AboutStrategy({
  aboutData = defaultAboutPage,
  staff = defaultStaff,
  settings = defaultSiteSettings,
}: {
  aboutData?: AboutPageData;
  staff?: StaffData[];
  settings?: SiteSettingsData;
}) {
  const leader = staff[0] || defaultStaff[0];
  const photoSrc =
    aboutData.strategyImageUrl || leader?.photoUrl || '/nazly-profile-picture.png';
  const leaderName =
    aboutData.strategyLeaderName ||
    `${leader?.name || 'Nazly Sunguroglu'} (${leader?.designation || 'RCIC'})`;
  const leaderRole =
    aboutData.strategyLeaderRole ||
    leader?.role ||
    'Regulated Canadian Immigration Consultant';
  const leaderSubtitle =
    aboutData.strategyLeaderSubtitle ||
    leader?.subtitle ||
    'Founder of Elvin Ediz Immigration Services';

  const credentialsList =
    aboutData.credentials?.length
      ? aboutData.credentials
      : defaultAboutPage.credentials || [];

  return (
    <section className="bg-bg-surface px-6 py-20 md:px-12 md:py-32" id="strategy">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Left Column: Staff Leader Portrait */}
        <div className="flex flex-col lg:col-span-5">
          <div className="bg-bg-app border-border-subtle relative aspect-4/5 w-full overflow-hidden rounded-sm border shadow-lg">
            <Image
              src={photoSrc}
              alt={leaderName}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="mt-5 flex flex-col gap-1">
            <h3 className="text-text-main font-serif text-2xl font-bold tracking-tight">
              {leaderName}
            </h3>
            <p className="text-text-muted text-xs font-semibold tracking-wider uppercase">
              {leaderRole}
            </p>
            <p className="text-text-muted text-xs opacity-90">{leaderSubtitle}</p>
          </div>
        </div>

        {/* Right Column: Strategy Philosophy & Credentials */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
            {aboutData.strategyEyebrow || 'ELVIN EDIZ IMMIGRATION SERVICES'}
          </p>
          <h2 className="text-text-main mb-6 font-serif text-4xl leading-tight font-light sm:text-5xl md:text-5xl">
            {aboutData.strategyTitleMain || 'Our'}{' '}
            <span className="text-accent font-serif font-semibold italic">
              {aboutData.strategyTitleAccent || 'Strategy'}
            </span>
          </h2>

          <div className="text-text-muted mb-8 space-y-4 text-base leading-relaxed">
            <p className="text-text-main font-serif text-lg font-medium italic">
              {aboutData.strategyQuoteParagraph ||
                'We believe Canadian immigration should be empowering, not overwhelming.'}
            </p>
            <p className="text-sm leading-relaxed md:text-base">
              {aboutData.strategyBodyParagraph ||
                'With personalized assessment and clear strategic direction, we help individuals, students, professionals, and families navigate Canadian immigration regulations with confidence.'}
            </p>
          </div>

          {/* Key Credentials Badges */}
          {credentialsList.length > 0 && (
            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {credentialsList.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-bg-app border-border-subtle flex items-start gap-2.5 rounded-sm border p-3 text-xs"
                >
                  <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-text-main font-medium">{item}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button
              href={resolveCtaLink(aboutData.strategyCtaLink, settings?.whatsappNumber)}
              variant="primary"
              size="md"
              className="self-start"
            >
              {aboutData.strategyCtaText || 'Free Consultation'} <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
