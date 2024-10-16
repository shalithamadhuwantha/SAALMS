// app/login/auto/[id]/page.tsx
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Using next/navigation for router
import { useParams } from "next/navigation"; // To capture dynamic route params

const AutoLogin: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // 'id' will capture the dynamic part of the URL ('Student' or 'Lecturer')

  useEffect(() => {
    if (id === "Student" || id === "Lecturer") {
      sessionStorage.setItem("roll", id); // Set the roll based on the URL
      if (id === "Student") {
        router.push("/Student/Dashboard"); // Redirect Student
      } else if (id === "Lecturer") {
        router.push("/Lecturer/Dashboard"); // Redirect Lecturer
      }
    } else {
      // If the id is not 'Student' or 'Lecturer', redirect back to the login page or an error page
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
