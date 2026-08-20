import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any>> | null | undefined;
}

/**
 * Cleanly renders a Schema.org JSON-LD script tag in the page markup.
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export default JsonLd;
