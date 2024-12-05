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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketName: string;
  productType: string;
  bio: string;
}

const Profile: React.FC = () => {
    const [market, setMarket] = useState<Market | null>(null);
    const [editing, setEditing] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

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

    const onSubmit: SubmitHandler<FormData> = async (data) => {
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
        <div className='lg:w-[95%]'>
          <div className='border-2 border-black rounded-xl p-4 relative'>
            <h2 className='text-2xl lg:text-3xl mb-4 underline'>Personal Details</h2>
            {editing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
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

                  <h2 className='text-2xl lg:text-3xl mb-4 underline'>Market Details</h2>

                  <div className='flex items-center'>
                    <p className='text-xl w-[20%]'><strong>Name:</strong></p>
                    <input 
                        {...register('marketName', { required: 'Market Name is required' })}
                        defaultValue={market?.marketName}
                        className='form-field ml-4 flex-1'
                    />
                    {errors.marketName && <p>{errors.marketName.message}</p>}
                  </div>

                  <div className='flex items-center'>
                    <p className='text-xl w-[20%]'><strong>Product:</strong></p>
                    <select
                        id="type"
                        className='form-field ml-4 flex-1'
                        defaultValue={market?.productType}
                        {...register('productType', { required: 'Product Type is required' })}
                    >
                        <option value="">Select a product type</option>
                        <option value="Candles/Fragrance/Aroma">Candles/Fragrance/Aroma & Gift Items</option>
                        <option value="Fashion(Secondhand)">Fashion (Secondhand)</option>
                        <option value="Fashion(New)">Fashion (New Products)</option>
                        <option value="Hand Crafts">Hand Crafts</option>
                        <option value="Homewares">Homewares</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Fitness">Fitness/Life Style</option>
                        <option value="Pet Care">Pet Care</option>
                        <option value="Prints/Frames">Prints & Frames</option>
                    </select>
                    {errors.productType && <p>{errors.productType.message}</p>}
                  </div>

                  <div className='flex items-center'>
                    <p className='text-xl w-[20%]'><strong>Bio:</strong></p>
                    <textarea
                        id="bio"
                        {...register('bio')}
                        defaultValue={market?.bio}
                        className='form-field ml-4 flex-1'
                    />
                    {errors.bio && <p>{errors.bio.message}</p>}
                  </div>

                  <button type="submit" className='form-button'>{loading ? <ClipLoader size={15} color={"#000"} /> : 'Submit'}</button>
              </form>
            ) : (
              <>
                <div className='mb-8'>
                  <p className='text-xl mb-2'><strong>First Name:</strong> {user.firstName}</p>
                  <p className='text-xl mb-2'><strong>Last Name:</strong> {user.lastName}</p>
                  <p className='text-xl mb-2'><strong>Email:</strong> {user.email}</p>
                  <p className='text-xl'><strong>Phone:</strong> {user.phone}</p>
                </div>
                {market ? (
                  <div>
                    <h2 className='text-2xl lg:text-3xl mb-4 underline'>Market Details</h2>
                    <p className='text-xl lg:text-2xl mb-2'>{market.marketName}</p>
                    <p className='text-xl mb-2 capitalize'><strong>Product Type:</strong> {market.productType}</p>
                    <p className='text-xl'><strong>Bio:</strong> {market.bio}</p>
                  </div>
                ) : (
                  <p>No market details available.</p>
                )}
                <button onClick={() => setEditing(true)} className='basic-button absolute top-4 right-4'>Edit Profile</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default Profile
