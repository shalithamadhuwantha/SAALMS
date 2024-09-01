"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";


// Log off users
export async function LogOff() {
  try {
    sessionStorage.removeItem("roll");
    sessionStorage.removeItem("login");
    await signOut();
  } catch (error) {
    console.error("Error during sign out:", error);
  }
}
