import React, { useEffect } from 'react'

interface ApprovedMarketsProps {
    marketplaceName: string;
}

const ApprovedMarkets: React.FC<ApprovedMarketsProps> = ( { marketplaceName } ) => {

    console.log(marketplaceName);

    useEffect(() => {
        
    }, []);

    return (
        <div>
        
        </div>
    )
}

export default ApprovedMarkets
