import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Use Edge Runtime

export async function POST(req) {
    try {
        const body = await req.json();
        const { subject, html } = body;

        // Ensure subject and html are provided
        if (!subject || !html) {
            throw new Error('Subject and HTML content are required.');
        }

        // Save to Xano database
        const XANO_API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:_sLo3BDY/emails';
        const response = await fetch(XANO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, html }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Xano API error: ${errorText}`);
        }

        const result = await response.json();
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error saving to Xano database:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
