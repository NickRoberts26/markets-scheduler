"use client"

import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex h-screen max-h-screen">
      <div className="flex flex-col justify-between w-[50%] px-10 py-10">
        <div className="flex items-center">
          <Image
          src="/assets/logo.png"
          height={1000}
          width={1000}
          alt="logo"
          className="h-10 w-fit"
          />
          <div className="text-3xl font-bold ml-2 mt-1">Marketeer</div>
        </div>
        <div className="flex flex-col items-center w-full">
          <Link href="/your-market" className="action-button mb-5">Add your market</Link>
          <Link href="/book" className="action-button mb-5">Book a stall</Link>
          <Link href="/local-markets" className="action-button">View Local Markets</Link>
        </div>
        <div className="flex justify-between">
            <p className="text-sm">© 2024 Marketeer</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
        </div>
      </div>
      <Image
        src='/assets/home-side.png'
        alt="markets"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
