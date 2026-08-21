import type { HomePageData } from '@/sanity/lib/types';
import { defaultHomePage } from '@/sanity/lib/types';

export function ContactInfo({ homeData = defaultHomePage }: { homeData?: HomePageData }) {
  return (
    <div>
      {homeData.contactEyebrow && (
        <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
          {homeData.contactEyebrow}
        </p>
      )}
      <h1 className="text-text-on-dark mb-6 font-serif text-4xl leading-tight font-light whitespace-pre-line sm:text-5xl md:text-5xl">
        {homeData.contactTitleMain || "Let's talk about\nwhat's"}{' '}
        <span className="text-accent font-serif font-normal italic">
          {homeData.contactTitleAccent || 'next.'}
        </span>
      </h1>
      {homeData.contactDescription && (
        <p className="text-text-on-dark-muted max-w-md text-base leading-relaxed">
          {homeData.contactDescription}
        </p>
      )}
    </div>
  );
}
