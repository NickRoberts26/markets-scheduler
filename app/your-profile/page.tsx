"use client"

import ActiveMarkets from '@/components/profile/ActiveMarkets';
import MarketRegistrationForm from '@/components/forms/MarketRegistrationForm';
import Profile from '@/components/profile/Profile';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const YourMarket: React.FC = () => {

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 px-16 py-10'>
                <h1 className='text-5xl font-bold mb-8'>Your Profile</h1>
                <div className='flex'>
                    <div className='w-[50%]'>
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
