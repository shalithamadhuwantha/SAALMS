"use client"
import React from "react";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserValidDB from "./EmailValidate";

const AuthGoogle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    router.push("/");

    return null;
  }
  return (
    <UserValidDB>
    
      <>{children}</>
    </UserValidDB>
  );
};

export default AuthGoogle;
