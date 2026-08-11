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
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home Page Content')),
      S.listItem()
        .title('Q&A / FAQs')
        .icon(HelpCircleIcon)
        .child(S.document().schemaType('faqPage').documentId('faqPage').title('Q&A')),
      S.divider(),
      S.listItem()
        .title('Immigration Services')
        .icon(CaseIcon)
        .child(S.documentTypeList('service').title('Immigration Services')),
      S.listItem()
        .title('Client Testimonials & Google Reviews')
        .icon(StarIcon)
        .child(S.documentTypeList('testimonial').title('Client Testimonials')),
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
        .child(S.documentTypeList('appointment').title('Appointments')),
    ]);
