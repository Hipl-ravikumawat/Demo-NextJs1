"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [logoutModal, setLogoutModal] = useState(false)
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(
                    event.target as Node
                )
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const loadUser = () => {
            const token = Cookies.get("token");
            const storedUser = localStorage.getItem("user");
            setIsLoggedIn(!!token);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };
        loadUser();
        window.addEventListener(
            "userUpdated",
            loadUser
        );
        return () => {
            window.removeEventListener(
                "userUpdated",
                loadUser
            );
        };
    }, []);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            Cookies.remove("token");
            localStorage.removeItem("user");
            //localStorage.removeItem("rememberMe");
            setIsLoggedIn(false);
            setLogoutModal(false);
            setUser(null);
            toast.success("Logout successful");
            router.push("/");
        } catch (error: any) {
            toast.error(error || "Logout failed");
        }
    };

    return (
        <>
            <header className='absolute left-0 top-0 w-full z-20 py-4'>
                <div className="max-w-container mx-auto">
                    <div className='flex items-center gap-4 justify-between'>
                        <div>
                            <Link href={'/'}>
                                <img src={'/images/logo.svg'} alt='' />
                            </Link>
                        </div>
                        <div className='flex items-center gap-10'>
                            <ul className='flex items-center gap-10'>
                                <li><Link href={'/'} title='Home' className='text-white text-base'>Home</Link></li>
                                <li><Link href={'/courses'} title='Courses' className='text-white text-base'>Courses</Link></li>
                                <li><Link href={'/membership'} title='Membership' className='text-white text-base'>Membership</Link></li>
                                <li><Link href={'/blog'} title='Blog' className='text-white text-base'>Blog</Link></li>
                                <li><Link href={'/search'} title='Search' className='text-white text-base'>Search</Link></li>
                            </ul>
                            {isLoggedIn ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button 
                                        type="button" 
                                        className="cursor-pointer flex items-center gap-1"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span className="w-10 h-10 rounded-full overflow-hidden border border-gray-500 bg-white inline-block">
                                            <img src="/images/logo.svg" alt="profile" className="w-full h-full object-cover" />
                                        </span>
                                        <span>{user?.username}</span>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 shadow-xl p-2 bg-white w-35 rounded-md">
                                            <Link 
                                                href="/profile" 
                                                className="block py-2"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setLogoutModal(true)
                                                    setIsDropdownOpen(false)
                                                }}
                                                className="block w-full text-left py-2 cursor-pointer"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                                ) : (
                                <ul className="flex items-center gap-6">
                                    <li>
                                        <Link href="/login" className="bg-white px-4 py-3 rounded-full text-black">Login</Link>
                                    </li>
                                    <li>
                                        <Link href="/register" className="bg-white/30 px-4 py-3 rounded-full text-white">Sign Up</Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {logoutModal  && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5'>
                    <div className='bg-white rounded-2xl w-full max-w-md p-6'>
                        <h2 className='text-2xl font-bold mb-4'>
                            LogOut
                        </h2>
                        <p className='text-gray-600 mb-6'>
                            Are you sure you want to Logout?
                        </p>
                        <div className='flex items-center justify-end gap-3'>
                            <button
                                onClick={() => {
                                    setLogoutModal(false)
                                }}
                                className='px-5 py-2 rounded-lg bg-gray-200'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className='px-5 py-2 rounded-lg bg-red-500 text-white disabled:opacity-50'
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default Header;
