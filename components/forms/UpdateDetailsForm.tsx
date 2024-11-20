'use client'

import { db } from '@/lib/firebase';
import { useUserProfile } from '@/utils/useUserProfile';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const UpdateDetailsForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
    });

    const { user, loading } = useUserProfile();
    const currentUid = user?.uid;

    useEffect(() => {
        if (user) {
            // Use `reset` to set all values at once
            reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user, reset]);

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

    if (!user) {
        return <div>You are not logged in.</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-10">
            <div className='flex items-center'>
            <p className='text-xl w-[20%]'><strong>First Name:</strong></p>
            <input 
                {...register('firstName', { required: 'First Name is required' })}
                className='form-field ml-4 flex-1'
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>

            <div className='flex items-center'>
            <p className='text-xl w-[20%]'><strong>Last Name:</strong></p>
            <input 
                {...register('lastName', { required: 'Last Name is required' })}
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
    )
}

export default UpdateDetailsForm