'use client';

import { useEffect } from 'react';

export function DeveloperSignature() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !(window as unknown as { __ALCHEMIST_LOGGED__?: boolean }).__ALCHEMIST_LOGGED__
    ) {
      (window as unknown as { __ALCHEMIST_LOGGED__?: boolean }).__ALCHEMIST_LOGGED__ = true;

      // Alchemical Palette Tokens
      // Obsidian (bg):      oklch(0.16 0.016 289)
      // Amethyst (border):  oklch(0.64 0.18 324)
      // Gold (separators):  oklch(0.81 0.121 100)
      // Ruby (craft text):  oklch(0.64 0.18 25)
      // Emerald (name):     oklch(0.64 0.14 144)
      // Sapphire (handle):  oklch(0.64 0.16 256)
      console.log(
        '%c ⚗️ Crafted with Digital Alchemy %c✦%c Mehmet Yıldız %c✦%c mehmetyildiz.dev ',
        'background: oklch(0.16 0.016 289); color: oklch(0.64 0.18 25); font-weight: bold; padding: 4px 4px 4px 8px; border-radius: 4px 0 0 4px; border: 1px solid oklch(0.64 0.18 324); border-right: none; font-family: system-ui, -apple-system, sans-serif;',
        'background: oklch(0.16 0.016 289); color: oklch(0.81 0.121 100); font-weight: bold; padding: 4px 4px; border-top: 1px solid oklch(0.64 0.18 324); border-bottom: 1px solid oklch(0.64 0.18 324); font-family: system-ui, -apple-system, sans-serif;',
        'background: oklch(0.16 0.016 289); color: oklch(0.64 0.14 144); font-weight: 600; padding: 4px 4px; border-top: 1px solid oklch(0.64 0.18 324); border-bottom: 1px solid oklch(0.64 0.18 324); font-family: system-ui, -apple-system, sans-serif;',
        'background: oklch(0.16 0.016 289); color: oklch(0.81 0.121 100); font-weight: bold; padding: 4px 4px; border-top: 1px solid oklch(0.64 0.18 324); border-bottom: 1px solid oklch(0.64 0.18 324); font-family: system-ui, -apple-system, sans-serif;',
        'background: oklch(0.16 0.016 289); color: oklch(0.64 0.16 256); font-weight: bold; padding: 4px 8px 4px 4px; border-radius: 0 4px 4px 0; border: 1px solid oklch(0.64 0.18 324); border-left: none; font-family: system-ui, -apple-system, sans-serif;'
      );
    }
  }, []);

  return null;
}
