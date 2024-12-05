'use client'

import Link from 'next/link'
import Image from "next/image";
import React from 'react'
import { handleLogout } from '@/utils/handleLogout';

const Sidebar = () => {
    
    return (
        <div className='w-full z-10 lg:w-[80px] fixed top-0 lg:relative bg-white border-b-2 lg:border-b-0 border-black lg:border-r-2 p-3 lg:px-2 lg:pt-8 flex lg:flex-col justify-between lg:justify-normal items-center'>
            <Link href="/" className='lg:mb-6'>
                <div className='flex'>
                    <Image
                        src="/assets/logo.png"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="h-8 lg:h-10 w-fit"
                    />
                    <div className="text-xl font-bold ml-2 mt-1 lg:hidden">Marketeer</div>
                </div>
            </Link>
            <button onClick={handleLogout} className='flex flex-col items-center'>
                <Image
                    src="/assets/logout.png"
                    height={1000}
                    width={1000}
                    alt="logo"
                    className="h-7 lg:h-9 w-fit"
                />
                <div className='text-[12px]'>Logout</div>
            </button>
        </div>
    )
}

export default Sidebar
