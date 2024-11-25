"use client"

import useAuth from "@/auth/useAuth";
import AdminPanel from "@/components/admin/AdminPanel";
import FormPageLayout from "@/components/layouts/FormPageLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { db } from "@/lib/firebase";
import { handleLogout } from "@/utils/handleLogout";
import { useUserProfile } from "@/utils/useUserProfile";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [marketSelection, setMarketSelection] = useState(false);
  const [role, setRole] = useState('');
  const { user } = useUserProfile();

  useEffect(() => {
    if(user) {
      setRole(user.role);
    }
  }, [user])

  if(role === 'user') {
    return (
      <FormPageLayout>
        <div className="flex flex-col items-center w-full">
          {marketSelection ? (
            <>
              <h2 className="text-3xl font-bold mb-6">What are you looking for?</h2>
              <Link href="/book-single" className="action-button mb-5">Single Entrance</Link>
              <Link href="/book-long" className="action-button mb-5">Longterm Position</Link>
              <button onClick={() => setMarketSelection(false)} className="flex items-center"><img src="/assets/left-arrow.png" alt="" className="w-4 mr-2"/>Back</button>
            </>
          ) : (
            <>
              <Link href="/your-profile" className="action-button mb-5">View Profile ({role})</Link>
              <button onClick={() => setMarketSelection(true)} className="action-button mb-5">Book a stall</button>
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
