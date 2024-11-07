"use client"

import MarketRegistrationForm from '@/components/forms/MarketRegistrationForm';
import Profile from '@/components/Profile';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const YourMarket: React.FC = () => {

    return (
        <div className='flex h-screen max-h-screen'>
            <Sidebar />
            <div className='flex-1 px-16 py-10'>
                <Profile />
            </div>
        </div>
    )
}

export default YourMarket
