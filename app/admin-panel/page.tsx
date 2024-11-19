'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useUserProfile } from '@/utils/useUserProfile';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import RequestFeed from '@/components/admin/RequestFeed';

interface Booking {
    date: string;
    marketplace: string;
    message: string;
    userId: string;
    status: string;
    bookingId: string;
}

const AdminPanel: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [pendingBookings, setPendingBookings] = useState(0);
    const [confirmedBookings, setConfirmedBookings] = useState(0);
    const [deniedBookings, setDeniedBookings] = useState(0);

    const { user, marketplace, loading } = useUserProfile();

    useEffect(() => {
        const fetchBookings = async () => {
            if (!marketplace?.marketplaceName) return;

            try {
                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    where('marketplace', '==', marketplace?.marketplaceName)
                );
                const querySnapshot = await getDocs(bookingsQuery);
                const data = querySnapshot.docs.map((doc) => ({
                    date: doc.data().date as string,
                    marketplace: doc.data().marketplace as string,
                    message: doc.data().message as string,
                    userId: doc.data().userId as string,
                    status: doc.data().status as string,
                    bookingId: doc.data().bookingId as string,
                }));
                setBookings(data);
            } catch (error) {
                console.log("Error fetching bookings");
            }
        };
    
        fetchBookings();
    }, [marketplace?.marketplaceName]);

    //Calculate pending/confirmed bookings
    useEffect(() => {
        if (bookings) {
            const counts = bookings.reduce(
                (acc, booking) => {
                    if (booking.status === 'Awaiting Confirmation') acc.pending++;
                    else if (booking.status === 'Confirmed') acc.approved++;
                    else if (booking.status === 'Denied') acc.denied++;
                    return acc;
                },
                { pending: 0, approved: 0, denied: 0 } // Initial counts
            );
    
            setPendingBookings(counts.pending);
            setConfirmedBookings(counts.approved);
            setDeniedBookings(counts.denied);
        } else {
            console.log('No bookings?');
        }
    }, [bookings]);

    return (
        <div className='px-16 py-10'>
            <h1 className='text-5xl mb-8'>Welcome, {user?.marketplaceName}</h1>
            <h2 className='text-xl mb-4'>Current Dates</h2>
            <div className='flex mb-8'>
                {marketplace?.currentDates.map((date, index) => (
                    <div key={index} className='date-pill'>
                        <div>{date}</div>
                    </div>       
                ))}
            </div>
            <div className='flex justify-between mb-10'>
                <div className="stat-card">
                    <div className='flex'>
                        <Image
                            src='/assets/icons/calender-icon.png'
                            alt="markets"
                            width={40}
                            height={30}
                            className='h-fit'
                        />
                        <div className='text-3xl font-bold mb-10 ml-2'>{confirmedBookings}</div>
                    </div>
                    <div>Total number of accepted applications</div>
                </div>
                <div className="stat-card">
                    <div className='flex'>
                        <Image
                            src='/assets/icons/pending-icon.png'
                            alt="markets"
                            width={35}
                            height={30}
                            className='h-fit'
                        />
                        <div className='text-3xl font-bold mb-10 ml-2'>{pendingBookings}</div>
                    </div>
                    <div>Total number of pending applications</div>
                </div>
                <div className="stat-card">
                    <div className='flex'>
                        <Image
                            src='/assets/icons/denied-icon.png'
                            alt="markets"
                            width={32}
                            height={30}
                            className='h-fit'
                        />
                        <div className='text-3xl font-bold mb-10 ml-2'>{deniedBookings}</div>
                    </div>
                    <div>Total number of rejected applications</div>
                </div>
            </div>
            <RequestFeed userBookings={bookings}/>
        </div>
    )
}

export default AdminPanel
