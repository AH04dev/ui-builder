import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path: filePath } = await params;
    const relativePath = filePath.join('/');

    // Only allow .tsx files from registry
    if (!relativePath.endsWith('.tsx')) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), 'src', 'registry', relativePath);

    try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        return new NextResponse(content, {
            headers: { 'Content-Type': 'text/plain' },
        });
    } catch {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}
