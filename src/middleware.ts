import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

const authRoutes = ["/login", "/register", "/forgot-password"];
const protectedRoutes = ["/profile", "/chat", "/meeting"];

function isValidToken(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp >= Math.floor(Date.now() / 1000);
    } catch {
        return false;
    }
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const isAuthRoute =
        authRoutes.includes(pathname) || pathname.startsWith("/reset-password");
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const hasValidToken = !!token && isValidToken(token);

    if (token && !hasValidToken) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
    }

    if (isProtectedRoute && !hasValidToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (hasValidToken && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password/:path*",
        "/profile/:path*",
        "/chat/:path*",
        "/meeting/:path*",
    ],
};
