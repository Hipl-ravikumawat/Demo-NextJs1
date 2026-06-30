import axios from "axios";
import { forceLogout, getToken } from "@/lib/auth";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = getToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const requestUrl = error.config?.url ?? "";
        const isAuthRequest = requestUrl.includes("web/auth/login") ||
            requestUrl.includes("web/auth/register") ||
            requestUrl.includes("web/auth/forgot-password") ||
            requestUrl.includes("web/auth/reset-password");

        if (
            typeof window !== "undefined" &&
            error.response?.status === 401 &&
            !isAuthRequest
        ) {
            forceLogout();
        }

        return Promise.reject(error);
    }
);

export default api;
