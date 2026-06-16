'use client'

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { blogPage } from '@/store/slices/blogSlice';
import RelatedBlog from '@/components/RelatedBlog/page';

const Blog = () => {
    const dispatch = useAppDispatch();
    const { loading, blogData } = useAppSelector((state) => state.blog);

    useEffect(() => {
        dispatch(blogPage());
    }, [dispatch]);

    //console.log("blogData", blogData)


    return (
        <>
            <section className='bg-[#9DCCFF] pt-40 pb-20'>
                <div className="max-w-container mx-auto">
                    <div className='grid grid-cols-2 items-center gap-10'>
                        <div>
                            <span className='block mb-3'>By {blogData?.featuredBlog?.category}</span>
                            <h1 className="text-[#2F327D] text-[54px] leading-15 font-bold mb-8">{blogData?.featuredBlog?.title}</h1>
                            <p className="mb-8">{blogData?.featuredBlog?.content}</p>
                            <Link href={'#'} className="bg-primary px-4 py-3 rounded-full text-white">Start learning now</Link>
                        </div>
                        <div>
                            <img src={blogData?.featuredBlog?.image} alt='' className='rounded-2xl h-125 border border-gray-400' />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reading Blog */}
            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <h2 className='text-black text-xl font-bold mb-4'>Reading blog list</h2>
                    <div className='grid grid-cols-4 gap-8'>
                        {blogData?.readingBlogList?.blogs?.map((item:any, index:any) => (
                            <div key={index} className='relative'>
                                <Link href={`/blog/${item.slug}?id=${item._id}`} className='block h-62.5 relative border border-gray-500 overflow-hidden rounded-xl'>
                                    <img src={item?.image} alt='' className='w-full h-full object-cover' />
                                    <span className='bg-white/80 text-black px-4 py-1.5 font-semibold text-sm rounded-sm absolute bottom-2 left-1/2 -translate-x-1/2'>{item?.category}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Blog */}
            <RelatedBlog relatedBlogs={blogData?.relatedBlogs} />

            {/* Marketing Articles */}
            <section className='py-20'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-black text-xl font-bold'>Marketing Articles</h2>
                        <Link href={'#'} className='font-bold text-primary'>See all</Link>
                    </div>
                    <div className='grid grid-cols-4 gap-6'>
                        {blogData?.marketingArticles.map((item: any, index: any) =>(
                            <div key={index} className='bg-white shadow-2xl p-4 rounded-2xl'>
                                <img src={item?.image} alt='' className='h-37.5 rounded-xl border border-gray-400 w-full mb-3' />
                                <div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <span className='text-xs text-[#696984]'>
                                            {item?.tags.map((tag:any, id:number) =>(
                                                <span key={id}>
                                                    {tag}
                                                    {id < item.tags.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </span>
                                        <span className='text-xs text-[#696984]'>{item?.readTime}</span>
                                    </div>
                                    <h2 className='text-black text-xl font-bold mb-2'><Link href={`/blog/${item.slug}?id=${item._id}`}>{item?.title}</Link></h2>
                                    <p className="mb-4">{item?.description}</p>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <img src={item?.author.image} alt='' className='w-10 h-10 border border-gray-400 object-cover rounded-full' />
                                            <span className='text-black text-xs font-semibold'>{item?.author.name}</span>
                                        </div>
                                        <span className='text-primary text-base font-bold'>$80</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};

export default Blog;
