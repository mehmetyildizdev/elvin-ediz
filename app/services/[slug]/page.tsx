import { redirect } from 'next/navigation';
import { fetchServices } from '@/sanity/lib/data';

export const revalidate = 1209600; // 2 weeks

/**
 * Service Pathway Slug Redirect Route:
 *
 * Why this exists:
 * All immigration services (e.g. Permanent Residency, Visitor Visa, Study Permits)
 * are presented on an interactive tabbed hub at `/services`.
 *
 * However, Sanity generates unique document slugs for each service, and external
 * campaigns or direct links may point to `/services/[slug]` (e.g. `/services/visitor-visa`).
 *
 * Instead of returning a 404 Not Found or duplicating HTML content, this route
 * gracefully catches the direct slug and redirects visitors to `/services?tab=[slug]#pathways-tabs`
 * with that specific service tab pre-selected and focused.
 *
 * SEO Impact:
 * Search crawlers (Googlebot) follow the HTTP redirect to `/services`, consolidating
 * search ranking authority onto the primary Services directory and its rich Schema.org
 * Service structured data without duplicate-content penalties.
 */
export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  redirect(`/services?tab=${resolvedParams.slug}#pathways-tabs`);
}

