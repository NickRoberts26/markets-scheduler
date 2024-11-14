"use client"

import FormPageLayout from "@/components/layouts/FormPageLayout";
import { handleLogout } from "@/utils/handleLogout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [marketSelection, setMarketSelection] = useState(false);

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
            <Link href="/your-profile" className="action-button mb-5">View Profile</Link>
            <button onClick={() => setMarketSelection(true)} className="action-button mb-5">Book a stall</button>
            <Link href="/local-markets" className="action-button">View Local Markets</Link>
          </>
        )}
      </div>
    </FormPageLayout>

  );
}
