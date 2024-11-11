"use client"

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "@/lib/firebase";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface FormData {
    email: string;
    password: string;
    marketplace: string;
    date: string;
    message?: string;
}

interface Marketplace {
    id: string;
    name: string;
    type: string;
}

const ShortTermForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter();

    const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
    };
    
    useEffect(() => {
        const fetchMarketplaces = async () => {
            try {
                const marketplacesQuery = query(
                    collection(db, 'marketplaces'),
                    where('type', '==', 'short')
                );
                const querySnapshot = await getDocs(marketplacesQuery);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name as string,
                    type: doc.data().type as string
                }));
                setMarketplaces(data);
            } catch (error) {
                console.error("Error fetching marketplaces:", error);
            }
        };
    
        fetchMarketplaces();
      }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div className='flex flex-col'>
                    <label className='mb-2'>Available Markets</label>
                    <select
                        id="type"
                        className='form-field'
                        {...register('marketplace', { required: 'Market is required' })}
                    >
                        <option value="">Select a Marketplace</option>
                        {marketplaces.map((marketplace) => (
                            <option key={marketplace.id} value={marketplace.name}>{marketplace.name}</option>
                        ))}
                    </select>
                    {errors.marketplace && <p>{errors.marketplace.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <select
                        id="type"
                        className='form-field'
                        {...register('date', { required: 'Date is required' })}
                    >
                        <option value="">Select available date</option>
                        <option value="11/11/2024">11/11/2024</option>
                        <option value="18/11/2024">18/11/2024</option>
                    </select>
                    {errors.date && <p>{errors.date.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <label className='mb-2'>Message</label>
                    <textarea
                        id="message"
                        {...register('message')}
                        placeholder='Leave a message for any additional info.'
                        className='form-field'
                    />
                    {errors.message && <p>{errors.message.message}</p>}
                </div>
        
                <button type="submit" className='form-button'>Submit</button>
            </form>
        </div>
    )
}

export default ShortTermForm
