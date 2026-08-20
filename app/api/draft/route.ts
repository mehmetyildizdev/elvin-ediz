// ==============================================================================
// NOTE FOR CLIENT/PRODUCTION DEPLOYMENTS:
// A 1-hour (3600s) maxAge is explicitly set below on the draft cookie so demo
// sessions automatically revert to standard static caching without requiring
// the user to close their browser or manually visit /api/disable-draft.
// For dedicated production client sites, you can remove the maxAge block
// if you prefer default session-lifetime behavior.
// ==============================================================================

import { draftMode, cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const draft = await draftMode();
  draft.enable();

  // Explicit 1-hour expiration for demo sessions
  const cookieStore = await cookies();
  const bypassCookie = cookieStore.get('__prerender_bypass');
  if (bypassCookie) {
    cookieStore.set('__prerender_bypass', bypassCookie.value, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
      maxAge: 3600, // 1 hour (3600 seconds)
    });
  }

  const redirectPath =
    searchParams.get('sanity-preview-pathname') || searchParams.get('slug') || '/';

  redirect(redirectPath);
}
