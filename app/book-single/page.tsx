import React from 'react'
import ShortTermForm from "@/components/forms/ShortTermForm";
import Image from 'next/image';

const BookSingle = () => {
    return (
        <div className='flex h-screen max-h-screen'>
            <div className='flex justify-center items-center w-[70%] px-16 py-10'>
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
