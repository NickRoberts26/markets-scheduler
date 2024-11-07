import { auth, db } from '@/lib/firebase';
import { useUserProfile } from '@/utils/useUserProfile';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface Market {
  bio: string;
  marketName: string;
  productType: string;
}

const Profile: React.FC = () => {
    const [market, setMarket] = useState<Market | null>(null);
    const { user, loading } = useUserProfile();
    const currentUid = user?.uid;

    useEffect(() => {
      const fetchMarkets = async () => {
        try {
          if (currentUid) {
            const marketsRef = collection(db, 'markets');
            const q = query(marketsRef, where('ownerid', '==', currentUid));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              const doc = querySnapshot.docs[0]; // Only one document is expected
              setMarket(doc.data() as Market);
              console.log("Market found for this user.");
            } else {
              console.log("No market found for this user.");
            }
          }
        } catch (error) {
          console.log('Failed to load market data');
        }
      };
  
      if (currentUid) {
        fetchMarkets();
      }
    }, [currentUid]);

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>You are not logged in.</div>;
    }
  
    return (
      <div className='flex justify-between'>
        <div className='w-[48%]'>
          <h1 className='text-5xl font-bold mb-8'>Your Profile</h1>
          <div className='border-2 border-black rounded-xl p-4'>
            <div className='mb-8'>
              <h2 className='text-3xl mb-4 underline'>Personal Details</h2>
              <p className='text-xl mb-2'><strong>First Name:</strong> {user.firstName}</p>
              <p className='text-xl mb-2'><strong>Last Name:</strong> {user.lastName}</p>
              <p className='text-xl mb-2'><strong>Email:</strong> {user.email}</p>
              <p className='text-xl'><strong>Phone:</strong> {user.phone}</p>
              <button className='basic-button mr-4 mt-6'>Edit Details</button>
            </div>
            {market ? (
              <div>
                <h2 className='text-3xl mb-4 underline'>Market Details</h2>
                <p className='text-2xl mb-2'>{market.marketName}</p>
                <p className='text-xl mb-2 capitalize'><strong>Product Type:</strong> {market.productType}</p>
                <p className='text-xl'><strong>Bio:</strong> {market.bio}</p>
                <button className='basic-button mr-4 mt-6'>Edit Market</button>
              </div>
            ) : (
              <p>No market details available.</p>
            )}
          </div>
        </div>
      </div>
    );
};

export default Profile
