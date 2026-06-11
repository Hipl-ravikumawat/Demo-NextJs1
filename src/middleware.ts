import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const authRoutes = [
        "/login",
        "/register",
        "/forgot-password",
    ];
    const pathname = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.includes(pathname) || pathname.startsWith("/reset-password");
    if (token && isAuthRoute) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password/:path*",
    ],
};