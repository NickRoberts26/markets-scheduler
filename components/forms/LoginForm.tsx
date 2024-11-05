"use client"

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="border-2 border-black rounded-xl p-6 mx-20">
            <div className="text-3xl mb-6">Login</div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='flex flex-col'>
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
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            {...register("password", { required: "Password is required" })}
                            className='form-field'
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
            
                    <button type="submit" className='form-button'>{loading ? <ClipLoader size={15} color={"#000"} /> : 'Login'}</button>
                </form>
            </div>
            <p className="mt-10">Not registerd? Sign up <Link href="/signup" className="text-green-500">here</Link></p>
        </div>
    );
}

export default LoginForm
