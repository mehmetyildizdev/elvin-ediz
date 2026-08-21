import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { PortableTextRenderer } from '@/components/ui/portable-text';
import { fetchSiteSettings, fetchPrivacyPage } from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata(): Promise<Metadata> {
  const [settings, privacyData] = await Promise.all([fetchSiteSettings(), fetchPrivacyPage()]);

  return buildPageMetadata({
    pageTitle:
      `${privacyData.titleMain || 'Privacy'} ${privacyData.titleAccent || 'Policy'}`.trim(),
    pageDescription:
      privacyData.description ||
      'Learn how Elvin Ediz Immigration Services protects and handles your personal information.',
    seo: privacyData.seo,
    settings,
    canonicalPath: '/privacy',
  });
}

export default async function PrivacyPolicyPage() {
  const settings = await fetchSiteSettings();
  const privacyData = await fetchPrivacyPage();

  const privacyJsonLd = buildPageJsonLd({
    title: `${privacyData.titleMain || 'Privacy'} ${privacyData.titleAccent || 'Policy'}`.trim(),
    description: privacyData.description || 'Privacy policy of Elvin Ediz Immigration Services.',
    url: '/privacy',
    defaultType: 'WebPage',
    structuredDataType: privacyData.seo?.structuredDataType,
    settings,
  });

  return (
    <>
      <JsonLd data={privacyJsonLd} />
      <Header settings={settings} />
      <main className="bg-bg-app">
        <PageHeader
          eyebrow={privacyData.eyebrow}
          title={privacyData.titleMain}
          accent={privacyData.titleAccent}
          copy={privacyData.description}
        />

        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Back link */}
            <div>
              <Link
                href="/"
                className="text-text-muted hover:text-accent inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
              >
                <ArrowLeft size={15} /> Back to Home
              </Link>
            </div>

            {/* Commitment Box */}
            {(privacyData.commitmentTitle || privacyData.commitmentText) && (
              <div className="border-border-subtle bg-bg-surface rounded-sm border p-8 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 text-accent shrink-0 rounded-full p-3">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    {privacyData.commitmentTitle && (
                      <h2 className="text-text-main font-serif text-lg font-bold">
                        {privacyData.commitmentTitle}
                      </h2>
                    )}
                    {privacyData.commitmentText && (
                      <p className="text-text-muted mt-2 font-sans text-sm leading-relaxed">
                        {privacyData.commitmentText}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Structured Content (PortableTextRenderer) */}
            {privacyData.content && privacyData.content.length > 0 && (
              <div className="space-y-6">
                <PortableTextRenderer value={privacyData.content} size="base" />
              </div>
            )}

            {/* 04. Contact & Inquiries Section */}
            {(privacyData.inquiryTitle || privacyData.inquiryDescription) && (
              <div className="border-border-subtle space-y-4 border-t pt-10 font-sans">
                <div className="text-accent flex items-center gap-2">
                  <Mail size={18} />
                  <h3 className="text-text-main font-serif text-xl font-semibold">
                    {privacyData.inquiryTitle || 'Privacy Inquiries & Contact'}
                  </h3>
                </div>
                {privacyData.inquiryDescription && (
                  <p className="text-text-muted text-sm leading-relaxed sm:text-base">
                    {privacyData.inquiryDescription}
                  </p>
                )}
                <div className="border-border-subtle bg-bg-surface space-y-1.5 rounded-sm border p-6 text-sm shadow-2xs">
                  <p className="text-text-main text-base font-semibold">
                    {privacyData.companyName || 'Elvin Ediz Immigration Advisory'}
                  </p>
                  <p className="text-text-muted">
                    Email:{' '}
                    <a
                      href={`mailto:${privacyData.email || settings?.contactEmail || 'info@elvinediz.com'}`}
                      className="text-accent font-medium hover:underline"
                    >
                      {privacyData.email || settings?.contactEmail || 'info@elvinediz.com'}
                    </a>
                  </p>
                  {(privacyData.phone || settings?.phone) && (
                    <p className="text-text-muted">
                      Phone:{' '}
                      <span className="text-text-main">{privacyData.phone || settings?.phone}</span>
                    </p>
                  )}
                  {(privacyData.address || settings?.address) && (
                    <p className="text-text-muted">
                      Location:{' '}
                      <span className="text-text-main">
                        {privacyData.address || settings?.address}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
