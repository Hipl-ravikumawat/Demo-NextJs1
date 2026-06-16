'use client'

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { profilePage, updateProfile } from '@/store/slices/profileSlice';
import { useFormik } from "formik";
import { profileSchema } from '@/validations/profileSchema';
import { toast } from 'react-toastify';

const Profile = () => {
    const dispatch = useAppDispatch();
    const { loading, profileData } = useAppSelector((state) => state.profile);

    useEffect(() => {
        dispatch(profilePage());
    }, [dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: profileData?.user?.username || "",
            email: profileData?.user?.email || "",
        },
        validationSchema: profileSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(updateProfile(values)).unwrap();
                toast.success(result.message || "Profile updated successfully");
                dispatch(profilePage());
                if (result.user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(result.user)
                    );
                    window.dispatchEvent(
                        new Event("userUpdated")
                    );
                }
            } catch (error: any) {
                toast.error(error);
            }
        },
    });
    
    
    return (
        <>
            <section className='bg-[#9DCCFF] pt-40 pb-20'>
                <div className="max-w-container mx-auto">
                    <h1 className="text-[#2F327D] text-[54px] leading-15 font-bold mb-0 text-center">Profile</h1>
                </div>
            </section>

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='grid grid-cols-2 gap-10'>
                        <div className='shadow-2xl rounded-xl p-6'>
                            <div className='w-20 h-20 rounded-full overflow-hidden border border-gray-300'>
                                <img src={'images/user.png'} alt='' className='w-full h-full object-cover' />
                            </div>
                            <h4 className='text-lg text-black font-bold'>{profileData?.user?.username}</h4>
                            <p className='text-sm text-gray-400'>{profileData?.user?.role}</p>
                        </div>
                        <div className='shadow-2xl rounded-xl p-6'>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='mb-5'>
                                    <label className='block mb-1'>Name</label>
                                    <input 
                                        type="text"
                                        name="username"
                                        className="outline-0 w-full border border-foreground p-3 rounded-full"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.username && formik.errors.username && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formik.errors.username as string}
                                        </p>
                                    )}
                                </div>
                                <div className='mb-5'>
                                    <label className='block mb-1'>Email Address</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        className="outline-0 w-full border border-foreground p-3 rounded-full"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formik.errors.email as string}
                                        </p>
                                    )}
                                </div>
                                <button 
                                    type='submit' 
                                    disabled={
                                        loading ||
                                        !formik.dirty ||
                                        !formik.isValid
                                    }
                                    className='bg-primary px-6 py-3 text-white rounded-full cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {loading ? "Updating..." : "Update Profile"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
};

export default Profile;
