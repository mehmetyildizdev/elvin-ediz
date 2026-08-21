import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { ServiceData, defaultServices } from '@/sanity/lib/types';

export function ServicesGrid({ services = defaultServices }: { services?: ServiceData[] }) {
  return (
    <section className="bg-bg-app px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <article
            className="border-border-subtle bg-bg-surface group flex min-h-80 flex-col rounded-sm border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-10"
            key={service._id || service.slug}
          >
            <div className="flex items-center justify-between">
              <span className="text-accent font-serif text-3xl font-semibold">0{index + 1}</span>
              <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
                {service.title}
              </span>
            </div>

            <h2 className="text-text-main group-hover:text-accent mt-6 mb-3 font-serif text-2xl font-semibold transition-colors duration-250">
              {service.title}
            </h2>

            <p className="text-text-muted mb-6 text-sm leading-relaxed">{service.summary}</p>

            {service.features && service.features.length > 0 && (
              <ul className="mb-8 space-y-2 text-xs">
                {service.features.map((feat, i) => (
                  <li key={i} className="text-text-main flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={`/services/${service.slug}`}
              className="text-accent hover:text-accent-hover group/btn mt-auto inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              Explore pathway details
              <ChevronRight
                size={16}
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
              />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
