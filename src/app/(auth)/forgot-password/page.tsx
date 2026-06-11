"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "@/validations/forgotPasswordSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgotPassword } from "@/store/slices/authSlice";

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
        <>
            <div className='max-w-[520px] mx-auto p-6 w-full'>
                <div className=''>
                    <h1 className='text-foreground mb-4 font-bold text-3xl'>Forgot Password</h1>
                    <form className='mb-4' onSubmit={formik.handleSubmit}>
                        <div className='mb-5'>
                            <label className='block mb-1'>Email Address</label>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Enter your Email Address"
                                className="outline-0 w-full border border-foreground p-3 rounded-full"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>
                        <button 
                            type='submit' 
                            disabled={loading}
                            className='bg-primary px-6 py-3 text-white rounded-full cursor-pointer w-full'
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                    <Link href={'/login'} className='underline text-primary'>Back to login</Link>
                </div>
            </div>
        </>
    )
};

export default ForgotPassword;
