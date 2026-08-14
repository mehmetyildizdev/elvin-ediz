import { redirect } from 'next/navigation';

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  redirect(`/services?tab=${resolvedParams.slug}#pathways-tabs`);
}
