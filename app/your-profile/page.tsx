"use client"

import MarketRegistrationForm from '@/components/forms/MarketRegistrationForm';
import Profile from '@/components/Profile';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const YourMarket: React.FC = () => {

    const [registerMarket, setRegisterMarket] = useState(false);

    return (
        <div className='flex h-screen max-h-screen'>
            <Sidebar />
            <div className='flex-1 px-16 py-10'>
                <Profile />
                <div className='flex my-8'>
                    <button className='basic-button mr-4'>Edit Profile</button>
                    <button onClick={() => setRegisterMarket(true)} className='basic-button'>Register Market</button>
                </div>
                {registerMarket ? <MarketRegistrationForm /> : <></>}
            </div>
        </div>
    )
}

export default YourMarket
