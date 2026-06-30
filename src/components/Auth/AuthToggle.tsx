"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AuthToggle() {
    const pathname = usePathname();
    const isLogin = pathname === "/login";
    const isRegister = pathname === "/register";

    return (
        <div className="mb-5 flex rounded-full bg-primary/25 p-1">
            <Link
                href="/login"
                className={`flex-1 rounded-full px-6 py-3 text-center text-sm font-medium transition-colors sm:text-base ${
                    isLogin
                        ? "bg-primary text-white shadow-sm"
                        : "text-primary hover:text-primary/80"
                }`}
            >
                Login
            </Link>
            <Link
                href="/register"
                className={`flex-1 rounded-full px-6 py-3 text-center text-sm font-medium transition-colors sm:text-base ${
                    isRegister
                        ? "bg-primary text-white shadow-sm"
                        : "text-primary hover:text-primary/80"
                }`}
            >
                Register
            </Link>
        </div>
    );
}
