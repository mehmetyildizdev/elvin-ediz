import React, { useCallback } from 'react';
import { StringInputProps, set } from 'sanity';
import { Select } from '@sanity/ui';

export const STRUCTURED_DATA_OPTIONS = [
  { title: 'Auto-detect based on page type (Recommended)', value: 'auto' },
  { title: 'Home & Organization (Local Legal Business & Website)', value: 'Organization' },
  { title: 'Article (Insights & Educational Guides)', value: 'Article' },
  { title: 'News Article (Immigration News & Reports)', value: 'NewsArticle' },
  { title: 'Professional Service (Immigration Pathway)', value: 'Service' },
  { title: 'FAQ Page (Questions & Answers)', value: 'FAQPage' },
  { title: 'About Page (Consultant & Firm Profile)', value: 'AboutPage' },
  { title: 'Contact Page (Booking & Office Info)', value: 'ContactPage' },
  { title: 'Collection / Hub (Insights, News, Guides Index)', value: 'CollectionPage' },
  { title: 'General Web Page', value: 'WebPage' },
];

export function StructuredDataTypeSelect(props: StringInputProps) {
  const { value, onChange, readOnly } = props;
  const activeValue = value || 'auto';

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(set(nextValue));
    },
    [onChange]
  );

  return (
    <Select value={activeValue} onChange={handleChange} readOnly={readOnly}>
      {STRUCTURED_DATA_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.title}
        </option>
      ))}
    </Select>
  );
}

export default StructuredDataTypeSelect;
