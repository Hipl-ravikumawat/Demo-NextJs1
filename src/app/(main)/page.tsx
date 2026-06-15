'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { homePage } from '@/store/slices/homeSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';

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

    //console.log("homeData", homeData)

    return (
        <>
            {/* Hero Section */}
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

            {/* Our Success */}
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

            {/* Cloud Software */}
            <section>
                <div className="max-w-container mx-auto">
                    <h2 className='text-black text-5xl font-bold mb-4 text-center'>All-In-One Cloud Software.</h2>
                    <p className='text-center mb-10'>TOTC is one powerful online software suite that combines all the tools needed to run a successful school or office.</p>
                    <div className='grid grid-cols-3 gap-5'>
                        {homeData?.CloudSoftware.map((item: any, id: any) => (
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

            {/* What Is TOTC */}
            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <h2 className='text-black text-5xl font-bold mb-4 text-center'>{homeData?.WhatIsTOTC?.title}</h2>
                    <p className='text-center mb-10'>{homeData?.WhatIsTOTC?.description}</p>
                    <div className='grid grid-cols-2 gap-10'>
                        <div className='rounded-lg bg-no-repeat bg-cover shadow-2xl p-5 text-center min-h-[200px] flex flex-col items-center justify-center' style={{backgroundImage: `url(${homeData?.WhatIsTOTC?.ForInstructors?.image})`,}}>
                            <h3 className='text-primary text-2xl font-bold mb-2'>{homeData?.WhatIsTOTC?.ForInstructors?.title}</h3>
                            <button type='button' className='bg-primary px-4 py-3 rounded-full text-white cursor-pointer'>{homeData?.WhatIsTOTC?.ForInstructors?.buttonText}</button>
                        </div>
                        <div className='rounded-lg bg-no-repeat bg-cover shadow-2xl p-5 text-center min-h-[200px] flex flex-col items-center justify-center' style={{backgroundImage: `url(${homeData?.WhatIsTOTC?.ForStudents?.image})`,}}>
                            <h3 className='text-primary text-2xl font-bold mb-2'>{homeData?.WhatIsTOTC?.ForStudents?.title}</h3>
                            <button type='button' className='bg-primary px-4 py-3 rounded-full text-white cursor-pointer'>{homeData?.WhatIsTOTC?.ForStudents?.buttonText}</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Everything You Can Do With TOTC */}
            <section>
                <div className="max-w-container mx-auto">
                    <div className='grid grid-cols-2 gap-10'>
                        <div>
                            <h3 className='text-black text-2xl font-bold mb-2'>{homeData?.EverythingYouCanDoWithTOTC?.title} <span className='text-primary'>{homeData?.EverythingYouCanDoWithTOTC?.highlightedText}</span></h3>
                            <p className='text-base text-black mb-3'>{homeData?.EverythingYouCanDoWithTOTC?.description}</p>
                            <button type='button' className='bg-primary px-4 py-3 rounded-full text-white w-auto cursor-pointer'>{homeData?.EverythingYouCanDoWithTOTC?.buttonText}</button>
                        </div>
                        <div>
                            <img src={homeData?.EverythingYouCanDoWithTOTC?.image} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Features */}
            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='text-center'>
                        <h2 className='text-black text-5xl font-bold mb-4 text-center'>{homeData?.OurFeatures?.title}</h2>
                        <p className='text-center mb-10'>{homeData?.OurFeatures?.description}</p>
                    </div>
                    <div className='space-y-20'>
                        {homeData?.OurFeatures?.features.map((item: any, id: any) => (
                            <div key={id} className='grid grid-cols-2 gap-10 items-center'>
                                <div className={`${id % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                                    <img src={item?.image} />
                                </div>
                                <div className={`${id % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                                    <h3 className='text-black text-2xl font-bold mb-2'>{item?.title}</h3>
                                    <p className='text-base text-black mb-3'>{item?.description}</p>
                                </div>
                            </div>
                        ))}
                        <div className='text-center'>
                            <Link href={'#'} className='bg-primary px-4 py-3 rounded-full text-white w-auto cursor-pointer'>See more features</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section>
                <div className="max-w-container mx-auto">
                    <div className='text-center mb-10'>
                        <h2 className='text-black text-5xl font-bold mb-4 text-center'>Testimonial</h2>
                        <p>TOTC has got more than 100k positive ratings from our users around the world. </p>
                    </div>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {homeData?.Testimonials?.map((item:any, index:any) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-sm text-gray-500">{item.designation}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className={ index < item?.rating ? 'text-yellow-400' : 'text-gray-300' }
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600">
                                        {item.review}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Latest News */}
            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='text-center mb-10'>
                        <h2 className='text-black text-5xl font-bold mb-4 text-center'>{homeData?.LatestNewsAndResources?.title}</h2>
                        <p>{homeData?.LatestNewsAndResources?.description}</p>
                    </div>
                    <div className='grid grid-cols-2 gap-10'>
                        <div className=''>
                            <img src={homeData?.LatestNewsAndResources?.featuredNews?.image} className='w-full h-85 rounded-xl object-cover overflow-hidden' />
                            <div className='pt-5'>
                                <span className='bg-primary px-4 py-3 rounded-full text-white w-auto text-xs inline-block'>{homeData?.LatestNewsAndResources?.featuredNews?.tag}</span>
                                <h3 className='text-black text-xl font-bold mt-4 mb-3'><Link href={homeData?.LatestNewsAndResources?.featuredNews?.readMoreLink || '#'}>{homeData?.LatestNewsAndResources?.featuredNews?.title}</Link></h3>
                                <p className='text-base text-black'>{homeData?.LatestNewsAndResources?.featuredNews?.description}</p>
                            </div>
                        </div>
                        <div className='space-y-6'>
                            {homeData?.LatestNewsAndResources?.news.map((item:any, index:any) => (
                                <div key={index} className='flex flex-wrap gap-5'>
                                    <div className='relative flex-[0_0_calc(35%-20px)] max-w-[calc(35%-20px)]'>
                                        <img src={item?.image} className='w-full h-37.5 rounded-xl object-cover overflow-hidden' />
                                        <span className='bg-primary px-3 py-2 rounded-full text-white w-auto text-xs inline-block absolute right-2 bottom-2'>{item?.tag}</span>
                                    </div>
                                    <div className='flex-[0_0_65%] max-w-[65%]'>
                                        <h3 className='text-black text-lg font-bold mt-4 mb-3'><Link href={'#'}>{item?.title}</Link></h3>
                                        <p className='text-base text-black'>{item?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Home;
