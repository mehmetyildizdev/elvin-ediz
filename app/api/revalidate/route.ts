import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

interface SanityWebhookPayload {
  _type?: string;
  _id?: string;
  slug?: string;
  kind?: 'insight' | 'news' | 'announcement' | 'information' | string;
  secret?: string;
  tag?: string;
  path?: string;
}

const purgeTag = (tag: string) => revalidateTag(tag, { expire: 0 });

export async function POST(req: NextRequest) {
  try {
    const secretEnv = process.env.SANITY_REVALIDATE_SECRET;
    let body: SanityWebhookPayload | null = null;
    let isValid = false;

    // 1. Try validating Sanity Webhook signature if signature header exists
    const signatureHeader = req.headers.get('sanity-webhook-signature');
    if (signatureHeader && secretEnv) {
      const parsed = await parseBody<SanityWebhookPayload>(req, secretEnv, false);
      body = parsed.body;
      isValid = parsed.isValidSignature === true;
    } else {
      // 2. Direct secret verification fallback (Authorization header, query param, or JSON body)
      const authHeader = req.headers.get('authorization');
      const bearerSecret = authHeader?.startsWith('Bearer ')
        ? authHeader.substring(7).trim()
        : null;
      const urlSecret = req.nextUrl.searchParams.get('secret');

      const rawBodyText = await req.text();
      if (rawBodyText.trim()) {
        try {
          body = JSON.parse(rawBodyText);
        } catch {
          body = null;
        }
      }

      const bodySecret = body?.secret;
      const suppliedSecret = bearerSecret || urlSecret || bodySecret;

      if (secretEnv) {
        isValid = suppliedSecret === secretEnv;
      } else {
        // If no secret configured in env, allow in development mode or if no secret is set
        isValid = process.env.NODE_ENV === 'development' || !secretEnv;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid or missing revalidation secret / signature' },
        { status: 401 }
      );
    }

    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    const docType = body?._type;
    const slug = body?.slug;
    const kind = body?.kind;

    // Execute scoped revalidations based on document type
    switch (docType) {
      case 'post': {
        // Invalidate list / category feeds
        purgeTag('posts');
        revalidatedTags.push('posts');

        if (kind) {
          purgeTag(`posts:${kind}`);
          revalidatedTags.push(`posts:${kind}`);
        }

        // Invalidate only this specific post's cached queries and detail route
        if (slug) {
          purgeTag(`post:${slug}`);
          revalidatedTags.push(`post:${slug}`);
          // Detail routes
          revalidatePath(`/insights/${slug}`, 'page');
          revalidatePath(`/news/${slug}`, 'page');
          revalidatePath(`/announcements/${slug}`, 'page');
          revalidatePath(`/information/${slug}`, 'page');
          revalidatedPaths.push(
            `/insights/${slug}`,
            `/news/${slug}`,
            `/announcements/${slug}`,
            `/information/${slug}`
          );
        }

        // Listing hubs
        revalidatePath('/insights', 'page');
        revalidatePath('/news', 'page');
        revalidatePath('/announcements', 'page');
        revalidatePath('/information', 'page');
        revalidatedPaths.push('/insights', '/news', '/announcements', '/information');
        break;
      }

      case 'service': {
        // Invalidate services list
        purgeTag('services');
        revalidatedTags.push('services');

        // Invalidate only this specific service
        if (slug) {
          purgeTag(`service:${slug}`);
          revalidatedTags.push(`service:${slug}`);
          revalidatePath(`/services/${slug}`, 'page');
          revalidatedPaths.push(`/services/${slug}`);
        }

        revalidatePath('/services', 'page');
        revalidatedPaths.push('/services');
        break;
      }

      case 'servicesPage': {
        purgeTag('servicesPage');
        revalidatedTags.push('servicesPage');
        revalidatePath('/services', 'page');
        revalidatedPaths.push('/services');
        break;
      }

      case 'insightsPage': {
        purgeTag('insightsPage');
        revalidatedTags.push('insightsPage');
        revalidatePath('/insights', 'page');
        revalidatedPaths.push('/insights');
        break;
      }

      case 'faqPage': {
        purgeTag('faqPage');
        revalidatedTags.push('faqPage');
        revalidatePath('/questions', 'page');
        revalidatedPaths.push('/questions');
        break;
      }

      case 'privacyPage': {
        purgeTag('privacyPage');
        revalidatedTags.push('privacyPage');
        revalidatePath('/privacy', 'page');
        revalidatedPaths.push('/privacy');
        break;
      }

      case 'homePage': {
        purgeTag('homePage');
        revalidatedTags.push('homePage');
        revalidatePath('/', 'page');
        revalidatedPaths.push('/');
        break;
      }

      case 'staffMember': {
        purgeTag('staffMember');
        purgeTag('homePage');
        revalidatedTags.push('staffMember', 'homePage');
        revalidatePath('/', 'page');
        revalidatedPaths.push('/');
        break;
      }

      case 'testimonial': {
        purgeTag('testimonial');
        purgeTag('homePage');
        revalidatedTags.push('testimonial', 'homePage');
        revalidatePath('/', 'page');
        revalidatedPaths.push('/');
        break;
      }

      case 'googleReviews': {
        purgeTag('googleReviews');
        purgeTag('homePage');
        revalidatedTags.push('googleReviews', 'homePage');
        revalidatePath('/', 'page');
        revalidatedPaths.push('/');
        break;
      }

      case 'siteSettings': {
        purgeTag('siteSettings');
        revalidatedTags.push('siteSettings');
        revalidatePath('/', 'layout');
        revalidatedPaths.push('/ (layout)');
        break;
      }

      default: {
        // Handle custom manual revalidations via body parameters
        if (body?.tag) {
          purgeTag(body.tag);
          revalidatedTags.push(body.tag);
        }
        if (body?.path) {
          revalidatePath(body.path, 'page');
          revalidatedPaths.push(body.path);
        }
        if (!body?.tag && !body?.path) {
          // General fallback: revalidate siteSettings and homePage
          purgeTag('siteSettings');
          purgeTag('homePage');
          revalidatedTags.push('siteSettings', 'homePage');
        }
      }
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      documentType: docType || 'custom',
      revalidatedTags,
      revalidatedPaths,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown revalidation error';
    console.error('Error during on-demand revalidation:', err);
    return NextResponse.json({ message, error: true }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secretEnv = process.env.SANITY_REVALIDATE_SECRET;
  const secret = req.nextUrl.searchParams.get('secret');
  const tag = req.nextUrl.searchParams.get('tag');
  const path = req.nextUrl.searchParams.get('path');

  if (secretEnv && secret !== secretEnv && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (tag) {
    purgeTag(tag);
    return NextResponse.json({ revalidated: true, tag });
  }

  if (path) {
    revalidatePath(path, 'page');
    return NextResponse.json({ revalidated: true, path });
  }

  return NextResponse.json({
    status: 'online',
    usage:
      'POST to this endpoint with Sanity Webhook or pass ?secret=...&tag=... or ?secret=...&path=...',
  });
}
