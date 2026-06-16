"use client";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { newsletterSchema } from "@/validations/newsletterSchema";
import { subscribeNewsletter } from "@/store/slices/newsletterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";

const Footer = () => {
    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((state) => state.newsletter);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: newsletterSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const result = await dispatch(subscribeNewsletter(values)).unwrap();
                toast.success(result.message || "Subscribed successfully");
                resetForm();
            } catch (error: any) {
                toast.error(error);
            }
        },
    });
    return (
        <>
            <footer className='bg-[#252641] pt-16 pb-10'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-center'>
                        <div className=' mr-10 pr-10 border-r border-r-[#626381]'>
                            <Link href={'/'}>
                                <img src={'/images/logo.svg'} alt='' />
                            </Link>
                        </div>
                        <div className='text-2xl text-white font-bold'>
                            Virtual Class <br /> for Zoom
                        </div>
                    </div>
                    <div className='text-center my-20'>
                        <p className='text-[#B2B3CF] text-2xl font-semibold mb-3'>Subscribe to get our Newsletter</p>
                        <form onSubmit={formik.handleSubmit} className='flex items-center justify-center gap-4'>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="outline-0 w-[400px] border border-[#83839A] p-3 rounded-full text-[#83839A]"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-400 text-sm mt-2 text-left">
                                        {formik.errors.email}
                                    </p>
                                )}
                            </div>
                            <button 
                                type='submit' 
                                disabled={loading}
                                className='bg-primary px-6 py-3 text-white rounded-full cursor-pointer'
                            >
                                {loading ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                    </div>
                    <div className=''>
                        <ul className='flex items-center justify-center gap-10 mb-2'>
                            <li>
                                <Link href={'#'} title='Careers' className='text-base text-[#B2B3CF]'>Careers</Link>
                            </li>
                            <li>
                                <Link href={'#'} title='Privacy Policy' className='text-base text-[#B2B3CF]'>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href={'#'} title='Terms & Conditions' className='text-base text-[#B2B3CF]'>Terms & Conditions</Link>
                            </li>
                        </ul>
                        <p className='text-base text-[#B2B3CF] text-center'>© 2026 Class Technologies Inc. </p>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;
