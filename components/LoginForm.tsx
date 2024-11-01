"use client"

import Link from 'next/link';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
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
                            className='border-2 border-black rounded-lg p-2'
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div className='flex flex-col'>
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            {...register("password", { required: "Password is required" })}
                            className='border-2 border-black rounded-lg p-2'
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
            
                    <button type="submit" className='form-button'>Submit</button>
                </form>
            </div>
            <p className="mt-10">Not registerd? Sign up <Link href="/signup" className="text-green-500">here</Link></p>
        </div>
    );
}

export default LoginForm
