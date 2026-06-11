"use client";

import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetPassword } from "@/store/slices/authSlice";
import { resetPasswordSchema } from "@/validations/resetPasswordSchema";

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
        }
    });
    return (
        <>
            <div className='max-w-[520px] mx-auto p-6 w-full'>
                <div className=''>
                    <h1 className='text-foreground mb-4 font-bold text-3xl'>Reset Password</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-5'>
                            <label className='block mb-1'>New Password</label>
                            <input 
                                type='password' 
                                name="password"
                                placeholder='Enter Your New Password' 
                                className='outline-0 w-full border border-foreground p-3 rounded-full'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>
                        <div className='mb-5'>
                            <label className='block mb-1'>Confirm New Password</label>
                            <input 
                                type='password' 
                                name="confirmPassword"
                                placeholder='Enter Your Confirm New Password' 
                                className='outline-0 w-full border border-foreground p-3 rounded-full' 
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <button 
                            type='submit' 
                            disabled={loading}
                            className='bg-primary px-6 py-3 text-white rounded-full cursor-pointer w-full'
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
