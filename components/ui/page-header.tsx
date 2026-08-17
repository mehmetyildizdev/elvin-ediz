export function PageHeader({
  eyebrow,
  title,
  accent,
  copy,
}: {
  eyebrow?: string;
  title?: string;
  accent?: string;
  copy?: string;
}) {
  return (
    <section
      className="bg-bg-primary text-text-on-dark relative overflow-hidden px-6 py-20 md:px-12 md:py-28"
      style={{
        backgroundImage: 'var(--hero-glow)',
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 max-w-3xl">
          {eyebrow && (
            <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase sm:text-xs">
              {eyebrow}
            </p>
          )}
          <h1 className="mb-5 font-serif text-5xl leading-tight font-light tracking-tight sm:text-5xl md:text-6xl">
            {title}
            {accent && (
              <>
                <br />
                <span className="text-accent font-serif font-normal italic">{accent}</span>
              </>
            )}
          </h1>
          {copy && (
            <p className="text-text-on-dark-muted max-w-md text-sm leading-relaxed sm:text-base">
              {copy}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
