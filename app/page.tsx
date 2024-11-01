"use client"

import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react'

export default function Home() {

  const [formType, setFormType] = useState(true);

  return (
    <div className="flex h-screen max-h-screen">
      Home!
    </div>
  );
}
