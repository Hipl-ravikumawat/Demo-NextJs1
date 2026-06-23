import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CourseCard from '../courseCard';

interface RecommendedProps {
    recommendedBlogs: any;
}

const RecommendedSection = ({recommendedBlogs,}:RecommendedProps) => {
    return (
        <>
            <section className='py-20 bg-[#9DCCFF]/20'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>Recommended for you</h2>
                        <Link href={'#'} className='font-bold text-primary'>See all</Link>
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
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {recommendedBlogs?.cards.map((item:any, index:any) => (
                            <SwiperSlide key={index}>
                                <CourseCard courseCard={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    )
};

export default RecommendedSection;
