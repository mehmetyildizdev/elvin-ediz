import Image from 'next/image';
import Link from 'next/link';
import { SiteSettingsData, defaultSiteSettings } from '@/sanity/lib/types';
import { getWhatsAppUrl } from '@/sanity/lib/whatsapp';

function localizeHref(href: string, currentLang: string = 'en'): string {
  if (
    !href ||
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.startsWith('#')
  ) {
    return href;
  }
  if (currentLang === 'en') {
    return href;
  }
  if (href === '/') {
    return `/${currentLang}`;
  }
  if (href.startsWith(`/${currentLang}`)) {
    return href;
  }
  return `/${currentLang}${href.startsWith('/') ? href : `/${href}`}`;
}

const defaultFooterNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Q&A', href: '/questions' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export function Footer({
  settings = defaultSiteSettings,
  lang = 'en',
}: {
  settings?: SiteSettingsData;
  lang?: string;
}) {
  const consultationHref = settings?.whatsappNumber
    ? getWhatsAppUrl(settings.whatsappNumber)
    : settings?.consultationLink || getWhatsAppUrl();

  const footerNavLinks =
    settings?.footerNav && settings.footerNav.length > 0 ? settings.footerNav : defaultFooterNav;

  return (
    <footer className="bg-bg-primary text-text-on-dark w-full">
      <div className="border-border-on-dark/20 border-b px-6 py-17.5 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link
              href={localizeHref('/', lang)}
              className="inline-block transition-opacity hover:opacity-95"
            >
              <Image
                src="/white-logo-for-elvinediz.png"
                alt={settings?.siteTitle || 'Elvin Ediz'}
                width={178}
                height={55}
                className="h-auto w-42.5"
              />
            </Link>
            <p className="text-text-on-dark-muted max-w-xs text-sm leading-relaxed">
              {settings?.footerDescription ||
                'Guidance for your next chapter in Canada. Personal, regulated Canadian immigration consulting.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <span className="text-text-on-dark-muted mb-1 text-xs font-semibold tracking-widest uppercase">
              {settings?.footerNavTitle || 'Explore'}
            </span>
            {footerNavLinks.map((item, idx) => (
              <Link
                key={item.href ? `${item.href}-${idx}` : idx}
                href={localizeHref(item.href, lang)}
                className="hover:text-accent opacity-80 transition-colors duration-200 hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <span className="text-text-on-dark-muted mb-1 text-xs font-semibold tracking-widest uppercase">
              {settings?.footerConnectTitle || 'Connect'}
            </span>
            <a
              href={`mailto:${settings?.contactEmail || 'info@elvinediz.com'}`}
              className="hover:text-accent opacity-80 transition-colors duration-200 hover:opacity-100"
            >
              {settings?.contactEmail || 'info@elvinediz.com'}
            </a>
            <a
              href={consultationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent opacity-80 transition-colors duration-200 hover:opacity-100"
            >
              {settings?.footerConsultationText || 'Free Consultation'}
            </a>
            <span className="opacity-80">{settings?.address || 'Toronto, Canada'}</span>
          </div>
        </div>
      </div>

      <div className="bg-bg-primary text-text-on-dark-muted/70 px-6 py-5 text-xs font-medium tracking-wider uppercase md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
          <span>
            {settings?.copyrightText ||
              `© ${new Date().getFullYear()} Elvin Ediz Immigration Services.`}
          </span>
          <div className="flex flex-wrap items-center gap-3 text-center md:text-right">
            <Link
              href={localizeHref('/privacy', lang)}
              className="hover:text-accent opacity-80 transition-colors duration-200 hover:opacity-100"
            >
              {settings?.footerPrivacyText || 'Privacy Policy'}
            </Link>
            <span>•</span>
            <span>
              {settings?.footerNotice || 'Regulated Canadian Immigration Consultant (RCIC)'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
