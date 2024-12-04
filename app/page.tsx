"use client"

import useAuth from "@/auth/useAuth";
import AdminPanel from "@/components/admin/AdminPanel";
import FormPageLayout from "@/components/layouts/FormPageLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { db } from "@/lib/firebase";
import { handleLogout } from "@/utils/handleLogout";
import { useUserProfile } from "@/utils/useUserProfile";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [marketSelection, setMarketSelection] = useState(false);
  const [role, setRole] = useState('');
  const [hasMarket, setHasMarket] = useState(false);

  const { user } = useUserProfile();

  useEffect(() => {
    if(user) {
      setRole(user.role);
    }
  }, [user])

  useEffect(() => {
    const fetchMarkets = async () => {
      if(user) {
        try {
          const marketQuery = query(
            collection(db, 'markets'),
            where('ownerid', '==', user?.uid)
          );
          const querySnapshot = await getDocs(marketQuery);
          if(querySnapshot.size > 0) {
            setHasMarket(true);
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchMarkets();
  }, [user])

  if(role === 'user') {
    return (
      <FormPageLayout>
        <div className="flex flex-col items-center w-full">
          {marketSelection ? (
            <>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">What are you looking for?</h2>
              <Link href="/book-single" className="action-button mb-5">Single Entrance</Link>
              <Link href="/book-long" className="action-button mb-5">Longterm Position</Link>
              <button onClick={() => setMarketSelection(false)} className="flex items-center"><img src="/assets/left-arrow.png" alt="" className="w-4 mr-2"/>Back</button>
            </>
          ) : (
            <>
              <Link href="/your-profile" className="action-button mb-5">View Profile</Link>
              {hasMarket ? (
                <button onClick={() => setMarketSelection(true)} className="action-button mb-5">Book a stall</button>
              ) : (
                <>
                  <button disabled className="w-[50%] bg-green-500 border-4 border-black rounded-full py-4 text-xl font-semibold text-center mb-2 opacity-50">Book a stall</button>
                  <p className="text-sm mb-2">Register your market in profile to book a stall.</p>
                </>
              )}
              <Link href="/local-markets" className="action-button">View Local Markets</Link>
            </>
          )}
        </div>
      </FormPageLayout>
    );
  } else if(role === 'admin') {
    return (
      <AdminPanel />
    );
  }

  return (
    <LoadingScreen />
  );
}
