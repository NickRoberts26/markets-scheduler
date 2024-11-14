import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import LongTermForm from '@/components/forms/LongTermForm';

const BookLong = () => {
    return (
        <div className='flex h-screen max-h-screen'>
            <div className='flex flex-col relative justify-center w-[70%] mx-16 my-10'>
                <LongTermForm />
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

export default BookLong
