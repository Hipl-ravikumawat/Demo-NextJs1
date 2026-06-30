"use client";

import Link from "next/link";
import { setAuthToken } from "@/lib/auth";
import { useFormik } from "formik";
import { loginSchema } from "@/validations/loginSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/Auth/AuthShell";
import { AuthInput } from "@/components/Auth/AuthInput";
import { AuthButton } from "@/components/Auth/AuthButton";

const Login = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading } = useAppSelector((state) => state.auth);

    const [rememberMe, setRememberMe] = useState(false);
    useEffect(() => {
        const savedRememberMe = localStorage.getItem("rememberMe") === "true";
        setRememberMe(savedRememberMe);
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
            rememberMe,
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(loginUser(values)).unwrap();
                setAuthToken(result.token, values.rememberMe);
                localStorage.setItem("user", JSON.stringify(result.user));

                if (values.rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("rememberMe");
                }

                toast.success(result.message || "Login successful");
                router.push("/");
            } catch (error: any) {
                toast.error(error || "Invalid credentials");
            }
        },
    });

    return (
        <AuthShell showTabs>
            <form onSubmit={formik.handleSubmit}>
                <AuthInput
                    label="User name"
                    name="email"
                    type="email"
                    placeholder="Enter your User name"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : undefined
                    }
                />

                <AuthInput
                    label="Password"
                    name="password"
                    placeholder="Enter your Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    showPasswordToggle
                    error={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : undefined
                    }
                />

                <div className="mb-6 flex items-center justify-between gap-4 text-sm">
                    <label className="flex cursor-pointer items-center gap-2 text-[#626262]">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formik.values.rememberMe}
                            onChange={formik.handleChange}
                            className="h-4 w-4 rounded border-primary/70 accent-primary"
                        />
                        Remember me
                    </label>
                    <Link
                        href="/forgot-password"
                        className="font-medium text-[#626262] transition-colors hover:text-primary"
                    >
                        Forgot Password ?
                    </Link>
                </div>

                <AuthButton loading={loading} loadingText="Logging in...">
                    Login
                </AuthButton>
            </form>
        </AuthShell>
    );
};

export default Login;
