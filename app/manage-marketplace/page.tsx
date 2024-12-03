'use client'

import Bio from '@/components/admin/Bio';
import MarketplaceProfile from '@/components/admin/MarketplaceProfile';
import ScheduledDates from '@/components/admin/ScheduledDates';
import LoadingScreen from '@/components/LoadingScreen';
import Sidebar from '@/components/Sidebar'
import { useUserProfile } from '@/utils/useUserProfile';
import React, { use, useState } from 'react'

const ManageMarketplace = () => {
    const { marketplace, loading } = useUserProfile();

    const { user } = useUserProfile();
    const currentUid = user?.uid;

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='px-16 py-10 flex-1'>
                <h1 className='text-5xl mb-10'>Marketplace Details</h1>
                {marketplace && currentUid && (<Bio marketplace={marketplace} currentUid={currentUid}/>)}
                <div className='flex gap-8'>
                    <div className='w-1/2'>
                        {marketplace && currentUid && <MarketplaceProfile marketplace={marketplace} currentUid={currentUid}/>}
                    </div>
                    <div className='w-1/2'>
                        {marketplace && currentUid && <ScheduledDates marketplace={marketplace} currentUid={currentUid}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageMarketplace
