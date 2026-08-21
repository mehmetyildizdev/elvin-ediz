'use client';

import { useEffect, useRef, useState } from 'react';
import { Palette, Type, X, Check, RotateCcw, SlidersHorizontal, Sparkles } from 'lucide-react';

// Color themes configuration
const themes = ['evergreen', 'pacific', 'maple', 'slate'] as const;
type Theme = (typeof themes)[number];

const themeConfig: Record<
  Theme,
  {
    name: string;
    description: string;
    brandColor: string;
    accentColor: string;
    surfaceBg: string;
    isDark?: boolean;
  }
> = {
  evergreen: {
    name: 'Evergreen',
    description: 'Forest Green & Warm Ivory',
    brandColor: '#1d4d43',
    accentColor: '#c85a32',
    surfaceBg: '#f0ebe1',
  },
  pacific: {
    name: 'Pacific',
    description: 'Coastal Navy & Soft Frost',
    brandColor: '#1d426d',
    accentColor: '#d47a22',
    surfaceBg: '#e8eef5',
  },
  maple: {
    name: 'Maple',
    description: 'Rich Burgundy & Linen',
    brandColor: '#78252d',
    accentColor: '#b83a2e',
    surfaceBg: '#f2e7dc',
  },
  slate: {
    name: 'Slate Dark',
    description: 'Dark Mode Charcoal',
    brandColor: '#12161a',
    accentColor: '#8e361b',
    surfaceBg: '#242c34',
    isDark: true,
  },
};

// Font pairings configuration
const fonts = ['classic', 'modern', 'diplomat', 'heritage'] as const;
type FontPairing = (typeof fonts)[number];

const fontConfig: Record<
  FontPairing,
  {
    name: string;
    serifName: string;
    sansName: string;
    description: string;
    previewClass: string;
  }
