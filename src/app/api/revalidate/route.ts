import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Webhook called by the Laravel admin panel after catalogue or CMS content
 * changes (see backend FrontendRevalidator). It marks every cached page stale so
 * the next visit re-fetches /api/v1 instead of waiting for the 60s ISR window.
 *
 * Disabled unless REVALIDATE_SECRET is set; requests must carry the same value
 * in the X-Revalidate-Secret header.
 */
function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json({ message: 'Revalidation is not enabled.' }, { status: 404 });
  }

  if (!secretMatches(request.headers.get('x-revalidate-secret'), expected)) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true });
}
