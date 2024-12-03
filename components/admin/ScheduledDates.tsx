import { db } from '@/lib/firebase';
import { DateSorter } from '@/utils/dateSorter';
import { arrayRemove, arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Marketplace {
    currentDates: any[];
}

interface ScheduledDatesProps {
    marketplace: Marketplace;
    currentUid: string;
}

type FormData = {
    startDate: Date | null;
};

const ScheduledDates: React.FC<ScheduledDatesProps> = ( { marketplace, currentUid } ) => {
    const [editing, setEditing] = useState(false);
    const [theDates, setTheDates] = useState<string[]>([]);
    const { control, handleSubmit } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log('Form Submitted:', data);
        try {
            const q = query(
                collection(db, 'marketplaces'),
                where("uid", "==", currentUid)
            );
    
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;

                if(data.startDate instanceof Date) {
                    const isoDate = data.startDate?.toISOString();
                    const date = new Date(isoDate);
    
                    const formattedDate = new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    }).format(date);
    
                    await updateDoc(docRef, {
                        currentDates: arrayUnion(formattedDate),
                      });
                    location.reload();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const shouldRemove = confirm(`Are you sure you want to delete ${event.currentTarget.id}?`)
        if(shouldRemove) {
            const selectedDate = event.currentTarget.id; // Get the clicked date's ID
            try {
                const q = query(
                    collection(db, 'marketplaces'),
                    where("uid", "==", currentUid)
                );
        
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const docRef = querySnapshot.docs[0].ref;
        
                    // Remove the selected date from Firestore
                    await updateDoc(docRef, {
                        currentDates: arrayRemove(selectedDate),
                    });
        
                    // Update the local state by filtering out the deleted date
                    setTheDates((prevDates) => prevDates.filter((date) => date !== selectedDate));
                }
            } catch (error) {
                console.error('Error deleting date:', error);
            }
        }
    };

    useEffect(() => {
        const sortedDates = DateSorter(marketplace?.currentDates);
        
        setTheDates(sortedDates);
    }, [marketplace?.currentDates])

    return (
        <>
            <div className='border-2 border-black rounded-xl p-4 mt-6'>
                <h2 className='text-3xl mb-2'>Scheduled Dates</h2>
                {editing ? (
                    <>
                        {theDates.map((date, index) => (
                            <div key={date} className='flex items-center mb-4'>
                                <p className='text-lg'>{date}</p>
                                <button id={date} onClick={handleClick} className='basic-button ml-6'>Delete</button>
                            </div>
                        ))}
                        <form id="dates-form" className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1' htmlFor="startDate">Select new Date</label>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    defaultValue={null}
                                    render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Select date"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="dd/MM/yy"
                                        className='form-field '
                                    />
                                    )}
                                />
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        {theDates.map((date, index) => (
                            <p className='text-lg' key={index}>{date}</p>
                        ))}
                    </>
                )}
            </div>
            {editing ? (
                <div className='flex'>
                    <button type="submit" form="dates-form" className='basic-button mt-4'>Submit</button>
                    <button onClick={() => {setEditing(false)}} className='basic-button mt-4 ml-4'>Cancel</button>
                </div>
            ) : (
                <button onClick={() => {setEditing(true)}} className='basic-button mt-4'>Edit Dates</button>
            )}
        </>
    )
}

export default ScheduledDates
