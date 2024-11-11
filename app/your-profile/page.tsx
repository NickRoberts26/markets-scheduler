"use client"

import ActiveMarkets from '@/components/ActiveMarkets';
import MarketRegistrationForm from '@/components/forms/MarketRegistrationForm';
import Profile from '@/components/Profile';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const YourMarket: React.FC = () => {

    return (
        <div className='flex h-screen max-h-screen'>
            <Sidebar />
            <div className='flex-1 px-16 py-10'>
                <h1 className='text-5xl font-bold mb-8'>Your Profile</h1>
                <div className='flex'>
                    <Profile />
                    <ActiveMarkets />
                </div>
            </div>
        </div>
    )
}

export default YourMarket
