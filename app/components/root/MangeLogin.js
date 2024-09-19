"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React,  { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "./LoadingSpinner";


// Log off users
export async function LogOff() {
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    setLoading(false); // Simulate loading finished
  }, []);

  setLoading(true); 
  try {
    sessionStorage.removeItem("roll");
    sessionStorage.removeItem("login");
    await signOut({
      callbackUrl: "/", // Redirects the user to '/goodbye' after sign-out
    });
    setLoading(false); 

  } catch (error) {
    setLoading(false); 
    console.error("Error during sign out:", error);
  }
}
