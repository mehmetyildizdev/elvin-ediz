import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { getWhatsAppUrl } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { portableTextComponents } from './portable-text';
import { getIconComponent } from '@/sanity/lib/iconLibrary';

interface InsightArticleProps {
  post: PostData;
  settings?: SiteSettingsData;
}

export function InsightArticle({ post, settings = defaultSiteSettings }: InsightArticleProps) {
  const OversightIcon = getIconComponent(post.authorOversightIcon) || ShieldCheck;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <div className="lg:col-span-8">
        {post.content && post.content.length > 0 ? (
          <div className="prose-container">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
        ) : (
          <div className="text-text-muted space-y-6 text-base leading-relaxed sm:text-lg">
            <p>
              Navigating Canadian immigration pathways requires aligning personal qualifications with
              current federal and provincial policy directives. From Comprehensive Ranking System (CRS)
              score optimization to strategic provincial nomination selections, every decision impacts
              your application timeline.
            </p>
            <p>
              Applicants who assess their documentation upfront and understand IRCC evaluation standards
              position themselves for a clearer, more predictable process. In this analysis, our RCIC
              consulting team reviews key strategic considerations.
            </p>
            <h3 className="text-text-main mt-8 font-serif text-2xl font-semibold">
              Key Strategic Takeaways
            </h3>
            <p>
              1. <strong>Language Scores:</strong> Maximizing CLB benchmarks across first and second
              official languages remains one of the highest-yield investments for Express Entry candidates.
            </p>
            <p>
              2. <strong>Work Experience Verification:</strong> Ensuring job descriptions align strictly
              with Canadian National Occupational Classification (NOC / TEER) codes prevents
              disqualifications during eligibility assessment.
            </p>
            <p>
              3. <strong>Regulatory Compliance:</strong> Always verify that representation is managed by a
              licensed member of the College of Immigration and Citizenship Consultants (CICC).
            </p>
          </div>
        )}
      </div>

      {/* Sidebar with Consultant Bio & CTA (100% Click-Editable) */}
      <div className="lg:col-span-4">
        <div className="border-border-subtle bg-bg-surface sticky top-28 flex flex-col gap-6 rounded-sm border p-6 shadow-xs">
          <div className="border-border-subtle flex items-center gap-3 border-b pb-4">
            <OversightIcon size={24} className="text-accent" />
            <div>
              <h4 className="text-text-main font-serif text-base font-semibold">
                {post.authorOversightTitle || 'Author Oversight'}
              </h4>
              <span className="text-text-muted text-xs">
                {post.authorOversightSubtitle || 'CICC Licensed #R533968'}
              </span>
            </div>
          </div>

          <p className="text-text-muted text-xs leading-relaxed">
            {post.authorOversightText ||
              'Every insight is reviewed under the direct supervision of Nazly Sunguroglu, RCIC, founder of Elvin Ediz Immigration Services in Toronto.'}
          </p>

          <Button
            href={
              post.authorOversightCtaLink ||
              getWhatsAppUrl(settings?.whatsappNumber, `Hello Nazly, I would like to consult regarding: ${post.title}`)
            }
            variant="primary"
            size="sm"
            className="w-full"
          >
            {post.authorOversightCtaText || 'Consult on this topic'} <ArrowUpRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
