'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { supportedLanguages, defaultLanguage, LanguageId } from '@/sanity/i18n';

interface LanguageSwitcherProps {
  currentLang?: string;
  variant?: 'header' | 'mobile' | 'footer';
}

export function LanguageSwitcher({
  currentLang = defaultLanguage,
  variant = 'header',
}: LanguageSwitcherProps) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect active language from pathname or fallback to prop
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const activeLang: LanguageId = supportedLanguages.some((l) => l.id === firstSegment)
    ? (firstSegment as LanguageId)
    : (currentLang as LanguageId) || defaultLanguage;

  const currentLanguageObj =
    supportedLanguages.find((l) => l.id === activeLang) || supportedLanguages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLang: LanguageId) => {
    setIsOpen(false);
    if (newLang === activeLang) return;

    // Persist language preference in cookie (1 year duration)
    try {
      document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore if SSR or cookies disabled
    }

    // Calculate new path
    let newPath = pathname;
    const hasLangPrefix = supportedLanguages.some((l) => l.id === firstSegment);

    if (hasLangPrefix) {
      // Current path has /tr/..., /ar/..., etc.
      const pathWithoutLang = '/' + segments.slice(1).join('/');
      if (newLang === defaultLanguage) {
        newPath = pathWithoutLang || '/';
      } else {
        newPath = `/${newLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
      }
    } else {
      // Current path is root /questions, /privacy, etc.
      if (newLang === defaultLanguage) {
        newPath = pathname;
      } else {
        newPath = `/${newLang}${pathname === '/' ? '' : pathname}`;
      }
    }

    router.push(newPath);
  };

  if (variant === 'mobile') {
    return (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {supportedLanguages.map((lang) => {
          const isActive = lang.id === activeLang;
          return (
            <button
              key={lang.id}
              onClick={() => handleLanguageChange(lang.id)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-accent text-bg-primary font-semibold shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              <span>{lang.title}</span>
              {isActive && <Check size={11} className="stroke-[2.5]" />}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-text-on-dark-muted hover:text-accent border-border-on-dark/30 hover:border-accent/40 flex items-center gap-1.5 rounded-md border bg-black/20 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-all"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={13} className="text-accent opacity-90" />
        <span className="tracking-wider uppercase">{activeLang}</span>
        <ChevronDown
          size={11}
          className={`opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="border-border-on-dark/30 animate-in fade-in zoom-in-95 absolute right-0 z-50 mt-1.5 w-36 origin-top-right rounded-lg border bg-[#111622]/95 py-1 shadow-2xl backdrop-blur-md duration-100 focus:outline-none">
          <div className="border-b border-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/40 uppercase">
            Select Language
          </div>
          {supportedLanguages.map((lang) => {
            const isActive = lang.id === activeLang;
            return (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isActive
                    ? 'bg-accent/15 text-accent font-semibold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase opacity-60">{lang.id}</span>
                  <span>{lang.title}</span>
                </div>
                {isActive && <Check size={13} className="text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
