import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;
    const authRoutes = [
        "/login",
        "/register",
        "/forgot-password",
    ];

    const isAuthRoute = authRoutes.includes(pathname) || pathname.startsWith("/reset-password");
    
    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                const response = NextResponse.redirect(
                    new URL("/login", request.url)
                );
                response.cookies.delete("token");
                return response;
            }
        } catch (error) {
            const response = NextResponse.redirect(
                new URL("/login", request.url)
            );
            response.cookies.delete("token");
            return response;
        }
    }
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