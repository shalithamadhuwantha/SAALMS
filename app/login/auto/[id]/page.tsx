"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useParams } from "next/navigation"; 

const AutoLogin: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); 

  useEffect(() => {
    if (id === "Student" || id === "Lecturer") {
      sessionStorage.setItem("roll", id); 
      if (id === "Student") {
        router.push("/Student/Dashboard"); 
      } else if (id === "Lecturer") {
        router.push("/Lecturer/Dashboard"); 
      }
    } else {
    
      router.push("/");
    }
  }, [id, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
};

export default AutoLogin;
