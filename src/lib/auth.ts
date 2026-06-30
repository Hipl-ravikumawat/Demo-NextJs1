import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function getToken(): string | undefined {
    if (typeof window === "undefined") return undefined;
    return Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || undefined;
}

export function setAuthToken(token: string, rememberMe = false) {
    Cookies.set(TOKEN_KEY, token, {
        expires: rememberMe ? 7 : 1,
        path: "/",
    });
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthSession() {
    Cookies.remove(TOKEN_KEY, { path: "/" });
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("sessionExpired"));
    }
}

export function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp < Math.floor(Date.now() / 1000);
    } catch {
        return true;
    }
}

export function isAuthenticated(): boolean {
    const token = getToken();
    return !!token && !isTokenExpired(token);
}

export function forceLogout(redirectToLogin = true) {
    clearAuthSession();

    if (!redirectToLogin || typeof window === "undefined") return;

    const pathname = window.location.pathname;
    const isAuthRoute =
        ["/login", "/register", "/forgot-password"].includes(pathname) ||
        pathname.startsWith("/reset-password");

    if (!isAuthRoute) {
        window.location.replace("/login");
    }
}
