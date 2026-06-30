"use client";

import { useEffect } from "react";
import api from "@/api/axios";
import { forceLogout, getToken, isAuthenticated, isTokenExpired, } from "@/lib/auth";

const EXPIRY_CHECK_MS = 30 * 1000;
const SESSION_VALIDATE_MS = 5 * 60 * 1000;

async function validateSessionWithApi() {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
        forceLogout();
        return;
    }

    try { await api.get("web/auth/profile"); } catch (error: unknown) {
        const status = (error as { response?: { status?: number } }).response?.status;
        const hasResponse = !!(error as { response?: unknown }).response;

        if (!hasResponse || status === 401 || status === 403) {
            forceLogout();
        }
    }
}

export default function AuthSessionProvider({children,} : {children: React.ReactNode;}) {
    useEffect(() => {
        const checkTokenExpiry = () => {
            const token = getToken();
            if (token && isTokenExpired(token)) {
                forceLogout();
            }
        };

        checkTokenExpiry();

        if (isAuthenticated()) {
            validateSessionWithApi();
        }

        const expiryTimer = setInterval(checkTokenExpiry, EXPIRY_CHECK_MS);
        const validateTimer = setInterval(() => {
            if (isAuthenticated()) {
                validateSessionWithApi();
            }
        }, SESSION_VALIDATE_MS);

        const onVisibilityChange = () => {
            if (document.visibilityState !== "visible") return;
            checkTokenExpiry();
            if (isAuthenticated()) {
                validateSessionWithApi();
            }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            clearInterval(expiryTimer);
            clearInterval(validateTimer);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);

    return <>{children}</>;
}
