import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import MarketsFeed from '@/components/MarketsFeed';

const LocalMarkets = () => {
  return (
    <div className='flex h-screen max-h-screen'>
        <Sidebar />
      <div className='px-10 py-8 w-full'>
        <h1 className='text-5xl font-bold mb-8'>Current Markets</h1>
        <MarketsFeed />
      </div>
    </div>
  )
}

export default LocalMarkets
