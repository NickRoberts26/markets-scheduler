'use client'

import { db } from '@/lib/firebase';
import { useUserProfile } from '@/utils/useUserProfile';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Image from "next/image";

interface ActiveMarket {
    marketplace: string;
    date: string;
    status: string;
    bookingPeriod: string;
}

const ActiveMarkets = () => {
    const [activeMarket, setActiveMarket] = useState<ActiveMarket[]>([]);
    const { user } = useUserProfile();
    const currentUid = user?.uid;

    useEffect(() => {
        const fetchActiveMarkets = async () => {
          try {
            if (currentUid) {
              const marketsRef = collection(db, 'bookings');
              const q = query(marketsRef, where('userId', '==', currentUid));
              const querySnapshot = await getDocs(q);
              
              if (!querySnapshot.empty) {
                const markets = querySnapshot.docs.map(doc => ({
                    marketplace: doc.data().marketplace,
                    date: doc.data().date,
                    bookingPeriod: doc.data().bookingPeriod,
                    status: doc.data().status
                }));
                setActiveMarket(markets);
              } else {
                console.log("No market found for this user.");
              }
            }
          } catch (error) {
            console.log('Failed to load market data');
          }
        };
    
        if (currentUid) {
            fetchActiveMarkets();
        }
      }, [currentUid]);

    return (
        <div className='flex justify-between lg:w-[50%] mb-10 lg:mb-0'>
            <div className='lg:w-[95%]'>
                <div className='border-2 border-black rounded-xl p-4 pb-0 lg:p-4'>
                    <div className='mb-8'>
                        <h2 className='text-3xl mb-4 underline'>Active Markets</h2>
                        {activeMarket.map((market, index) => (
                            <div key={index} className='flex justify-between items-center mb-6'>
                                <Image
                                    src={`/assets/market-logos/${market.marketplace.replace(/\s+/g, '').toLowerCase()}.png`}
                                    height={1000}
                                    width={1000}
                                    alt=''
                                    className='w-[35%] lg:w-[40%] h-[100%] border border-black rounded-full'
                                />
                                <div className='w-[55%] lg:w-[40%]'>
                                    <h2 className='lg:text-lg mb-2'><span className='font-bold block text-lg lg:text-xl'>Marketplace</span>{market.marketplace}</h2>
                                    {market.date ? (
                                      <h2 className='lg:text-lg mb-2'><span className='font-bold block text-lg lg:text-xl'>Date</span>{market.date}</h2>
                                    ) : (
                                      <h2 className='lg:text-lg mb-2'><span className='font-bold blocktext-lg lg:text-xl'>Period</span>{market.bookingPeriod}</h2>
                                    )}
                                    <h2 className='lg:text-lg mb-2'><span className='font-bold block text-lg lg:text-xl'>Status</span>{market.status}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveMarkets
