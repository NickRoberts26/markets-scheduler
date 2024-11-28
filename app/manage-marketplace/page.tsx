'use client'

import MarketplaceProfile from '@/components/admin/MarketplaceProfile';
import ScheduledDates from '@/components/admin/ScheduledDates';
import LoadingScreen from '@/components/LoadingScreen';
import Sidebar from '@/components/Sidebar'
import { useUserProfile } from '@/utils/useUserProfile';
import React from 'react'

const ManageMarketplace = () => {

    const { marketplace, loading } = useUserProfile();

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='px-16 py-10 flex-1'>
                <h1 className='text-5xl mb-10'>Marketplace Details</h1>
                <div className='border-2 border-black rounded-xl p-4'>
                    <h2 className='text-3xl mb-2'>Marketplace Bio</h2>
                    {marketplace?.bio ? (<p>{marketplace?.bio}</p>) : (<p>No bio set yet.</p>)}
                </div>
                <button className='basic-button mt-4'>{marketplace?.bio ? ('Update Bio') : ('Write Bio')}</button>
                <div className='flex gap-8'>
                    <div className='w-1/2'>
                        {marketplace && <MarketplaceProfile marketplace={marketplace}/>}
                    </div>
                    <div className='w-1/2'>
                        {marketplace && <ScheduledDates marketplace={marketplace}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageMarketplace
