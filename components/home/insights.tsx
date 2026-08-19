import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { HomePageData } from '@/sanity/lib/types';
import { defaultHomePage, defaultPosts } from '@/sanity/lib/types';
import { fetchPosts } from '@/sanity/lib/data';

export async function Insights({ homeData = defaultHomePage }: { homeData?: HomePageData }) {
  const fetchedPosts = await fetchPosts('insight');
  const displayPosts =
    fetchedPosts && fetchedPosts.length > 0
      ? fetchedPosts.slice(0, 3)
      : defaultPosts.filter((p) => p.kind === 'insight').slice(0, 3);


  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="bg-bg-app px-6 py-20 md:px-12 md:py-32" id="insights">
      <div className="mx-auto flex max-w-7xl flex-col">
        <div className="border-border-subtle mb-12 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              {homeData.insightsEyebrow || 'THE LATEST'}
            </p>
            <h2 className="text-text-main m-0 font-serif text-4xl leading-tight sm:text-5xl md:text-5xl">
              {homeData.insightsTitleMain || 'Fresh'}{' '}
              <span className="text-accent font-serif italic">
                {homeData.insightsTitleAccent || 'perspective.'}
              </span>
            </h2>
          </div>
          <Link
            href={homeData.insightsViewAllLink || '/insights'}
            className="text-text-main border-border-subtle hover:border-accent hover:text-accent inline-flex items-center gap-1.5 self-start border-b pb-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200"
          >
            {homeData.insightsViewAllText || 'View all insights'} <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {displayPosts.map((post, i) => (
            <article
              className="group border-border-subtle bg-bg-surface flex flex-col overflow-hidden rounded-sm border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              key={post._id || post.slug}
            >
              <div className="bg-bg-primary/10 text-accent group-hover:bg-bg-primary/15 relative mb-5 flex h-44 items-center justify-center overflow-hidden rounded-sm font-serif text-5xl italic transition-colors select-none">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span>{i === 0 ? 'CA' : i === 1 ? 'EDU' : '✦'}</span>
                )}
              </div>

              <div className="text-accent mb-3 flex items-center justify-between text-xs font-bold tracking-widest uppercase">
                <span>{post.category || 'Insight'}</span>
                {post.publishedAt && (
                  <span className="text-text-muted font-sans font-normal lowercase">
                    {formatDate(post.publishedAt)}
                  </span>
                )}
              </div>

              <h3 className="text-text-main group-hover:text-accent mb-5 font-serif text-lg leading-snug font-semibold transition-colors duration-200 md:text-xl">
                {post.title}
              </h3>

              <Link
                href={`/insights/${post.slug}`}
                className="text-accent group/btn mt-auto inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase"
                aria-label={`Read ${post.title}`}
              >
                Read more
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

