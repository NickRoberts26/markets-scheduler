"use client"

import { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

interface FormData {
    marketName: string;
    productType: string;
    logo?: FileList;
    bio?: string;
}

const MarketRegistrationForm = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Submitted data:", data);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='flex-1 px-16 py-10'>
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

                <div className='flex flex-col'>
                    <label className='mb-2'>Upload Logo</label>
                    <input
                        id="logo"
                        type="file"
                        accept="image/*"
                        {...register('logo', {
                            validate: {
                            acceptedFormats: (files) =>
                                files && files[0].type.startsWith("image/") || "Only image files are allowed",
                            fileSize: (files) =>
                                files && files[0].size < 5 * 1024 * 1024 || "Image size should be less than 5MB",
                            },
                        })}
                        onChange={handleImageChange}
                    />
                    {errors.logo && <p>{errors.logo.message}</p>}
                </div>

                {imagePreview && <img src={imagePreview} alt="Image Preview" width={200} />}
        
                <button type="submit" className='form-button'>Submit</button>
            </form>
        </div>
    )
}

export default MarketRegistrationForm
