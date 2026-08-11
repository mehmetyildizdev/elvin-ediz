import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    tag: 'IMMIGRATION NEWS',
    date: 'JUNE 12, 2026',
    title: 'What to know before planning your next move to Canada',
    slug: 'planning-your-next-move-to-canada',
  },
  {
    tag: 'STUDY PERMITS',
    date: 'MAY 28, 2026',
    title: 'Making your Canadian study plan feel more achievable',
    slug: 'making-your-study-plan-achievable',
  },
  {
    tag: 'GUIDANCE',
    date: 'MAY 09, 2026',
    title: 'Three questions to ask before beginning your application',
    slug: 'questions-before-your-application',
  },
];

export function Insights() {
  return (
    <section className="bg-bg-app px-6 py-20 md:px-12 md:py-32" id="insights">
      <div className="mx-auto flex max-w-7xl flex-col">
        <div className="border-border-subtle mb-12 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
              THE LATEST
            </p>
            <h2 className="text-text-main m-0 font-serif text-4xl leading-tight sm:text-5xl md:text-5xl">
              Fresh <span className="text-accent font-serif italic">perspective.</span>
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-text-main border-border-subtle hover:border-accent hover:text-accent inline-flex items-center gap-1.5 self-start border-b pb-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200"
          >
            View all insights <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((article, i) => (
            <article
              className="group border-border-subtle bg-bg-surface flex flex-col overflow-hidden rounded-sm border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              key={article.title}
            >
              <div className="bg-bg-primary/10 text-accent group-hover:bg-bg-primary/15 mb-5 flex h-44 items-center justify-center rounded-sm font-serif text-5xl italic transition-colors select-none">
                <span>{i === 0 ? 'CA' : i === 1 ? 'EDU' : '✦'}</span>
              </div>

              <div className="text-accent mb-3 flex items-center justify-between text-xs font-bold tracking-widest uppercase">
                {article.tag}
                <span className="text-text-muted font-sans font-normal">{article.date}</span>
              </div>

              <h3 className="text-text-main group-hover:text-accent mb-5 font-serif text-lg leading-snug font-semibold transition-colors duration-200 md:text-xl">
                {article.title}
              </h3>

              <Link
                href={`/insights/${article.slug}`}
                className="text-accent group/btn mt-auto inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase"
                aria-label={`Read ${article.title}`}
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
