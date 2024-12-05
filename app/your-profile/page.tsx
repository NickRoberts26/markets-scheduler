"use client"

import ActiveMarkets from '@/components/profile/ActiveMarkets';
import MarketRegistrationForm from '@/components/forms/MarketRegistrationForm';
import Profile from '@/components/profile/Profile';
import Sidebar from '@/components/Sidebar';

const YourMarket: React.FC = () => {

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 px-6 pt-24 lg:px-10 lg:py-8'>
                <h1 className='text-3xl lg:text-5xl font-bold mb-8'>Your Profile</h1>
                <div className='flex flex-col lg:flex-row'>
                    <div className='w-full lg:w-[50%]'>
                        <Profile />
                        <MarketRegistrationForm />
                    </div>
                    <ActiveMarkets />
                </div>
            </div>
        </div>
    )
}

export default YourMarket
