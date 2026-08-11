const credentials = [
  'CICC Regulated Consultant',
  'Personalized Guidance',
  'Clear Next Steps',
  'Canada-Wide Service',
];

export function TrustBar() {
  return (
    <section className="bg-bg-surface border-border-subtle border-b px-6 py-6 backdrop-blur-xs md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4">
        {credentials.map((credential, i) => (
          <div
            key={credential}
            className="text-text-main border-border-subtle flex items-center justify-center gap-3 px-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 last:border-r-0 hover:scale-105 md:border-r"
          >
            <span className="text-accent font-serif text-lg font-semibold">0{i + 1}</span>
            <span className="text-center md:text-left">{credential}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
