'use client';

import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const themes = ['evergreen', 'pacific', 'maple', 'slate'] as const;
type Theme = (typeof themes)[number];

const themeConfig: Record<Theme, { name: string; bg: string; accent: string }> = {
  evergreen: { name: 'Evergreen', bg: 'bg-[#0f2c28]', accent: 'border-[#c85a32]' },
  pacific: { name: 'Pacific', bg: 'bg-[#0f1b2d]', accent: 'border-[#d47a22]' },
  maple: { name: 'Maple', bg: 'bg-[#2a181a]', accent: 'border-[#b83a2e]' },
  slate: { name: 'Slate Dark', bg: 'bg-[#1a2026]', accent: 'border-[#e28b38]' },
};

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('evergreen');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('elvin-theme') as Theme | null;
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
    setMounted(true);
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('elvin-theme', newTheme);
  };

  if (!mounted) {
    return <div className="hidden h-5 w-28 sm:flex" />;
  }

  return (
    <div
      className="hidden h-5 items-center gap-2 border-l border-white/20 pl-4.5 text-white/80 sm:flex"
      aria-label="Choose colour theme"
    >
      <Palette size={15} aria-hidden="true" className="opacity-80" />
      <div className="flex gap-2">
        {themes.map((item) => (
          <button
            key={item}
            title={`${themeConfig[item].name} theme`}
            className={`h-4 w-4 cursor-pointer rounded-full border-2 transition-all duration-300 hover:scale-125 focus:outline-none ${
              themeConfig[item].bg
            } ${themeConfig[item].accent} ${
              theme === item
                ? 'scale-110 ring-2 ring-white ring-offset-1 ring-offset-black/40'
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => changeTheme(item)}
            aria-label={`${themeConfig[item].name} theme`}
          />
        ))}
      </div>
    </div>
  );
}
