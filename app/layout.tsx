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
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
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

export const metadata: Metadata = {
  title: 'Elvin Ediz Immigration Services | Your Canadian Story Starts Here',
  description: 'Personalized Canadian immigration guidance from Nazly Sunguroglu, RCIC.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
};

const fontClasses = `${dmSans.variable} ${playfair.variable} ${jakarta.variable} ${lora.variable} ${manrope.variable} ${dmSerif.variable} ${inter.variable} ${merriweather.variable}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled } = await draftMode();
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('elvin-theme');
                  if (t) document.documentElement.dataset.theme = t;
                  var f = localStorage.getItem('elvin-font');
                  if (f) document.documentElement.dataset.font = f;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={fontClasses}>
        {children}
        <ThemeSwitcher />
        <SanityLive />
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
