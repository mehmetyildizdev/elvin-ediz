'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { Button } from '@/components/ui/button';
import { SiteSettingsData, defaultSiteSettings } from '@/sanity/lib/types';

export function Header({ settings = defaultSiteSettings }: { settings?: SiteSettingsData }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Contact Bar */}
      <div className="bg-bg-primary text-text-on-dark-muted border-border-on-dark/20 border-b py-2 px-6 text-xs transition-colors md:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-accent" />
              <span>{settings.address}</span>
            </span>
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hover:text-accent flex items-center gap-1.5 transition-colors"
            >
              <Phone size={13} className="text-accent" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="hover:text-accent flex items-center gap-1.5 transition-colors"
            >
              <Mail size={13} className="text-accent" />
              <span>{settings.contactEmail}</span>
            </a>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-1.5 opacity-80">
              <Clock size={13} className="text-accent" />
              <span>{settings.officeHours}</span>
            </span>
            <div className="border-border-on-dark/20 flex items-center gap-3 border-l pl-4">
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-bg-primary/95 border-border-on-dark/20 text-text-on-dark flex h-20 w-full items-center border-b px-6 backdrop-blur-md md:px-12">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-95">
            <Image
              src="/white-logo-for-elvinediz.png"
              alt={settings.siteTitle}
              width={170}
              height={52}
              priority
              className="h-auto w-36 object-contain"
            />
          </Link>

          <div
            className={`${
              open ? 'flex' : 'hidden'
            } bg-bg-primary border-border-on-dark/10 absolute top-20 right-0 left-0 z-40 flex-col gap-6 border-b p-6 text-sm tracking-wide transition-all duration-300 md:relative md:top-0 md:right-auto md:left-auto md:flex md:flex-row md:items-center md:gap-7 md:border-b-0 md:border-transparent md:bg-transparent md:p-0`}
          >
            {settings.headerNav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2 font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100 md:py-0"
              >
                {label}
              </Link>
            ))}
            <a
              className="text-accent py-2 font-semibold md:hidden"
              href={settings.consultationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Free Consultation
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button
              href={settings.consultationLink}
              variant="outline-on-dark"
              size="sm"
              className="hidden md:inline-flex"
            >
              Free Consultation
            </Button>
            <button
              className="text-text-on-dark flex items-center justify-center p-1 hover:opacity-85 md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
