import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const draft = await draftMode();
  draft.enable();

  const redirectPath =
    searchParams.get('sanity-preview-pathname') || searchParams.get('slug') || '/';

  redirect(redirectPath);
}
