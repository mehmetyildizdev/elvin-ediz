'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
          <div className={`prose-custom my-4 font-sans ${textSize}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        );
      },
      markdownBlock: ({ value }) => {
        const content = typeof value === 'string' ? value : value?.content || value?.markdown || '';
        if (!content) return null;
        return (
          <div className={`prose-custom my-4 font-sans ${textSize}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
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
        <h2 className="text-text-main mt-10 mb-4 font-serif text-2xl font-semibold sm:text-3xl">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-text-main mt-8 mb-3 font-serif text-xl font-semibold sm:text-2xl">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-text-main mt-6 mb-2 font-serif text-lg font-semibold">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-text-main mt-4 mb-1.5 font-serif text-base font-semibold">
          {children}
        </h5>
      ),
      normal: ({ children }) => (
        <p className={`text-text-muted mb-4 font-sans last:mb-0 ${textSize}`}>{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-accent bg-bg-surface text-text-main my-6 border-l-4 py-3 pl-6 font-serif text-base italic sm:text-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`text-text-muted my-4 list-disc space-y-2 pl-6 font-sans ${textSize}`}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={`text-text-muted my-4 list-decimal space-y-2 pl-6 font-sans ${textSize}`}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="font-sans leading-relaxed">{children}</li>,
      number: ({ children }) => <li className="font-sans leading-relaxed">{children}</li>,
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

  // If a raw string is passed, render with Markdown support
  if (typeof value === 'string') {
    return (
      <div className={`text-text-muted font-sans leading-relaxed ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
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
