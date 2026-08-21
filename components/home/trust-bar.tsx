import type { HomePageData } from '@/sanity/lib/types';
import { defaultHomePage } from '@/sanity/lib/types';
import { getIconComponent } from '@/sanity/lib/iconLibrary';

export function TrustBar({ homeData = defaultHomePage }: { homeData?: HomePageData }) {
  const rawItems = homeData.trustBarItems?.length
    ? homeData.trustBarItems
    : defaultHomePage.trustBarItems || [];

  const items = rawItems.filter((item) => item && (item.text?.trim() || item.number?.trim()));

  return (
    <section className="bg-bg-surface border-border-subtle border-b px-4 py-5 backdrop-blur-xs sm:px-6 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-3 sm:gap-y-4 md:grid-cols-4">
        {items.map((item, i) => {
          const IconComp = getIconComponent(item.icon);
          const displayPrefix = item.number || `0${i + 1}`;

          return (
            <div
              key={item._key || item.text || i}
              className="group border-border-subtle flex items-center justify-start gap-2.5 px-2.5 py-1.5 transition-colors duration-200 odd:border-r sm:gap-3 sm:px-4 md:justify-center md:border-r md:last:border-r-0 md:odd:border-r-0"
            >
              {IconComp ? (
                <span className="border-accent/20 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300">
                  <IconComp
                    size={16}
                    className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                  />
                </span>
              ) : (
                <span className="border-accent/20 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-serif text-xs font-semibold transition-all duration-300">
                  {displayPrefix}
                </span>
              )}
              <span className="text-text-main group-hover:text-accent text-left text-xs leading-snug font-semibold tracking-wider uppercase transition-colors duration-200">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
