"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchPage } from '@/store/slices/searchSlice';
import CourseCard from '@/components/courseCard';
import Link from 'next/link';
import RecommendedSection from '@/components/Recommended/page';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import { searchCourses } from "@/store/slices/searchSlice";
import { toast } from 'react-toastify';

const Search = () => {
    const [filters, setFilters] = useState({
        keyword: "",
        subject: "",
        partner: "",
        program: "",
        language: "",
        availability: "",
        learningType: "",
    });
    const dispatch = useAppDispatch();
    const {searchPageData, searchResults, isSearchPerformed} = useAppSelector((state) => state.search);

    useEffect(() => {
        dispatch(searchPage())
    }, [dispatch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const hasFilters = Object.values(filters).some(
            (value) => value.trim() !== ""
        );
        if (!hasFilters) {
            toast.error("Please select at least one filter");
            return;
        }
        dispatch(searchCourses(filters));
    };

    const coursesToShow = isSearchPerformed ? searchResults : searchPageData?.featuredCourses?.cards;

    //console.log("searchPageData", searchPageData);

    return (
        <>
            <div 
                className='bg-no-repeat bg-center bg-cover relative z-10 pt-37.5 pb-20 after:content-[""] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-primary/50 after:-z-[1]'
                //style={{backgroundImage: `url(${searchPageData?.heroSection?.bannerImage})`,}}
                style={{backgroundImage: `url(/images/totc1.png)`}}
            >
                <div className="max-w-container mx-auto">
                    <div>
                        <form 
                            onSubmit={handleSearch}
                            className='bg-white p-1 rounded-sm flex justify-between mb-2'
                        >
                            <input 
                                type='text' 
                                placeholder={`${searchPageData?.heroSection?.searchPlaceholder}`} 
                                className='w-full pl-4 outline-none' 
                                value={filters.keyword}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        keyword: e.target.value,
                                    })
                                }
                            />
                            <button 
                                type='submit' 
                                className='bg-primary px-6 py-2.5 text-white rounded-full cursor-pointer'
                            >
                                Search
                            </button>
                        </form>
                        <div className='flex gap-1'>
                            <select 
                                value={filters.subject}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        subject: e.target.value,
                                    })
                                }
                                className='bg-white p-2 rounded-sm outline-none flex-1'
                            >
                                <option value="">Subject</option>
                                {searchPageData?.heroSection?.subjects?.map((item: string, index: number) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <select 
                                value={filters.partner}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        partner: e.target.value,
                                    })
                                }
                                className='bg-white p-2 rounded-sm outline-none flex-1'
                            >
                                <option value="">Partner</option>
                                {searchPageData?.heroSection?.partners?.map((item: string, index: number) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <select 
                                value={filters.program}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        program: e.target.value,
                                    })
                                }
                                className='bg-white p-2 rounded-sm outline-none flex-1'
                            >
                                <option value="">Program</option>
                                {searchPageData?.heroSection?.programs?.map((item: string, index: number) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <select 
                                value={filters.language}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        language: e.target.value,
                                    })
                                }
                                className='bg-white p-2 rounded-sm outline-none flex-1'
                            >
                                <option value="">Language</option>
                                {searchPageData?.heroSection?.languages?.map((item: string, index: number) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <select 
                                value={filters.availability}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        availability: e.target.value,
                                    })
                                }
                                className='bg-white p-2 rounded-sm outline-none flex-1'
                            >
                                <option value="">Abaliability</option>
                                {searchPageData?.heroSection?.availability?.map((item: string, index: number) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <select 
                                value={filters.learningType}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        learningType: e.target.value,
                                    })
                                }
                                className='bg-white p-2 rounded-sm outline-none flex-1'
                            >
                                <option value="">Learning Type</option>
                                {searchPageData?.heroSection?.learningTypes?.map((item: string, index: number) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <section className='py-16'>
                <div className='max-w-container mx-auto'>
                    {coursesToShow?.length > 0 ? (
                        <div className='grid grid-cols-4 gap-8'>
                            {coursesToShow?.map((item: any, index: number) => (
                                <CourseCard key={index} courseCard={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            No courses found
                        </div>
                    )}
                </div>
            </section>

            <section className='pb-10'>
                <div className='max-w-container mx-auto'>
                    <div className='bg-[#9DCCFF]/20 rounded-2xl p-8'>
                        <div className='flex items-center'>
                            <div className='basis-2/5 w-2/5 pr-8'>
                                <h2 className='text-black text-xl font-bold mb-2'>{searchPageData?.learningBanner?.title}</h2>
                                <div className="mb-4 space-y-2">
                                    {searchPageData?.learningBanner?.description?.split(". ").filter(Boolean).map((line: string, index: number) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
                                            <span>
                                                {line}
                                                {index <
                                                    searchPageData?.learningBanner?.description
                                                    ?.split(". ")
                                                    .filter(Boolean).length - 1 && "."}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Link href={'#'} className='bg-primary px-4 py-3 rounded-lg text-white inline-block'>{searchPageData?.learningBanner?.buttonText}</Link>
                            </div>
                            <div className='basis-3/5 w-3/5'>
                                <img
                                    // src={searchPageData?.learningBanner?.image}
                                    src={'/images/totc1.png'}
                                    alt=''
                                    className='ml-auto'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RecommendedSection recommendedBlogs={searchPageData?.recommendedForYou} />

            <section className='py-16'>
                <div className='max-w-container mx-auto'>
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>{searchPageData?.classesTaughtByCreators?.title}</h2>
                        <Link href={'#'} className='font-bold text-primary'>See all</Link>
                    </div>
                    <div className='grid grid-cols-3 gap-8'>
                        {searchPageData?.classesTaughtByCreators?.cards.map((item: any, index:any) =>(
                            <div key={index} className='shadow p-6 rounded-2xl text-center'>
                                <img
                                    // src={item?.image}
                                    src={'images/user.png'}
                                    alt=''
                                    className='mx-auto'
                                />
                                <h2 className='text-black text-lg font-bold mt-4 mb-3'>{item?.name}</h2>
                                <p className='m-0'>{item?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='bg-[#9DCCFF]/20 py-16'>
                <div className='max-w-container mx-auto'>
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>{searchPageData?.studentTestimonials?.title}</h2>
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
                        {searchPageData?.studentTestimonials?.testimonials.map((item:any, index:any) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        {/* <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover" /> */}
                                        <img src={'images/user.png'} alt='' className="w-14 h-14 rounded-full object-cover overflow-hidden border border-gray-300" />
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
                                        {item.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className='py-16'>
                <div className='max-w-container mx-auto'>
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>{searchPageData?.educationDeals?.title}</h2>
                    </div>
                    <div className='grid grid-cols-3 gap-8'>
                        {searchPageData?.educationDeals?.cards.map((item: any, index: any) =>(
                            <div
                                key={index}
                                className='rounded-xl overflow-hidden relative z-10 p-6 after:content after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-black/50 after:-z-[1]'
                                //style={{backgroundImage: `url(${item?.image})`,}}
                                style={{backgroundImage: `url(/images/totc1.png)`}}
                            >
                                <span className='w-20 h-20 flex items-center justify-center bg-primary rounded-sm text-2xl text-white font-bold'>
                                    {item?.percentage}
                                </span>
                                <h2 className='text-white text-lg font-bold my-3'>{item?.title}</h2>
                                <p className='m-0 text-white'>{item?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};

export default Search;
