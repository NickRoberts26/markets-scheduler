import React from 'react'

interface Marketplace {
    currentDates: string[];
}

interface ScheduledDatesProps {
    marketplace: Marketplace;
}

const ScheduledDates: React.FC<ScheduledDatesProps> = ( { marketplace } ) => {
    return (
        <>
            <div className='border-2 border-black rounded-xl p-4 mt-6'>
                <h2 className='text-3xl mb-2'>Scheduled Dates</h2>
                {marketplace?.currentDates.map((date, index) => (
                    <p key={index}>{date}</p>
                ))}
            </div>
            <button className='basic-button mt-4'>Edit Dates</button>
        </>
    )
}

export default ScheduledDates
