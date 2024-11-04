import Link from 'next/link'
import Image from "next/image";
import React from 'react'

const Sidebar = () => {
    return (
        <div className='w-[80px] border-r-2 px-2 pt-8 flex flex-col items-center'>
            <Link href="/" className='mb-6'>
                <Image
                    src="/assets/logo.png"
                    height={1000}
                    width={1000}
                    alt="logo"
                    className="h-10 w-fit"
                />
            </Link>
            <Link href="/login" className='flex flex-col items-center'>
                <Image
                    src="/assets/logout.png"
                    height={1000}
                    width={1000}
                    alt="logo"
                    className="h-9 w-fit"
                />
                <p className='text-[12px]'>Logout</p>
            </Link>
        </div>
    )
}

export default Sidebar
