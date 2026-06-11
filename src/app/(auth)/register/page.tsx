"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { registerSchema } from "@/validations/registerSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
        <>
            <div className='max-w-[520px] mx-auto p-6 w-full'>
                <div className='flex items-center gap-3 mb-4'>
                    <Link href={'/login'} className='bg-gray-400 px-6 py-3 text-black rounded-full cursor-pointer'>Login</Link>
                    <Link href={'/register'} className='bg-black px-6 py-3 text-white rounded-full cursor-pointer'>Register</Link>
                </div>
                <div className=''>
                    <h1 className='text-foreground mb-4 font-bold text-3xl'>Register</h1>
                    <form onSubmit={formik.handleSubmit}>
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
                        <div className='mb-5'>
                            <label className='block mb-1'>User name</label>
                            <input 
                                type="text"
                                name="username"
                                placeholder="Enter your User name"
                                className="outline-0 w-full border border-foreground p-3 rounded-full"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.username}
                                </p>
                            )}
                        </div>
                        <div className='mb-5'>
                            <label className='block mb-1'>Password</label>
                            <input 
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                className="outline-0 w-full border border-foreground p-3 rounded-full"
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
                        <button 
                            type='submit' 
                            disabled={loading}
                            className='bg-primary px-6 py-3 text-white rounded-full cursor-pointer w-full'
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Register;
