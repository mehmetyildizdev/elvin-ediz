'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { SiteSettingsData, defaultSiteSettings } from '@/sanity/lib/types';

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

export function Header({
  settings = defaultSiteSettings,
  lang = 'en',
}: {
  settings?: SiteSettingsData;
  lang?: string;
}) {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Contact Bar (Desktop / Tablet) */}
      <div className="bg-bg-primary text-text-on-dark-muted border-border-on-dark/20 hidden border-b px-6 py-2 text-xs transition-colors md:block md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-6">
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

          <div className="hidden items-center gap-5 md:flex">
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
            <div className="border-border-on-dark/20 border-l pl-3">
              <LanguageSwitcher currentLang={lang} variant="header" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-bg-primary/95 border-border-on-dark/20 text-text-on-dark flex h-20 w-full items-center border-b px-6 backdrop-blur-md md:px-12">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
          <Link
            href={localizeHref('/', lang)}
            className="flex items-center transition-opacity hover:opacity-95"
          >
            <Image
              src="/white-logo-for-elvinediz.png"
              alt={settings.siteTitle}
              width={170}
              height={52}
              priority
              className="h-auto w-36 object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-7 text-sm tracking-wide md:flex">
            {settings.headerNav.map(({ label, href }) => (
              <Link
                key={href}
                href={localizeHref(href, lang)}
                className="py-2 font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              href={localizeHref(settings.consultationLink, lang)}
              variant="outline-on-dark"
              size="sm"
              className="hidden md:inline-flex"
            >
              Free Consultation
            </Button>
            <button
              className="text-text-on-dark flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10 md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Over Side Drawer & Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/65 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`border-border-on-dark/20 bg-bg-primary text-text-on-dark fixed top-0 right-0 bottom-0 z-50 flex w-[85vw] max-w-sm flex-col justify-between border-l shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="border-border-on-dark/20 flex items-center justify-between border-b px-6 py-5">
          <Link
            href={localizeHref('/', lang)}
            onClick={() => setOpen(false)}
            className="transition-opacity hover:opacity-90"
          >
            <Image
              src="/white-logo-for-elvinediz.png"
              alt={settings.siteTitle}
              width={140}
              height={42}
              className="h-auto w-30 object-contain"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-text-on-dark hover:text-accent flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body - Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6">
            <p className="text-accent mb-2 text-[11px] font-bold tracking-widest uppercase">
              Language / Dil
            </p>
            <LanguageSwitcher currentLang={lang} variant="mobile" />
          </div>

          <p className="text-accent mb-3 text-[11px] font-bold tracking-widest uppercase">
            Menu Navigation
          </p>

          <nav className="flex flex-col gap-1.5">
            {settings.headerNav.map(({ label, href }, index) => (
              <Link
                key={href}
                href={localizeHref(href, lang)}
                onClick={() => setOpen(false)}
                className="group text-text-on-dark hover:text-accent flex items-center justify-between rounded-xl px-3.5 py-3 font-serif text-base font-medium transition-all hover:bg-white/5"
              >
                <span className="flex items-center gap-3">
                  <span className="text-accent/60 font-sans text-xs font-semibold">
                    0{index + 1}
                  </span>
                  <span>{label}</span>
                </span>
                <ChevronRight
                  size={16}
                  className="text-text-on-dark-muted group-hover:text-accent opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <Button
              href={localizeHref(settings.consultationLink, lang)}
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Free Consultation <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        {/* Drawer Footer - Contact Info & Socials */}
        <div className="border-border-on-dark/20 space-y-3 border-t bg-black/15 p-6 text-xs">
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="text-text-on-dark-muted hover:text-accent flex items-center gap-2.5 transition-colors"
          >
            <Phone size={13} className="text-accent shrink-0" />
            <span>{settings.phone}</span>
          </a>

          <a
            href={`mailto:${settings.contactEmail}`}
            className="text-text-on-dark-muted hover:text-accent flex items-center gap-2.5 transition-colors"
          >
            <Mail size={13} className="text-accent shrink-0" />
            <span>{settings.contactEmail}</span>
          </a>

          {settings.officeHours && (
            <div className="text-text-on-dark-muted flex items-center gap-2.5">
              <Clock size={13} className="text-accent shrink-0" />
              <span>{settings.officeHours}</span>
            </div>
          )}

          <div className="text-text-on-dark-muted flex items-start gap-2.5">
            <MapPin size={13} className="text-accent mt-0.5 shrink-0" />
            <span className="leading-snug">{settings.address}</span>
          </div>

          {(settings.linkedinUrl || settings.instagramUrl) && (
            <div className="border-border-on-dark/10 flex items-center gap-3 border-t pt-2">
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-on-dark-muted hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-on-dark-muted hover:text-accent transition-colors"
                >
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </aside>
    </header>
  );
}
