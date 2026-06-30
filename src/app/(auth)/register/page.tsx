"use client";

import { useFormik } from "formik";
import { registerSchema } from "@/validations/registerSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/Auth/AuthShell";
import { AuthInput } from "@/components/Auth/AuthInput";
import { AuthButton } from "@/components/Auth/AuthButton";

const Register = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading } = useAppSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(registerUser(values)).unwrap();
                toast.success(result.message || "Registration successful");
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } catch (error: any) {
                toast.error(error || "Registration failed");
            }
        },
    });

    return (
        <AuthShell showTabs>
            <form onSubmit={formik.handleSubmit}>
                <AuthInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your Email Address"
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
                    label="User name"
                    name="username"
                    placeholder="Enter your User name"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.username && formik.errors.username
                            ? formik.errors.username
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

                <AuthButton loading={loading} loadingText="Registering...">
                    Register
                </AuthButton>
            </form>
        </AuthShell>
    );
};

export default Register;
