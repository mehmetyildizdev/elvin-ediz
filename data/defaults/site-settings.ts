import type { SiteSettingsData } from '@/sanity/lib/types';

export const backupSiteSettings: SiteSettingsData = {
  siteTitle: 'Elvin Ediz Immigration Services',
  contactEmail: 'info@elvinediz.com',
  phone: '(647) 568 1009',
  officeHours: 'Mon - Fri: 09:00am - 4:00pm',
  address: 'Toronto, Ontario, Canada',
  consultationLink: 'https://wa.me/123456789',
  whatsappNumber: '123456789',
  linkedinUrl: 'https://www.linkedin.com/in/nazly-sunguroglu-31574455/',
  instagramUrl: 'https://www.instagram.com/elvinedizimmigration/',
  headerNav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/insights' },
    { label: 'Q&A', href: '/questions' },
    { label: 'Contact', href: '/contact' },
  ],
  footerDescription:
    'Guidance for your next chapter in Canada. Personal, regulated Canadian immigration consulting.',
  footerNavTitle: 'Explore',
  footerNav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/insights' },
    { label: 'Q&A', href: '/questions' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  footerConnectTitle: 'Connect',
  footerConsultationText: 'Free Consultation',
  footerPrivacyText: 'Privacy Policy',
  footerNotice: 'Regulated Canadian Immigration Consultant (RCIC)',
  copyrightText: `© ${new Date().getFullYear()} Elvin Ediz Immigration Services.`,
  showDeveloperCredit: true,
  developerCreditText: 'Crafted by',
  developerCreditName: 'Mehmet Yıldız',
  developerCreditUrl: 'https://mehmetyildiz.dev',
};

export const defaultSiteSettings = backupSiteSettings;
