import { createClient } from '@sanity/client';

type FAQ = { _key: string; question: string; answer: string };
const fallback: FAQ[] = [
  {
    _key: 'pathway',
    question: 'How do I know which immigration pathway is right for me?',
    answer:
      'Each situation is unique. A consultation helps identify the most relevant options, the information to prepare, and the right next step for your circumstances.',
  },
  {
    _key: 'study',
    question: 'Can I study and work in Canada?',
    answer:
      'Your eligibility and conditions depend on your individual circumstances and current official IRCC requirements.',
  },
  {
    _key: 'pr-process',
    question: 'What is the processing time for Canadian Permanent Residency?',
    answer:
      'Processing times vary by category (Express Entry, Provincial Nominees, Family Sponsorship). We evaluate your eligibility to choose the fastest viable stream.',
  },
  {
    _key: 'consultation',
    question: 'What happens during an initial consultation with Nazly (RCIC)?',
    answer:
      'We review your profile, goals, work experience, and educational background to present legal options, required documents, and a structured timeline.',
  },
];

export async function SanityFAQ() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  let items = fallback;
  if (projectId && !projectId.startsWith('replace-')) {
    try {
      const client = createClient({
        projectId,
        dataset,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-14',
        useCdn: true,
      });
      const response = await client.fetch<FAQ[]>(
        '*[_type == "faqPage" && _id == "faqPage"][0].items[]{_key, question, answer}'
      );
      if (response?.length) items = response;
    } catch {
      /* Keep the useful fallback while Studio is not configured. */
    }
  }
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col">
      {items.map((item, index) => (
        <details
          key={item._key || index}
          open={index === 0}
          className="border-border-subtle group border-t py-6 transition-all duration-300 last:border-b"
        >
          <summary className="text-text-main hover:text-accent flex cursor-pointer list-none items-center justify-between font-serif text-lg font-semibold transition-colors select-none md:text-xl [&::-webkit-details-marker]:hidden">
            <span className="pr-4">{item.question}</span>
            <span className="text-accent shrink-0 text-2xl leading-none font-light transition-transform duration-250 select-none group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="text-text-muted mt-4 max-w-3xl pl-1 text-sm leading-relaxed sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
