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
        <h1>Profile</h1>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    );
};

export default Profile
