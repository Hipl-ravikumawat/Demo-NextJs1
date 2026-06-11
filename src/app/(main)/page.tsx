'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { homePage } from '@/store/slices/homeSlice';

const Home = () => {
    const dispatch = useAppDispatch();
    const { loading, homeData } = useAppSelector((state) => state.home);

    useEffect(() => {
        dispatch(homePage());
    }, [dispatch]);

    const formatCount = (count: number) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K+`;
        }
        return `${count}+`;
    };

    console.log("homeData", homeData)

    return (
        <>
            <section className="bg-primary pt-20">
                <div className="max-w-container mx-auto">
                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                            <h1 className="text-white text-[54px] font-bold mb-8">{homeData?.hero?.title}</h1>
                            <p className="mb-8">{homeData?.hero?.description}</p>
                            <Link href={'#'} className="bg-white/30 px-4 py-3 rounded-full text-white">{homeData?.hero?.buttonText}</Link>
                        </div>
                        <div className="flex-1">
                            <img src={'/images/hero1.png'} alt="" />
                            {/* <img src={homeData?.hero?.image} alt="" /> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <h2 className='text-black text-5xl font-bold mb-4 text-center'>Our Success</h2>
                    <p className='text-center mb-10'>Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.</p>
                    <div className='flex gap-4 justify-between'>
                        <div className='text-center'>
                            <span className='text-primary text-4xl font-bold'>{formatCount(homeData?.statistics?.Students || 0)}</span>
                            <p className='text-xl text-black'>Students</p>
                        </div>
                        <div className='text-center'>
                            <span className='text-primary text-4xl font-bold'>{homeData?.statistics?.Total_success}%</span>
                            <p className='text-xl text-black'>Total success</p>
                        </div>
                        <div className='text-center'>
                            <span className='text-primary text-4xl font-bold'>{homeData?.statistics?.Main_question}</span>
                            <p className='text-xl text-black'>Main questions</p>
                        </div>
                        <div className='text-center'>
                            <span className='text-primary text-4xl font-bold'>{homeData?.statistics?.Chief_experts}</span>
                            <p className='text-xl text-black'>Chief experts</p>
                        </div>
                        <div className='text-center'>
                            <span className='text-primary text-4xl font-bold'>{homeData?.statistics?.Year_of_exp}</span>
                            <p className='text-xl text-black'>Years of experience</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-container mx-auto">
                    <h2 className='text-black text-5xl font-bold mb-4 text-center'>All-In-One Cloud Software.</h2>
                    <p className='text-center mb-10'>TOTC is one powerful online software suite that combines all the tools needed to run a successful school or office.</p>
                    <div className='grid grid-cols-3 gap-5'>
                        {homeData?.CloudSoftware.map((item: any, id: any) =>(
                            <div key={id} className='shadow-2xl bg-white p-5 text-center rounded-lg'>
                                <span className='w-12 h-12 flex items-center justify-center border border-gray-500 rounded-full mx-auto mb-3'>
                                    <img src={item?.icon} alt='' />
                                </span>
                                <h3 className='text-primary text-2xl font-bold mb-2'>{item?.title}</h3>
                                <p className='text-base text-black'>{item?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <h2 className='text-black text-5xl font-bold mb-4 text-center'>{homeData?.WhatIsTOTC?.title}</h2>
                    <p className='text-center mb-10'>{homeData?.WhatIsTOTC?.description}</p>
                    <div className='grid grid-cols-2 gap-10'>
                        <div className='rounded-lg bg-no-repeat bg-cover shadow-2xl p-5 text-center min-h-[200px] flex flex-col items-center justify-center' style={{backgroundImage: `url(${homeData?.WhatIsTOTC?.ForInstructors?.image})`,}}>
                            <h3 className='text-primary text-2xl font-bold mb-2'>{homeData?.WhatIsTOTC?.ForInstructors?.title}</h3>
                            <button type='button' className='bg-primary px-4 py-3 rounded-full text-white'>{homeData?.WhatIsTOTC?.ForInstructors?.buttonText}</button>
                        </div>
                        <div className='rounded-lg bg-no-repeat bg-cover shadow-2xl p-5 text-center min-h-[200px] flex flex-col items-center justify-center' style={{backgroundImage: `url(${homeData?.WhatIsTOTC?.ForStudents?.image})`,}}>
                            <h3 className='text-primary text-2xl font-bold mb-2'>{homeData?.WhatIsTOTC?.ForStudents?.title}</h3>
                            <button type='button' className='bg-primary px-4 py-3 rounded-full text-white'>{homeData?.WhatIsTOTC?.ForStudents?.buttonText}</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Home;
