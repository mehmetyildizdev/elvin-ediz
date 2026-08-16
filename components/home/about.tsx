import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { StaffData, HomePageData } from '@/sanity/lib/types';
import { defaultStaff, defaultHomePage } from '@/sanity/lib/types';

export function About({
  staff = defaultStaff,
  homeData = defaultHomePage,
}: {
  staff?: StaffData[];
  homeData?: HomePageData;
}) {
  const leader = staff[0] || defaultStaff[0];
  const photoSrc = homeData.aboutImageUrl || leader?.photoUrl || '/nazly-profile-picture.png';
  const leaderName = homeData.aboutLeaderName || `${leader?.name || 'Nazly Sunguroglu'} (${leader?.designation || 'RCIC'})`;
  const leaderRole = homeData.aboutLeaderRole || leader?.role || 'Regulated Canadian Immigration Consultant';
  const leaderSubtitle = homeData.aboutLeaderSubtitle || leader?.subtitle || 'Founder of Elvin Ediz Immigration Services';

  return (
    <section className="bg-bg-surface px-6 py-20 md:px-12 md:py-32" id="about">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Left Column: Staff Member Card */}
        <div className="flex flex-col lg:col-span-5">
          <div className="bg-bg-app relative aspect-4/5 w-full overflow-hidden rounded-sm border border-border-subtle shadow-lg">
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
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">
              {leaderRole}
            </p>
            <p className="text-text-muted text-xs opacity-90">
              {leaderSubtitle}
            </p>
          </div>
        </div>

        {/* Right Column: Strategy Content */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
            {homeData.aboutEyebrow || homeData.strategyEyebrow || 'ELVIN EDIZ IMMIGRATION SERVICES'}
          </p>
          <h2 className="text-text-main mb-6 font-serif text-4xl leading-tight font-light sm:text-5xl md:text-5xl">
            {homeData.aboutTitleMain || 'Our'}{' '}
            <span className="text-accent font-serif font-semibold italic">
              {homeData.aboutTitleAccent || 'Strategy'}
            </span>
          </h2>

          <div className="text-text-muted mb-8 space-y-4 text-base leading-relaxed">
            <p className="text-text-main font-serif text-lg font-medium italic">
              {homeData.aboutQuoteParagraph || homeData.strategyParagraph1}
            </p>
            <p className="text-sm leading-relaxed md:text-base">
              {homeData.aboutBodyParagraph || homeData.strategyParagraph2}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              href={homeData.aboutCtaLink || 'https://wa.me/16475681009'}
              variant="primary"
              size="md"
              className="self-start"
            >
              {homeData.aboutCtaText || 'Free Consultation'} <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

