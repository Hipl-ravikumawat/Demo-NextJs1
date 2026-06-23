import React from 'react';
import Link from 'next/link';

interface courseCardProps {
    courseCard: any;
}

const CourseCard = ({courseCard,}:courseCardProps) => {
    return (
        <>
            <div className='bg-white shadow-2xl p-4 rounded-2xl'>
                {/* <img src={item?.image} alt='' className='h-37.5 rounded-xl border border-gray-400 w-full mb-3' /> */}
                <img src={'images/totc1.png'} alt='' className='h-37.5 rounded-xl border border-gray-400 w-full mb-3 object-cover overflow-hidden' />
                <div>
                    <div className='flex items-center justify-between mb-2'>
                        <span className='text-xs text-[#696984]'>
                            {courseCard?.category}
                        </span>
                        <span className='text-xs text-[#696984]'>{courseCard?.duration}</span>
                    </div>
                    <h2 className='text-black text-xl font-bold mb-2'><Link href={`/courses/${courseCard?.courseId}`}>{courseCard?.title}</Link></h2>
                    <p className="mb-4">{courseCard?.description}</p>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2 items-center'>
                            {/* <img src={item?.authorImage} alt='' className='w-10 h-10 border border-gray-300 object-cover rounded-full' /> */}
                            <img src={'images/user.png'} alt='' className='w-10 h-10 border border-gray-300 object-cover rounded-full' />
                            <span className='text-black text-xs font-semibold'>{courseCard?.authorName}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            {courseCard?.oldPrice && (
                                <span className='text-black/50 italic text-xs line-through'>${courseCard?.oldPrice}</span>
                            )}
                            <span className='text-primary text-base font-bold'>${courseCard?.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CourseCard;
