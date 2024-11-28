import React from 'react'
import Image from 'next/image';

interface ReuqestTotalsProps {
    stat: number;
    icon: string;
    iconwidth: number;
}

const RequestTotals: React.FC<ReuqestTotalsProps> = ( { stat, icon, iconwidth } ) => {
    return (
        <div className="stat-card">
            <div className='flex'>
                <Image
                    src={`/assets/icons/${icon}-icon.png`}
                    alt="markets"
                    width={iconwidth}
                    height={30}
                    className='h-fit'
                />
                <div className='text-3xl font-bold mb-10 ml-2'>{stat}</div>
            </div>
            <div>Total number of accepted applications</div>
        </div>
    )
}

export default RequestTotals
