import { LockIcon } from '@sanity/icons/Lock';
import { AddDocumentIcon } from '@sanity/icons/AddDocument';
import { BellIcon } from '@sanity/icons/Bell';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { UserIcon } from '@sanity/icons/User';
import { HomeIcon } from '@sanity/icons/Home';
import { CaseIcon } from '@sanity/icons/Case';
import { StarIcon } from '@sanity/icons/Star';
import { CogIcon } from '@sanity/icons/Cog';
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const postList = (
  S: StructureBuilder,
  title: string,
  kind: string,
  icon: typeof DocumentTextIcon
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList('post')
        .title(title)
        .filter('_type == "post" && kind == $kind')
        .params({ kind })
    );

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Elvin Ediz CMS')
    .items([
      S.listItem()
        .title('Site Settings & Topbar')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')
        ),
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(
          S.document().schemaType('homePage').documentId('homePage').title('Home Page Content')
        ),
      S.listItem()
        .title('Insights & Updates Page')
        .icon(EarthGlobeIcon)
        .child(
          S.document()
            .schemaType('insightsPage')
            .documentId('insightsPage')
            .title('Insights Page Content')
        ),
      S.listItem()
        .title('Services Page Header')
        .icon(CaseIcon)
        .child(
          S.document()
            .schemaType('servicesPage')
            .documentId('servicesPage')
            .title('Services Page Hero Header')
        ),
      S.listItem()
        .title('Q&A / FAQs')
        .icon(HelpCircleIcon)
        .child(S.document().schemaType('faqPage').documentId('faqPage').title('Q&A')),
      S.listItem()
        .title('Privacy Policy')
        .icon(LockIcon)
        .child(
          S.document()
            .schemaType('privacyPage')
            .documentId('privacyPage')
            .title('Privacy Policy Content')
        ),
      S.divider(),
      S.listItem()
        .title('Immigration Services')
        .icon(CaseIcon)
        .child(S.documentTypeList('service').title('Immigration Services')),
      S.listItem()
        .title('Google Reviews (Synced)')
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType('googleReviews')
            .documentId('googleReviews')
            .title('Google Reviews & Rating')
        ),
      S.listItem()
        .title('Curated Testimonials (Manual)')
        .icon(StarIcon)
        .child(S.documentTypeList('testimonial').title('Curated Testimonials')),
      S.listItem()
        .title('Team / Staff')
        .icon(UserIcon)
        .child(S.documentTypeList('staffMember').title('Team / Staff')),
      S.divider(),
      postList(S, 'Insights', 'insight', DocumentTextIcon),
      postList(S, 'News', 'news', DocumentsIcon),
      postList(S, 'Announcements', 'announcement', BellIcon),
      postList(S, 'Information', 'information', DocumentTextIcon),
      S.divider(),
      S.listItem()
        .title('Form Appointments')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Form Inquiries & Leads')
            .items([
              S.listItem()
                .title('🟢 New Inquiries')
                .child(
                  S.documentList()
                    .title('New Inquiries (Needs Attention)')
                    .filter('_type == "appointment" && (status == "New" || !defined(status))')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('⚪ Contacted')
                .child(
                  S.documentList()
                    .title('Contacted Leads (Handled)')
                    .filter('_type == "appointment" && status == "Contacted"')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }])
                ),
              S.divider(),
              S.listItem()
                .title('📋 All Inquiries')
                .child(
                  S.documentList()
                    .title('All Form Inquiries')
                    .filter('_type == "appointment"')
                    .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }])
                ),
            ])
        ),
    ]);
