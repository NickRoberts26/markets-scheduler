"use client"

import MarketRegistrationForm from '@/components/forms/MarketRegistrationForm';
import Sidebar from '@/components/Sidebar';

const YourMarket: React.FC = () => {

    return (
        <div className='flex h-screen max-h-screen'>
            <Sidebar />
            <MarketRegistrationForm />
        </div>
    )
}

export default YourMarket
