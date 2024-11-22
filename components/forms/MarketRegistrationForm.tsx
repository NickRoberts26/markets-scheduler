"use client"

import useAuth from '@/auth/useAuth';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import Image from "next/image";
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

interface FormData {
    marketName: string;
    productType: string;
    bio?: string;
}

const MarketRegistrationForm: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const { user } = useAuth();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        try {

            await addDoc(collection(db, "markets"), {
                ownerid: user?.uid, 
                marketName: data.marketName,
                productType: data.productType,
                bio: data?.bio,
                createdAt: new Date(),
            });

            location.reload();
        } catch (error) {
            console.error("Error registering market: ", error);
            alert("Failed to register market. Please try again.");
        }
    };

    return (
        <div className='w-[95%]'>
            <h1 className='text-5xl font-bold mb-8'>Market Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className='flex flex-col'>
                    <label className='mb-2'>Market Name</label>
                    <input 
                        {...register('marketName', { required: 'Market Name is required' })}
                        placeholder='Market Name'
                        className='form-field'
                    />
                    {errors.marketName && <p className='text-red-500'>{errors.marketName.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <label className='mb-2'>Product Type</label>
                    <select
                        id="type"
                        className='form-field'
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
                    {errors.productType && <p className='text-red-500'>{errors.productType.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <label className='mb-2'>Bio</label>
                    <textarea
                        id="bio"
                        {...register('bio')}
                        placeholder='Say a little about your stall!'
                        className='form-field'
                    />
                    {errors.bio && <p>{errors.bio.message}</p>}
                </div>
        
                <button type="submit" className='form-button'>{loading ? <ClipLoader size={15} color={"#000"} /> : 'Submit'}</button>
            </form>
        </div>
    )
}

export default MarketRegistrationForm
