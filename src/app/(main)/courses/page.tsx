'use client'

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { coursesPage } from '@/store/slices/coursesSlice';
import Link from 'next/link';

const Courses = () => {
    const dispatch = useAppDispatch();
    const { coursesData } = useAppSelector((state) => state.courses);

    useEffect(() => {
        dispatch(coursesPage());
    }, [dispatch]);

    console.log("coursesData", coursesData)

    return (
        <>
            <section className='bg-[#9DCCFF] pt-40 pb-20'>
                <div className="max-w-container mx-auto">
                    <h1 className="text-[#2F327D] text-[54px] leading-15 font-bold mb-0 text-center">Courses</h1>
                </div>
            </section>

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='grid grid-cols-3 gap-6'>
                        {coursesData?.courses?.map((item: any, index: number) => (
                            <div key={index} className='shadow-2xl rounded-xl p-5'>
                                <div className='h-75 overflow-hidden rounded-lg border border-gray-300 mb-3'>
                                    {/* <img src={item?.image} alt='' className='w-full h-full object-cover' /> */}
                                    <img src={'images/totc1.png'} alt='' className='w-full h-full object-cover' />
                                </div>
                                <h3 className='text-black text-xl font-bold mb-2'>{item?.courseName}</h3>
                                <p className='mb-3'>{item?.title}</p>
                                <Link href={`/courses/${item.slug}?id=${item._id}`} className='text-primary underline'>Read More</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};

export default Courses;
