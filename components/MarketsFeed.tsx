'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Marketplace {
    marketplaceName: string;
    type: string;
    email: string;
    contactNumber: string;
    capacity: string;
    uid: string;
}

const MarketsFeed = () => {
    const [marketplaces, setMarketplaces] = useState<Marketplace[]>();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchMarketplaces = async () => {
            try {
                const marketplaceRef = collection(db, 'marketplaces');
                const q = query(marketplaceRef);
                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.map((doc) => ({
                    marketplaceName: doc.data().marketplaceName as string,
                    type: doc.data().type as string,
                    email: doc.data().email as string,
                    contactNumber: doc.data().contactNumber as string,
                    capacity: doc.data().capacity as string,
                    uid: doc.data().uid as string,
                }));

                setMarketplaces(data);
            } catch (error) {
                
            }
        }

        fetchMarketplaces();
    }, [])

    return (
        <div className='grid grid-cols-3 gap-x-5'>
            {marketplaces?.map((marketplace, _) => {
                console.log(marketplace);
                return (
                    <Link key={marketplace.uid} href={`/local-markets/${marketplace.marketplaceName.replace(/\s+/g, '-').toLowerCase()}`} className='relative h-[40vh] mb-5 transition-all duration-500 hover:scale-105'>
                        <div className='absolute bg-gray-600 opacity-50 top-0 left-0 h-full w-full rounded-3xl border-4 border-green-500'></div>
                        <div className='absolute top-0 left-0 h-full w-full text-white flex items-center justify-center text-3xl'>{marketplace.marketplaceName}</div>
                        {!hasError && (
                            <Image
                                src={`/assets/markets/${marketplace.marketplaceName.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                                alt="markets"
                                width={1000}
                                height={1000}
                                className='border-4 border-green-500 rounded-3xl object-cover h-[40vh]'
                                onError={() => setHasError(true)}
                            />
                        )}
                    </Link>
                )
            })}
        </div>
    )
}

export default MarketsFeed
