'use client'

import Custom404 from '@/components/404';
import LoadingScreen from '@/components/LoadingScreen';
import ApprovedMarkets from '@/components/marketplace-profile/ApprovedMarkets';
import Sidebar from '@/components/Sidebar';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Marketplace {
    marketplaceName: string;
    type: string;
    email: string;
    contactNumber: string;
    capacity: string;
    uid: string;
    bio: string;
    currentDates?: string[];
}

const MarketplacePage = () => {
    const [marketplace, setMarketplace] = useState<Marketplace | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    
    const getSegment = (url: string) => {
        const parts = url.split('/');
        return parts[parts.length - 2]; // Gets the second-to-last segment
    };

    const formatKebabCaseToTitleCase = (str: string): string => {
        return str
          .split('-') // Split the string by hyphens
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(' '); // Join the words with spaces
    };

    useEffect(() => {
        const segment = formatKebabCaseToTitleCase(getSegment(window.location.href));

        const fetchMarketplace = async ()=> {
            try {
                const q = query(
                    collection(db, 'marketplaces'),
                    where("marketplaceName", "==", segment)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setMarketplace(doc.data() as Marketplace);
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchMarketplace();
    }, [])

    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    if (!marketplace) {
        return (
            <Custom404 />
        )
    }

    return (
        <div className='flex h-screen max-h-screen'>
            <Sidebar />
            <div className='px-6 pt-24 lg:px-10 lg:py-8 w-full'>
                <h1 className='text-3xl lg:text-5xl font-bold mb-8'>{marketplace.marketplaceName}</h1>
                {marketplace.bio && (
                    <div className="mb-6 lg:w-4/5">
                        <p className='lg:text-xl'>{marketplace.bio}</p>
                    </div>
                )}
                <div className='flex flex-col lg:flex-row'>
                    <ApprovedMarkets marketplaceName={marketplace.marketplaceName} currentDates={marketplace.currentDates}/>
                    {!hasError && (
                        <Image
                            src={`/assets/markets/${marketplace.marketplaceName.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                            alt="markets"
                            width={1000}
                            height={1000}
                            className='lg:w-1/2 rounded-3xl mb-6 lg:mb-0 order-1 lg:order-2'
                            onError={() => setHasError(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketplacePage;
