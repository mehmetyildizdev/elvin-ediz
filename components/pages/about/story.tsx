import { Check } from 'lucide-react';

export function AboutStory() {
  return (
    <section className="bg-bg-app px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
            THE ELVIN EDIZ APPROACH
          </p>
          <h2 className="text-text-main m-0 font-serif text-3xl leading-tight sm:text-5xl md:text-5xl">
            Clear process.
            <br />
            <span className="text-accent font-serif font-normal italic">Human support.</span>
          </h2>
        </div>

        <div className="text-text-muted flex flex-col gap-5 text-base leading-relaxed">
          <p>
            Elvin Ediz Immigration Services was founded to make Canadian immigration feel more
            manageable. Nazly Sunguroglu brings focused attention to each client’s circumstances,
            goals, and questions.
          </p>
          <p>
            There is no one-size-fits-all route. Every plan begins with understanding where you are,
            where you hope to go, and what a confident next step looks like.
          </p>

          <ul className="m-0 mt-4 list-none space-y-3.5 p-0">
            <li className="text-text-main flex items-center gap-3 text-sm font-medium">
              <Check size={18} className="text-accent shrink-0" />
              <span>Regulated Canadian Immigration Consultant</span>
            </li>
            <li className="text-text-main flex items-center gap-3 text-sm font-medium">
              <Check size={18} className="text-accent shrink-0" />
              <span>Personal, considered guidance</span>
            </li>
            <li className="text-text-main flex items-center gap-3 text-sm font-medium">
              <Check size={18} className="text-accent shrink-0" />
              <span>Clear communication at every stage</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
