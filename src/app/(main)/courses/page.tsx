'use client'

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { coursesPage } from '@/store/slices/coursesSlice';
import Link from 'next/link';
import RecommendedSection from '@/components/Recommended/page';
import CourseCard from '@/components/courseCard';

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
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>{coursesData?.welcomeBanner?.title}</h2>
                        <Link href={'#'} className='font-bold text-primary'>View hisotry</Link>
                    </div>
                    <div className='grid grid-cols-3 gap-6'>
                        {coursesData?.welcomeBanner?.cards.map((item: any, index: number) => {
                            const progress = item?.total_lessons > 0 ? (item?.read_lession / item.total_lessons) * 100 : 0 ;
                            return (
                                <div key={index} className='bg-white shadow-2xl rounded-2xl p-6'>
                                    {/* <img src={item?.image} alt='' className='h-37.5 rounded-xl border border-gray-400 w-full mb-3 object-cover overflow-hidden' /> */}
                                    <img src={'images/totc1.png'} alt='' className='h-37.5 rounded-xl border border-gray-400 w-full mb-3 object-cover overflow-hidden' />
                                    <h2 className='text-black text-lg font-bold mb-2'><Link href={`#`}>{item?.title}</Link></h2>
                                    <div className='flex gap-2 items-center mb-2'>
                                        {/* <img src={item?.authorImage} alt='' className='w-10 h-10 border border-gray-300 object-cover rounded-full' /> */}
                                        <img src={'images/user.png'} alt='' className='w-10 h-10 border border-gray-300 object-cover rounded-full' />
                                        <span className='text-black text-xs font-semibold'>{item?.authorName}</span>
                                    </div>
                                    <div className='w-full h-1.5 bg-[#D9D9D9] rounded-2xl relative overflow-hidden'>
                                        <span className='bg-[#49BBBD] absolute inset-0 h-full z-10' style={{ width: `${progress}%` }}></span>
                                    </div>
                                    <div className='mt-4 text-right text-black/50 text-xs font-bold'>Lesson {item?.read_lession} of {item?.total_lessons}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <h2 className='text-black text-xl font-bold mb-6'>{coursesData?.choiceFavouriteCourse?.title}</h2>
                    <div className='grid grid-cols-4 gap-5'>
                        {coursesData?.choiceFavouriteCourse?.cards.map((item: any, index: any) => (
                            <div key={index} className='shadow-2xl rounded-2xl p-4 text-center'>
                                <div className='w-20 h-20 flex items-center justify-center bg-[#49BBBD]/30 mb-3 mx-auto'>
                                    <img src={item?.image} alt='' />
                                </div>
                                <h3 className='text-black mb-3 text-xl font-bold'>{item?.category}</h3>
                                <p className='m-0 text-[#696984]'>{item?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <RecommendedSection recommendedBlogs={coursesData?.recommendedForYou} />

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>{coursesData?.getChoiceOfYourCourse?.title}</h2>
                        <Link href={'#'} className='font-bold text-primary'>See all</Link>
                    </div>
                    <div className='grid grid-cols-4 gap-5'>
                        {coursesData?.getChoiceOfYourCourse?.cards.map((item: any, index: any) => (
                            <CourseCard key={index} courseCard={item} />
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-container mx-auto">
                    <div className='bg-[#252641] rounded-2xl p-16 text-center'>
                        <h3 className='text-white font-bold text-3xl mb-6'>{coursesData?.onlineCoachingLessons?.title}</h3>
                        <p className='text-white mb-10'>{coursesData?.onlineCoachingLessons?.description}</p>
                        {coursesData?.onlineCoachingLessons?.buttonText && (
                            <Link href={coursesData?.onlineCoachingLessons?.buttonLink} className="bg-primary px-4 py-3 rounded-lg text-white">{coursesData?.onlineCoachingLessons?.buttonText}</Link>
                        )}
                    </div>
                </div>
            </section>

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>{coursesData?.personalDevelopmentCourse?.title}</h2>
                        <Link href={'#'} className='font-bold text-primary'>See all</Link>
                    </div>
                    <div className='grid grid-cols-4 gap-5'>
                        {coursesData?.personalDevelopmentCourse?.cards.map((item: any, index: any) => (
                            <CourseCard key={index} courseCard={item} />
                        ))}
                    </div>
                </div>
            </section>
            
            <section className='py-20 bg-[#9DCCFF]'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>{coursesData?.studentsAreViewing?.title}</h2>
                        <Link href={'#'} className='font-bold text-primary'>See all</Link>
                    </div>
                    <div className='grid grid-cols-4 gap-5'>
                        {coursesData?.studentsAreViewing?.cards.map((item: any, index: any) => (
                            <CourseCard key={index} courseCard={item} />
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
};

export default Courses;