> = {
  classic: {
    name: 'Classic',
    serifName: 'Playfair Display',
    sansName: 'DM Sans',
    description: 'Editorial & Prestigious',
    previewClass: 'font-preview-classic',
  },
  modern: {
    name: 'Modern',
    serifName: 'Lora',
    sansName: 'Plus Jakarta Sans',
    description: 'Clean & Contemporary',
    previewClass: 'font-preview-modern',
  },
  diplomat: {
    name: 'Diplomat',
    serifName: 'DM Serif Display',
    sansName: 'Manrope',
    description: 'Bold, Balanced & Authoritative',
    previewClass: 'font-preview-diplomat',
  },
  heritage: {
    name: 'Heritage',
    serifName: 'Merriweather',
    sansName: 'Inter',
    description: 'Academic & Trustworthy',
    previewClass: 'font-preview-heritage',
  },
};

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('evergreen');
  const [font, setFont] = useState<FontPairing>('classic');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'font'>('theme');
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('elvin-theme') as Theme | null;
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }

    // Load saved font
    let savedFont = localStorage.getItem('elvin-font') as string | null;
    if (savedFont === 'executive') savedFont = 'diplomat';
    if (savedFont && fonts.includes(savedFont as FontPairing)) {
      setFont(savedFont as FontPairing);
      document.documentElement.dataset.font = savedFont;
    }

    setMounted(true);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('elvin-theme', newTheme);
  };

  const changeFont = (newFont: FontPairing) => {
    setFont(newFont);
    document.documentElement.dataset.font = newFont;
    localStorage.setItem('elvin-font', newFont);
  };

  const resetDefaults = () => {
    changeTheme('evergreen');
    changeFont('classic');
  };

  if (!mounted) {
    return null;
  }

  const currentThemeData = themeConfig[theme];
  const currentFontData = fontConfig[font];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed right-5 bottom-5 z-50 sm:right-6 sm:bottom-6">
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex h-12 items-center gap-2.5 rounded-full border px-4 shadow-xl backdrop-blur-md transition-all duration-300 focus:outline-hidden ${
            isOpen
              ? 'border-accent bg-bg-primary text-text-on-dark ring-accent/30 ring-2'
              : 'border-border-on-dark/30 bg-bg-primary/90 text-text-on-dark hover:border-accent hover:bg-bg-primary hover:scale-105 hover:shadow-2xl'
          }`}
          aria-label="Open appearance settings"
          aria-expanded={isOpen}
          title="Customize Theme & Fonts"
        >
          {/* Dual-color Swatch indicator */}
          <span className="relative flex h-5 w-5 shrink-0 overflow-hidden rounded-full border border-white/40 shadow-inner">
            <span
              className="absolute inset-0 right-1/2"
              style={{ backgroundColor: currentThemeData.brandColor }}
            />
            <span
              className="absolute inset-0 left-1/2"
              style={{ backgroundColor: currentThemeData.accentColor }}
            />
          </span>

          <span className="text-xs font-semibold tracking-wider uppercase">Style</span>

          <SlidersHorizontal
            size={14}
            className={`transition-transform duration-300 ${isOpen ? 'text-accent rotate-90' : 'opacity-70 group-hover:opacity-100'}`}
          />
        </button>
      </div>

      {/* Floating Appearance Modal / Drawer */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Appearance Customizer"
          className="border-border-subtle bg-bg-surface/95 text-text-main animate-in fade-in zoom-in-95 fixed right-4 bottom-20 z-50 w-84 max-w-[calc(100vw-2rem)] rounded-2xl border p-5 shadow-2xl backdrop-blur-xl transition-all duration-200 sm:right-6 sm:w-96"
        >
          {/* Header */}
          <div className="border-border-subtle flex items-center justify-between border-b pb-3.5">
            <div className="flex items-center gap-2">
              <span className="bg-accent/15 text-accent flex h-7 w-7 items-center justify-center rounded-lg">
                <SlidersHorizontal size={15} />
              </span>
              <div>
                <h3 className="text-text-main font-serif text-sm font-semibold tracking-tight">
                  Appearance
                </h3>
                <p className="text-text-muted text-[11px]">Customize theme & typography</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:bg-bg-app hover:text-text-main flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-colors"
              aria-label="Close customizer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Separate Selection Tabs */}
          <div className="bg-bg-app/80 border-border-subtle/60 mt-3.5 flex rounded-lg border p-1">
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'theme'
                  ? 'bg-bg-surface text-text-main shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              <Palette size={13} className={activeTab === 'theme' ? 'text-accent' : ''} />
              <span>Theme ({currentThemeData.name})</span>
            </button>

            <button
              onClick={() => setActiveTab('font')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'font'
                  ? 'bg-bg-surface text-text-main shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              <Type size={13} className={activeTab === 'font' ? 'text-accent' : ''} />
              <span>Font ({currentFontData.name})</span>
            </button>
          </div>

          {/* Tab 1: Color Themes */}
          {activeTab === 'theme' && (
            <div className="mt-4 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                {themes.map((key) => {
                  const cfg = themeConfig[key];
                  const isSelected = theme === key;

                  return (
                    <button
                      key={key}
                      onClick={() => changeTheme(key)}
                      className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-accent bg-bg-app ring-accent/30 shadow-xs ring-1'
                          : 'border-border-subtle bg-bg-surface hover:border-accent/40 hover:bg-bg-app/60'
                      }`}
                    >
                      {/* Color swatches preview: Brand Theme Color + Accent + Background Surface */}
                      <div className="mb-2 flex w-full items-center gap-1.5">
                        <span
                          className="h-5 w-5 rounded-full border border-black/15 shadow-xs transition-transform group-hover:scale-110"
                          style={{ backgroundColor: cfg.brandColor }}
                          title={`Brand: ${cfg.name}`}
                        />
                        <span
                          className="h-5 w-5 rounded-full border border-black/15 shadow-xs transition-transform group-hover:scale-110"
                          style={{ backgroundColor: cfg.accentColor }}
                          title={`Accent: ${cfg.accentColor}`}
                        />
                        <span
                          className="h-5 w-5 rounded-full border border-black/15 shadow-xs transition-transform group-hover:scale-110"
                          style={{ backgroundColor: cfg.surfaceBg }}
                          title={`Surface: ${cfg.surfaceBg}`}
                        />
                        {cfg.isDark && (
                          <span className="text-text-muted ml-auto rounded bg-black/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                            Dark
                          </span>
                        )}
                      </div>

                      <div className="flex w-full items-center justify-between">
                        <span className="text-text-main text-xs font-bold">{cfg.name}</span>
                        {isSelected && <Check size={13} className="text-accent" />}
                      </div>

                      <span className="text-text-muted mt-0.5 text-[10px] leading-tight">
                        {cfg.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Font Typography */}
          {activeTab === 'font' && (
            <div className="mt-4 space-y-2">
              {fonts.map((key) => {
                const cfg = fontConfig[key];
                const isSelected = font === key;

                return (
                  <button
                    key={key}
                    onClick={() => changeFont(key)}
                    className={`group flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-accent bg-bg-app ring-accent/30 shadow-xs ring-1'
                        : 'border-border-subtle bg-bg-surface hover:border-accent/40 hover:bg-bg-app/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Large Typography Glyph Preview */}
                      <span
                        className={`border-border-subtle bg-bg-surface flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-lg font-semibold ${cfg.previewClass} ${
                          isSelected ? 'text-accent border-accent/30' : 'text-text-main'
                        }`}
                      >
                        Aa
                      </span>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-text-main text-xs font-bold">{cfg.name}</span>
                          <span className="text-text-muted text-[10px]">({cfg.description})</span>
                        </div>
                        <span className="text-text-muted mt-0.5 text-[11px]">
                          <strong className="text-text-main font-semibold">{cfg.serifName}</strong>{' '}
                          + {cfg.sansName}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="bg-accent flex h-5 w-5 items-center justify-center rounded-full text-white">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer with Reset */}
          <div className="border-border-subtle mt-4 flex items-center justify-between border-t pt-3 text-[11px]">
            <button
              onClick={resetDefaults}
              className="text-text-muted hover:text-accent inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw size={12} />
              <span>Reset defaults</span>
            </button>

            <span className="text-text-muted/70">Preferences auto-saved</span>
          </div>
        </div>
      )}
    </>
  );
}
