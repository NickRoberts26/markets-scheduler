import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import ShortTermForm from '@/components/forms/ShortTermForm';

const BookSingle = () => {
    return (
        <div className='flex h-screen max-h-screen'>
            <div className='flex flex-col relative lg:justify-center w-full lg:w-[70%] m-6 lg:mx-16 lg:my-10'>
                <ShortTermForm />
            </div>
            <Image
                src='/assets/markets-cropped.png'
                alt="markets"
                width={1000}
                height={1000}
                className="side-img max-w-[30%]"
            />
        </div>
    )
}

export default BookSingle
