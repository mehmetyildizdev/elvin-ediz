import { redirect } from 'next/navigation';
import { defaultLanguage } from '@/sanity/i18n';

export default async function PrivacyPolicyAlias({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang = defaultLanguage } = await params;
  const targetPrefix = lang === defaultLanguage ? '' : `/${lang}`;
  redirect(`${targetPrefix}/privacy`);
}
