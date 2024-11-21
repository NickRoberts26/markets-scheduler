import Link from 'next/link'
import React from 'react'

const Custom404 = () => {
    return (
        <div className='flex flex-col h-[100vh] justify-center items-center bg-green-400'>
            <h1 className='text-4xl text-white mb-6'><span className='font-bold'>404: </span>Page not found</h1>
            <Link href="/" className='basic-button'>Take me home!</Link>
        </div>
    )
}

export default Custom404
