import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req) {
    return NextResponse.json({ success: true, message: 'Edge runtime test successful' });
}
