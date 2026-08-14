import type { HomePageData } from '@/sanity/lib/types';
import { defaultHomePage } from '@/sanity/lib/types';
import { getIconComponent } from '@/sanity/lib/iconLibrary';


export function TrustBar({ homeData = defaultHomePage }: { homeData?: HomePageData }) {
  const rawItems = homeData.trustBarItems?.length
    ? homeData.trustBarItems
    : defaultHomePage.trustBarItems || [];

  const items = rawItems.filter(
    (item) => item && (item.text?.trim() || item.number?.trim())
  );

  return (
    <section className="bg-bg-surface border-border-subtle border-b px-6 py-6 backdrop-blur-xs md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4">
        {items.map((item, i) => {
          const IconComp = getIconComponent(item.icon);
          const displayPrefix = item.number || `0${i + 1}`;

          return (
            <div
              key={item._key || item.text || i}
              className="text-text-main border-border-subtle flex items-center justify-center gap-3 px-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 last:border-r-0 hover:scale-105 md:border-r"
            >
              {IconComp ? (
                <span className="text-accent flex items-center justify-center">
                  <IconComp size={20} className="shrink-0" />
                </span>
              ) : (
                <span className="text-accent font-serif text-lg font-semibold">{displayPrefix}</span>
              )}
              <span className="text-center md:text-left">{item.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}


