import type { Metadata } from 'next';
import {
  DM_Sans,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Lora,
  Manrope,
  DM_Serif_Display,
  Inter,
  Merriweather,
} from 'next/font/google';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive } from '@/sanity/lib/live';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DeveloperSignature } from '@/components/layout/developer-signature';
import { fetchSiteSettings } from '@/sanity/lib/data';
import {
  supportedLanguages,
  defaultLanguage,
  isValidLanguage,
  getLanguageDirection,
} from '@/sanity/i18n';
import '../globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
  display: 'swap',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
});

const fontClasses = `${dmSans.variable} ${playfair.variable} ${jakarta.variable} ${lora.variable} ${manrope.variable} ${dmSerif.variable} ${inter.variable} ${merriweather.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://elvinediz.com'),
  title: {
    template: '%s | Elvin Ediz Immigration Services',
    default: 'Elvin Ediz Immigration Services | Your Canadian Story Starts Here',
  },
  description:
    'Personalized Canadian immigration guidance and representation from Nazly Sunguroglu, RCIC in Toronto, Ontario.',
  authors: [{ name: 'Mehmet Yıldız', url: 'https://mehmetyildiz.dev' }],
  creator: 'Mehmet Yıldız (mehmetyildiz.dev)',
  publisher: 'Elvin Ediz Immigration Services',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Elvin Ediz Immigration Services',
    title: 'Elvin Ediz Immigration Services | Your Canadian Story Starts Here',
    description:
      'Personalized Canadian immigration guidance and representation from Nazly Sunguroglu, RCIC.',
    images: [
      { url: '/favicon.png', width: 512, height: 512, alt: 'Elvin Ediz Immigration Services' },
    ],
  },
};

export async function generateStaticParams() {
  return supportedLanguages.map((l) => ({ lang: l.id }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const direction = getLanguageDirection(currentLang);

  const [settings, draft] = await Promise.all([
    fetchSiteSettings(currentLang),
    (async () => {
      try {
        return await draftMode();
      } catch {
        return { isEnabled: false };
      }
    })(),
  ]);

  const isEnabled = draft?.isEnabled ?? false;
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang={currentLang} dir={direction} className={fontClasses} data-scroll-behavior="smooth">
      <head>
        <link rel="author" href="/humans.txt" />
      </head>
      <body className={fontClasses}>
        <Header settings={settings} lang={currentLang} />
        {children}
        <Footer settings={settings} lang={currentLang} />
        <ThemeSwitcher />
        <DeveloperSignature />
        {/* Real-time live listener for draft mode / Presentation Tool */}
        {isEnabled && <SanityLive />}
        {/* Click-to-edit highlight overlays in draft mode / Presentation Tool */}
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
