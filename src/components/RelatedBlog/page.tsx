import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface RelatedBlogProps {
  relatedBlogs: any;
}

const RelatedBlog = ({relatedBlogs,}:RelatedBlogProps) => {
    return (
        <>
            <section className='py-20 bg-[#9DCCFF]'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>Related Blog</h2>
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
                                slidesPerView: 2,
                            },
                        }}
                    >
                        {relatedBlogs?.data.map((item:any, index:any) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                                    <div className='h-75 rounded-2xl border border-gray-400'>
                                        <img src={item.image} alt='image' />
                                    </div>
                                    <div className='mt-3'>
                                        <h3 className='text-black text-xl font-bold mb-4'><Link href={`/blog/${item.slug}?id=${item._id}`}>{item.title}</Link></h3>
                                        <div className='flex items-center gap-2 mb-4'>
                                            <img src={item.author.image} className='w-10 h-10 rounded-full overflow-hidden' />
                                            <span>{item.author.name}</span>
                                        </div>
                                        <p className='mb-3'>{item.description}</p>
                                        <div className='flex items-center justify-between'>
                                            <Link href={`/blog/${item.slug}?id=${item._id}`} className='underline'>Read more</Link>
                                            <span>Views: {item.views}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    )
};

export default RelatedBlog;
