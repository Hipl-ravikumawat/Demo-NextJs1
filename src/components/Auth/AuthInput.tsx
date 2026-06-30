"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface AuthInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    error?: string;
    showPasswordToggle?: boolean;
}

export function AuthInput({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    showPasswordToggle = false,
}: AuthInputProps) {
    const [visible, setVisible] = useState(false);
    const inputType = showPasswordToggle ? (visible ? "text" : "password") : type;

    return (
        <div className="mb-5">
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-[#313131]">
                {label}
            </label>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full rounded-full border bg-white px-5 py-3.5 text-sm text-[#313131] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-primary ${
                        error ? "border-red-400" : "border-primary/70"
                    } ${showPasswordToggle ? "pr-12" : ""}`}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setVisible((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition-colors hover:text-primary"
                        aria-label={visible ? "Hide password" : "Show password"}
                    >
                        {visible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                )}
            </div>
            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        </div>
    );
}
