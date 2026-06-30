"use client";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "@/validations/forgotPasswordSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgotPassword } from "@/store/slices/authSlice";
import { AuthShell } from "@/components/Auth/AuthShell";
import { AuthInput } from "@/components/Auth/AuthInput";
import { AuthButton } from "@/components/Auth/AuthButton";
import { AuthBackLink } from "@/components/Auth/AuthBackLink";

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const result = await dispatch(forgotPassword(values)).unwrap();
                toast.success(result.message || "Reset link sent successfully");
                resetForm();
            } catch (error: any) {
                toast.error(error || "Failed to send reset link");
            }
        },
    });

    return (
        <AuthShell
            title="Forgot your password?"
            description="Enter your email address and we will send you a link to reset your password."
        >
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

                <AuthButton loading={loading} loadingText="Sending..." fullWidth>
                    Send Reset Link
                </AuthButton>
            </form>

            <AuthBackLink />
        </AuthShell>
    );
};

export default ForgotPassword;
