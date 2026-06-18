'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { courseDetail } from '@/store/slices/coursesSlice';

const CourseDetail = () => {
    const dispatch = useAppDispatch();
    
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const {courseDetailData} = useAppSelector((state) => state.courses);

    useEffect(() => {
        if (id) {
            dispatch(courseDetail(id));
        }
    }, [dispatch, id]);

    console.log("courseDetailData", courseDetailData);

    return (
        <>
            <div 
                className='bg-no-repeat bg-cover bg-center pt-40 relative z-10 after:content after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-black/50 after:-z-[1] h-100'
                //style={{backgroundImage: `url(${blogDetailData?.data?.image})`,}}
                style={{backgroundImage: `url(/images/totc1.png)`}}
            ></div>
            

        </>
    )
};

export default CourseDetail;
