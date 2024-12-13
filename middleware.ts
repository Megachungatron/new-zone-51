// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const originalPath = url.pathname;

    // Define paths to rewrite
    const pathsToRewrite = ['/', '/add-plate', '/select-rate', '/payment'];

    if (pathsToRewrite.includes(originalPath)) {
        // Rewrite to the zone path and append the original path as a query parameter
        url.pathname = '/zone/65abf5a7cbccb4a384daacbe';
        url.searchParams.set('originalPath', originalPath);
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/add-plate', '/select-rate', '/payment'],
};
