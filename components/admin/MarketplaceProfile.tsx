import { useUserProfile } from '@/utils/useUserProfile';
import React from 'react'
import LoadingScreen from '../LoadingScreen';

interface Marketplace {
    marketplaceName: string;
    abn: number;
    capacity: number;
    contactNumber: string;
    email: string;
}

interface MarketplaceProfileProps {
    marketplace: Marketplace;
}

const MarketplaceProfile: React.FC<MarketplaceProfileProps> = ( { marketplace } ) => {

    return (
        <>
            <div className='border-2 border-black rounded-xl p-4 mt-6'>
                <h2 className='text-3xl mb-2'>Marketplace Profile</h2>
                <div className=''>
                    <p className='text-xl mb-2'><strong>Marketplace Name:</strong> {marketplace?.marketplaceName}</p>
                    <p className='text-xl mb-2'><strong>Email:</strong> {marketplace?.email}</p>
                    <p className='text-xl mb-2'><strong>Phone:</strong> {marketplace?.contactNumber}</p>
                    <p className='text-xl mb-2'><strong>ABN:</strong> {marketplace?.abn}</p>
                    <p className='text-xl mb-2'><strong>Capacity:</strong> {marketplace?.capacity}</p>
                </div>
            </div>
            <button className='basic-button mt-4'>Edit Details</button>
        </>
    )
}

export default MarketplaceProfile
