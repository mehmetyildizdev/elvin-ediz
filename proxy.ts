import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLanguages, defaultLanguage } from './sanity/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;
const languageCodes = supportedLanguages.map((l) => l.id);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass static files, api routes, studio, robots, sitemap, next assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // If already prefixed with a supported language code (e.g. /tr, /ar, /fr, /en)
  if (languageCodes.includes(firstSegment)) {
    const response = NextResponse.next();
    response.headers.set('x-language', firstSegment);
    return response;
  }

  // Rewrite root/unprefixed path to default language /en/... internally
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLanguage}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set('x-language', defaultLanguage);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
