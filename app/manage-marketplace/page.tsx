'use client'

import Bio from '@/components/admin/Bio';
import MarketplaceProfile from '@/components/admin/MarketplaceProfile';
import ScheduledDates from '@/components/admin/ScheduledDates';
import LoadingScreen from '@/components/LoadingScreen';
import Sidebar from '@/components/Sidebar'
import { useUserProfile } from '@/utils/useUserProfile';

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
            <div className='px-6 pb-10 pt-24 lg:px-16 lg:py-10 flex-1'>
                <h1 className='text-3xl lg:text-5xl mb-10'>Marketplace Details</h1>
                {marketplace && currentUid && (<Bio marketplace={marketplace} currentUid={currentUid}/>)}
                <div className='flex flex-col lg:flex-row lg:gap-8'>
                    <div className='lg:w-1/2'>
                        {marketplace && currentUid && <MarketplaceProfile marketplace={marketplace} currentUid={currentUid}/>}
                    </div>
                    <div className='lg:w-1/2'>
                        {marketplace && currentUid && <ScheduledDates marketplace={marketplace} currentUid={currentUid}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageMarketplace
