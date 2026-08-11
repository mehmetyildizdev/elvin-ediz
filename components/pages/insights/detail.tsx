import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { posts } from './grid';

export function InsightsDetail({ slug }: { slug: string }) {
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <PageHeader
        eyebrow="COMING SOON"
        title="This article is"
        accent="not available yet."
        copy="Please return to the insights page to explore the latest updates."
      />
    );
  }

  return (
    <article className="mx-auto flex max-w-4xl flex-col px-6 py-16 md:py-24">
      <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
        {post.kind}
      </p>
      <h1 className="text-text-main mb-6 font-serif text-4xl leading-tight font-light sm:text-5xl md:text-6xl">
        {post.title}
      </h1>
      <p className="text-text-muted mb-8 max-w-2xl font-serif text-xl leading-relaxed italic sm:text-xl">
        {post.excerpt}
      </p>

      <div className="border-border-subtle text-text-muted mt-8 max-w-2xl space-y-6 border-t pt-8 text-base leading-relaxed sm:text-lg">
        <p>
          Canadian immigration decisions can involve many moving pieces. Taking time to understand
          your own situation, current official guidance, and possible next steps can make the
          process feel more manageable.
        </p>
        <p>
          This article will be replaced by the full draft created and published from Sanity Studio.
          The page route and presentation are already in place, so published content can flow here
          without adding a separate template for every post type.
        </p>
      </div>

      <Link
        href="/insights"
        className="text-text-main border-border-subtle hover:border-accent hover:text-accent mt-10 inline-flex items-center gap-1.5 self-start border-b pb-1 text-sm font-semibold transition-all duration-200"
      >
        ← Back to insights
      </Link>
    </article>
  );
}
