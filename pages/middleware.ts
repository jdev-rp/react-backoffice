import {NextRequest} from "next/server";

export const config = {
    matcher: '/login'
}

export function middleware(request: NextRequest) {
    console.log(request);
}