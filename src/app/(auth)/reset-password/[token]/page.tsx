"use client";

import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetPassword } from "@/store/slices/authSlice";
import { resetPasswordSchema } from "@/validations/resetPasswordSchema";
import { AuthShell } from "@/components/Auth/AuthShell";
import { AuthInput } from "@/components/Auth/AuthInput";
import { AuthButton } from "@/components/Auth/AuthButton";
import { AuthBackLink } from "@/components/Auth/AuthBackLink";

const ResetPassword = () => {
    const params = useParams();
    const token = params.token as string;

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading } = useAppSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(
                    resetPassword({
                        token,
                        password: values.password,
                    })
                ).unwrap();
                toast.success(result.message || "Password reset successfully");
                router.push("/login");
            } catch (error: any) {
                toast.error(error);
            }
        },
    });

    return (
        <AuthShell
            title="Reset your password"
            description="Create a new password for your account. Make sure it is strong and easy for you to remember."
        >
            <form onSubmit={formik.handleSubmit}>
                <AuthInput
                    label="New Password"
                    name="password"
                    placeholder="Enter your new password"
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

                <AuthInput
                    label="Confirm New Password"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    showPasswordToggle
                    error={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : undefined
                    }
                />

                <AuthButton loading={loading} loadingText="Resetting..." fullWidth>
                    Reset Password
                </AuthButton>
            </form>

            <AuthBackLink />
        </AuthShell>
    );
};

export default ResetPassword;
