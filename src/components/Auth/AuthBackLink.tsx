import Link from "next/link";

export function AuthBackLink({ href = "/login", label = "Back to login" }: { href?: string; label?: string }) {
    return (
        <Link
            href={href}
            className="mt-6 inline-block text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
            {label}
        </Link>
    );
}
