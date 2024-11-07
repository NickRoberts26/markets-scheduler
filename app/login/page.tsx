'use client'

import FormPageLayout from "@/components/layouts/FormPageLayout";
import LoginForm from "@/components/forms/LoginForm";
import useAuth from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <FormPageLayout>
      <LoginForm />
    </FormPageLayout>
  );
}

export default Login;