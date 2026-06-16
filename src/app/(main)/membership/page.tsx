'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { memberShipPage } from '@/store/slices/memberShipSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const MemberShip = () => {

    // console.log(a);
    // let a = 10;

    const dispatch = useAppDispatch();

    const [activeId, setActiveId] = useState<number | null>(null);
    const toggleAccordion = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    const {memberShipData} = useAppSelector((state) => state.membership);

    useEffect(() => {
        dispatch(memberShipPage())
    }, [dispatch]);

    console.log("memberShipData", memberShipData);

    //console.log("data", memberShipData?.appSection?.androidLink);

    return (
        <>
            <section className='bg-[#9DCCFF] pt-40 pb-20'>
                <div className="max-w-container mx-auto">
                    <h1 className="text-[#2F327D] text-[54px] leading-15 font-bold mb-8 text-center">{memberShipData?.pricingSection?.title}</h1>
                    <div className='grid grid-cols-3 gap-6'>
                        {memberShipData?.pricingSection?.plans.map((plan: any, index: any) => (
                            <div key={index} className='shadow bg-white p-5 rounded-xl'>
                                <div className='flex items-center justify-between'>
                                    <span className='block text-sm font-bold text-primary mb-2'>{plan?.tagLine}</span>
                                    {plan?.badge && (
                                        <span className='block text-xs font-bold text-primary border border-primary rounded-full px-3 py-1.5'>{plan?.badge}</span>
                                    )}
                                </div>
                                <p className='m-0 text-4xl text-black font-bold mb-6'>{plan?.price?.monthly === 0 ? 'Free' : `$${plan?.price?.monthly}`} <span className='text-sm uppercase tracking-wide'>/ {plan?.duration}</span></p>
                                <ul className='p-0 m-0 space-y-3 mb-8'>
                                    {plan?.features.map((feature: any, index: any) => (
                                        <li key={index} className='block text-black text-base relative before:content-[] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-black pl-4'>{feature?.text}</li>
                                    ))}
                                </ul>
                                <Link href={plan?.buttonLink} title={plan?.buttonText} className={`w-full border border-primary rounded-lg font-bold text-base p-2 text-primary block text-center ${plan?.isPopular === true ? 'bg-primary text-white' : ''}`}>{plan?.buttonText}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='bg-[#252641] rounded-2xl p-16 text-center'>
                        <h3 className='text-white font-bold text-3xl mb-6'>{memberShipData?.coachingSection?.title}</h3>
                        <p className='text-white mb-10'>{memberShipData?.coachingSection?.description}</p>
                        <Link href={'#'} className="bg-primary px-4 py-3 rounded-lg text-white">{memberShipData?.coachingSection?.buttonText}</Link>
                    </div>
                </div>
            </section>
            
            <section className='pb-20'>
                <div className="max-w-container mx-auto">
                    <h3 className='text-black font-bold text-3xl mb-6 text-center'>{memberShipData?.coachingSection?.title}</h3>
                    {memberShipData?.coachingSection?.faq.map((item:any) => (
                        <div key={item._id} className="border rounded-lg mb-3 last:mb-0">
                            <button
                                onClick={() => toggleAccordion(item._id)}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <span>{item.question}</span>
                                <span>{activeId === item._id ? "-" : "+"}</span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                activeId === item._id
                                    ? "block p-4"
                                    : "hidden"
                                }`}
                            >
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className='bg-[#9DCCFF] pt-20 pb-40'>
                <div className="max-w-container mx-auto">
                    <h3 className='text-black font-bold text-3xl mb-4'>{memberShipData?.testimonialSection?.title}</h3>
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
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {memberShipData?.testimonialSection?.students.map((item:any, index:any) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-2xl p-6 shadow-lg h-full text-center">
                                    <div className='h-25 w-25 rounded-xl border border-gray-400 mx-auto'>
                                        <img src={item.image} alt='image' />
                                    </div>
                                    <div className='mt-3'>
                                        <h3 className='text-black text-xl font-bold mb-2'>{item.name}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className='pb-20'>
                <div className="max-w-container mx-auto">
                    <div className='bg-[#252641] rounded-2xl p-6 mb-16 -mt-11.25'>
                        <div className='flex items-center gap-4 justify-between'>
                            <h4 className='text-white font-bold text-2xl'>{memberShipData?.appSection?.title}</h4>
                            <div className='flex items-center gap-2'>
                                {memberShipData?.appSection?.androidLink && (
                                    <Link
                                        href={memberShipData.appSection.androidLink}
                                        target='_blank'
                                        className='px-6 py-2 rounded-lg text-white font-bold inline-block bg-[#29B9E7]'
                                    >
                                        {memberShipData?.appSection?.androidButtonText}
                                    </Link>
                                )}
                                {memberShipData?.appSection?.iosLink && (
                                    <Link
                                        href={memberShipData.appSection.iosLink}
                                        target='_blank'
                                        className='px-6 py-2 rounded-lg text-white font-bold inline-block bg-[#49BBBD]'
                                    >
                                        {memberShipData?.appSection?.iosButtonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-10'>
                        {memberShipData?.finalSections.map((item: any, index: any) => (
                            <div key={index} className='shadow rounded-2xl p-6'>
                                <div className='border border-gray-300 rounded-lg overflow-hidden mb-3 h-75'>
                                    <img src={item?.image} alt='' className='w-full h-full object-cover' />
                                </div>
                                <h5 className='text-black font-bold mb-3'>{item?.title}</h5>
                                <p className='m-0 mb-5'>{item?.description}</p>
                                <Link href={item?.buttonLink} className='px-6 py-2 rounded-lg text-white font-bold inline-block bg-[#49BBBD]'>{item?.buttonText}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};

export default MemberShip;
