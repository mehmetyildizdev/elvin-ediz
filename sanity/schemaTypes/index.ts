import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { insightsPage } from './insightsPage';
import { aboutPage } from './aboutPage';
import { service } from './service';
import { testimonial } from './testimonial';
import { staffMember } from './staffMember';
import { faqPage } from './faqPage';
import { privacyPage } from './privacyPage';
import { post } from './post';
import { appointment } from './appointment';
import { googleReviews } from './googleReviews';
import { seo } from './objects/seo';
import { servicesPage } from './servicesPage';

export const schemaTypes = [
  seo,
  siteSettings,
  homePage,
  insightsPage,
  aboutPage,
  servicesPage,
  service,
  testimonial,
  staffMember,
  faqPage,
  privacyPage,
  post,
  appointment,
  googleReviews,
];
