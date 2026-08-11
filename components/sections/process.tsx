const steps = [
  ['01', 'Start with a conversation', 'We listen to your plans, questions, and circumstances.'],
  ['02', 'Find your right pathway', 'Together, we map out an approach that makes sense for you.'],
  [
    '03',
    'Move forward with confidence',
    'We help you prepare, submit, and understand what comes next.',
  ],
];

export function Process() {
  return (
    <section className="bg-bg-primary text-text-on-dark px-6 py-20 md:px-12 md:py-32" id="how-it-works">
      <div className="mx-auto flex max-w-7xl flex-col">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-text-on-dark-muted mb-3 text-xs font-bold tracking-widest uppercase">
              THE ELVIN EDIZ WAY
            </p>
            <h2 className="m-0 font-serif text-4xl leading-tight sm:text-5xl md:text-5xl">
              Less uncertainty.
              <br />
              <span className="text-accent font-serif font-normal italic">More momentum.</span>
            </h2>
          </div>
        </div>

        <div className="border-border-on-dark divide-border-on-dark grid grid-cols-1 divide-y border-t md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map(([number, title, text]) => (
            <article
              key={number}
              className="group hover:bg-bg-surface/10 flex flex-col gap-2 py-8 transition-all duration-300 first:pl-0 last:pr-0 md:py-10 md:pr-10 md:pl-6"
            >
              <span className="text-accent font-serif text-3xl font-semibold select-none">
                {number}
              </span>
              <h3 className="text-text-on-dark group-hover:text-accent mt-4 mb-2 font-serif text-xl font-semibold transition-colors duration-300 md:text-2xl">
                {title}
              </h3>
              <p className="text-text-on-dark-muted m-0 max-w-xs text-sm leading-relaxed">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
