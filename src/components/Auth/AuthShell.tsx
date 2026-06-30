import Image from "next/image";
import { AuthToggle } from "./AuthToggle";

interface AuthShellProps {
    children: React.ReactNode;
    showTabs?: boolean;
    title?: string;
    description?: string;
}

export function AuthShell({
    children,
    showTabs = false,
    title = "Welcome to lorem..!",
    description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
}: AuthShellProps) {
    return (
        <div className="min-h-screen bg-white text-[#252641]">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <div className="relative h-56 w-full shrink-0 lg:h-auto lg:min-h-screen lg:w-[52%] lg:p-8 xl:p-10">
                    <div className="relative h-full w-full overflow-hidden rounded-none lg:rounded-[32px]">
                        <Image
                            src="/images/auth-hero.png"
                            alt="Students learning in classroom"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 52vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white lg:bottom-10 lg:left-10 lg:max-w-md">
                            <h2 className="text-2xl font-bold leading-tight lg:text-[2rem]">
                                Lorem Ipsum is simply
                            </h2>
                            <p className="mt-2 text-sm text-white/90 lg:text-base">
                                Lorem Ipsum is simply
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
                    <div className="w-full max-w-lg">
                        <h1 className="mb-6 text-2xl font-semibold text-[#313131] sm:text-[1.75rem]">
                            {title}
                        </h1>

                        {showTabs && <AuthToggle />}

                        {description && (
                            <p className="mb-8 text-sm leading-relaxed text-[#626262]">
                                {description}
                            </p>
                        )}

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
