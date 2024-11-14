"use client"

import { db } from "@/lib/firebase";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import useAuth from "@/auth/useAuth";
import {v4 as uuidv4} from 'uuid';
import Image from 'next/image';
import Link from "next/link";
import emailjs from "emailjs-com";
import { useUserProfile } from "@/utils/useUserProfile";

interface FormData {
    marketplace: string;
    bookingPeriod: string;
    size: string;
    abn: number;
    message?: string;
}

interface Marketplace {
    id: string;
    name: string;
    type: string;
}

const LongTermForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
    const [booked, setBooked] = useState<boolean>(false);

    const { user } = useUserProfile();

    const sendConfirmationEmail = async (data: FormData, bookingId: string) => {
        try {
            const emailParams = {
                to_name: user?.firstName,
                user_email: user?.email,
                booking_period: data.bookingPeriod,
                marketplace_name: data.marketplace,
                booking_id: bookingId
            };
    
            await emailjs.send(
                "service_qytpg0m", //Service ID
                "template_91awnbe", //Template ID
                emailParams,
                "F0ZN2oeeu7noId2TR" //Public Key
            );
        } catch (error) {
            console.error("Error sending email:", error);
        }
      };
    
    useEffect(() => {
        const fetchMarketplaces = async () => {
            try {
                const marketplacesQuery = query(
                    collection(db, 'marketplaces'),
                    where('type', '==', 'long')
                );
                const querySnapshot = await getDocs(marketplacesQuery);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name as string,
                    type: doc.data().type as string,
                }));
                setMarketplaces(data);
            } catch (error) {
                console.error("Error fetching marketplaces:", error);
            }
        };
    
        fetchMarketplaces();
    }, []);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        let bookingId = uuidv4();
        try {
            await addDoc(collection(db, "bookings"), {

                bookingId: bookingId,
                userId: user?.uid, 
                marketplace: data.marketplace,
                bookingPeriod: data.bookingPeriod,
                abn: data.abn,
                message: data.message,
                createdAt: new Date(),
                status: 'Awaiting Confirmation'

            });
            setBooked(true);
            sendConfirmationEmail(data, bookingId);
        } catch (error) {
            console.error("Error registering booking: ", error);
            alert("Failed to register booking. Please try again.");
        }
    };

    return (
        <div className="w-full">
            {booked ? (
                <div className="flex flex-col items-center justify-center">
                    <Image
                        src='/assets/very-nice.gif'
                        alt="markets"
                        width={1000}
                        height={1000}
                        className="w-40 mb-6"
                    />
                    <h2 className="text-4xl mb-2">Booking request sent!</h2>
                    <p className="text-lg">You will receive confirmation from Market organisers soon.</p>
                    <div className="flex">
                        <Link href="/your-profile" className='basic-button mr-2 mt-6'>View in Profile</Link>
                        <Link href="/" className='basic-button ml-2 mt-6'>Back to home</Link>
                    </div>
                </div>
            ) : (
                <>
                    <Link href="/" className='absolute top-0 left-0'>
                        <img src="/assets/left-arrow.png" alt="" className="w-10 mr-2"/>
                    </Link>
                    <h1 className='text-5xl font-bold mb-8'>Long-term Market Application</h1>
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
                                id="booking-period"
                                className='form-field'
                                {...register('bookingPeriod', { required: 'Booking period is required' })}
                            >
                                <option value="">Select booking period</option>
                                <option value="6-months">6 months</option>
                                <option value="12-months">12 months</option>
                                <option value="12-months-plus">12 months +</option>
                            </select>
                            {errors.bookingPeriod && <p>{errors.bookingPeriod.message}</p>}
                        </div>

                        <div className='flex flex-col'>
                            <select
                                id="size"
                                className='form-field'
                                {...register('size', { required: 'Size is required' })}
                            >
                                <option value="">Select stall size</option>
                                <option value="Small">Small (1.8m x 2.4m)</option>
                                <option value="Medium">Medium (2.4m x 2.4m)</option>
                                <option value="Large">Large (3.0m x 3.0m)</option>

                            </select>
                            {errors.size && <p>{errors.size.message}</p>}
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

                        <div className='flex flex-col py-4'>
                            <label className='mb-2'>Message</label>
                            <textarea
                                id="message"
                                {...register('message')}
                                placeholder='Leave a message for any additional info.'
                                className='form-field'
                                rows={4}
                            />
                            {errors.message && <p>{errors.message.message}</p>}
                        </div>
                
                        <button type="submit" className='form-button'>Submit</button>
                    </form>
                </>
            )}
        </div>
    )
}

export default LongTermForm