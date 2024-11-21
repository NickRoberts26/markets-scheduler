'use client'

import Custom404 from '@/components/404';
import LoadingScreen from '@/components/LoadingScreen';
import ApprovedMarkets from '@/components/marketplace-profile/ApprovedMarkets';
import Sidebar from '@/components/Sidebar';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Marketplace {
    marketplaceName: string;
    type: string;
    email: string;
    contactNumber: string;
    capacity: string;
    uid: string;
}

const MarketplacePage = () => {
    const [marketplace, setMarketplace] = useState<Marketplace | null>(null);
    const [loading, setLoading] = useState(true);
    
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
            <div className='px-10 py-8 w-full'>
                <h1 className='text-5xl font-bold mb-8'>{marketplace.marketplaceName}</h1>
                <ApprovedMarkets marketplaceName={marketplace.marketplaceName}/>
            </div>
        </div>
    );
};

export default MarketplacePage;
