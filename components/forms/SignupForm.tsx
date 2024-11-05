"use client"

import { useState } from "react";
import Link from 'next/link';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import ClipLoader from "react-spinners/ClipLoader";

interface FormData {
    name: string;
    email: string;
    password: string;
    phone: string;
}

const SignupForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const auth = getAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            await addDoc(collection(db, "users"), {
                uid: user.uid, 
                fullName: data.name,
                email: data.email,
                phone: data.phone,
                createdAt: new Date(),
            });
            router.push('/login');
          } catch (error) {
            console.error("Error registering user: ", error);
            alert("Failed to register user. Please try again.");
          } finally {
            setLoading(false);
          }
    };

    return (
        <div className="border-2 border-black rounded-xl p-6 mx-20">
            <div className="text-3xl mb-6">Signup</div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='flex flex-col'>
                        <label>Full name</label>
                        <input 
                            {...register('name', { required: 'Name is required' })}
                            placeholder='Full name'
                            className='form-field'
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
        
                    <div className='flex flex-col'>
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

                    <div className='flex flex-col'>
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            id="phone"
                            type="tel"
                            className='form-field'
                            placeholder='0000000000'
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

                    <button type="submit" className='form-button'>{loading ? <ClipLoader size={15} color={"#000"} /> : 'Submit'}</button>
                </form>
            </div>
            <p className="mt-10">Already registered? Login <Link href="/login" className="text-green-500">here</Link></p>
        </div>
    );
}

export default SignupForm
