import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Elvin Ediz Immigration Services | Your Canadian Story Starts Here',
  description: 'Personalized Canadian immigration guidance from Nazly Sunguroglu, RCIC.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
