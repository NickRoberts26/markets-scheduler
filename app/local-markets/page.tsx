import React from 'react'
import Sidebar from '@/components/Sidebar';
import MarketsFeed from '@/components/MarketsFeed';

const LocalMarkets = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <Sidebar />
      <div className='px-6 pt-24 lg:px-10 lg:py-8 w-full'>
        <h1 className='text-3xl lg:text-5xl font-bold mb-8'>Current Markets</h1>
        <MarketsFeed />
      </div>
    </div>
  )
}

export default LocalMarkets
