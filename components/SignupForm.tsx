"use client"

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className='border'>
                <label>Name:</label>
                <input {...register('name', { required: 'Name is required' })} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
    
            <div className='border'>
                <label>Email:</label>
                <input
                type="email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address',
                    },
                })}
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
    
            <button type="submit">Submit</button>
        </form>
    );
}

export default SignupForm
