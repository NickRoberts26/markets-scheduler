import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form';

interface Marketplace {
    currentDates: string[];
}

interface ScheduledDatesProps {
    marketplace: Marketplace;
}

type FormValues = {
    startDate: Date | null;
  };

const ScheduledDates: React.FC<ScheduledDatesProps> = ( { marketplace } ) => {
    const [editing, setEditing] = useState(false);
    const { control, handleSubmit } = useForm<FormValues>();

    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  
    const onSubmit = (data: FormValues) => {
      setSubmittedData(data);
      console.log('Form Submitted:', data);
    };

    return (
        <>
            <div className='border-2 border-black rounded-xl p-4 mt-6'>
                <h2 className='text-3xl mb-2'>Scheduled Dates</h2>
                {editing ? (
                    <>
                        {marketplace?.currentDates.map((date, index) => (
                            <p key={index}>{date}</p>
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
                            {submittedData && (
                            <div>
                                <h3>Submitted Data:</h3>
                                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                            </div>
                            )}
                        </form>
                    </>
                ) : (
                    <>
                        {marketplace?.currentDates.map((date, index) => (
                            <p key={index}>{date}</p>
                        ))}
                    </>
                )}
            </div>
            {editing ? (
                <div>
                    <button type="submit" form="dates-form" className='basic-button mt-4'>Submit</button>
                </div>
            ) : (
                <button onClick={() => {setEditing(true)}} className='basic-button mt-4'>Add Date</button>
            )}
        </>
    )
}

export default ScheduledDates
