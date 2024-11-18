import React from 'react'
import SingleRequest from './SingleRequest';

interface Booking {
    date: string;
    marketplace: string;
    message: string;
    userId: string;
    status: string;
    bookingId: string;
}

interface RequestFeedProps {
    userBookings: Booking[];
}

const RequestFeed: React.FC<RequestFeedProps> = ({ userBookings }) => {

    return (
        <div className='border border-black p-4 rounded-xl'>
            <div className='flex mb-4'>
                <h2 className='w-[25%] font-bold text-lg'>Market Name</h2>
                <h2 className='w-[15%] font-bold text-lg'>Product</h2>
                <h2 className='w-[15%] font-bold text-lg'>Requested Date</h2>
                <h2 className='w-[15%] font-bold text-lg'>Status</h2>
            </div>
            <div className='[&>*:nth-child(odd)]:bg-gray-200'>
                {userBookings.map((booking, _) => {
                    return <SingleRequest key={booking.bookingId} date={booking.date} status={booking.status} userId={booking.userId}  />
                })}
            </div>
        </div>
    )
}

export default RequestFeed
