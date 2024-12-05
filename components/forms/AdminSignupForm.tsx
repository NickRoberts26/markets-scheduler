"use client"

import { useState } from "react";
import Link from 'next/link';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import ClipLoader from "react-spinners/ClipLoader";

interface FormData {
    email: string;
    password: string;
    contactNumber: string;
    name: string;
    type: string;
    capacity: number;
    abn: number;
}

const AdminSignupForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const auth = getAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            await addDoc(collection(db, "marketplaces"), {
                uid: user.uid,
                marketplaceName: data.name,
                type: data.type,
                capacity: data.capacity,
                email: data.email,
                contactNumber: data.contactNumber,
                abn: data.abn,
                createdAt: new Date(),
            });

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                marketplaceName: data.name,
                email: data.email,
                phone: data.contactNumber,
                role: 'admin',
                createdAt: new Date(),
            });

            await updateProfile(user, {
                displayName: data.name,
            });

            router.push('/login');
        } catch (error) {
            console.error("Error registering admin user: ", error);
            alert("Failed to register admin user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-2 border-black rounded-xl p-4 lg:mx-10">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='flex flex-col'>
                        <label>Marketplace name</label>
                        <input 
                            {...register('name', { required: 'Marketplace Name is required' })}
                            placeholder='Marketplace Name'
                            className='form-field'
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className="flex justify-between">
                        <div className='flex flex-col w-[48%]'>
                            <label>Email</label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                                placeholder='Email'
                                className='form-field'
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>

                        <div className='flex flex-col w-[48%]'>
                            <label htmlFor="phone">Contact Number</label>
                            <input
                                id="contactNumber"
                                type="tel"
                                className='form-field'
                                placeholder='0000000000'
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
                    </div>

                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                            className='form-field'
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    
                    <div className="flex justify-between">
                        <div className='flex flex-col w-[48%]'>
                            <label>Marketplace Type</label>
                            <select
                                id="type"
                                className='form-field'
                                {...register('type', { required: 'Type is required' })}
                            >
                                <option value="">Select a type</option>
                                <option value="short">Short (Single market applications)</option>
                                <option value="long">Long (Longterm applications)</option>
                            </select>
                            {errors.type && <p>{errors.type.message}</p>}
                        </div>

                        <div className='flex flex-col w-[48%]'>
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
                            />
                            {errors.capacity && <p>{errors.capacity.message}</p>}
                        </div>
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
                            placeholder="51 824 753 556"
                        />
                        {errors.abn && <p>{errors.abn.message}</p>}
                    </div>

                    <button type="submit" className='form-button'>{loading ? <ClipLoader size={15} color={"#000"} /> : 'Submit'}</button>
                </form>
            </div>
            <p className="mt-8">Already registered? Login <Link href="/login" className="text-green-500">here</Link></p>
        </div>
    );
}

export default AdminSignupForm

