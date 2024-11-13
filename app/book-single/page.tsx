import React from 'react'
import ShortTermForm from "@/components/forms/ShortTermForm";
import Image from 'next/image';
import Link from 'next/link';

const BookSingle = () => {
    return (
        <div className='flex h-screen max-h-screen'>
            <div className='flex flex-col relative justify-center w-[70%] mx-16 my-10'>
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
