import React from 'react'
import Image from "next/image";
import Link from 'next/link';

const LocalMarkets = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <div className='w-[12%] border-r-2 px-2 pt-8 flex flex-col items-center'>
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
      <div className='px-10 py-8'>
        <h1 className='text-5xl font-bold mb-8'>Current Markets</h1>
        <div className='grid grid-cols-3 gap-x-5'>
            <Link href="" className='relative h-fit transition-all duration-500 hover:scale-105'>
                <div className='absolute bg-gray-600 opacity-50 top-0 left-0 h-full w-full rounded-3xl border-4 border-green-500'></div>
                <div className='absolute top-0 left-0 h-full w-full text-white flex items-center justify-center text-3xl'>Kirribili Markets</div>
                <Image
                    src='/assets/markets/kirribilli-markets.jpg'
                    alt="markets"
                    width={1000}
                    height={1000}
                    className='border-4 border-green-500 rounded-3xl object-cover h-[40vh]'
                />
            </Link>
            <Link href="" className='relative h-fit transition-all duration-500 hover:scale-105'>
                <div className='absolute bg-gray-600 opacity-50 top-0 left-0 h-full w-full rounded-3xl border-4 border-green-500'></div>
                <div className='absolute top-0 left-0 h-full w-full text-white flex items-center justify-center text-3xl'>Finders Keepers</div>
                <Image
                    src='/assets/markets/finders-keepers.jpg'
                    alt="markets"
                    width={1000}
                    height={1000}
                    className='border-4 border-green-500 rounded-3xl object-cover h-[40vh]'
                />
            </Link>
            <Link href="" className='relative h-fit transition-all duration-500 hover:scale-105'>
                <div className='absolute bg-gray-600 opacity-50 top-0 left-0 h-full w-full rounded-3xl border-4 border-green-500'></div>
                <div className='absolute top-0 left-0 h-full w-full text-white flex items-center justify-center text-3xl'>Bondi Markets</div>
                <Image
                    src='/assets/markets/bondi-markets.png'
                    alt="markets"
                    width={1000}
                    height={1000}
                    className='border-4 border-green-500 rounded-3xl object-cover h-[40vh]'
                />
            </Link>
        </div>
      </div>
    </div>
  )
}

export default LocalMarkets
