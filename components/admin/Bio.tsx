import { db } from '@/lib/firebase';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface BioProps {
    marketplace: Marketplace;
    currentUid: string;
}

interface Marketplace {
    uid: string;
    marketplaceName: string;
    type: string;
    abn: number;
    capacity: number;
    contactNumber: string;
    currentDates: string[];
    email: string;
    bio?: string;
}

interface FormData {
    bio: string;
  }

const Bio: React.FC<BioProps> = ( { marketplace, currentUid } ) => {
    const [editingBio, setEditingBio] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
          const q = query(
            collection(db, 'marketplaces'),
            where("uid", "==", currentUid)
          );
  
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
              const docRef = querySnapshot.docs[0].ref;
              await updateDoc(docRef, {
                bio: data.bio
              });
              location.reload();
          }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='border-2 border-black rounded-xl p-4'>
                <h2 className='text-2xl lg:text-3xl mb-2'>Marketplace Bio</h2>
                {editingBio ? (
                    <form onSubmit={handleSubmit(onSubmit)} id="bio-form" action="">
                        <div className='flex items-center'>
                            <textarea
                                id="bio"
                                {...register('bio')}
                                defaultValue={marketplace?.bio}
                                className='form-field flex-1 min-h-40'
                            />
                            {errors.bio && <p>{errors.bio.message}</p>}
                        </div>
                    </form>
                ) : (
                    <>
                        {marketplace?.bio ? (<p>{marketplace?.bio}</p>) : (<p>No bio set yet.</p>)}
                    </>
                )}
            </div>
            {editingBio ? (
                <div className='flex'>
                    <button type="submit" form="bio-form" className='basic-button mt-4'>Submit</button>
                    <button onClick={() => {setEditingBio(false)}} className='basic-button mt-4 ml-4'>Cancel</button>
                </div>
            ) : (
                <button onClick={() => {setEditingBio(true)}} className='basic-button mt-4'>{marketplace?.bio ? ('Update Bio') : ('Write Bio')}</button>
            )}
        </>
    )
}

export default Bio
