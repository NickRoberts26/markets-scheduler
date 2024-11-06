import { useUserProfile } from '@/utils/useUserProfile';
import React, { useEffect, useState } from 'react'

const Profile: React.FC = () => {
    const { user, loading } = useUserProfile();

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>You are not logged in.</div>;
    }
  
    return (
      <div>
        <h1 className='text-5xl font-bold mb-8'>Your Profile</h1>
        <div className='border-2 border-black rounded-xl'>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      </div>
    );
};

export default Profile
