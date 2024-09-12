"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserValidDB from "./EmailValidate";

const AuthGoogle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading state while session is being loaded
  }

  if (status === "unauthenticated") {
    // Avoid calling router.push directly in render phase, use useEffect instead
    router.push("/"); // Redirect to homepage if not authenticated
    return null;
  }

  // If the session exists, validate the user
  return <UserValidDB>{children}</UserValidDB>;
};

export default AuthGoogle;
