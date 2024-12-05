import { db } from '@/lib/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface RequestFeedProps {
    date: string;
    status: string;
    userId: string;
    bookingId: string;
}

interface Market {
    marketName: string;
    productType: string;
}

const SingleRequest: React.FC<RequestFeedProps> = ( { date, status, userId, bookingId } ) => {
    const [marketInfo, setMarketInfo] = useState<Market>();
    const [bookingStatus, setBookingStatus] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const updateStatus = async (newStatus: string) => {
        try {
            const q = query(
              collection(db, 'bookings'),
              where("bookingId", "==", bookingId)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
                  status: newStatus,
                });
                setBookingStatus(true);
                location.reload();
            }

        } catch (error) {
            console.log(error);
        }
    }

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

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
        };
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {isMobile ? (
                <div className='flex flex-col p-4'>
                    <div className='flex'>
                        <p className='font-bold mr-2'>Market Name:</p>
                        <p>{marketInfo?.marketName}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-bold mr-2'>Product:</p>
                        <p>{marketInfo?.productType}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-bold mr-2'>Reuqested Date:</p>
                        <p>{date}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-bold mr-2'>Status:</p>
                        <p>{status}</p>
                    </div>
                    <div className='flex mt-2'>
                        <button onClick={() => updateStatus('Confirmed')} className='basic-button mr-2'>Approve</button>
                        <button onClick={() => updateStatus('Denied')} className='basic-button-deny'>Deny</button>
                    </div>
                </div>
            ) : (
                <div className='flex items-center p-4'>
                    <p className='w-[25%]'>{marketInfo?.marketName}</p>
                    <p className='w-[20%]'>{marketInfo?.productType}</p>
                    <p className='w-[15%]'>{date}</p>
                    <p className='w-[15%]'>{status}</p>
                    <div className='flex ml-auto'>
                        <button onClick={() => updateStatus('Confirmed')} className='basic-button mr-2'>Approve</button>
                        <button onClick={() => updateStatus('Denied')} className='basic-button-deny'>Deny</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default SingleRequest
