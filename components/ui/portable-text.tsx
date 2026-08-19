'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';

export interface PortableTextRendererProps {
  value: any[] | string | null | undefined;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
}

export const createPortableTextComponents = (
  size: 'sm' | 'base' | 'lg' = 'base'
): PortableTextComponents => {
  const textSize =
    size === 'sm'
      ? 'text-sm leading-relaxed'
      : size === 'lg'
        ? 'text-base leading-relaxed sm:text-lg'
        : 'text-sm leading-relaxed sm:text-base';

  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        const imageUrl = urlForImage(value)?.width(1400).url();
        if (!imageUrl) return null;

        return (
          <figure className="border-border-subtle bg-bg-surface my-8 overflow-hidden rounded-sm border">
            <div className="relative aspect-video w-full">
              <Image
                src={imageUrl}
                alt={value.alt || 'Post image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              />
            </div>
            {value.caption && (
              <figcaption className="border-border-subtle text-text-muted border-t px-4 py-2.5 text-center text-xs italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      markdown: ({ value }) => {
        const content = typeof value === 'string' ? value : value?.content || value?.markdown || '';
        if (!content) return null;
        return (
          <div className={`prose-custom my-4 font-sans whitespace-pre-wrap ${textSize}`}>
            {content}
          </div>
        );
      },
      markdownBlock: ({ value }) => {
        const content = typeof value === 'string' ? value : value?.content || value?.markdown || '';
        if (!content) return null;
        return (
          <div className={`prose-custom my-4 font-sans whitespace-pre-wrap ${textSize}`}>
            {content}
          </div>
        );
      },
      code: ({ value }) => {
        return (
          <pre className="border-border-subtle bg-bg-primary/90 text-text-on-dark my-4 overflow-x-auto rounded-sm border p-4 font-mono text-xs sm:text-sm">
            <code>{value?.code || value}</code>
          </pre>
        );
      },
    },
    block: {
      h2: ({ children }) => (
        <h2 className="text-text-main mt-8 mb-4 font-serif text-2xl font-semibold sm:text-3xl first:mt-0">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-text-main mt-7 mb-3 font-serif text-lg font-semibold sm:text-xl first:mt-0 border-b border-border-subtle/50 pb-2">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-text-main mt-5 mb-2 font-serif text-base font-semibold first:mt-0">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-text-main mt-4 mb-1.5 font-serif text-sm font-semibold">
          {children}
        </h5>
      ),
      normal: ({ children }) => (
        <p className={`text-text-muted mb-4 font-sans leading-relaxed last:mb-0 ${textSize}`}>{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-accent bg-accent/5 text-text-main my-5 border-l-3 py-3.5 px-5 rounded-r-md font-sans text-sm sm:text-base leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`my-4 space-y-2.5 pl-5 list-disc marker:text-accent font-sans ${textSize}`}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={`my-4 space-y-2.5 pl-5 list-decimal marker:text-accent font-sans ${textSize}`}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="font-sans leading-relaxed text-text-muted">{children}</li>,
      number: ({ children }) => <li className="font-sans leading-relaxed text-text-muted">{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="text-text-main font-sans font-semibold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
      code: ({ children }) => (
        <code className="bg-bg-surface text-text-main border-border-subtle rounded-xs border px-1.5 py-0.5 font-mono text-xs sm:text-sm">
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const href = value?.href || '';
        const isExternal = href.startsWith('http');
        const isInternal = href.startsWith('/') || href.startsWith('#');

        if (isInternal) {
          return (
            <Link
              href={href}
              className="text-accent font-sans font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              {children}
            </Link>
          );
        }

        return (
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-accent font-sans font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            {children}
          </a>
        );
      },
    },
  };
};

export const defaultPortableTextComponents = createPortableTextComponents('base');

export function PortableTextRenderer({
  value,
  className = '',
  size = 'base',
}: PortableTextRendererProps) {
  if (!value) return null;

  // If a raw string is passed, render with lightweight formatting
  if (typeof value === 'string') {
    return (
      <div className={`text-text-muted font-sans leading-relaxed whitespace-pre-wrap ${className}`}>
        {value}
      </div>
    );
  }

  // If Portable Text blocks array
  if (Array.isArray(value) && value.length > 0) {
    const components = createPortableTextComponents(size);
    return (
      <div className={`text-text-main font-sans ${className}`}>
        <SanityPortableText value={value} components={components} />
      </div>
    );
  }

  return null;
}

// Default export alias
export default PortableTextRenderer;
