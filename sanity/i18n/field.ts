import { defineField } from 'sanity';

/**
 * Standard hidden read-only language field definition to ensure
 * Sanity schemas recognize the language attribute managed by
 * @sanity/document-internationalization without displaying schema warnings.
 */
export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  readOnly: true,
  hidden: true,
});

export default languageField;
