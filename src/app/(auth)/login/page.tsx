"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { loginSchema } from "@/validations/loginSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
                Cookies.set("token", result.token, {
                    expires: values.rememberMe ? 7 : 1,
                    path: "/",
                });
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
        }
    });
    return (
        <>
            <div className='max-w-[520px] mx-auto p-6 w-full'>
                <div className='flex items-center gap-3 mb-4'>
                    <Link href={'/login'} className='bg-black px-6 py-3 text-white rounded-full cursor-pointer'>Login</Link>
                    <Link href={'/register'} className='bg-gray-400 px-6 py-3 text-black rounded-full cursor-pointer'>Register</Link>
                </div>
                <div className=''>
                    <h1 className='text-foreground mb-4 font-bold text-3xl'>Login</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-5'>
                            <label className='block mb-1'>Email</label>
                            <input 
                                type='email'
                                name="email"
                                placeholder='Enter your User name' 
                                className='outline-0 w-full border border-foreground p-3 rounded-full'
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
                        <div className='mb-5'>
                            <label className='block mb-1'>Password</label>
                            <input 
                                type='password'
                                name="password"
                                placeholder='Enter your Password' 
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
                        <div className='flex items-center justify-between mb-5'>
                            <label>
                                <input 
                                    type='checkbox'
                                    name="rememberMe"
                                    checked={formik.values.rememberMe}
                                    onChange={formik.handleChange}
                                />
                                Rememebr me
                            </label>
                            <Link href={"/forgot-password"}>Forgot Password ?</Link>
                        </div>
                        <button 
                            type='submit' 
                            className='bg-primary px-6 py-3 text-white rounded-full cursor-pointer w-full'
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
