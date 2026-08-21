import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getLocalizedPostHref } from './utils';

export type PostKind = 'insights' | 'news' | 'announcements' | 'information';

export const posts = [
  {
    slug: 'planning-your-next-move-to-canada',
    kind: 'insight',
    title: 'What to know before planning your next move to Canada',
    excerpt: 'A grounded starting point for exploring a future in Canada.',
  },
  {
    slug: 'making-your-study-plan-achievable',
    kind: 'insight',
    title: 'Making your Canadian study plan feel more achievable',
    excerpt: 'A few first steps that can make a large decision feel clearer.',
  },
  {
    slug: 'questions-before-your-application',
    kind: 'information',
    title: 'Three questions to ask before beginning your application',
    excerpt: 'Clarity at the beginning makes every next step easier.',
  },
];

export function InsightsGrid({ kind, lang = 'en' }: { kind: PostKind; lang?: string }) {
  const selected =
    kind === 'insights'
      ? posts
      : posts.filter((post) => {
          if (kind === 'announcements') return post.kind === 'announcement';
          if (kind === 'news') return post.kind === 'news';
          return post.kind === 'information';
        });

  return (
    <section className="bg-bg-app px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        {selected.length ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {selected.map((post) => (
              <article
                key={post.slug}
                className="group border-border-subtle hover:border-accent/40 bg-bg-surface flex flex-col justify-between rounded-sm border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="text-accent mb-2.5 text-xs font-bold tracking-widest uppercase">
                  {(post as any).category || post.kind}
                </div>

                <h2 className="text-text-main group-hover:text-accent mb-3 font-serif text-lg leading-snug font-semibold transition-colors duration-200 md:text-xl">
                  {post.title}
                </h2>

                <p className="text-text-muted mb-6 text-sm leading-relaxed">{post.excerpt}</p>

                <Link
                  href={getLocalizedPostHref(post, kind, lang)}
                  className="text-accent group/btn mt-auto inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase"
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
        ) : (
          <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed py-16 text-center">
            <p className="text-text-muted text-base font-medium">
              New {kind} will appear here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
