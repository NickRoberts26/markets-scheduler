'use client'

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface ApprovedMarketsProps {
    marketplaceName: string;
    currentDates?: string[];
}

interface Markets {
    marketName: string;
    productType: string;
    ownerid: string;
}

const ApprovedMarkets: React.FC<ApprovedMarketsProps> = ( { marketplaceName, currentDates } ) => {
    const [bookings, setBookings] = useState<string[]>([]);
    const [markets, setMarkets] = useState<Markets[] | null>(null);
    const [activeDate, setActiveDate] = useState<string>('');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const y = (e.target as HTMLDivElement).innerText;
        setActiveDate(y);
    }

    useEffect(() => {
        if(currentDates) {
            setActiveDate(currentDates[0]);
        }
    }, [])

    useEffect(() => {

        const fetchBookings = async () => {
            try {
                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    where('marketplace', '==', marketplaceName),
                    where('status', '==', 'Confirmed'),
                    where('date', '==', activeDate)
                );

                const querySnapshot = await getDocs(bookingsQuery);

                const data = querySnapshot.docs.map((doc) => doc.data().userId as string);

                setBookings(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchBookings();
    }, [activeDate]);

    useEffect(() => {
        const fetchMarketInfo = async () => {
            try {
                const marketInfoQuery = query(
                    collection(db, 'markets'),
                    where('ownerid', 'in', bookings),
                );

                const querySnapshot = await getDocs(marketInfoQuery);

                const data = querySnapshot.docs.map((doc) => ({
                    marketName: doc.data().marketName as string,
                    productType: doc.data().productType as string,
                    ownerid: doc.data().ownerid as string
                }));

                setMarkets(data);
            } catch (error) {
                
            }
        }

        fetchMarketInfo();
    }, [bookings]);

    return (
        <div className='flex justify-between w-[50%]'>
            <div className='w-[95%]'>
                <div className='border-2 border-black rounded-xl p-4'>
                    <h2 className='text-3xl mb-4 underline'>Currently Booked Markets</h2>
                    <div className='flex mb-4'>
                        {currentDates?.map((date, index) => (
                            <button onClick={handleClick} key={index} className='basic-button-alt mr-2'>{date}</button>
                        ))}
                    </div>
                    {markets ? (
                        <>
                            <div className='flex font-bold text-lg mb-2'>
                                <p className='w-2/5'>Name</p>
                                <p>Product</p>
                            </div>
                            <div className='[&>*:nth-child(odd)]:bg-gray-200'>
                                {markets.map((market, _) => (
                                    <div key={market.ownerid} className='flex p-1'>
                                        <p className='w-2/5'>{market.marketName}</p>
                                        <p>{market.productType}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <h3 className='text-xl'>No markets booked yet!</h3>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ApprovedMarkets
