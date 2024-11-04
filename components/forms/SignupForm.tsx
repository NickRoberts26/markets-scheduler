"use client"

import Link from 'next/link';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

interface FormData {
    name: string;
    email: string;
    phone: number;
}

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
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
                    <button type="submit" className='form-button'>Submit</button>
                </form>
            </div>
            <p className="mt-10">Already registerd? Login <Link href="/login" className="text-green-500">here</Link></p>
        </div>
    );
}

export default SignupForm
