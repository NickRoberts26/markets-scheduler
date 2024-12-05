import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Marketplace {
    marketplaceName: string;
    abn: number;
    capacity: number;
    contactNumber: string;
    email: string;
}

interface MarketplaceProfileProps {
    marketplace: Marketplace;
    currentUid: string;
}

interface FormData {
    name: string;
    contactNumber: string;
    abn: number;
    capacity: number;
}

const MarketplaceProfile: React.FC<MarketplaceProfileProps> = ( { marketplace, currentUid } ) => {
    const [editing, setEditing] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
          const q = query(
            collection(db, 'marketplaces'),
            where("uid", "==", currentUid)
          );
  
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
              const docRef = querySnapshot.docs[0].ref;
              await updateDoc(docRef, {
                marketplaceName: data.name,
                contactNumber: data.contactNumber,
                abn: data.abn,
                capacity: data.capacity
              });
              location.reload();
          }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='border-2 border-black rounded-xl p-4 mt-6'>
                <h2 className='text-3xl mb-2'>Marketplace Profile</h2>
                {editing ? (
                    <form id="details-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className='flex flex-col'>
                            <label>Marketplace name</label>
                            <input 
                                {...register('name', { required: 'Marketplace Name is required' })}
                                defaultValue={marketplace?.marketplaceName}
                                className='form-field'
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="phone">Contact Number</label>
                            <input
                                id="contactNumber"
                                type="tel"
                                className='form-field'
                                defaultValue={marketplace?.contactNumber}
                                {...register('contactNumber', {
                                    required: 'Phone number is required',
                                    pattern: {
                                    value: /^[+]?[0-9]{10,14}$/,
                                    message: 'Invalid phone number format',
                                    },
                                })}
                            />
                            {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
                        </div>
                        
                        <div className='flex flex-col'>
                            <label>Capacity</label>
                            <input 
                                {...register('capacity', {
                                    required: 'Capacity is required',
                                    pattern: {
                                    value: /^([1-9][0-9]{0,2})$/,
                                    message: 'Invalid phone number format',
                                    },
                                })}
                                className='form-field'
                                defaultValue={marketplace?.capacity}
                            />
                            {errors.capacity && <p>{errors.capacity.message}</p>}
                        </div>

                        <div className='flex flex-col'>
                            <label>ABN</label>
                            <input 
                                {...register('abn', {
                                    required: 'ABN is required',
                                    pattern: {
                                    value: /^(\d *?){11}$/,
                                    message: 'Invalid ABN format',
                                    },
                                })}
                                className='form-field'
                                defaultValue={marketplace?.abn}
                            />
                            {errors.abn && <p>{errors.abn.message}</p>}
                        </div>

                    </form>
                ) : (
                    <div className=''>
                        <p className='text-xl mb-2'><strong>Marketplace Name:</strong> {marketplace?.marketplaceName}</p>
                        <p className='text-xl mb-2'><strong>Phone:</strong> {marketplace?.contactNumber}</p>
                        <p className='text-xl mb-2'><strong>ABN:</strong> {marketplace?.abn}</p>
                        <p className='text-xl mb-2'><strong>Capacity:</strong> {marketplace?.capacity}</p>
                    </div>
                )}
            </div>
            {editing ? (
                <div className='flex'>
                    <button type="submit" form="details-form" className='basic-button mt-4'>Submit</button>
                    <button onClick={() => {setEditing(false)}} className='basic-button mt-4 ml-4'>Cancel</button>
                </div>
            ) : (
                <button onClick={() => {setEditing(true)}} className='basic-button mt-4'>Edit Details</button>
            )}
        </>
    )
}

export default MarketplaceProfile
