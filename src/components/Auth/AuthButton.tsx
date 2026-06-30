interface AuthButtonProps {
    children: React.ReactNode;
    loading?: boolean;
    loadingText?: string;
    type?: "button" | "submit";
    onClick?: () => void;
    fullWidth?: boolean;
}

export function AuthButton({
    children,
    loading = false,
    loadingText,
    type = "submit",
    onClick,
    fullWidth = false,
}: AuthButtonProps) {
    return (
        <div className={`mt-2 flex ${fullWidth ? "" : "justify-end"}`}>
            <button
                type={type}
                onClick={onClick}
                disabled={loading}
                className={`rounded-full bg-primary px-10 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base ${
                    fullWidth ? "w-full" : "min-w-[160px]"
                }`}
            >
                {loading ? loadingText || "Please wait..." : children}
            </button>
        </div>
    );
}
