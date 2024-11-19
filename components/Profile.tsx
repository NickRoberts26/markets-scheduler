import { auth, db } from '@/lib/firebase';
import { useUserProfile } from '@/utils/useUserProfile';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BeatLoader, ClipLoader } from 'react-spinners';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

interface Market {
  bio: string;
  marketName: string;
  productType: string;
}

interface DetailsFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const Profile: React.FC = () => {
    const [market, setMarket] = useState<Market | null>(null);
    const [editingDetails, setEditingDetails] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<DetailsFormData>();

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

    const onSubmit: SubmitHandler<DetailsFormData> = async (data) => {
      try {
        const q = query(
          collection(db, 'users'),
          where("uid", "==", currentUid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone
            });
            location.reload();
        }
      } catch (error) {
          console.log(error);
      }
    };

    if (loading) {
      return (
        <div className='w-[50%] flex items-center justify-center'>
          <BeatLoader
            size={20}
            color='#4caf50'
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      );
    }
  
    if (!user) {
      return <div>You are not logged in.</div>;
    }
  
    return (
      <div className='flex justify-between mb-10'>
        <div className='w-[95%]'>
          <div className='border-2 border-black rounded-xl p-4'>
            <h2 className='text-3xl mb-4 underline'>Personal Details</h2>
            {editingDetails ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-10">
                  <div className='flex items-center'>
                    <p className='text-xl w-[20%]'><strong>First Name:</strong></p>
                    <input 
                        {...register('firstName', { required: 'First Name is required' })}
                        placeholder='First Name'
                        defaultValue={user.firstName}
                        className='form-field ml-4 flex-1'
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                  </div>

                  <div className='flex items-center'>
                    <p className='text-xl w-[20%]'><strong>Last Name:</strong></p>
                    <input 
                        {...register('lastName', { required: 'Last Name is required' })}
                        defaultValue={user.lastName}
                        className='form-field ml-4 flex-1'
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                  </div>
      
                  <div className='flex items-center'>
                    <p className='text-xl w-[20%]'><strong>Email:</strong></p>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address',
                            },
                        })}
                        defaultValue={user.email}
                        className='form-field ml-4 flex-1'
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>

                  <div className='flex items-center'>
                    <p className='text-xl w-[20%]'><strong>Phone:</strong></p>
                    <input
                        id="phone"
                        type="tel"
                        className='form-field ml-4 flex-1'
                        defaultValue={user.phone}
                        {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                            value: /^[+]?[0-9]{10,14}$/,
                            message: 'Invalid phone number format',
                            },
                        })}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                  </div>

                  <button type="submit" className='form-button'>{loading ? <ClipLoader size={15} color={"#000"} /> : 'Submit'}</button>
              </form>
            ) : (
              <div className='mb-8'>
                <p className='text-xl mb-2'><strong>First Name:</strong> {user.firstName}</p>
                <p className='text-xl mb-2'><strong>Last Name:</strong> {user.lastName}</p>
                <p className='text-xl mb-2'><strong>Email:</strong> {user.email}</p>
                <p className='text-xl'><strong>Phone:</strong> {user.phone}</p>
                <button onClick={() => setEditingDetails(true)} className='basic-button mr-4 mt-6'>Edit Details</button>
              </div>
            )}
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
