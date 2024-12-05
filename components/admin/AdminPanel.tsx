'use client'

import React, { useEffect, useState } from 'react'
import { useUserProfile } from '@/utils/useUserProfile';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import RequestFeed from '@/components/admin/RequestFeed';
import Link from 'next/link';
import RequestTotals from './RequestTotals';
import Sidebar from '../Sidebar';
import LoadingScreen from '../LoadingScreen';

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
    const [activeDate, setActiveDate] = useState<string>('');
    const [activeIndex, setActiveIndex] = useState(0);

    const { user, marketplace } = useUserProfile();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const y = (e.target as HTMLDivElement).innerText;
        setActiveDate(y);
        setActiveIndex(index);
    }

    useEffect(() => {
        if(marketplace?.currentDates) {
            setActiveDate(marketplace.currentDates[0]);
        }
    }, [marketplace])

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
                console.log("Error fetching bookings", error);
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

    if(!user) {
        return <LoadingScreen />
    }

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='px-6 lg:px-16 py-10 flex-1 mt-16 lg:mt-0'>
                <div className="flex justify-between flex-col lg:flex-row mb-8">
                    <h1 className='text-5xl order-2 lg:order-1'>Welcome, {user?.marketplaceName}</h1>
                    <Link href="/manage-marketplace" className='flex items-center basic-button mb-6 lg:mb-0 order-1 lg:order-2 w-fit'>
                        Manage Details
                    </Link>
                </div>
                <h2 className='text-xl mb-4'>Current Dates</h2>
                <div className='flex mb-8'>     
                    {marketplace?.currentDates.map((date, index) => (
                        <button onClick={(e) => handleClick(e, index)} key={index} className={`basic-button-alt mr-2 ${index === activeIndex ? 'bg-green-400' : ''}`}>{date}</button>
                    ))}
                </div>
                <div className='flex justify-between mb-10'>
                    <RequestTotals stat={confirmedBookings} icon="calender" iconwidth={40} />
                    <RequestTotals stat={pendingBookings} icon="pending" iconwidth={35} />
                    <RequestTotals stat={deniedBookings} icon="denied" iconwidth={32} />
                </div>
                <RequestFeed userBookings={bookings} activeDate={activeDate}/>
            </div>
        </div>
    )
}

export default AdminPanel