import { NextRequest, NextResponse } from 'next/server';
import { getRegistryIndex } from '@/lib/shadcn-registry';

function getRequestBaseUrl(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') ?? 'http';

  if (!host) return 'http://localhost:3000';
  return `${protocol}://${host}`;
}

export async function GET(request: NextRequest) {
  return NextResponse.json(getRegistryIndex(getRequestBaseUrl(request)), {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
