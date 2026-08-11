import Link from 'next/link';
import { GraduationCap, BriefcaseBusiness, Building2, IdCard, FileText } from 'lucide-react';
import { ServiceData, defaultServices } from '@/sanity/lib/data';
import { TextLink } from '@/components/ui/icons';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  passport: IdCard,
  suitcase: BriefcaseBusiness,
  home: Building2,
  briefcase: BriefcaseBusiness,
  graduation: GraduationCap,
  'file-text': FileText,
};

export function Services({ services = defaultServices }: { services?: ServiceData[] }) {
  return (
    <section className="bg-bg-app px-6 py-20 md:px-12 md:py-32" id="services">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
            IMMIGRATION PATHWAYS
          </p>
          <h2 className="text-text-main mb-6 font-serif text-4xl leading-tight sm:text-5xl md:text-5xl">
            Choose your <br />
            <span className="text-accent font-serif italic">immigration plan.</span>
          </h2>
          <p className="text-text-muted max-w-md text-base leading-relaxed">
            We personalize your immigration plan to suit your needs and goals. Your pathway to Canada is divided into distinct, clear categories.
          </p>
          <Link
            href="/services"
            className="text-accent hover:text-accent-hover font-semibold mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider"
          >
            View all 5 pathways →
          </Link>
        </div>

        <div className="border-border-subtle flex flex-col border-t lg:col-span-7">
          {services.map((service, i) => {
            const IconComp = iconMap[service.iconName] || IdCard;
            return (
              <article
                className="border-border-subtle hover:bg-bg-surface/50 group grid grid-cols-1 items-center gap-4 border-b py-6 transition-all duration-300 hover:pl-4 sm:gap-6 md:grid-cols-12"
                key={service._id || service.slug}
              >
                <span className="text-accent font-serif text-lg font-semibold">0{i + 1}</span>
                <span className="border-border-subtle text-accent bg-bg-surface flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300">
                  <IconComp size={22} />
                </span>
                <div className="flex flex-col gap-0.5 pr-2 md:col-span-6">
                  <h3 className="text-text-main font-serif text-lg font-semibold md:text-xl">
                    {service.title}
                  </h3>
                  <p className="text-text-muted hidden text-xs leading-relaxed md:block">
                    {service.summary}
                  </p>
                </div>
                <div className="flex justify-end md:col-span-3">
                  <TextLink href={`/services/${service.slug}`}>Learn more</TextLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
