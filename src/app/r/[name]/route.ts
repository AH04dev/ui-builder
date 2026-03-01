import { NextRequest, NextResponse } from 'next/server';
import { getRegistryIndex, getRegistryItem } from '@/lib/shadcn-registry';

function getRequestBaseUrl(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') ?? 'http';

  if (!host) return 'http://localhost:3000';
  return `${protocol}://${host}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const normalizedName = name.endsWith('.json') ? name.slice(0, -5) : name;
  const homepage = getRequestBaseUrl(request);
  const headers = {
    'Cache-Control': 'public, max-age=300, s-maxage=300',
  };

  if (normalizedName === 'registry' || normalizedName === 'index') {
    return NextResponse.json(getRegistryIndex(homepage), { headers });
  }

  const item = getRegistryItem(normalizedName);
  if (!item) {
    return NextResponse.json(
      { error: `Registry item "${normalizedName}" not found.` },
      { status: 404, headers }
    );
  }

  return NextResponse.json(item, { headers });
}
