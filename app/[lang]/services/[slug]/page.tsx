import { redirect } from 'next/navigation';
import { fetchServices } from '@/sanity/lib/data';
import { defaultLanguage } from '@/sanity/i18n';

export const revalidate = 1209600; // 2 weeks

// Only pre-generate static routes for services that exist in Sanity
export async function generateStaticParams() {
  const services = await fetchServices();
  return services
    .filter((s) => Boolean(s.slug))
    .map((s) => ({
      lang: 'en',
      slug: s.slug,
    }));
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang = defaultLanguage, slug } = await params;
  const targetPrefix = lang === defaultLanguage ? '' : `/${lang}`;
  redirect(`${targetPrefix}/services?tab=${slug}#pathways-tabs`);
}
