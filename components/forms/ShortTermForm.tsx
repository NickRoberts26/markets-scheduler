"use client"

import { db } from "@/lib/firebase";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import useAuth from "@/auth/useAuth";
import {v4 as uuidv4} from 'uuid';

interface FormData {
    marketplace: string;
    date: string;
    message?: string;
}

interface Marketplace {
    id: string;
    name: string;
    type: string;
    currentDates: string[];
}

const ShortTermForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
    const [selectedMarketplace, setSelectedMarketplace] = useState<string>("");
    const [currentDates, setCurrentDates] = useState<string[]>([]);
    const [booked, setBooked] = useState<boolean>(false);

    const { user } = useAuth();
    
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
                    name: doc.data().name as string,
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
    
        const selectedMarket = marketplaces.find((market) => market.name === selectedName);
        console.log(selectedMarket);
        if (selectedMarket) {
          setCurrentDates(selectedMarket.currentDates || []); // Update currentDates state
        }
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        let bookingId = uuidv4();
        try {
            await addDoc(collection(db, "bookings"), {

                bookingId: bookingId,
                userId: user?.uid, 
                marketplace: data.marketplace,
                date: data.date,
                message: data.message,
                createdAt: new Date(),

            });
            setBooked(true);
        } catch (error) {
            console.error("Error registering booking: ", error);
            alert("Failed to register booking. Please try again.");
        }
    };

    return (
        <div className="w-full">
            {booked ? (
                <p>Booked!</p>
            ) : (
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
                                <option key={marketplace.id} value={marketplace.name}>{marketplace.name}</option>
                            ))}
                        </select>
                        {errors.marketplace && <p>{errors.marketplace.message}</p>}
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
                        {errors.date && <p>{errors.date.message}</p>}
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-2'>Message</label>
                        <textarea
                            id="message"
                            {...register('message')}
                            placeholder='Leave a message for any additional info.'
                            className='form-field'
                        />
                        {errors.message && <p>{errors.message.message}</p>}
                    </div>
            
                    <button type="submit" className='form-button'>Submit</button>
                </form>
            )}
        </div>
    )
}

export default ShortTermForm