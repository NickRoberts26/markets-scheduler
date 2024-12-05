import React from 'react'
import Image from 'next/image';
import LongTermForm from '@/components/forms/LongTermForm';

const BookLong = () => {
    return (
        <div className='flex h-screen max-h-screen'>
            <div className='flex flex-col relative lg:justify-center w-full lg:w-[70%] m-6 lg:mx-16 lg:my-10'>
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
