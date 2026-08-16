import type { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
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
    normal: ({ children }) => (
      <p className="text-text-muted mb-6 text-base leading-relaxed sm:text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-accent bg-bg-surface text-text-main my-6 border-l-4 py-3 pl-6 font-serif text-lg italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-text-muted my-6 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="text-text-muted my-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed sm:text-lg">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed sm:text-lg">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-text-main font-semibold">{children}</strong>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          {children}
        </a>
      );
    },
  },
};
