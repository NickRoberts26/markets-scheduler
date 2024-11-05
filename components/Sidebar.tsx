import Link from 'next/link'
import Image from "next/image";
import React from 'react'
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

async function handleLogout() {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
}

const Sidebar = () => {
    const router = useRouter();
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
                <button onClick={handleLogout} className='text-[12px]'>Logout</button>
            </Link>
        </div>
    )
}

export default Sidebar
