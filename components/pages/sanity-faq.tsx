import { fetchFaqPage } from '@/sanity/lib/data';
import { PortableTextRenderer } from '@/components/ui/portable-text';

export async function SanityFAQ() {
  const faqPageData = await fetchFaqPage();
  const items = faqPageData.items || [];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col">
      {items.map((item, index) => (
        <details
          key={item._key || index}
          open={index === 0}
          className="border-border-subtle group border-t py-6 transition-all duration-300 last:border-b"
        >
          <summary className="text-text-main hover:text-accent flex cursor-pointer list-none items-center justify-between font-serif text-lg font-semibold transition-colors select-none md:text-xl [&::-webkit-details-marker]:hidden">
            <span className="pr-4">{item.question}</span>
            <span className="text-accent shrink-0 text-2xl leading-none font-light transition-transform duration-250 select-none group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="text-text-muted mt-4 max-w-3xl pl-1 text-sm leading-relaxed font-sans sm:text-base">
            <PortableTextRenderer value={item.answer} size="sm" />
          </div>
        </details>
      ))}
    </div>
  );
}
