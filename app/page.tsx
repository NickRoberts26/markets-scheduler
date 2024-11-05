"use client"

import FormPageLayout from "@/components/FormPageLayout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    
    <FormPageLayout>
      <div className="flex flex-col items-center w-full">
        <Link href="/your-market" className="action-button mb-5">Add your market</Link>
        <Link href="/book" className="action-button mb-5">Book a stall</Link>
        <Link href="/local-markets" className="action-button">View Local Markets</Link>
      </div>
    </FormPageLayout>

  );
}
