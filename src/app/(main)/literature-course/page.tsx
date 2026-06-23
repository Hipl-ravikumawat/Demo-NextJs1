"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { literatureCoursePage } from '@/store/slices/literatureCourseSlice';
import Link from 'next/link';

const LiteratureCourse = () => {
    const dispatch = useAppDispatch();
    const {literatureCourseData} = useAppSelector((state) => state.literatureCourse);

    useEffect(() => {
        dispatch(literatureCoursePage())
    }, [dispatch]);

    console.log("literatureCourseData", literatureCourseData);

    return (
        <>
            <div 
                className='bg-no-repeat bg-center bg-cover relative z-10 pt-37.5 pb-20 after:content-[""] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-black/50 after:-z-[1]'
                //style={{backgroundImage: `url(${literatureCourseData?.heroSection?.bannerImage})`,}}
                style={{backgroundImage: `url(/images/totc1.png)`}}
            >
                <div className="max-w-container mx-auto">
                    <div className='flex gap-6'>
                        <div className='w-[120px] h-[120px] border-2 border-white rounded-full bg-white overflow-hidden shrink-0'>
                            <img
                                // src={literatureCourseData?.heroSection?.instructor?.image}
                                src={'images/user.png'}
                                alt=''
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='bg-white/60 p-6 rounded-2xl w-full'>
                            <div className='flex justify-between mb-3'>
                                <div className=''>
                                    <h2 className='text-black text-xl mb-2'>{literatureCourseData?.heroSection?.instructor?.name}</h2>
                                    <p className='m-0 text-gray-500 text-sm'>{literatureCourseData?.heroSection?.instructor?.designation}</p>
                                </div>
                                <div>
                                    <Link href={literatureCourseData?.heroSection?.instructor?.buttonLink || '#'} className='bg-primary px-4 py-3 rounded-lg text-white inline-block'>{literatureCourseData?.heroSection?.instructor?.enrollButtonText}</Link>
                                </div>
                            </div>
                            <p className='mb-5'>{literatureCourseData?.heroSection?.instructor?.description}</p>
                            <div className='flex items-center justify-between gap-4'>
                                <div className='flex items-center gap-8'>
                                    <div className='text-gray-500 text-sm'>
                                        {literatureCourseData?.heroSection?.instructor?.rating} instructor Rating
                                    </div>
                                    <div className='text-gray-500 text-sm'>
                                        {literatureCourseData?.heroSection?.instructor?.stats?.students} Students
                                    </div>
                                    <div className='text-gray-500 text-sm'>
                                        {literatureCourseData?.heroSection?.instructor?.stats?.courses} Courses
                                    </div>
                                </div>
                                <div>
                                    <ul className='flex items-center gap-2'>
                                        <li>
                                            <Link href={literatureCourseData?.heroSection?.instructor?.socialLinks?.twitter || '#'} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM22.1 11.5C22.8 11.4 23.4 11.3 24 11C23.6 11.7 23 12.3 22.3 12.7C22.5 17.4 19.1 22.5 13 22.5C11.2 22.5 9.5 21.9 8 21C9.7 21.2 11.5 20.7 12.7 19.8C11.2 19.8 10 18.8 9.6 17.5C10.1 17.6 10.6 17.5 11.1 17.4C9.6 17 8.5 15.6 8.5 14.1C9 14.3 9.5 14.5 10 14.5C8.6 13.5 8.1 11.6 9 10.1C10.7 12.1 13.1 13.4 15.8 13.5C15.3 11.5 16.9 9.5 19 9.5C19.9 9.5 20.8 9.9 21.4 10.5C22.2 10.3 22.9 10.1 23.5 9.7C23.3 10.5 22.8 11.1 22.1 11.5Z" fill="#49BBBD"/>
                                                </svg>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={literatureCourseData?.heroSection?.instructor?.socialLinks?.youtube || '#'} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="#49BBBD"/>
                                                    <path d="M23.6 12.1C23.4 11.4 22.9 10.9 22.2 10.7C21 10.4 15.9 10.4 15.9 10.4C15.9 10.4 10.9 10.4 9.60001 10.7C8.90001 10.9 8.4 11.4 8.2 12.1C8 13.4 8 16 8 16C8 16 8 18.6 8.3 19.9C8.5 20.6 9 21.1 9.7 21.3C10.9 21.6 16 21.6 16 21.6C16 21.6 21 21.6 22.3 21.3C23 21.1 23.5 20.6 23.7 19.9C24 18.6 24 16 24 16C24 16 24 13.4 23.6 12.1ZM14.4 18.4V13.6L18.6 16L14.4 18.4Z" fill="white"/>
                                                </svg>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={literatureCourseData?.heroSection?.instructor?.socialLinks?.instagram || '#'} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="#49BBBD"/>
                                                    <path d="M15.9992 9.19995C18.1992 9.19995 18.4992 9.19995 19.3992 9.19995C20.1992 9.19995 20.5992 9.39995 20.8992 9.49995C21.2992 9.69995 21.5992 9.79995 21.8992 10.1C22.1992 10.4 22.3992 10.7 22.4992 11.1C22.5992 11.4 22.6992 11.8 22.7992 12.6C22.7992 13.5 22.7992 13.7 22.7992 16C22.7992 18.3 22.7992 18.5 22.7992 19.4C22.7992 20.2 22.5992 20.6 22.4992 20.9C22.2992 21.3 22.1992 21.6 21.8992 21.9C21.5992 22.2 21.2992 22.4 20.8992 22.5C20.5992 22.6 20.1992 22.7 19.3992 22.8C18.4992 22.8 18.2992 22.8 15.9992 22.8C13.6992 22.8 13.4992 22.8 12.5992 22.8C11.7992 22.8 11.3992 22.6 11.0992 22.5C10.6992 22.3 10.3992 22.2 10.0992 21.9C9.79922 21.6 9.59922 21.3 9.49922 20.9C9.39922 20.6 9.29922 20.2 9.19922 19.4C9.19922 18.5 9.19922 18.3 9.19922 16C9.19922 13.7 9.19922 13.5 9.19922 12.6C9.19922 11.8 9.39922 11.4 9.49922 11.1C9.69922 10.7 9.79922 10.4 10.0992 10.1C10.3992 9.79995 10.6992 9.59995 11.0992 9.49995C11.3992 9.39995 11.7992 9.29995 12.5992 9.19995C13.4992 9.19995 13.7992 9.19995 15.9992 9.19995ZM15.9992 7.69995C13.6992 7.69995 13.4992 7.69995 12.5992 7.69995C11.6992 7.69995 11.0992 7.89995 10.5992 8.09995C10.0992 8.29995 9.59922 8.59995 9.09922 9.09995C8.59922 9.59995 8.39922 9.99995 8.09922 10.6C7.89922 11.1 7.79922 11.7 7.69922 12.6C7.69922 13.5 7.69922 13.8 7.69922 16C7.69922 18.3 7.69922 18.5 7.69922 19.4C7.69922 20.3 7.89922 20.9 8.09922 21.4C8.29922 21.9 8.59922 22.4 9.09922 22.9C9.59922 23.4 9.99922 23.6 10.5992 23.9C11.0992 24.1 11.6992 24.1999 12.5992 24.2999C13.4992 24.2999 13.7992 24.2999 15.9992 24.2999C18.1992 24.2999 18.4992 24.2999 19.3992 24.2999C20.2992 24.2999 20.8992 24.1 21.3992 23.9C21.8992 23.7 22.3992 23.4 22.8992 22.9C23.3992 22.4 23.5992 22 23.8992 21.4C24.0992 20.9 24.1992 20.3 24.2992 19.4C24.2992 18.5 24.2992 18.2 24.2992 16C24.2992 13.8 24.2992 13.5 24.2992 12.6C24.2992 11.7 24.0992 11.1 23.8992 10.6C23.6992 10.1 23.3992 9.59995 22.8992 9.09995C22.3992 8.59995 21.9992 8.39995 21.3992 8.09995C20.8992 7.89995 20.2992 7.79995 19.3992 7.69995C18.4992 7.69995 18.2992 7.69995 15.9992 7.69995Z" fill="white"/>
                                                    <path d="M15.9992 11.7C13.5992 11.7 11.6992 13.6 11.6992 16C11.6992 18.4 13.5992 20.3 15.9992 20.3C18.3992 20.3 20.2992 18.4 20.2992 16C20.2992 13.6 18.3992 11.7 15.9992 11.7ZM15.9992 18.8C14.4992 18.8 13.1992 17.6 13.1992 16C13.1992 14.5 14.3992 13.2 15.9992 13.2C17.4992 13.2 18.7992 14.4 18.7992 16C18.7992 17.5 17.4992 18.8 15.9992 18.8Z" fill="white"/>
                                                    <path d="M20.3992 12.6C20.9515 12.6 21.3992 12.1522 21.3992 11.6C21.3992 11.0477 20.9515 10.6 20.3992 10.6C19.8469 10.6 19.3992 11.0477 19.3992 11.6C19.3992 12.1522 19.8469 12.6 20.3992 12.6Z" fill="white"/>
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-16'>
                <div className='max-w-container mx-auto'>
                    <h3 className='mb-6 text-black text-xl font-bold'>
                        {literatureCourseData?.bookSection?.title}
                    </h3>
                    <div className='grid grid-cols-3 gap-6'>
                        {literatureCourseData?.bookSection?.books.map((item: any, index: number) =>(
                            <div key={index} className='bg-white shadow p-5 rounded-xl'>
                                <img 
                                    // src={item?.image}
                                    src={'images/totc1.png'}
                                    alt=''
                                    className='w-full h-[250px] object-cover rounded-sm'
                                />
                                <div className='mt-3 flex items-center justify-between'>
                                    <h6 className='text-black text-sm m-0 font-semibold'>
                                        {item?.title}
                                    </h6>
                                    <span className='text-primary font-bold'>${item?.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default LiteratureCourse;
