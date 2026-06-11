import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className='bg-[#252641] pt-16 pb-10'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center justify-center'>
                        <div className=' mr-10 pr-10 border-r border-r-[#626381]'>
                            <Link href={'/'}>
                                <img src={'/images/logo.svg'} alt='' />
                            </Link>
                        </div>
                        <div className='text-2xl text-white font-bold'>
                            Virtual Class <br /> for Zoom
                        </div>
                    </div>
                    <div className='text-center my-20'>
                        <p className='text-[#B2B3CF] text-2xl font-semibold mb-3'>Subscribe to get our Newsletter</p>
                        <form className='flex items-center justify-center gap-4'>
                            <input type='email' className='outline-0 w-[400px] border border-[#83839A] p-3 rounded-full text-[#83839A]' placeholder='Your Email' />
                            <button type='submit' className='bg-primary px-6 py-3 text-white rounded-full cursor-pointer'>Subscribe</button>
                        </form>
                    </div>
                    <div className=''>
                        <ul className='flex items-center justify-center gap-10 mb-2'>
                            <li>
                                <Link href={'#'} title='Careers' className='text-base text-[#B2B3CF]'>Careers</Link>
                            </li>
                            <li>
                                <Link href={'#'} title='Privacy Policy' className='text-base text-[#B2B3CF]'>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href={'#'} title='Terms & Conditions' className='text-base text-[#B2B3CF]'>Terms & Conditions</Link>
                            </li>
                        </ul>
                        <p className='text-base text-[#B2B3CF] text-center'>© 2026 Class Technologies Inc. </p>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;
