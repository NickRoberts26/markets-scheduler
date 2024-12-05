"use client"

import { db } from "@/lib/firebase";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import Image from 'next/image';
import Link from "next/link";
import emailjs from "emailjs-com";
import { useUserProfile } from "@/utils/useUserProfile";

interface FormData {
    marketplace: string;
    date: string;
    size: string;
    message?: string;
}

interface Marketplace {
    id: string;
    marketplaceName: string;
    type: string;
    currentDates: string[];
}

const ShortTermForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
    const [selectedMarketplace, setSelectedMarketplace] = useState<string>("");
    const [currentDates, setCurrentDates] = useState<string[]>([]);
    const [booked, setBooked] = useState<boolean>(false);

    const { user } = useUserProfile();

    const sendConfirmationEmail = async (data: FormData, bookingId: string) => {
        try {
            const emailParams = {
                to_name: user?.firstName,
                user_email: user?.email,
                booking_date: data.date,
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
                    where('type', '==', 'short')
                );
                const querySnapshot = await getDocs(marketplacesQuery);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    marketplaceName: doc.data().marketplaceName as string,
                    type: doc.data().type as string,
                    currentDates: doc.data().currentDates as string[]
                }));
                setMarketplaces(data);
            } catch (error) {
                console.error("Error fetching marketplaces:", error);
            }
        };
    
        fetchMarketplaces();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = event.target.value;
        setSelectedMarketplace(selectedName);
    
        const selectedMarket = marketplaces.find((market) => market.marketplaceName === selectedName);
        console.log(selectedMarket);
        if (selectedMarket) {
          setCurrentDates(selectedMarket.currentDates || []); // Update currentDates state
        }
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const bookingId = uuidv4();
        try {
            await addDoc(collection(db, "bookings"), {

                bookingId: bookingId,
                userId: user?.uid, 
                marketplace: data.marketplace,
                date: data.date,
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
                <div className="flex flex-col items-center justify-center text-center h-screen">
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
                        <img src="/assets/left-arrow.png" alt="" className="w-6 lg:w-10 mr-2"/>
                    </Link>
                    <h1 className='text-3xl lg:text-5xl font-bold mb-8 mt-8 lg:mt-0'>One-time Market Application</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className='flex flex-col'>
                            <label className='mb-2'>Available Markets</label>
                            <select
                                id="type"
                                className='form-field'
                                {...register('marketplace', { required: 'Market is required' })}
                                onChange={(event) => {
                                    register('marketplace').onChange(event); // Handle form registration
                                    handleSelectChange(event); // Call custom handler
                                }}
                            >
                                <option value="">Select a Marketplace</option>
                                {marketplaces.map((marketplace) => (
                                    <option key={marketplace.id} value={marketplace.marketplaceName}>{marketplace.marketplaceName}</option>
                                ))}
                            </select>
                            {errors.marketplace && <p className='text-red-500'>{errors.marketplace.message}</p>}
                        </div>

                        <div className='flex flex-col'>
                            <select
                                id="type"
                                className='form-field'
                                {...register('date', { required: 'Date is required' })}
                                disabled={!selectedMarketplace}
                            >
                                <option value="">Select available date</option>
                                {currentDates.map((date, index) => (
                                    <option key={index} value={date}>{date}</option> // Populate dates dynamically
                                ))}

                            </select>
                            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
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
                            {errors.size && <p className='text-red-500'>{errors.size.message}</p>}
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
                            {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
                        </div>
                
                        <button type="submit" className='form-button'>Submit</button>
                    </form>
                </>
            )}
        </div>
    )
}

export default ShortTermForm