"use client";
import React,  { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UseDatabaseValidation from "./DatabasValidation";
import LoadingSpinner from "./LoadingSpinner";

// import UserValidDB from "./EmailValidate";


const AuthGoogle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const { isLoading, error, isValid } = UseDatabaseValidation(); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    setLoading(false); // Simulate loading finished
  }, []);
 // Use the hook
 setLoading(true); 
  const router = useRouter();
;


  if (status === "loading") {
    
    return <p>Loading...</p>; // Show loading state while session is being loaded
  }

  if (status === "unauthenticated") {
    // Avoid calling router.push directly in render phase, use useEffect instead
    setLoading(false); 
    router.push("/"); // Redirect to homepage if not authenticated
    return null;
  }



  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    setLoading(false); 
    return <div>{error}</div>; // Show error if any
  }

  if (isValid) {
    setLoading(false); 
    return <div>{children}</div>; // Render if validation passes
  }
  // If the session exists, validate the user

  // return <UserValidDB>{children}</UserValidDB>;
};

export default AuthGoogle;
