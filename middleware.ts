import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export const config = {
    matcher: ['/service/:path*']
}

export function middleware(request: NextRequest) {
    if(!request.cookies.has('token')) return NextResponse.redirect(new URL('/login', request.url));
}