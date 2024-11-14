import React from 'react'
import Image from 'next/image';

const AdminPanel = () => {
    return (
        <div className='px-16 py-10'>
            <h1 className='text-5xl mb-8'>Welcome, Admin</h1>
            <h2 className='text-xl mb-4'>Current Dates</h2>
            <div className='flex mb-8'>
                <div className='date-pill'>
                    <div>16/11/24</div>
                </div>
                <div className='date-pill'>
                    <div>23/11/24</div>
                </div>
                <div className='date-pill'>
                    <div>30/11/24</div>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="stat-card">
                    <div className='flex'>
                        <Image
                            src='/assets/icons/calender-icon.png'
                            alt="markets"
                            width={40}
                            height={30}
                            className='h-fit'
                        />
                        <div className='text-3xl font-bold mb-10 ml-2'>80</div>
                    </div>
                    <div>Total number of accepted applications</div>
                </div>
                <div className="stat-card">
                    <div className='flex'>
                        <Image
                            src='/assets/icons/pending-icon.png'
                            alt="markets"
                            width={35}
                            height={30}
                            className='h-fit'
                        />
                        <div className='text-3xl font-bold mb-10 ml-2'>10</div>
                    </div>
                    <div>Total number of pending applications</div>
                </div>
                <div className="stat-card">
                    <div className='flex'>
                        <Image
                            src='/assets/icons/denied-icon.png'
                            alt="markets"
                            width={32}
                            height={30}
                            className='h-fit'
                        />
                        <div className='text-3xl font-bold mb-10 ml-2'>0</div>
                    </div>
                    <div>Total number of rejected applications</div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
