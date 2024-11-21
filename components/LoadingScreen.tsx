import React from 'react'
import { BeatLoader } from 'react-spinners'

const LoadingScreen = () => {
    return (
        <div className='flex h-[100vh] justify-center items-center'>
            <BeatLoader
            size={20}
            color='#4caf50'
            aria-label="Loading Spinner"
            data-testid="loader"
            />
        </div>
    )
}

export default LoadingScreen
