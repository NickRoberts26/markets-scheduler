'use client'

import useAuth from "@/auth/useAuth";
import { handleLogout } from "@/utils/handleLogout";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface FormPageLayoutProps {
    children: ReactNode;
}

const FormPageLayout: React.FC<FormPageLayoutProps> = ({ children }) => {
    const { user } = useAuth();
    
    return (
        <div className="flex h-screen max-h-screen">
            <div className="flex flex-col justify-between px-6 py-6 w-full lg:w-[50%] lg:px-10 lg:py-10">
                <div className="flex justify-between items-start">
                    <Link href="/" className="flex items-center">
                        <Image
                        src="/assets/logo.png"
                        height={1000}
                        width={1000} 
                        alt="logo"
                        className="h-10 w-fit"
                        />
                        <div className="text-3xl font-bold ml-2 mt-1">Marketeer</div>
                    </Link>
                    { user ? (
                        <div className="flex flex-col items-end">
                            <p>Welcome, <Link href="" className="font-bold">{ user.displayName }</Link></p>
                            <button onClick={handleLogout} className='w-fit text-sm'>Logout</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {children}
                <div className="flex justify-between items-end">
                    <p className="text-xs lg:text-sm">© 2024 Marketeer</p>
                    {!user && (
                        <div className="flex text-xs lg:text-sm">
                            Marketplace owner? Sign up
                            <Link href="/admin-signup" className="text-green-500 mx-1">here</Link> 
                        </div>
                    )}
                </div>
            </div>
            <Image
            src='/assets/markets-cropped.png'
            alt="markets"
            width={1000}
            height={1000}
            className="side-img max-w-[50%]"
            />
        </div>
    )
}

export default FormPageLayout
