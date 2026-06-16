'use client';

import React, { useEffect } from 'react';
import { useParams, useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import RelatedBlog from '@/components/RelatedBlog/page';
import { blogDetail } from '@/store/slices/blogSlice';

const BlogDetail = () => {
    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const {blogDetailData, loading, error,} = useAppSelector((state) => state.blog);

    useEffect(() => {
        if (id) {
            dispatch(blogDetail(id));
        }
    }, [dispatch, id]);

    //console.log("blogDetailData", blogDetailData)

    return (
        <>
            <div 
                className='bg-no-repeat bg-cover bg-center pt-40 relative z-10 after:content after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-black/50 after:-z-[1] h-100'
                //style={{backgroundImage: `url(${blogDetailData?.data?.image})`,}}
                style={{backgroundImage: `url(/images/totc1.png)`}}
            ></div>

            <section className='pt-20'>
                <div className="max-w-container mx-auto">
                    <h1 className="text-[#2F327D] text-4xl font-bold mb-5">{blogDetailData?.data?.title}</h1>
                    <p className="mb-3">{blogDetailData?.data?.content}</p>
                    <div className='flex flex-wrap gap-2 mt-4 mb-8 pb-8 border-b border-b-[#696984]'>
                        {blogDetailData?.data?.tags.map((tag: any, index: any) =>(
                            <span key={index} className='bg-[#49BBBD]/10 text-[#696984] text-sm px-3 py-1 inline-block rounded-full'>{tag}</span>
                        ))}
                    </div>
                    <div className='flex items-center justify-between gap-4 pb-8'>
                        <div className='flex items-center gap-3'>
                            <div className='w-16 h-16 rounded-sm overflow-hidden border border-gray-300'>
                                {/* <img src={blogDetailData?.data?.author?.image} alt='' className='' /> */}
                                <img src={'/images/user.png'} alt='' className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <span className='text-xs font-medium text-[#696984] block'>Written by</span>
                                <span className='text-lg text-[#000000] font-bold'>{blogDetailData?.data?.author?.name}</span>
                            </div>
                        </div>
                        <button type='button' className='border border-[#49BBBD] text-base font-bold text-[#49BBBD] py-2 px-6 bg-transparent rounded-sm'>Follow</button>
                    </div>
                </div>
            </section>

            <RelatedBlog relatedBlogs={blogDetailData?.relatedBlogs} />
        </>
    )
};

export default BlogDetail;
