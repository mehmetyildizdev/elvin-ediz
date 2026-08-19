import { redirect } from 'next/navigation';
import { fetchServices } from '@/sanity/lib/data';

export const revalidate = 1209600; // 2 weeks

export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  redirect(`/services?tab=${resolvedParams.slug}#pathways-tabs`);
}
