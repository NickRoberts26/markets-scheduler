"use client"

import useAuth from '@/auth/useAuth';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import Image from "next/image";
import Link from 'next/link';

interface FormData {
    marketName: string;
    productType: string;
    bio?: string;
}

const MarketRegistrationForm: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const { user } = useAuth();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {

            await addDoc(collection(db, "markets"), {
                ownerid: user?.uid, 
                marketName: data.marketName,
                productType: data.productType,
                bio: data?.bio,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error("Error registering market: ", error);
            alert("Failed to register market. Please try again.");
        }
    };

    return (
        <div>
            <h1 className='text-5xl font-bold mb-8'>Market Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[60%]">
                <div className='flex flex-col'>
                    <label className='mb-2'>Market Name</label>
                    <input 
                        {...register('marketName', { required: 'Market Name is required' })}
                        placeholder='Market Name'
                        className='form-field'
                    />
                    {errors.marketName && <p>{errors.marketName.message}</p>}
                </div>

                <div className='flex flex-col'>
                    <label className='mb-2'>Product Type</label>
                    <select
                        id="type"
                        className='form-field'
                        {...register('productType', { required: 'Product Type is required' })}
                    >
                        <option value="">Select a product type</option>
                        <option value="candles-fragrance-aroma">Candles/Fragrance/Aroma & Gift Items</option>
                        <option value="fashion-seocondhand">Fashion (Secondhand)</option>
                        <option value="fashion-new">Fashion (New Products)</option>
                        <option value="hand-crafts">Hand Crafts</option>
                        <option value="homewares">Homewares</option>
                        <option value="jewellery">Jewellery</option>
                        <option value="fitness">Fitness/Life Style</option>
                        <option value="pet-care">Pet Care</option>
                        <option value="prints-frames">Prints & Frames</option>
                    </select>
                    {errors.productType && <p>{errors.productType.message}</p>}
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
        
                <button type="submit" className='form-button'>Submit</button>
            </form>
        </div>
    )
}

export default MarketRegistrationForm
