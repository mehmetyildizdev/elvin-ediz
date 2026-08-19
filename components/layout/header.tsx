'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SiteSettingsData, defaultSiteSettings } from '@/sanity/lib/types';

export function Header({ settings = defaultSiteSettings }: { settings?: SiteSettingsData }) {
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
      <div className="bg-bg-primary text-text-on-dark-muted border-border-on-dark/20 hidden border-b py-2 px-6 text-xs transition-colors md:block md:px-12">
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

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-7 text-sm tracking-wide md:flex">
            {settings.headerNav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="py-2 font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              href={settings.consultationLink}
              variant="outline-on-dark"
              size="sm"
              className="hidden md:inline-flex"
            >
              Free Consultation
            </Button>
            <button
              className="text-text-on-dark flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10 transition-colors md:hidden"
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
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 flex w-[85vw] max-w-sm flex-col justify-between border-l border-border-on-dark/20 bg-bg-primary text-text-on-dark shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border-on-dark/20 px-6 py-5">
          <Link href="/" onClick={() => setOpen(false)} className="transition-opacity hover:opacity-90">
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-text-on-dark hover:bg-white/10 hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body - Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-accent mb-3 text-[11px] font-bold tracking-widest uppercase">
            Menu Navigation
          </p>

          <nav className="flex flex-col gap-1.5">
            {settings.headerNav.map(({ label, href }, index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-serif font-medium text-text-on-dark transition-all hover:bg-white/5 hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <span className="text-accent/60 font-sans text-xs font-semibold">0{index + 1}</span>
                  <span>{label}</span>
                </span>
                <ChevronRight
                  size={16}
                  className="text-text-on-dark-muted opacity-40 transition-all group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <Button
              href={settings.consultationLink}
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
        <div className="border-t border-border-on-dark/20 bg-black/15 p-6 space-y-3 text-xs">
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-2.5 text-text-on-dark-muted transition-colors hover:text-accent"
          >
            <Phone size={13} className="text-accent shrink-0" />
            <span>{settings.phone}</span>
          </a>

          <a
            href={`mailto:${settings.contactEmail}`}
            className="flex items-center gap-2.5 text-text-on-dark-muted transition-colors hover:text-accent"
          >
            <Mail size={13} className="text-accent shrink-0" />
            <span>{settings.contactEmail}</span>
          </a>

          {settings.officeHours && (
            <div className="flex items-center gap-2.5 text-text-on-dark-muted">
              <Clock size={13} className="text-accent shrink-0" />
              <span>{settings.officeHours}</span>
            </div>
          )}

          <div className="flex items-start gap-2.5 text-text-on-dark-muted">
            <MapPin size={13} className="text-accent shrink-0 mt-0.5" />
            <span className="leading-snug">{settings.address}</span>
          </div>

          {(settings.linkedinUrl || settings.instagramUrl) && (
            <div className="flex items-center gap-3 pt-2 border-t border-border-on-dark/10">
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
