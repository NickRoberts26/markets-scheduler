import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  uid: string;
}

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userQuery = query(collection(db, 'users'), where('uid', '==', authUser.uid));
        
        try {
          const querySnapshot = await getDocs(userQuery);
          
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Get the first document from the query
            setUser(userDoc.data() as User);
          } else {
            console.log("No user data found in Firestore with the matching uid.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user is logged in");
        setUser(null); // Clear user data if not logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
