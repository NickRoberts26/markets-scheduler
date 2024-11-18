import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface RequestFeedProps {
    date: string;
    status: string;
    userId: string;
}

interface Market {
    marketName: string;
    productType: string;
}

const SingleRequest: React.FC<RequestFeedProps> = ( { date, status, userId } ) => {
    const [marketInfo, setMarketInfo] = useState<Market>();

    useEffect(() => {
        const fetchMarketInfo = async () => {
            try {
                const marketQuery = query(
                    collection(db, 'markets'),
                    where('ownerid', '==', userId)
                );
                const querySnapshot = await getDocs(marketQuery);
                
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setMarketInfo(doc.data() as Market);
                    console.log("Market found for this user.");
                  } else {
                    console.log("No market found for this user.");
                  }
            } catch (error) {
                console.log("Error fetching bookings");
            }
        };
    
        fetchMarketInfo();
    }, []);

    return (
        <div className='flex items-center'>
            <p className='w-[25%]'>{marketInfo?.marketName}</p>
            <p className='w-[15%]'>{marketInfo?.productType}</p>
            <p className='w-[15%]'>{date}</p>
            <p className='w-[15%]'>{status}</p>
            <div className='flex ml-auto'>
                <button className='basic-button mr-2'>Approve</button>
                <button className='basic-button-deny'>Deny</button>
            </div>
        </div>
    )
}

export default SingleRequest
